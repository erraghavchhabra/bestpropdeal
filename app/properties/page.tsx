"use client";

import {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  Suspense,
} from "react";
import { ChevronDown, Search, X, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import PropertyCard, { Property } from "@/components/PropertyCard";
import { API } from "@/lib/api";

interface ApiProperty {
  id: number;
  slug: string;
  title: string;
  locality: string;
  price_label: string;
  price: string;
  bhk: string;
  thumbnail: string;
  carpet_area: string;
  possession: string;
  status: string[];
  whatsapp?: string;
  phone?: string;
  rera_id?: string;
  bhk_configs?: {
    type: string;
    price: string;
    label: string;
    carpet_area: string;
    floor_plan_url?: string;
  }[];
}

function mapToProperty(p: ApiProperty): Property {
  return {
    id:          p.id,
    slug:        p.slug,
    title:       p.title,
    location:    p.locality,
    price:       p.price_label || p.price,
    type:        p.bhk,
    image:       p.thumbnail,
    possession:  p.possession,
    status:      p.status?.[0] ?? "",
    rera:        p.rera_id ?? "",
    whatsapp:    p.whatsapp  || "919999999999",
    phone:       p.phone     || "919999999999",
    // If API returns bhk_configs use them, otherwise synthesise one from flat fields
    bhk_configs: p.bhk_configs?.length
      ? p.bhk_configs
      : p.carpet_area || p.price_label
        ? [
            {
              type:       p.bhk        || "",
              price:      p.price      || "",
              label:      p.price_label|| "",
              carpet_area: p.carpet_area || "",
            },
          ]
        : undefined,
  };
}

function SkeletonCard() {
  return (
    <div className="w-full max-w-[320px] rounded-[2rem] border border-white/10 bg-white/[0.03] overflow-hidden animate-pulse">
      <div className="h-52 bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/5 rounded-full w-3/4" />
        <div className="h-3 bg-white/5 rounded-full w-1/2" />
        <div className="h-3 bg-white/5 rounded-full w-2/3" />
      </div>
    </div>
  );
}

interface AppliedFilters {
  carpet: string;
  bhk: string;
  property_type: string;
  city: string;
  search: string;
  min_budget: number;
  max_budget: number;
}

// Normalizes whatever shape the /taxonomies/cities endpoint returns
// (array of strings, or array of { name, slug, title, ... } objects)
// into a flat array of display-name strings.
function normalizeCities(raw: any): string[] {
  const list = Array.isArray(raw) ? raw : raw?.data ?? raw?.cities ?? [];
  if (!Array.isArray(list)) return [];

  return list
    .map((item: any) => {
      if (typeof item === "string") return item;
      return item?.name ?? item?.title ?? item?.label ?? item?.slug ?? null;
    })
    .filter((c: any): c is string => typeof c === "string" && c.trim().length > 0);
}

// ── Inner page (reads searchParams) ─────────────────────────────────────────
function PropertiesPageInner() {
  // Fallback list used only if the cities API fails / hasn't loaded yet
  const fallbackCities = ["Badlapur", "Navi Mumbai", "Panvel", "Thane", "Kalyan"];
  const propertyTypes = ["Apartment", "Duplex", "Penthouse", "Villa", "Studio"];
  const bedroomOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"];

  const allProjectSuggestions = [
    "Apartments in Navi Mumbai",
    "Luxury Apartments in Thane",
    "2 BHK in Panvel",
    "3 BHK Flats in Kalyan",
    "Ready to Move Apartments",
    "Under Construction Projects",
    "Affordable Homes in Badlapur",
    "Premium Villas in Navi Mumbai",
    "Duplex Homes in Thane",
    "Penthouse in Panvel",
    "Sea View Apartments",
    "New Launch Projects",
    "RERA Approved Flats",
    "Gated Community Apartments",
    "Township Projects in Mumbai",
    "Luxury Residences",
    "Studio Apartments",
    "Family Homes in Kalyan",
    "Smart Homes in Navi Mumbai",
    "High Rise Towers in Thane",
  ];

  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const [showFilters, setShowFilters] = useState(false);

  // Cities — now dynamic, fetched from API
  const [cities, setCities] = useState<string[]>(fallbackCities);
  const [citiesLoading, setCitiesLoading] = useState(true);

  const [locationInput, setLocationInput] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>(fallbackCities);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [projectInput, setProjectInput] = useState("");
  const [projectSuggestions, setProjectSuggestions] = useState<string[]>([]);
  const [showProjectSuggestions, setShowProjectSuggestions] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [minBudget, setMinBudget] = useState(10);
  const [maxBudget, setMaxBudget] = useState(500);
  const [bedroomOpen, setBedroomOpen] = useState(false);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);

  const formatBudget = (val: number) =>
    val >= 100
      ? `₹${(val / 100).toFixed(val % 100 === 0 ? 0 : 1)}Cr`
      : `₹${val}L`;

  const handleMinBudget = (value: number) => setMinBudget(Math.min(value, maxBudget - 5));
  const handleMaxBudget = (value: number) => setMaxBudget(Math.max(value, minBudget + 5));

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  const closeAllDropdowns = () => {
    setBudgetOpen(false);
    setBedroomOpen(false);
    setTypeOpen(false);
    setShowSuggestions(false);
    setShowProjectSuggestions(false);
  };

  const handleLocationChange = (value: string) => {
    setLocationInput(value);
    if (value.trim()) {
      setFilteredCities(cities.filter((c) => c.toLowerCase().includes(value.toLowerCase())));
      setShowSuggestions(true);
    } else {
      setFilteredCities(cities);
      setShowSuggestions(false);
    }
  };

  const handleProjectChange = (value: string) => {
    setProjectInput(value);
    setShowFilters(true);
    if (value.trim()) {
      setProjectSuggestions(allProjectSuggestions.filter((i) => i.toLowerCase().includes(value.toLowerCase())));
      setShowProjectSuggestions(true);
    } else {
      setProjectSuggestions([]);
      setShowProjectSuggestions(false);
    }
  };

  // --- Fetch cities from API on mount ---
  useEffect(() => {
    let cancelled = false;

    setCitiesLoading(true);
    fetch(API.cities)
      .then((r) => r.json())
      .then((res) => {
        if (cancelled) return;
        const normalized = normalizeCities(res);
        if (normalized.length > 0) {
          setCities(normalized);
          setFilteredCities(normalized);
        }
        // if the API returns nothing usable, we silently keep the fallback list
      })
      .catch(() => {
        // network/parse error -> keep fallback list, fail silently
      })
      .finally(() => {
        if (!cancelled) setCitiesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target as Node)) {
        setShowFilters(false);
        closeAllDropdowns();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchParams = useSearchParams();
  const urlBhk          = searchParams.get("bhk")           || "";
  const urlPropertyType = searchParams.get("property_type") || "";
  const urlCity         = searchParams.get("city")          || "";
  const urlProject      = searchParams.get("project")       || "";

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading]       = useState(true);
  const [total, setTotal]           = useState(0);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 12;

  const [carpet, setCarpet]             = useState("");
  const [bhk, setBhk]                   = useState(urlBhk);
  const [propertyType, setPropertyType] = useState(urlPropertyType);
  const [city, setCity]                 = useState(urlCity);
  const [search, setSearch]             = useState(urlProject);

  useEffect(() => {
    if (urlCity) setLocationInput(urlCity);
    if (urlProject) setProjectInput(urlProject);
    if (urlBhk) setSelectedBedrooms([urlBhk.replace(/-/g, " ").toUpperCase()]);
    if (urlPropertyType) setSelectedPropertyTypes([urlPropertyType.charAt(0).toUpperCase() + urlPropertyType.slice(1)]);
  }, [urlBhk, urlPropertyType, urlCity, urlProject]);

  const [applied, setApplied] = useState<AppliedFilters>({
    carpet: "",
    bhk: urlBhk,
    property_type: urlPropertyType,
    city: urlCity,
    search: urlProject,
    min_budget: 10,
    max_budget: 500,
  });

  const fetchProperties = useCallback(async (filters: AppliedFilters, pg: number) => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = { page: pg, per_page: PER_PAGE };
      if (filters.bhk)          params.bhk           = filters.bhk.toLowerCase().replace(/\s+/g, "-");
      if (filters.property_type) params.property_type = filters.property_type.toLowerCase().replace(/\s+/g, "-");
      if (filters.city)         params.city          = filters.city.toLowerCase().replace(/\s+/g, "-");
      if (filters.search)       params.search        = filters.search;
      if (filters.min_budget > 10)  params.min_budget = filters.min_budget;
      if (filters.max_budget < 500) params.max_budget = filters.max_budget;

      const res = await fetch(API.properties(params));
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();

      setProperties((json.data as ApiProperty[]).map(mapToProperty));
      setTotal(json.total);
      setTotalPages(json.total_pages);
    } catch (err) {
      console.error(err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProperties(applied, page); }, [applied, page, fetchProperties]);

  // Client-side carpet filter — uses bhk_configs[0].carpet_area
  const filtered = useMemo(() => {
    if (!applied.carpet) return properties;
    return properties.filter((p) => {
      const raw = p.bhk_configs?.[0]?.carpet_area ?? "";
      const val = parseInt(raw || "0");
      if (applied.carpet === "700")  return val <= 700;
      if (applied.carpet === "1200") return val > 700 && val <= 1200;
      if (applied.carpet === "1201") return val > 1200;
      return true;
    });
  }, [properties, applied.carpet]);

  const handleSearch = () => {
    setCity(locationInput);
    setSearch(projectInput);
    setBhk(selectedBedrooms[0] ?? "");
    setPropertyType(selectedPropertyTypes[0] ?? "");
    setPage(1);
    setApplied({
      carpet,
      city:          locationInput,
      search:        projectInput,
      bhk:           selectedBedrooms[0]      ?? "",
      property_type: selectedPropertyTypes[0] ?? "",
      min_budget:    minBudget,
      max_budget:    maxBudget,
    });
    closeAllDropdowns();
  };

  const handleClearAll = () => {
    setLocationInput(""); setProjectInput(""); setSelectedBedrooms([]);
    setSelectedPropertyTypes([]); setMinBudget(10); setMaxBudget(500);
    setShowFilters(false); setFilteredCities(cities); setProjectSuggestions([]);
    closeAllDropdowns();
    setCarpet(""); setBhk(""); setPropertyType(""); setCity(""); setSearch("");
    setPage(1);
    setApplied({ carpet: "", bhk: "", property_type: "", city: "", search: "", min_budget: 10, max_budget: 500 });
  };

  const headingLabel = applied.property_type || applied.bhk || "All";
  const headingCity  = applied.city || "Properties";

  return (
    <section className="bg-[#0f0f0f] min-h-screen lg:pt-40 lg:pb-20 py-30 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-2">
          <h1 className="mt-0 text-2xl md:text-2xl text-white font-light">
            {headingLabel !== "All" ? (
              <><span className="font-semibold">{headingLabel}</span> in {headingCity}</>
            ) : (
              <>All <span className="font-semibold">{headingCity}</span></>
            )}
          </h1>
          <p className="text-white/60 mt-3">{loading ? "Loading..." : `${total} properties found`}</p>
        </div>

        {/* Search Box */}
        <div
          ref={searchWrapperRef}
          className="mt-2 mb-6 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-visible relative z-50"
        >
          <div className="p-2 sm:p-3">
            <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[24px] lg:rounded-full flex flex-col lg:flex-row lg:items-center lg:flex-nowrap overflow-visible gap-2 lg:gap-0 px-2 lg:px-2">

              {/* Location */}
              <div className="relative w-full lg:w-[180px] xl:w-[220px] flex-shrink-0">
                <input
                  value={locationInput}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  onFocus={() => { setFilteredCities(cities); setShowSuggestions(true); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Location"
                  suppressHydrationWarning
                  className="w-full h-[52px] sm:h-[54px] px-5 sm:px-6 text-[14px] sm:text-[15px] text-white placeholder:text-white/50 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (showSuggestions) { setShowSuggestions(false); }
                    else { setFilteredCities(locationInput.trim() ? cities.filter((c) => c.toLowerCase().includes(locationInput.toLowerCase())) : cities); setShowSuggestions(true); }
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50"
                >
                  {citiesLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                {showSuggestions && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-[#111111]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-[999] overflow-hidden">
                    {filteredCities.map((c) => (
                      <button key={c} type="button" onClick={() => { setLocationInput(c); setShowSuggestions(false); }}
                        className="block w-full text-left px-4 py-3 text-xs text-white/80 hover:bg-[#ef4800] hover:text-white transition">
                        {c}
                      </button>
                    ))}
                  </div>
                )}
                {showSuggestions && filteredCities.length === 0 && !citiesLoading && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-[#111111]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-[999] px-4 py-3">
                    <p className="text-xs text-white/50">No matching cities</p>
                  </div>
                )}
              </div>

              <div className="hidden lg:block h-8 w-px bg-white/10 self-center" />

              {/* Project Search */}
              <div className="relative w-full lg:flex-1 lg:max-w-[450px]">
                <input
                  value={projectInput}
                  onChange={(e) => handleProjectChange(e.target.value)}
                  onFocus={() => {
                    setShowFilters(true);
                    if (projectInput.trim().length > 0) {
                      setProjectSuggestions(allProjectSuggestions.filter((i) => i.toLowerCase().includes(projectInput.toLowerCase())));
                      setShowProjectSuggestions(true);
                    }
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder='Search for Project "The Altitude"'
                  className="w-full h-[52px] sm:h-[54px] px-5 sm:px-6 text-[14px] sm:text-[15px] text-white placeholder:text-white/40 outline-none bg-transparent"
                />
                {showProjectSuggestions && projectSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-[#111111]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-[999] overflow-hidden max-h-[320px] overflow-y-auto">
                    {projectSuggestions.map((item, index) => (
                      <button key={index} type="button" onClick={() => { setProjectInput(item); setShowProjectSuggestions(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition border-b border-white/5 last:border-0">
                        <Search size={14} className="text-[#ef4800] flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-white/80">{item}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="hidden lg:block h-8 w-px bg-white/10 self-center" />

              {/* Budget */}
              <div className="relative w-full lg:w-auto">
                <button type="button" onClick={() => { closeAllDropdowns(); setBudgetOpen((p) => !p); }}
                  className="w-full lg:w-auto h-[52px] px-4 rounded-full lg:rounded-none lg:bg-transparent bg-white/[0.04] text-white text-xs font-medium flex items-center justify-between lg:justify-center gap-2">
                  <span className="truncate">{formatBudget(minBudget)} – {formatBudget(maxBudget)}</span>
                  <ChevronDown size={14} className={`transition-transform flex-shrink-0 ${budgetOpen ? "rotate-180" : ""}`} />
                </button>
                {budgetOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full sm:w-[320px] bg-[#111111]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-[999] p-5">
                    <div className="space-y-5">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-white/70">Min Budget</span>
                          <span className="text-xs font-semibold text-[#ef4800]">{formatBudget(minBudget)}</span>
                        </div>
                        <input type="range" min="5" max="495" step="5" value={minBudget} onChange={(e) => handleMinBudget(Number(e.target.value))} className="w-full accent-[#ef4800]" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-white/70">Max Budget</span>
                          <span className="text-xs font-semibold text-[#ef4800]">{formatBudget(maxBudget)}</span>
                        </div>
                        <input type="range" min="10" max="500" step="5" value={maxBudget} onChange={(e) => handleMaxBudget(Number(e.target.value))} className="w-full accent-[#ef4800]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bedrooms */}
              <div className="relative w-full lg:w-auto">
                <button type="button" onClick={() => { closeAllDropdowns(); setBedroomOpen((p) => !p); }}
                  className="w-full lg:w-auto h-[52px] px-4 rounded-full lg:rounded-none lg:bg-transparent bg-white/[0.04] text-white text-xs font-medium flex items-center justify-between lg:justify-center gap-2">
                  <span>Bedrooms{selectedBedrooms.length > 0 && ` (${selectedBedrooms.length})`}</span>
                  <ChevronDown size={14} className={`transition-transform ${bedroomOpen ? "rotate-180" : ""}`} />
                </button>
                {bedroomOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full sm:w-72 bg-[#111111]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-[999] p-4">
                    <div className="flex flex-wrap gap-2">
                      {bedroomOptions.map((bedroom) => {
                        const active = selectedBedrooms.includes(bedroom);
                        return (
                          <button key={bedroom} type="button" onClick={() => toggleSelection(bedroom, selectedBedrooms, setSelectedBedrooms)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition border ${active ? "bg-[#ef4800] text-white border-[#ef4800]" : "bg-white/[0.04] text-white/80 border-white/10 hover:border-[#ef4800]"}`}>
                            {bedroom}
                          </button>
                        );
                      })}
                    </div>
                    {selectedBedrooms.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                        {selectedBedrooms.map((item) => (
                          <div key={item} className="flex items-center gap-1 bg-[#ef4800]/20 text-[#ef4800] px-3 py-1.5 rounded-full text-xs font-semibold">
                            {item}
                            <button type="button" onClick={() => setSelectedBedrooms(selectedBedrooms.filter((b) => b !== item))}><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Property Type */}
              <div className="relative w-full lg:w-auto">
                <button type="button" onClick={() => { closeAllDropdowns(); setTypeOpen((p) => !p); }}
                  className="w-full lg:w-auto h-[52px] px-4 rounded-full lg:rounded-none lg:bg-transparent bg-white/[0.04] text-white text-xs font-medium flex items-center justify-between lg:justify-center gap-2">
                  <span>Property Type{selectedPropertyTypes.length > 0 && ` (${selectedPropertyTypes.length})`}</span>
                  <ChevronDown size={14} className={`transition-transform ${typeOpen ? "rotate-180" : ""}`} />
                </button>
                {typeOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full sm:w-80 bg-[#111111]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 z-[999] p-4">
                    <div className="flex flex-wrap gap-2">
                      {propertyTypes.map((type) => {
                        const active = selectedPropertyTypes.includes(type);
                        return (
                          <button key={type} type="button" onClick={() => toggleSelection(type, selectedPropertyTypes, setSelectedPropertyTypes)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition border ${active ? "bg-[#ef4800] text-white border-[#ef4800]" : "bg-white/[0.04] text-white/80 border-white/10 hover:border-[#ef4800]"}`}>
                            {type}
                          </button>
                        );
                      })}
                    </div>
                    {selectedPropertyTypes.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                        {selectedPropertyTypes.map((item) => (
                          <div key={item} className="flex items-center gap-1 bg-[#ef4800]/20 text-[#ef4800] px-3 py-1.5 rounded-full text-xs font-semibold">
                            {item}
                            <button type="button" onClick={() => setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== item))}><X size={12} /></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Clear */}
              <button type="button" onClick={handleClearAll}
                className="w-full lg:w-auto h-[52px] px-4 text-xs font-semibold text-white/70 hover:text-[#ef4800] transition">
                CLEAR
              </button>

              <div className="hidden lg:block h-8 w-px bg-white/10 self-center" />

              {/* Search Button */}
              <div className="p-2 lg:p-2">
                <button type="button" onClick={handleSearch}
                  className="w-full lg:w-auto h-[46px] px-6 bg-[#ef4800] hover:bg-[#b90002] text-white rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition shadow-lg">
                  <Search size={16} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active filter pills */}
        {(applied.city || applied.bhk || applied.property_type || applied.search ||
          applied.min_budget > 10 || applied.max_budget < 500) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {applied.city && (
              <span className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">
                📍 {applied.city}
                <button onClick={() => { setLocationInput(""); setApplied((p) => ({ ...p, city: "" })); setCity(""); }}><X size={12} /></button>
              </span>
            )}
            {applied.bhk && (
              <span className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">
                🛏 {applied.bhk.toUpperCase().replace(/-/g, " ")}
                <button onClick={() => { setSelectedBedrooms([]); setApplied((p) => ({ ...p, bhk: "" })); setBhk(""); }}><X size={12} /></button>
              </span>
            )}
            {applied.property_type && (
              <span className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">
                🏠 {applied.property_type.charAt(0).toUpperCase() + applied.property_type.slice(1)}
                <button onClick={() => { setSelectedPropertyTypes([]); setApplied((p) => ({ ...p, property_type: "" })); setPropertyType(""); }}><X size={12} /></button>
              </span>
            )}
            {applied.search && (
              <span className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">
                🔍 {applied.search}
                <button onClick={() => { setProjectInput(""); setApplied((p) => ({ ...p, search: "" })); setSearch(""); }}><X size={12} /></button>
              </span>
            )}
            {(applied.min_budget > 10 || applied.max_budget < 500) && (
              <span className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full">
                💰 {formatBudget(applied.min_budget)} – {formatBudget(applied.max_budget)}
                <button onClick={() => { setMinBudget(10); setMaxBudget(500); setApplied((p) => ({ ...p, min_budget: 10, max_budget: 500 })); }}><X size={12} /></button>
              </span>
            )}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {[...Array(PER_PAGE)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {filtered.map((property) => (
                <div key={property.id} className="w-full max-w-[320px]">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-14 flex-wrap">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 text-sm hover:border-[#ef4800] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition">
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-full text-sm transition ${page === i + 1 ? "bg-[#ef4800] text-white" : "border border-white/10 text-white/60 hover:border-[#ef4800] hover:text-white"}`}>
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 text-sm hover:border-[#ef4800] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition">
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 border border-white/10 rounded-3xl bg-white/[0.02]">
            <h3 className="text-white text-2xl font-semibold">No Properties Found</h3>
            <p className="text-white/50 mt-3">Try adjusting your filters to explore more options.</p>
            <button onClick={handleClearAll}
              className="mt-6 px-6 py-2.5 bg-[#ef4800] hover:bg-[#b90002] text-white rounded-full text-sm font-medium transition">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </div>
    }>
      <PropertiesPageInner />
    </Suspense>
  );
}