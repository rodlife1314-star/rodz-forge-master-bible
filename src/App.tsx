import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { 
  Shield, 
  Terminal, 
  Activity, 
  Orbit, 
  Cpu,
  Flame,
  Layout,
  Waves,
  Zap,
  Box,
  PieChart,
  Printer,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  ShieldCheck,
  User,
  Users,
  Dna,
  History,
  Clock,
  Snowflake,
  SunMedium,
  XCircle,
  RefreshCw,
  ArrowRight,
  Layers
} from "lucide-react";

// --- Recovery Brain Logic v2.8.0 ---
interface RecoveryEvent {
  id: string;
  engine: string;
  station: string;
  breach: string;
  value: string;
  instruction: string;
  adjustment: string;
  recoveryProjection: number;
}

const RECOVERY_FEED: RecoveryEvent[] = [
  {
    id: "R01",
    engine: "SUNDAY",
    station: "FRY",
    breach: "OIL_TEMP_LOW",
    value: "165°C",
    instruction: "HALT FRY STATION. Abort batch. Reset oil to 180°C.",
    adjustment: "Delay SIDE-001 (Potatoes) +8min",
    recoveryProjection: 91
  },
  {
    id: "R02",
    engine: "SUNDAY",
    station: "STARTER",
    breach: "YORKSHIRE_FAIL",
    value: "Under-rise",
    instruction: "RE-FIRE BATCH. Discard and re-fire Yorkshire batch 01.",
    adjustment: "Delay ENGINE-09 (Meat) +12min",
    recoveryProjection: 92
  },
  {
    id: "R03",
    engine: "DESSERT",
    station: "PASTRY",
    breach: "POSSET_GRAINY",
    value: "Emulsion Fail",
    instruction: "BLOCK BATCH. Switch recommendations to Sticky Toffee / Tiramisu.",
    adjustment: "Flag Posset 86 until rebuild complete",
    recoveryProjection: 94
  },
  {
    id: "R04",
    engine: "SUPPLY",
    station: "GOODS IN",
    breach: "ALLERGEN_MISSING_SPEC",
    value: "No Spec Sheet",
    instruction: "SUPPLY GATE LOCK. Reject delivery. Return to supplier.",
    adjustment: "Flag substitution risk for Station 11",
    recoveryProjection: 95
  }
];

function RecoveryCommandCenter() {
  const [activeBreach, setActiveBreach] = useState<RecoveryEvent | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBreach(null);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % RECOVERY_FEED.length);
        setActiveBreach(RECOVERY_FEED[index]);
      }, 1000);
    }, 8000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="fixed top-32 right-12 z-[100] w-96 font-sans no-print hidden xl:block">
      <AnimatePresence mode="wait">
        {activeBreach ? (
          <motion.div
            key={activeBreach.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="bg-fellini-black border border-fellini-accent/40 shadow-2xl overflow-hidden rounded-xl"
          >
            {/* Header */}
            <div className="bg-fellini-red px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-mono text-[10px] font-bold tracking-widest uppercase">
                <AlertCircle size={14} className="animate-pulse" />
                🚨 Breach Detected
              </div>
              <div className="font-mono text-[9px] text-white/70 uppercase tracking-tighter">
                {activeBreach.engine} // {activeBreach.station}
              </div>
            </div>

            <div className="p-6">
              {/* Breach Info */}
              <div className="mb-6">
                <div className="font-mono text-[9px] text-fellini-ghost uppercase tracking-widest mb-1">Detected Failure</div>
                <div className="text-white text-lg font-bold tracking-tight">
                  {activeBreach.breach.replace(/_/g, ' ')} — <span className="text-fellini-red">{activeBreach.value}</span>
                </div>
              </div>

              {/* Action */}
              <div className="bg-white/5 border-l-2 border-fellini-accent p-4 mb-6">
                <div className="font-mono text-[9px] text-fellini-accent uppercase tracking-[0.3em] mb-2 font-bold flex items-center gap-2">
                  <Zap size={10} /> Recovery Command
                </div>
                <div className="text-white text-sm leading-relaxed font-medium">
                  {activeBreach.instruction}
                </div>
              </div>

              {/* Adjustments */}
              <div className="flex justify-between items-end">
                <div>
                  <div className="font-mono text-[8px] text-fellini-ghost uppercase tracking-widest mb-1">System Adjustment</div>
                  <div className="text-white/80 text-xs flex items-center gap-2">
                    <Clock size={10} className="text-fellini-accent" />
                    {activeBreach.adjustment}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[8px] text-fellini-ghost uppercase tracking-widest mb-1 font-bold">Integrity Sync</div>
                  <div className="text-fellini-green text-sm font-bold flex items-center justify-end gap-1">
                    <RefreshCw size={10} /> {activeBreach.recoveryProjection}%
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <motion.div 
              className="h-1 bg-fellini-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 7, ease: "linear" }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="stable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-fellini-rule bg-white/40 backdrop-blur-md p-4 flex items-center justify-between rounded-xl"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-fellini-green" />
              <div className="font-mono text-[10px] text-fellini-black uppercase tracking-widest font-bold">
                System Stabilised
              </div>
            </div>
            <div className="font-mono text-[8px] text-fellini-ghost uppercase">
              FORGE_BRAIN v2.8.0 ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Types ---
interface Dish {
  id: string;
  title: string;
  tag: string;
  signal: string;
  meta: { label: string; value: string; hi?: boolean }[];
  fullSpec: Record<string, string>;
  method?: string[];
  criticalNote: string;
  reject: string;
  founderLawLocked: boolean;
}

interface EngineIdentity {
  text: string;
  pressurePoint: string;
}

interface ExecutionLaw {
  label: string;
  text: string;
}

interface SupplyLink {
  item: string;
  source: string;
}

interface WeightsMeasuresMethod {
  label: string;
  value: string;
}

interface TimeLaw {
  label: string;
  value: string;
}

interface AllergenGate {
  critical: string[];
  protocol: string;
}

interface SafeGate {
  status: string;
  requirement: string;
}

interface ForgeValidation {
  status: string;
  check: string;
}

interface RecoveryLink {
  breach: string;
  action: string;
}

interface GPControl {
  margin: string;
  status: string;
}

interface PassRejectSignals {
  pass: string;
  reject: string;
}

interface PrintCardConfig {
  layout: string;
  operator: string;
}

interface EngineLayerStack {
  identity: EngineIdentity;
  executionLaws: ExecutionLaw[];
  supplyLinks: SupplyLink[];
  wmm: WeightsMeasuresMethod[];
  timeLaw: TimeLaw[];
  allergenGate: AllergenGate;
  safeGate: SafeGate;
  forgeValidation: ForgeValidation;
  recoveryLinks: RecoveryLink[];
  gpControl: GPControl;
  passRejectSignals: PassRejectSignals;
  printCard: PrintCardConfig;
}

interface Engine {
  id: string;
  num: string;
  name: string;
  version: string;
  operator: string;
  lead: {
    name: string;
    role: string;
    color: string;
    icon: any;
  };
  layers: EngineLayerStack;
  items: Dish[];
}

// --- Data Archive v2.8.1 — MEMORY ENGINE LIVE ---
const ENGINES: Engine[] = [
  {
    id: "supply",
    num: "00",
    name: "Supply\nEngine",
    version: "v2.8.1.FS",
    operator: "LOGOS",
    lead: { name: "LOGOS", role: "Supply Control", color: "#a3854d", icon: Shield },
    layers: {
      identity: {
        text: "Anchors deterministic. System under active lock. No bad data enters the kitchen.",
        pressurePoint: "Vertical Slice Lock"
      },
      executionLaws: [
        { label: "Protein Law", text: "High-value proteins sourced in execution-ready format. Supplier bears yield discipline." },
        { label: "Control Law", text: "Supplier → Pack Size → Yield → Dish → True GP. All generic items removed from lock." }
      ],
      supplyLinks: [
        { item: "Proteins", source: "SUPPLY-PRT-01" },
        { item: "Dry Goods", source: "SUPPLY-DRY-01" }
      ],
      wmm: [
        { label: "Tolerance", value: "±5%" },
        { label: "Audit", value: "Weekly" }
      ],
      timeLaw: [
        { label: "Logistics", value: "30 min verify window" }
      ],
      allergenGate: { critical: ["N/A"], protocol: "Direct Reject on missing cert" },
      safeGate: { status: "LOCKED", requirement: "Spec Sheet" },
      forgeValidation: { status: "ACTIVE", check: "Visual Audit" },
      recoveryLinks: [
        { breach: "ALLERGEN_MISSING_SPEC", action: "SUPPLY_GATE_LOCK" }
      ],
      gpControl: { margin: "72%", status: "LOCKED" },
      passRejectSignals: { pass: "Verify batch", reject: "Reject variance" },
      printCard: { layout: "GATE-001", operator: "LOGOS" }
    },
    items: [
      {
        id: "sup01",
        title: "Receiving Gate",
        tag: "SUPPLY-001 · Quality Control",
        signal: "The final line of defense against sub-standard inputs.",
        meta: [
          { label: "Status", value: "ACTIVE" },
          { label: "Tolerance", value: "±5%" },
          { label: "Protocol", value: "Direct Reject" }
        ],
        fullSpec: {
          "Temperature": "<4°C for chilled | <-18°C for frozen.",
          "Weight": "Spot check every protein case against invoice.",
          "Packaging": "Vacuum seal integrity check. No gas build-up.",
          "Labels": "Supplier batch, kill date, and use-by must be legible."
        },
        method: [
          "Check delivery vehicle temp logs on arrival.",
          "Perform core temp check on high-risk items (Poultry/Fish).",
          "Log weight variance into Supply Master File."
        ],
        criticalNote: "If the delivery fails the gate, it never enters the room. No exceptions.",
        reject: "Blown bags · Temp breach · Weight variance >5% · Missing batch codes",
        founderLawLocked: true
      },
      {
        id: "sup02",
        title: "Supplier Master File",
        tag: "SUPPLY-002 · Data Core",
        signal: "Single source of truth for every landed price and spec.",
        meta: [
          { label: "Source", value: "Master Bible" },
          { label: "Sync", value: "Real-time" },
          { label: "Audit", value: "Weekly" }
        ],
        fullSpec: {
          "Integrity": "Landed price includes delivery and vat-zeroed equivalent.",
          "Spec Lock": "Reference photos of accepted product quality stored.",
          "Contact": "Lead account manager emergency lines only.",
          "GP Sync": "Price updates move the Bible GP meter automatically."
        },
        method: [
          "Review invoices weekly against Bible baseline prices.",
          "Trigger GP review if drift exceeds 2%.",
          "Conduct quarterly performance review on fill rates."
        ],
        criticalNote: "Operational truth lives here. If it's not in the file, it doesn't exist.",
        reject: "Unverified pricing · Change without notification",
        founderLawLocked: true
      },
      {
        id: "sup03",
        title: "GP Calculator",
        tag: "SUPPLY-003 · Live Tool",
        signal: "Vertical slice executor. Input supplier reality → receive deterministic truth.",
        meta: [
          { label: "Target", value: "72% (Overall)" },
          { label: "Buffer", value: "3% Waste" },
          { label: "Status", value: "LIVE" }
        ],
        fullSpec: {
          "Inputs": "Invoice Price + Yield Loss + Portion Weight.",
          "Output": "True GP % based on current menu selling price.",
          "Sensitivity": "Shows impact of ±10p changes on high-volume items.",
          "Anchors": "Locked anchors (Ribeye/Dough) provide the stability buffer."
        },
        method: [
          "Input current landed protein cost per kg.",
          "Apply verified yield (e.g., 75% for Chicken Parm).",
          "Review dish margin vs benchmark targets."
        ],
        criticalNote: "Transparency is the cure for silent bleed. Use after every supplier update.",
        reject: "Calculation error · Missing yield coefficient",
        founderLawLocked: true
      },
      {
        id: "sup04",
        title: "Substitution Lock",
        tag: "SUPPLY-004 · Brand Logic",
        signal: "Total ban on unverified market 'equivalents'.",
        meta: [
          { label: "Law", value: "Strict" },
          { label: "Auth", value: "LOGOS Only" },
          { label: "Risk", value: "Consistency" }
        ],
        fullSpec: {
          "Standard": "Every item is selected for a technical reason (e.g., flour protein %).",
          "Substitute": "Only allowed in catastrophic supply failure.",
          "Trial": "1-day small batch trial mandatory before full service use.",
          "Impact": "Must have confirmed same yield and allergen profile."
        },
        method: [
          "Identify supply gap 48h in advance.",
          "Verify technical spec of substitute against original.",
          "Update allergens and method notes if variance found."
        ],
        criticalNote: "Consistency is our product. Substitutions erode product logic.",
        reject: "Generic swaps · Unknown allergen status · Unverified yield",
        founderLawLocked: true
      },
      {
        id: "sup05",
        title: "FIFO / Stock Rotation",
        tag: "SUPPLY-005 · Asset Protection",
        signal: "Money is the ingredient. Do not let money rot.",
        meta: [
          { label: "Freq", value: "Daily" },
          { label: "System", value: "Right-to-Left" },
          { label: "Audit", value: "End of Shift" }
        ],
        fullSpec: {
          "Rule": "First In, First Out. No exceptions.",
          "Labeling": "Date dots + product name + employee ID/Initials.",
          "Organization": "New stock behind old stock. Chilled at sight-line.",
          "Inventory": "Holdings must match par levels — no bulk-buy bloating."
        },
        method: [
          "Verify labels during delivery integration.",
          "Re-arrange shelving before adding new stock.",
          "Consolidate open containers daily."
        ],
        criticalNote: "The bin is where the profit goes. FIFO is the seal.",
        reject: "Unlabeled prep · New on top of old · Expired dates",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "pizzas",
    num: "04",
    name: "Pizzas\nEngine",
    version: "v2.8.1.FS",
    operator: "ASTRA",
    lead: { name: "ASTRA", role: "Ferment Control", color: "#e09040", icon: Flame },
    layers: {
      identity: {
        text: "Dough + Fior di Latte + San Marzano now fully deterministic.",
        pressurePoint: "Cheese Moisture + Tomato Quality"
      },
      executionLaws: [
        { label: "Dough Law", text: "260g ball. 65% Hydration. 44h Cold Ferment." },
        { label: "Supply Law", text: "Dough + Cheese + Tomato = £1.782 locked base cost." }
      ],
      supplyLinks: [
        { item: "Flour", source: "Caputo Blue" },
        { item: "Tomato", source: "San Marzano DOP" }
      ],
      wmm: [
        { label: "Dough", value: "260gball" },
        { label: "Cheese", value: "90g Fior di Latte" }
      ],
      timeLaw: [
        { label: "Ferment", value: "44h Cold" },
        { label: "Bake", value: "60-90 sec @ 450°C" }
      ],
      allergenGate: { critical: ["Gluten", "Dairy"], protocol: "Separate station lock" },
      safeGate: { status: "ACTIVE", requirement: "FDT 23°C Control" },
      forgeValidation: { status: "LIVE", check: "Base spotting" },
      recoveryLinks: [
        { breach: "OVER_PROOF", action: "RESET_BATCH" }
      ],
      gpControl: { margin: "85.7%", status: "HIGH_CARRIER" },
      passRejectSignals: { pass: "Leopard spotting", reject: "Gum line" },
      printCard: { layout: "STATION-PIZZA", operator: "ASTRA" }
    },
    items: [
      {
        id: "z00",
        title: "WMM — Pizza Core Components · Supply Locked v2.5.8",
        tag: "WMM-6 (Test) / WMM-20 (Production Shield)",
        signal: "Dough + Fior di Latte + San Marzano now fully deterministic. The highest-GP engine is sealed.",
        meta: [
          { label: "Margherita Base", value: "£1.782", hi: true },
          { label: "Status", value: "v2.5.8 Locked" }
        ],
        fullSpec: {
          "Dough (260g ball)": "£0.20 locked",
          "Fior di Latte (90g)": "£1.152 locked · Low-moisture · Torn fresh",
          "San Marzano Base (90g)": "£0.43 locked · DOP or equivalent",
          "Total Margherita Cost": "£1.782 locked → 85.7% GP at £12.50",
          "Portion Gate": "All components ±5g at station OR REJECT",
          "Validation": "Test Batch 6: PASS/FAIL | Production 20: PASS/FAIL | Last Verified: [Date]"
        },
        method: [
          "Hobart: Low 4 min → Medium 8 min (total 12 min). FDT 23°C.",
          "Ball & proof 30 min. Cold ferment 44h."
        ],
        criticalNote: "Dough is the GP stabiliser. Flour cost ≤ £0.22/ball is law.",
        reject: "FDT >25°C · Over-proofed · Dry skin · Yield variance >±5g per ball",
        founderLawLocked: true
      },
      {
        id: "z01",
        title: "Margherita",
        tag: "Reference Model · PIZZA ENGINE FULLY SEALED",
        signal: "The system diagnostic. All three core components now deterministic. This margin subsidises the entire menu.",
        meta: [
          { label: "Price", value: "£12.50", hi: true },
          { label: "GP", value: "85.7% locked", hi: true },
          { label: "Cost", value: "£1.782 cost" }
        ],
        fullSpec: {
          "Pizza Engine": "Sealed. Protect flour, cheese and tomato costs at all times.",
          "Dough Lock": "260g ball. Cost: £0.20 (Buffered).",
          "Sauce": "San Marzano (90g max) spiral motion. Cost: £0.43.",
          "Cheese": "Fior di latte (90g) torn pieces. Cost: £1.152."
        },
        method: [
          "Stage dough 30 min. Open by hand — no rollers.",
          "Apply items per 90/90 rule. Launch onto hot stone.",
          "Launch on hot stone. 60-90 sec. Rotate at 45s.",
          "Finish: Fresh basil post-oven. EVOO drizzle."
        ],
        criticalNote: "Pizza Engine sealed. Any variance >5% triggers immediate Supply Engine review. No silent drift allowed.",
        reject: "Wet base · Gum line · Pale crust · Centre flop · Cooked basil",
        founderLawLocked: true
      },
      {
        id: "z02",
        title: "Diavola / Pepperoni",
        tag: "Pizza Station · SUPPLY-LOCKED (FLOUR)",
        signal: "Pepperoni must cup, colour and release oil. Nduja must render and bleed.",
        meta: [
          { label: "Price", value: "£15.00", hi: true },
          { label: "GP", value: "81% (Locked)" },
          { label: "Profit", value: "High Carrier" }
        ],
        fullSpec: {
          "Dough Lock": "£0.20 (Locked).",
          "Build": "90g San Marzano + 90g fior di latte.",
          "Pepperoni": "Slices edge to edge. Must cup and release red oil.",
          "Nduja": "Controlled portions — not blobs. Total render required."
        },
        method: [
          "Open dough per law. Apply sauce and cheese. Distribute meat.",
          "Launch and bake. Pepperoni must cup in oven — rotate at 45s.",
          "Remove when spotted base and rendered meat. Send immediately."
        ],
        criticalNote: "Meat GP is tracked. If pepperoni cost drifts >5%, recalculate immediately.",
        reject: "Flat pale pepperoni · Raw nduja · Wet base · Centre pile",
        founderLawLocked: true
      },
      {
        id: "z03",
        title: "Quattro Formaggi",
        tag: "Pizza Station · SUPPLY-LOCKED (FLOUR)",
        signal: "Four cheeses must each be present to the palate.",
        meta: [
          { label: "Price", value: "£13.00", hi: true },
          { label: "GP", value: "79.5% (Locked)" },
          { label: "Style", value: "Bianca" }
        ],
        fullSpec: {
          "Dough Lock": "£0.20 (Locked).",
          "Cheeses": "Fior di latte + Gorgonzola + Taleggio + Parmesan.",
          "Base": "No red sauce. Olive oil + garlic base only.",
          "Zones": "Distribute in four defined quadrants."
        },
        method: [
          "Open dough. Apply oil/garlic base. Distribute 4 cheeses evenly.",
          "Bake per law. Monitor moisture (soft cheeses release water).",
          "Remove. Light honey drizzle at pass. Slice and send."
        ],
        criticalNote: "Each slice must hold all four cheeses. Quadrant distribution is law.",
        reject: "One-note flavor · Pre-oven honey · Wet base from over-portion",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "burgers",
    num: "03",
    name: "Burgers\nEngine",
    version: "v2.8.1.FS",
    operator: "JEMMA",
    lead: { name: "JEMMA", role: "Field Ops", color: "#8a70e0", icon: Layout },
    layers: {
      identity: {
        text: "A burger is a structural problem. Position determines bite.",
        pressurePoint: "Patty Temp & Stack Order"
      },
      executionLaws: [
        { label: "Protein Law", text: "Standard patty: 230g. Season before grill only." },
        { label: "No-Press Law", text: "Absolute. Pressing expels juices and creates a dry patty." }
      ],
      supplyLinks: [
        { item: "Beef", source: "Chuck & Brisket 80/20" },
        { item: "Bun", source: "Brioche" }
      ],
      wmm: [
        { label: "Patty", value: "230g ±5g" },
        { label: "Cheese", value: "60s cloche melt" }
      ],
      timeLaw: [
        { label: "Cook", value: "5 min per side" },
        { label: "Rest", value: "3 min mandatory" }
      ],
      allergenGate: { critical: ["Gluten", "Dairy", "Mustard"], protocol: "Bun handle isolation" },
      safeGate: { status: "ACTIVE", requirement: "75°C Internal" },
      forgeValidation: { status: "LIVE", check: "Bun toast 'Biscuit' texture" },
      recoveryLinks: [
        { breach: "LOW_PATTY_TEMP", action: "REFIRE_PATTY" }
      ],
      gpControl: { margin: "78.4%", status: "STABLE" },
      passRejectSignals: { pass: "Fired + Rested", reject: "Soggy bun / Raw" },
      printCard: { layout: "STACK-001", operator: "JEMMA" }
    },
    items: [
      {
        id: "b00",
        title: "Burger Mince Lock v1.0",
        tag: "SUPPLY-LCK · Volume Control",
        signal: "Fat ratio and cook-loss shrinkage are the silent profit bleeds.",
        meta: [
          { label: "Fat Ratio", value: "80/20 Locked", hi: true },
          { label: "Shrinkage", value: "18% Max", hi: true },
          { label: "Cost", value: "£1.14 / patty" }
        ],
        fullSpec: {
          "Supplier Spec": "British Chuck & Brisket. Coarse grind. 20% fat content.",
          "Portion Weight": "230g raw weight ±5g lock.",
          "Cook Loss": "Projected 18% loss (188g cooked yield).",
          "GP Verdict": "Brain-calculated at 78.4% (at £16.50 base).",
          "Allergen Gate": "Sulphites in seasoning → PASS."
        },
        method: [
          "Coarse grind per batch.",
          "Hand-press to 230g ±5g.",
          "Chill 4h before service for bind.",
          "Cloche finish with marrow butter."
        ],
        criticalNote: "Weight is truth. Any patty >235g is yield theft. Any patty <225g is a quality breach.",
        reject: "Over 20% fat · Weight out of bounds · Poor bind · Grey mince",
        founderLawLocked: true
      },
      {
        id: "b01",
        title: "Classic 230g Beef Burger",
        tag: "BURGER-001 · Reference Model",
        signal: "The reference model. Every other burger is built against this one.",
        meta: [
          { label: "Price", value: "£18.00", hi: true },
          { label: "Weight", value: "230g Raw" },
          { label: "GP", value: "78.4% (Mince Lock)" }
        ],
        fullSpec: {
          "Internal": "75°C minimum (Pull at 72°C for carryover).",
          "Rest": "3 min mandatory on rack. No paper.",
          "Bun": "Brioche — toasted cut side to 'Biscuit' texture.",
          "Stack": "Base → Sauce → Lettuce → Patty → Pickle → Crown."
        },
        method: [
          "Season patty. Hot clean grill. 5 min undisturbed.",
          "Flip once. Add cheese. Cloche 60 sec steam.",
          "Rest 3 min. Toast bun. Build stack in order.",
          "At pass within 60 sec of assembly completion."
        ],
        criticalNote: "Bun toasting is structural. Untoasted = Soggy Failure.",
        reject: "Below 75°C · Pressed patty · Untoasted bun · Held assembed",
        founderLawLocked: true
      },
      {
        id: "b02",
        title: "New York Pastrami Burger",
        tag: "BURGER-004 · Double Protein",
        signal: "Layered salt and acid build. Heat beef, soft pastrami, melted Swiss.",
        meta: [
          { label: "Price", value: "£17.50", hi: true },
          { label: "Protein", value: "230g + 60g Pastrami" },
          { label: "GP", value: "74.1% (Mince Lock)" }
        ],
        fullSpec: {
          "Pastrami": "60g sliced. Steam 60 sec — must be soft and pliable.",
          "Swiss": "1 slice on patty. Cloche 60 sec for full melt.",
          "Stack": "Base → Mayo → Beef+Swiss → Pastrami → Pickle → Mustard → Crown.",
          "Internal": "75°C minimum beef patty."
        },
        method: [
          "Grill beef 5 min per side. Add Swiss. Cloche 60 sec.",
          "Steam pastrami 60 sec until soft before assembly.",
          "Hard-toast brioche. Build stack in required order. Send in 60s."
        ],
        criticalNote: "Swiss takes longer than American — allow extra cloche time for melt.",
        reject: "Cold pastrami · Unmelted Swiss · Below 75°C beef · Soft bun",
        founderLawLocked: true
      },
      {
        id: "b03",
        title: "Forge Double Stack",
        tag: "BURGER-005 · Speed Protocol",
        signal: "Double mass without service drag. Melted, stacked, hot, stable.",
        meta: [
          { label: "Build", value: "Double 150g", hi: true },
          { label: "Standard", value: "Marrow Melt" },
          { label: "GP", value: "76.5% (Mince Lock)" }
        ],
        fullSpec: {
          "Protein": "2 × 150g patties (Speed Stability Exception).",
          "Cook Time": "3.5–4 min per side. Probe both to 75°C.",
          "Melt": "Marrow butter and cheese between patties. Cloche 60 sec.",
          "Rest": "2 min rest only — speed-protected protocol."
        },
        method: [
          "Grill 2x150g patties. 3.5–4 min per side. Probe to 75°C.",
          "Apply marrow butter and cheese between patties. Cloche 60 sec to fuse.",
          "Brief rest (2 min). Build tight stack. At pass within 60 sec."
        ],
        criticalNote: "Patties must be fused visually. Stack must be tight with no slide.",
        reject: "Below 75°C · Stack slide · Cold marrow butter · Unfused",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "mains",
    num: "02",
    name: "Mains\nEngine",
    version: "v2.8.1.FS",
    operator: "JEMMA",
    lead: { name: "JEMMA", role: "Field Ops", color: "#8a70e0", icon: Flame },
    layers: {
      identity: {
        text: "We execute systems. Temperature is the only truth.",
        pressurePoint: "Doneness Accuracy & Rest Timing"
      },
      executionLaws: [
        { label: "Temp Law", text: "Every main leaves at correct internal temperature. Probe mandatory." },
        { label: "Service Law", text: "Zero live thinking at the pass. Plate → Finish → Send." }
      ],
      supplyLinks: [
        { item: "Steak", source: "35 Day Aged Ribeye" },
        { item: "Fish", source: "Market Fresh" }
      ],
      wmm: [
        { label: "Ribeye", value: "300g ±10g" },
        { label: "Sea Bass", value: "160g ±5g" }
      ],
      timeLaw: [
        { label: "Resting", value: "Steak: 5 min minimum" },
        { label: "Firing", value: "Fish: 4 min total" }
      ],
      allergenGate: { critical: ["Dairy", "Fish", "Gluten"], protocol: "Color-coded boards" },
      safeGate: { status: "READY", requirement: "Calibrated probe" },
      forgeValidation: { status: "ACTIVE", check: "Maillard crust" },
      recoveryLinks: [
        { breach: "OVERCOOK_STEAK", action: "RESET_STATION_CHIEF" }
      ],
      gpControl: { margin: "72%", status: "STABLE" },
      passRejectSignals: { pass: "Probed + Sauced", reject: "Cold centre" },
      printCard: { layout: "STATION-HOT", operator: "JEMMA" }
    },
    items: [
      {
        id: "m01",
        title: "35 Day Aged Ribeye",
        tag: "MAINS-002 · Hero · 300g · Supply-Locked",
        signal: "Consistency over craft butchery. Portion-controlled supply model locked. Perception driver.",
        meta: [
          { label: "Price", value: "£34.00", hi: true },
          { label: "GP", value: "51.5% (locked)" },
          { label: "Cost", value: "£16.50" },
          { label: "Status", value: "P-Controlled" }
        ],
        fullSpec: {
          "Procurement": "300g (±10g) pre-cut, trimmed, vacuum-packed ribeye. Supplier-aged 21–35 days. Portion-controlled model enforced.",
          "Yield": "98–100%. No in-house trim loss. Supplier bears discipline.",
          "Locked Cost": "£16.50 per steak (benchmark). GP 51.5% at £34. Menu adjustment to £41+ for 60%+ GP optional.",
          "Receiving Gate": "Weigh each portion on arrival. Temp <4°C. Ageing certificate + allergen sheet mandatory. Reject variance >±10g.",
          "Control Law": "Protein Procurement Law active. Consistency and reliability over yield maximisation."
        },
        method: [
          "Confirm portion weight upon delivery. Reject variance >±10g.",
          "Sear hard on all surfaces. Do not move during sear.",
          "Probe continuously. Pull 3–4°C early for carryover.",
          "Rest on rack, lightly tented. Slice only after full rest window."
        ],
        criticalNote: "Supply Note: This is now a perception anchor item. Profit carried by high-GP engines (pizza, desserts).",
        reject: "Portion variance · No supplier cert · Temp breach · Yield <97% · GP flag without approval",
        founderLawLocked: true
      },
      {
        id: "m02",
        title: "Chicken Parmigiana",
        tag: "MAINS-001 · Dual WMM + Validation",
        signal: "Stable volume protein. Yield and portion integrity now enforced at receiving. No more silent bleed.",
        meta: [
          { label: "Price", value: "£25.00", hi: true },
          { label: "GP", value: "72% locked" },
          { label: "Cost", value: "£7.00 cost" }
        ],
        fullSpec: {
          "Yield 6 / 20": "AP raw 267g per 200g hammered portion (75% overall after trim + cook loss)",
          "Time Law": "Hammer 2 min. Bread & chill 20 min. Fry 3–4 min/side. Rest 2 min.",
          "Portion Gate": "200g hammered (±10g) at 1cm uniform OR REJECT",
          "Validation": "Test Batch 6: PASS/FAIL | Production 20: PASS/FAIL | Last Verified: [Date]"
        },
        method: [
          "Hammer breast to 1cm uniform. Panko crumb and chill 20 min.",
          "Fry at 180–185°C. Probe: 75°C internal confirmed.",
          "Place 60g tomato base (centred). Add mozzarella.",
          "Flash under broiler 90 sec. Cheese melted and spotted."
        ],
        criticalNote: "WMM dual-scale now locked. Chicken stablises volume across all Hot stations.",
        reject: "Thickness >1cm · Below 75°C · Soggy crumb · Sauce bleed to edge",
        founderLawLocked: true
      },
      {
        id: "m03",
        title: "Pan-Seared Sea Bass",
        tag: "MAINS-005 · Premium · Fish Station",
        signal: "Crisp skin is the hero. One chance. No recovery.",
        meta: [
          { label: "Price", value: "£19.00", hi: true },
          { label: "GP", value: "72% (Locked)" },
          { label: "Yield", value: "~90-95% (Trim)" }
        ],
        fullSpec: {
          "Skin Law": "Pat skin completely dry. Any moisture = fail.",
          "Supply Anchor": "SUPPLY-FSH-001 (Fillet-in supply; pre-filleted).",
          "Yield Law": "Trim loss accounted for: ~90-95% post-trim (edges/bones).",
          "Portion Gate": "160g ±5g skin-on fillet.",
          "Time Law": "3-4 min skin side (90% cook). 30s flesh side flip.",
          "Plating": "Skin side up — never down. Sauce around, not over."
        },
        method: [
          "Pat skin dry. Score lightly. Season flesh side only.",
          "Place skin down in hot pan. Press for 10 sec to prevent curl.",
          "Cook 90% from skin side. Flip for 30 sec total finish.",
          "Plate skin up. Components confirmed hot. Bisque at 75°C."
        ],
        criticalNote: "If skin sticks or tears → discard fillet. Torn skin is unserviceable.",
        reject: "Soft skin · Skin down · Overcooked · Cold bisque",
        founderLawLocked: true
      },
      {
        id: "m04",
        title: "Pie of the Week",
        tag: "MAINS-003 · Pastry Architecture",
        signal: "Pastry structure controls perception. The lid is the first visual pass/fail.",
        meta: [
          { label: "Yield", value: "12–15 portions", hi: true },
          { label: "GP", value: "75.4% (Locked)" },
          { label: "Supply", value: "SUPPLY-PRT-004" }
        ],
        fullSpec: {
          "Filling": "SUPPLY-PRT-004 (Chuck/Brisket). Cook fully and season.",
          "Pastry": "WMM-20 (Shielded). Seal tight. Egg wash for colour.",
          "Time Law": "Bake 45 min at 180°C. Cool 4h before recharge.",
          "Portion Gate": "350g filling + lid OR REJECT"
        },
        method: [
          "Cook and season filling. Cool fully in blast chiller.",
          "Assemble pie. Seal edges tight. Egg wash. Bake to deep golden.",
          "Declare yield on batch card. Confirm allergens before service."
        ],
        criticalNote: "Hot filling into pastry creates steam and ruins structural integrity.",
        reject: "Collapsed or pale lid · Cold filling · Leaking base · Unlabelled",
        founderLawLocked: true
      },
      {
        id: "m05",
        title: "Beef Lasagna",
        tag: "MAINS-004 · Layered System",
        signal: "Layers must hold on the cut. Rest before cutting is law.",
        meta: [
          { label: "Yield", value: "20 portions", hi: true },
          { label: "GP", value: "71.2% (Locked)" },
          { label: "Supply", value: "SUPPLY-PRT-004" }
        ],
        fullSpec: {
          "Supply": "SUPPLY-PRT-004 (Mince). Ragu cooked to split-fat stage.",
          "Layer Law": "WMM-20 Shielded. Min 3 layers. 1.2kg total build weight.",
          "Portion Gate": "320g ±10g square cut per service unit.",
          "Time Law": "20 min rest mandatory before grid-cut."
        },
        method: [
          "Build with even layers. No dry pasta exposed at edges.",
          "Bake covered 35 min. Uncover for final 15 min. Probe 80°C.",
          "Rest 20 min. Hard-grid cut using guide. Portion for service."
        ],
        criticalNote: "If bechamel splits: discard top layer, add fresh, re-bake briefly.",
        reject: "Layer collapse · Watery pool · Below 75°C · Unset top · No rest",
        founderLawLocked: true
      },
      {
        id: "m06",
        title: "Ale-Battered Market Fish",
        tag: "MAINS-006 · Fry Station · Batter Law",
        signal: "Batter must shatter on first bite. Serve within 90 seconds.",
        meta: [
          { label: "Price", value: "£18.00", hi: true },
          { label: "GP", value: "73.8% (Locked)" },
          { label: "Optimum", value: "90s Window" }
        ],
        fullSpec: {
          "Supply": "SUPPLY-FSH-003 (Cod/Haddock). MSC Certified.",
          "Batter": "PREP-004 Ale Batter. ≤4°C. 90 min max shelf life.",
          "Portion Gate": "180g raw → 215g battered (±10g).",
          "Time Law": "4.5 min fry at 180°C. Drain 30s. Send 60s."
        },
        method: [
          "Confirm oil 180°C. Pat fish bone dry.",
          "Dip in cold batter. Lower gently. Fry 4–5 min (pale gold).",
          "Remove to rack. Season immediately. Plate and send in 90s."
        ],
        criticalNote: "If oil drops <170°C, pause orders. Low temp = grease saturated bready batter.",
        reject: "Warmer batter >8°C · Oil <170°C · Held >90s · Paper-drained",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "desserts",
    num: "07",
    name: "Desserts\nEngine",
    version: "v2.8.1.FS",
    operator: "CLAUDIA",
    lead: { name: "CLAUDIA", role: "Technical Engr", color: "#50b890", icon: PieChart },
    layers: {
      identity: {
        text: "The cleanest execution of the night. Margin lives here.",
        pressurePoint: "Texture Lock & Pass Speed"
      },
      executionLaws: [
        { label: "Pass Law", text: "Construction target ≤60 sec. Pass hold 0 sec assembled." },
        { label: "Unit Law", text: "Production in 20 blocks. No single batch drifts." }
      ],
      supplyLinks: [
        { item: "Chocolate", source: "70% Cocoa" },
        { item: "Cream", source: "Double 48% Fat" }
      ],
      wmm: [
        { label: "STP", value: "Production Batch 20" },
        { label: "Tiramisu", value: "12h minimum set" }
      ],
      timeLaw: [
        { label: "Assembly", value: "Max 60s" },
        { label: "Reheat", value: "45s Microwave pulse" }
      ],
      allergenGate: { critical: ["Nut", "Dairy", "Egg"], protocol: "Pastry clean-down lock" },
      safeGate: { status: "STABLE", requirement: "Bain-marie control" },
      forgeValidation: { status: "ACTIVE", check: "Texture contrast" },
      recoveryLinks: [
        { breach: "UNSET_POSSET", action: "REVERT_TO_CRUMBLE" }
      ],
      gpControl: { margin: "76%", status: "PROFIT_ENGINE" },
      passRejectSignals: { pass: "Cold/Hot contrast", reject: "Soft crumble" },
      printCard: { layout: "STATION-PASTRY", operator: "CLAUDIA" }
    },
    items: [
      {
        id: "e01",
        title: "Sticky Toffee Pudding",
        tag: "DESSERT-001 · Dual WMM + Validation",
        signal: "Sauce temperature is the entire experience.",
        meta: [
          { label: "Yield", value: "Dual Scale", hi: true },
          { label: "Price", value: "£7.50" },
          { label: "GP", value: "76%" }
        ],
        fullSpec: {
          "WMM-6 (Test)": "150g dates | 180ml water | 3g bicarb | 75g butter | 90g sugar | 1.5 eggs | 105g SR flour + sauce",
          "WMM-20 (Shield)": "500g dates | 600ml water | 10g bicarb | 250g butter | 300g sugar | 5 eggs | 350g SR flour",
          "Time Law": "Prep 20 min. Bake 160°C fan 35–40 min. Cool 1h. Reheat 40-45s.",
          "Portion Gate": "Square grid cut uniform (±5g) OR REJECT",
          "Validation": "Test Batch 6: PASS/FAIL | Production 20: PASS/FAIL | Last Verified: [Date]"
        },
        method: [
          "Bake in lined tray. Cool fully. Hard-grid cut.",
          "Reheat portion: probe 65°C centre.",
          "Pour warm sauce. Add pecan crumb + cream. Send immediate."
        ],
        criticalNote: "Sauce mass is the experience. Scorched sauce = discard.",
        reject: "Dry sponge · Split sauce · Missing pecan crumb · Cold centre",
        founderLawLocked: true
      },
      {
        id: "e02",
        title: "Lemon Posset",
        tag: "DESSERT-002 · Margin",
        signal: "85°C — not boiling. Acid sets the cream.",
        meta: [
          { label: "GP", value: "81%", hi: true },
          { label: "Set Time", value: "4h min" }
        ],
        fullSpec: {
          "Heat Law": "Heat cream/sugar to exactly 85°C. No boil.",
          "Texture": "Shortbread crumb — mandatory texture lock.",
          "Zest": "Lemon zest at pass only. No pre-zest."
        },
        method: [
          "Heat to 85°C. Remove. Add juice. Stir once.",
          "Pour into chilled vessels. Chill 4h+ (12h peak).",
          "Add crumb + zest at pass. Send cold."
        ],
        criticalNote: "Grainy means boil law broken. Discard entire batch.",
        reject: "Grainy · Under-set · Pre-crumbed · No zest",
        founderLawLocked: true
      },
      {
        id: "e03",
        title: "Tiramisu",
        tag: "DESSERT-003 · Perception Dish",
        signal: "Bitterness, fat, and structure. Cacao nibs are texture lock.",
        meta: [
          { label: "Set Time", value: "12h minimum", hi: true },
          { label: "GP", value: "76.8% (Locked)" },
          { label: "Ref", value: "20 slices" }
        ],
        fullSpec: {
          "WMM-20": "Mascarpone + yolks + cream (soft peak). Fold only.",
          "Supply": "SUPPLY-DRY-009 (Savoiardi). SUPPLY-DRY-012 (Coffee).",
          "Portion Gate": "140g per slice (±5g) squared.",
          "Time Law": "12h minimum set before grid-cut."
        },
        method: [
          "Build cream at 4°C. Quick-dip biscuits. Layer twice.",
          "Chill 12h minimum. Hard-grid cut into 20.",
          "Cocoa dust and nibs at pass only. Clean wipe knife between cuts."
        ],
        criticalNote: "If it collapses on cut: under-set or over-soaked biscuits. Discard.",
        reject: "Collapse · Over-soaked · Loose cream · Missing nibs",
        founderLawLocked: true
      },
      {
        id: "e04",
        title: "Apple & Berry Crumble",
        tag: "DESSERT-005 · Separation System",
        signal: "Fruit and dry crumble remain separate until the send.",
        meta: [
          { label: "Hold", value: "0s Assembled", hi: true },
          { label: "GP", value: "79.2% (Locked)" },
          { label: "Portions", value: "20 units" }
        ],
        fullSpec: {
          "Supply": "SUPPLY-GRN-015 (Apples). SUPPLY-DRY-002 (Oats).",
          "WMM-20": "Crumble rubbed coarse, baked separately. WMM-20 Locked.",
          "Portion Gate": "180g fruit + 60g crumble + 50ml custard.",
          "Time Law": "Fruit reheat 90s. Send 60s assembly."
        },
        method: [
          "Cook fruit and bake crumble separately. Hold separately.",
          "At order: reheat fruit until bubbling. Add crumble immediately.",
          "Send within 60s of reheat. No assembled hold window."
        ],
        criticalNote: "Texture contrast is the point. Soggy crumble = system failure.",
        reject: "Soggy crumble · Fruit mush · Pre-assembled · Mixed",
        founderLawLocked: true
      },
      {
        id: "e05",
        title: "Flourless Chocolate Cake",
        tag: "DESSERT-007 · Tort Wildcard",
        signal: "Richness controlled through salt and praline texture.",
        meta: [
          { label: "Exception", value: "12 Portions", hi: true },
          { label: "Texture", value: "Praline Crunch" },
          { label: "GP", value: "73%" }
        ],
        fullSpec: {
          "Chocolate": "Melt over bain-marie. Temper to 40°C.",
          "Aeration": "Minimal egg whisking. Dense tort, not cakey.",
          "Bake": "150°C bain-marie. Centre wobble feature.",
          "Finish": "Sea salt flakes and praline crunch mandatory."
        },
        method: [
          "Melt chocolate/butter. Add lightly whisked eggs/sugar.",
          "Bake in water bath 25-35 min until slight wobble. Cool in tin.",
          "Hard-grid cut 12. Plate with salt and praline at pass."
        ],
        criticalNote: "Wobble at pull is expected. Overbaked tort is dry and ruined.",
        reject: "Slice collapse · Raw centre · cakey texture · Missing salt",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "ice-cream",
    num: "08",
    name: "Ice Cream\nEngine",
    version: "v2.8.1.FS",
    operator: "LUNA",
    lead: { name: "LUNA", role: "Cold Form", color: "#60c8b0", icon: Snowflake },
    layers: {
      identity: {
        text: "Ice cream is frozen margin. Air, temperature, and scoop weight.",
        pressurePoint: "Overrun · Scoop Weight · Freezer Law"
      },
      executionLaws: [
        { label: "Overrun Law", text: "Target 15–25%. >30% = reject batch (watery)." },
        { label: "Freezer Law", text: "-18°C core hold. Service temper -12 to -14°C." }
      ],
      supplyLinks: [
        { item: "Cream", source: "DAIRY-014" },
        { item: "Milk", source: "DAIRY-008" }
      ],
      wmm: [
        { label: "Scoop", value: "80g ±5g" },
        { label: "Batch", value: "20 units" }
      ],
      timeLaw: [
        { label: "Churn", value: "25-40 min" },
        { label: "Mature", value: "4-12h" }
      ],
      allergenGate: { critical: ["Dairy", "Eggs"], protocol: "Cold station isolation" },
      safeGate: { status: "ACTIVE", requirement: "Core temp -18°C" },
      forgeValidation: { status: "ACTIVE", check: "Overrun measured" },
      recoveryLinks: [
        { breach: "ICE_CRYSTALS", action: "RE-CHURN_IF_SAFE" }
      ],
      gpControl: { margin: "88%", status: "PROFIT_LOCK" },
      passRejectSignals: { pass: "Levelled scoop", reject: "Ice crystals" },
      printCard: { layout: "STATION-FREEZER", operator: "LUNA" }
    },
    items: [
      {
        id: "ice01",
        title: "Vanilla Custard Base",
        tag: "ICE-001 · Foundation · Dual WMM",
        signal: "Precision Cold · Yield & Overrun Control",
        meta: [
          { label: "Yield", value: "20 × 80g portions", hi: true },
          { label: "Overrun", value: "15–25%", hi: true },
          { label: "Cost", value: "£0.52 per scoop" }
        ],
        fullSpec: {
          "WMM-6 (Test)": "360ml double cream | 240ml whole milk | 120g caster sugar | 6 egg yolks (~120g) | 8g vanilla paste | 1g salt",
          "WMM-20 (Shield)": "1.2L double cream | 800ml whole milk | 400g caster sugar | 20 egg yolks (~400g) | 25g vanilla paste | 3g salt",
          "Supply Link": "SUPPLY-DAIRY-014 (Double cream) + SUPPLY-DAIRY-008 (Whole milk) + SUPPLY-EGG-003",
          "Time Law": "Infuse 20 min · Temper 8 min · Cook to 82–84°C · Rapid chill ≤90 min · Mature 4–12h · Churn 25–40 min",
          "Overrun Law": "Target 15–25%. Weigh before/after churn. >30% or <10% = reject.",
          "Portion Gate": "80g ±5g per levelled scoop OR REJECT at service",
          "Freezer Law": "-18°C core hold. Service temper -12 to -14°C. Max 4h display window.",
          "FORGE Validation": "Test Batch 6: PASS/FAIL | Production 20: PASS/FAIL | Last Verified: [Date] | Overrun measured"
        },
        method: [
          "Infuse milk/cream with vanilla. Temper yolks/sugar.",
          "Cook to 82–84°C (Custard base). Do not boil.",
          "Rapid chill (≤90 min) and mature for 4–12h at 4°C.",
          "Churn per machine cycle and pack into chilled tubs."
        ],
        criticalNote: "Over-scooping and melt/refreeze are silent GP killers. Levelled scoops only. No returning melted product to freezer.",
        reject: "Overrun >30% or <10% · Scoop outside 75–85g · Curdled base · Ice crystals · Melt/refreeze · Freezer >-16°C",
        founderLawLocked: true
      },
      {
        id: "ice02",
        title: "Ice Cream Service Protocol",
        tag: "ICE-SRV · All Desserts",
        signal: "Consistency at the point of impact.",
        meta: [
          { label: "Scoop Gate", value: "80g ±5g" }
        ],
        fullSpec: {
          "Scoop Gate": "80g ±5g levelled. Warm dipper between scoops. No heaping.",
          "Melt Window": "Maximum 4h in display case. Any longer = discard tub.",
          "Pairing Law": "Sticky Toffee: full 80g scoop + pecan. Posset: 40g side. Tiramisu: optional."
        },
        criticalNote: "Weight is truth. Volume is illusion.",
        reject: "Under-weight · Soft texture · Dirty dipper · Heaped scoop",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "prep",
    num: "01",
    name: "Prep Engine\n& Saucier",
    version: "v2.8.1.FS",
    operator: "NATALIA",
    lead: { name: "NATALIA", role: "Logistics", color: "#c86090", icon: Shield },
    layers: {
      identity: {
        text: "The kitchen begins in the stock pot and the fat lifecycle.",
        pressurePoint: "Reduction Law & Cold Chain"
      },
      executionLaws: [
        { label: "Reduction Law", text: "No high-heat reduction. No side-wall scorching." },
        { label: "Acid Law", text: "Dressings: 3:1 fat-to-acid ratio baseline." }
      ],
      supplyLinks: [
        { item: "Bones", source: "Roast Beef Bones" },
        { item: "Oil", source: "Rapeseed cold pressed" }
      ],
      wmm: [
        { label: "Mayo", value: "Gram-locked variants" },
        { label: "Gravy", value: "20 portion equiv" }
      ],
      timeLaw: [
        { label: "Sauce", value: "4-6h Simmer" },
        { label: "Pickle", value: "2h min set" }
      ],
      allergenGate: { critical: ["Celery", "Mustard", "Sulphites"], protocol: "Batch label lock" },
      safeGate: { status: "ACTIVE", requirement: "Hot hold 75°C+" },
      forgeValidation: { status: "ACTIVE", check: "Emulsion stability" },
      recoveryLinks: [
        { breach: "SPLIT_EMULSION", action: "REBUILD_BATCH" }
      ],
      gpControl: { margin: "74%", status: "STABLE" },
      passRejectSignals: { pass: "Integrated + Seasoned", reject: "Scorched / Split" },
      printCard: { layout: "STATION-PREP", operator: "NATALIA" }
    },
    items: [
      {
        id: "p01",
        title: "Bone Reduction / Gravy Base",
        tag: "PREP-001 · Sauce Base · All Engines",
        signal: "Liquid foundation of the kitchen. Heat extracts — it must not punish. The base is only as good as the patience behind it.",
        meta: [
          { label: "Category", value: "Foundation", hi: true },
          { label: "Yield", value: "20 unit equiv." },
          { label: "Scaling", value: "Batch dependent" }
        ],
        fullSpec: {
          "Bones": "Batch dependent — weigh before roast. Roast to deep colour, never burnt.",
          "Mirepoix": "Celery, carrot, onion — caramelise after bones. No raw mirepoix into liquid.",
          "Liquid": "Stock / water to cover. Optional wine deglaze — clean alcohol off.",
          "Reduction": "Gentle reduce under Reduction Law. No rolling boil. Skim surface fat.",
          "Pass Signal": "Glossy, clean, savoury, integrated. Coats the back of a spoon."
        },
        method: [
          "Roast bones in hot oven until deep mahogany — not black.",
          "Add mirepoix to roasting tray. Caramelise. Deglaze cleanly.",
          "Transfer to stockpot. Cover with cold stock. Light simmer — no boil.",
          "Skim surface every 20 min. Simmer 4–6h. Strain through fine chinois.",
          "Reduce gently under Reduction Law. Chill over ice bath. Label with date."
        ],
        criticalNote: "Recovery Law: If base splits or goes cloudy through aggressive boil — discard and rebuild.",
        reject: "Burnt reduction · Sour stock · Rolling boil · Split fat · Cloudy",
        founderLawLocked: true
      },
      {
        id: "p02",
        title: "Sunday Gravy Layer",
        tag: "PREP-002 · Sauce Finish · Mains Support",
        signal: "Sunday plate unifier. Gravy supports the roast — it must not drown the plate.",
        meta: [
          { label: "Target", value: "20 portions", hi: true },
          { label: "Storage", value: "Hot bain hold" },
          { label: "Finish", value: "Nappe only" }
        ],
        fullSpec: {
          "Base": "Bone reduction (PREP-001) + roasting juices.",
          "Fat Skim": "Skim fat where required. No greasy surface at service.",
          "Viscosity": "Thicken to nappe only — not glue. Coats spoon lightly.",
          "Hold": "Hot bain-marie at 75°C+. Gentle heat only.",
          "Service": "Ladle to order. Gravy poured at pass — never pre-poured."
        },
        method: [
          "Start from warm bone reduction. Add roasting juices. Skim surface fat.",
          "Bring to nappe consistency through gentle reduction or roux addition.",
          "Season. Transfer to bain-marie. Hold at 75°C+. Check every 30 min."
        ],
        criticalNote: "If gravy reduces too far — add small amount of warm stock to loosen.",
        reject: "Greasy split surface · Bitter or burnt · Lumpy · Glue texture",
        founderLawLocked: true
      },
      {
        id: "p03",
        title: "Marrow Butter",
        tag: "PREP-003 · Fat Transformation",
        signal: "One-way transformation. Marrow becomes butter — not waste.",
        meta: [
          { label: "Strategy", value: "Fat Lifecycle", hi: true },
          { label: "Yield", value: "20 portions" },
          { label: "Sync Temp", value: "20–24°C" }
        ],
        fullSpec: {
          "Marrow": "Roast gently until soft. No colour — remains pale.",
          "Cooling Law": "Cool rendered marrow to exactly 20–24°C before sync.",
          "Butter": "Unsalted butter at room temperature (20–22°C).",
          "Portion": "Roll in clingfilm to uniform log. Portion into defined discs."
        },
        method: [
          "Render marrow gently. Cool to 20–24°C — probe to confirm.",
          "Beat softened butter to smooth. Add cooled marrow gradually.",
          "Season. Roll tight. Chill until firm. Portion on pre-marked grid."
        ],
        criticalNote: "Thermal Sync is the only gate. Above 25°C = butter melts and emulsion fails.",
        reject: "Split fat · Greasy pool · Sour note · Loose texture · Freehand cut",
        founderLawLocked: true
      },
      {
        id: "p04",
        title: "Ale Batter",
        tag: "PREP-004 · Fryer Support · Cold Chain",
        signal: "Shatter without heaviness. Cold + minimal whisk = crisp.",
        meta: [
          { label: "Volume", value: "2.5L batches", hi: true },
          { label: "Optimum", value: "90 min window" },
          { label: "Cutoff", value: "2h hard lock" }
        ],
        fullSpec: {
          "Ratio": "1 part flour : 1.5 parts ale or cold liquid.",
          "Liquid Temp": "Ale or liquid must be ≤4°C before mixing.",
          "Mixing Law": "Mix minimally — shaggy, not smooth. Lumps are acceptable.",
          "Time Law": "90 min optimal window. 2h hard cutoff. Discard after 2h."
        },
        method: [
          "Chill ale to ≤4°C. Weigh flour into cold bowl.",
          "Pour cold liquid in. Stir minimally with fork — stop when just combined.",
          "Return to fridge immediately. Time-stamp the bowl.",
          "Service: dip product in cold batter straight from fridge. Fry at 180°C."
        ],
        criticalNote: "Warm batter (>8°C) = greasy, bread-like coating. Discard.",
        reject: "Warm batter >8°C · Over-whisked · Past 2h cutoff · Bready",
        founderLawLocked: true
      },
      {
        id: "p05",
        title: "House Mayo & Relish Suite",
        tag: "PREP-005 · 5 Variants · Gram-Lock",
        signal: "Sauce identity controls menu perception. No unmeasured sauce drift. Every variant is a gram-locked formula — not a feel.",
        meta: [
          { label: "Variants", value: "5 Types", hi: true },
          { label: "Batch", value: "20 portions each" },
          { label: "Window", value: "48h Chilled" }
        ],
        fullSpec: {
          "Base": "Supplier mayo base — gram-locked.",
          "Method": "Weigh base by grams. Add flavouring by grams.",
          "Labelling": "Variant name, date, use-by (48h), allergen.",
          "Portioning": "Defined volume portion ramekins/bottles.",
          "Hold": "Chilled at ≤4°C. 48h hard window."
        },
        method: [
          "Weigh mayo base. Add flavouring agent by grams per variant card.",
          "Blend smooth or fold to spec. Taste — confirm against reference.",
          "Portion into labelled service containers. Refrigerate immediately."
        ],
        criticalNote: "Sauce GP is locked. If base supplier changes, re-cost before service.",
        reject: "Split emulsion · Unmeasured additions · Unlabelled · Past 48h",
        founderLawLocked: true
      },
      {
        id: "p06",
        title: "Red Onion Pickle",
        tag: "PREP-006 · Acid Stabiliser",
        signal: "Bright pink, crisp bite, balanced acid/sweet.",
        meta: [
          { label: "Yield", value: "20 portions", hi: true },
          { label: "Shelf", value: "72h Chilled" },
          { label: "Agent", value: "NATALIA" }
        ],
        fullSpec: {
          "WMM": "Red onion 1kg (thin slice), Red wine vinegar 500ml, Sugar 120g, Salt 15g, Water 250ml",
          "Time Law": "Heat liquor 5 min → pour over onions → cool → 2h minimum set.",
          "Identity": "Acid control stabiliser. Cuts fat across system."
        },
        method: [
          "Heat liquor components until sugar/salt dissolved.",
          "Pour hot liquor over thin-sliced onions.",
          "Cool at room temp before refrigerating.",
          "Allow 2h minimum for color and flavor development."
        ],
        criticalNote: "Grey onion or soft texture indicates failure in timing or temperature.",
        reject: "Grey onion · Soft texture · Harsh vinegar spike",
        founderLawLocked: true
      },
      {
        id: "p07",
        title: "Burger Relish (System Lock)",
        tag: "PREP-007 · Burger Identity",
        signal: "Chunky, balanced, not watery.",
        meta: [
          { label: "Yield", value: "20 portions", hi: true },
          { label: "Shelf", value: "48h Chilled" }
        ],
        fullSpec: {
          "WMM": "Gherkins 400g, Onion 200g, Ketchup 250g, Mustard 50g, Sugar 40g, Vinegar 60ml",
          "Time Law": "Chop fine → mix → 30 min rest.",
          "Identity": "Acid + sugar + crunch. Burger identity layer."
        },
        method: [
          "Chop gherkins and onions to uniform fine dice.",
          "Combine with wet ingredients and sugar.",
          "Allow flavors to marry for 30 mins before service.",
          "Check consistency — must hold its shape."
        ],
        criticalNote: "Mustard allergen must be declared if used in variant.",
        reject: "Split · Over-liquid · Dull flavour",
        founderLawLocked: true
      },
      {
        id: "p08",
        title: "Pizza Tomato Base (Locked)",
        tag: "PREP-008 · Pizza Anchor",
        signal: "Bright red, fresh acidity, loose texture.",
        meta: [
          { label: "Yield", value: "20 pizzas", hi: true },
          { label: "Shelf", value: "48h Chilled" },
          { label: "Agent", value: "ASTRA" }
        ],
        fullSpec: {
          "WMM": "San Marzano 2kg, Salt 20g, Olive oil 40ml",
          "Rules": "Hand crush only. NO cooking.",
          "Identity": "This is the pizza engine’s second anchor after dough."
        },
        method: [
          "Crush San Marzano tomatoes by hand or food mill (no high speed).",
          "Season with salt and olive oil.",
          "Refrigerate immediately.",
          "Check for freshness daily."
        ],
        criticalNote: "Cooking the sauce destroys the Neapolitan profile. Purest form only.",
        reject: "Cooked taste · Thick paste · Oxidised colour",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "starters",
    num: "02",
    name: "Starters\nEngine",
    version: "v2.8.1.FS",
    operator: "CLARA",
    lead: { name: "CLARA", role: "Section Lead", color: "#4090e0", icon: Zap },
    layers: {
      identity: {
        text: "The first plate defines the entire service trajectory.",
        pressurePoint: "Service Pacing & Flow"
      },
      executionLaws: [
        { label: "Entry Law", text: "No starter leaves without allergen validation." },
        { label: "Sync Law", text: "Clear within 6–8 min or HOLD ticket." }
      ],
      supplyLinks: [
        { item: "Squid", source: "Coast-Direct" },
        { item: "Livers", source: "Farm-Fresh" }
      ],
      wmm: [
        { label: "Squid", value: "120g portion" },
        { label: "Soup", value: "250ml ladle" }
      ],
      timeLaw: [
        { label: "Assembly", value: "2 min max" },
        { label: "Fry", value: "90s peak" }
      ],
      allergenGate: { critical: ["Shellfish", "Gluten", "Dairy"], protocol: "Waitron-Chef double check" },
      safeGate: { status: "ACTIVE", requirement: "Fryer 180°C recovery" },
      forgeValidation: { status: "ACTIVE", check: "Visual drift zero" },
      recoveryLinks: [
        { breach: "LATE_STARTER", action: "PRIORITIZE_STATION" }
      ],
      gpControl: { margin: "78%", status: "STABLE" },
      passRejectSignals: { pass: "Clean plate edge", reject: "Cold / Smeared" },
      printCard: { layout: "STATION-LARDER", operator: "NATALIA" }
    },
    items: [
      {
        id: "st01",
        title: "Tomato & Basil Bruschetta",
        tag: "STARTER-001 · Fast Acid",
        signal: "Crisp base, fresh top. System warm-up.",
        meta: [
          { label: "Yield", value: "20 portions", hi: true },
          { label: "Agent", value: "NATALIA" }
        ],
        fullSpec: {
          "WMM": "Sourdough, Tomato 2kg, Basil, Olive oil.",
          "Rules": "Toast 2 min. Tomato maceration 15 min.",
          "Identity": "Fast acid entry. System warm-up."
        },
        method: [
          "Slice sourdough to 15mm uniform thickness.",
          "Rub with garlic and toast to heavy crunch.",
          "Top with macerated tomatoes and fresh hand-torn basil.",
          "Finish with cold-press olive oil."
        ],
        criticalNote: "Soggy bread indicates premature plating or failed toast depth.",
        reject: "Soggy bread · Cold toast · Under-macerated",
        founderLawLocked: true
      },
      {
        id: "st02",
        title: "Chicken Liver Parfait",
        tag: "STARTER-002 · Cold Precision",
        signal: "Smooth, rich, clean slice. Fat control.",
        meta: [
          { label: "Shelf", value: "48h", hi: true },
          { label: "Agent", value: "CLAUDIA" }
        ],
        fullSpec: {
          "WMM": "Chicken liver 1kg, Butter 400g, Shallot, Brandy.",
          "Rules": "Blend warm -> set 12h.",
          "Identity": "Cold precision. Fat control."
        },
        method: [
          "Clean livers of all sinew (mandatory).",
          "Sweat aromatics and flambe with brandy.",
          "Emulsify with warm butter in high-speed blender.",
          "Pass through chinois and set in molds under wax seal."
        ],
        criticalNote: "Grainy texture or split fat indicates failed emulsion temp.",
        reject: "Grainy · Split fat · Discoloured edges",
        founderLawLocked: true
      },
      {
        id: "st03",
        title: "Crispy Squid (Fryer Test)",
        tag: "STARTER-003 · Pressure Point",
        signal: "Light crisp, white interior. First pressure point.",
        meta: [
          { label: "Temp", value: "180°C", hi: true },
          { label: "Agent", value: "JEMMA" }
        ],
        fullSpec: {
          "Coating": "Seasoned flour / starch mix.",
          "Time Law": "Fry 180°C -> 90 seconds max.",
          "Identity": "Fryer test. If oil temp <170°C -> AUTO PAUSE."
        },
        method: [
          "Clean and score squid for maximum surface area.",
          "Dredge in seasoned flour immediately before frying.",
          "Flash fry at high heat for 90 seconds.",
          "Drain and season at basket. Send in 30s."
        ],
        criticalNote: "Rubbery or greasy squid means oil recovery failed. Check temp.",
        reject: "Rubber · Greasy · Pale · Over-cooked",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "sides",
    num: "06",
    name: "Sides\nEngine",
    version: "v2.8.1.FS",
    operator: "VITO",
    lead: { name: "VITO", role: "Volume Support", color: "#e04040", icon: Layers },
    layers: {
      identity: {
        text: "Sides are the margin engine and the plate unifier.",
        pressurePoint: "Heat Maintenance & Portion Lock"
      },
      executionLaws: [
        { label: "Portion Law", text: "Exact gram-locked portioning. No freehand scoops." },
        { label: "Heat Law", text: "Sides must arrive hot. Minimum 65°C." }
      ],
      supplyLinks: [
        { item: "Potatoes", source: "Farm-Select" },
        { item: "Greens", source: "Garden-Link" }
      ],
      wmm: [
        { label: "Chips", value: "250g portion" },
        { label: "Slaw", value: "120g portion" }
      ],
      timeLaw: [
        { label: "Assembly", value: "30s" },
        { label: "Heat sync", value: "Concurrent with Mains" }
      ],
      allergenGate: { critical: ["Dairy", "Gluten"], protocol: "Standard Check" },
      safeGate: { status: "ACTIVE", requirement: "Hot hold protocol" },
      forgeValidation: { status: "ACTIVE", check: "Portion accuracy" },
      recoveryLinks: [
        { breach: "SIDE_MISSING", action: "FAST_PASS_PRIORITY" }
      ],
      gpControl: { margin: "82%", status: "STABLE" },
      passRejectSignals: { pass: "Steam rising", reject: "Cold / Small portion" },
      printCard: { layout: "STATION-SIDES", operator: "MARCO" }
    },
    items: [
      {
        id: "side01",
        title: "Roast Potatoes",
        tag: "SIDE-001 · Sunday Anchor",
        signal: "Glass-crunch skin, fluffy interior.",
        meta: [
          { label: "Status", value: "LOCKED", hi: true },
          { label: "Heat", value: "High" }
        ],
        fullSpec: {
          "Method": "Par-boil -> Ruff -> Roast in Beef Dripping.",
          "Time": "60 min roast."
        },
        method: [
          "Bicarb par-boil until shaggy.",
          "Shake for maximum surface area fluff.",
          "Roast in hot fat at 200°C."
        ],
        criticalNote: "Must have 'glass-crunch' surface. No steam-trapping.",
        reject: "Soggy · Pale · Cold",
        founderLawLocked: true
      },
      {
        id: "side02",
        title: "Seasonal Slaw",
        tag: "SIDE-002 · Crisp Acid",
        signal: "Crunchy, fresh, balanced acid.",
        meta: [
          { label: "Scale", value: "Batch", hi: true }
        ],
        fullSpec: {
          "Method": "Fine shred -> 3:1 Mayo:Acid fold."
        },
        method: [
          "Shred cabbage, carrot, onion fine.",
          "Fold in locked dressing spec.",
          "Chill 1h before service."
        ],
        criticalNote: "Dress to order or 1h max before to prevent water release.",
        reject: "Watery · Saturated · Dull",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "sunday",
    num: "09",
    name: "Sunday Roast\nEngine",
    version: "v2.8.1.FS",
    operator: "HELIOS",
    lead: { name: "HELIOS", role: "Sun Engine", color: "#fbb140", icon: SunMedium },
    layers: {
      identity: {
        text: "Sunday is an industrial ritual of heat and timing.",
        pressurePoint: "Peak Load @ 14:00 (The Wall)"
      },
      executionLaws: [
        { label: "Prep Law", text: "Zero prep during service." },
        { label: "Heat Law", text: "Plates must be scalding." }
      ],
      supplyLinks: [
        { item: "Beef", source: "Aged-Select" },
        { item: "Potatoes", source: "Maris-Piper-Anchor" }
      ],
      wmm: [
        { label: "Beef", value: "200g portion" },
        { label: "Yorkshire", value: "4-inch min" }
      ],
      timeLaw: [
        { label: "Roast", value: "High-heat surge" },
        { label: "Rest", value: "20 min min" }
      ],
      allergenGate: { critical: ["Gluten", "Dairy"], protocol: "Sunday Shield" },
      safeGate: { status: "ACTIVE", requirement: "Internal beef 52°C Rare" },
      forgeValidation: { status: "ACTIVE", check: "Texture consistency" },
      recoveryLinks: [
        { breach: "YORKSHIRE_FAIL", action: "REFIRE_BATCH" }
      ],
      gpControl: { margin: "72%", status: "VOLUME_DEPENDENT" },
      passRejectSignals: { pass: "Steam rising + Glossy gravy", reject: "Cold / Flat Yorkie" },
      printCard: { layout: "STATION-ROAST", operator: "HELIOS" }
    },
    items: [
      {
        id: "sun01",
        title: "The Ultimate Roast Potatoes",
        tag: "STATION: ROAST · Volume: High",
        signal: "Glass-Crunch Gold",
        meta: [
          { label: "Status", value: "Live v1", hi: true },
          { label: "Texture", value: "Fluffed" }
        ],
        fullSpec: {
          "Variety": "Maris Piper (High Starch)",
          "Prep": "Peel, quarter, par-boil in salted water with pinch of bicarb until edges are 'shaggy'.",
          "Fat": "Beef Dripping (Deep flavour) or Vegetable Oil (Crispy shell).",
          "Roast": "Pre-heated trays @ 200°C. 45-60 mins. Turn every 15 mins.",
          "Finish": "Maldon salt + Rosemary (Fresh)"
        },
        method: [
          "Steam dry for 10 mins post-drain to maximize crunch.",
          "Shake aggressively in colander to fluff the surface.",
          "Roast until auditory 'glass-crunch' is achieved.",
          "Hold in dry-heat cupboard, never covered (will go soft)."
        ],
        criticalNote: "Oil must be shimmering before potatoes enter tray.",
        reject: "Soft skin · Pale colour · Gray/Waxy center",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "allergen",
    num: "11",
    name: "Allergen\nEngine",
    version: "v2.8.1.FS",
    operator: "SAFE",
    lead: { name: "LOGOS", role: "Compliance", color: "#a3854d", icon: ShieldCheck },
    layers: {
      identity: {
        text: "No supplier declaration = no service.",
        pressurePoint: "Missing Spec Sheet = BLOCKED"
      },
      executionLaws: [
        { label: "Supplier Gate", text: "Every item must have a spec sheet." },
        { label: "Substitution Law", text: "Substitutions trigger full re-check." }
      ],
      supplyLinks: [
        { item: "Data", source: "Logos Vault" }
      ],
      wmm: [
        { label: "Audit", value: "Daily check" }
      ],
      timeLaw: [
        { label: "Briefing", value: "Pre-service" }
      ],
      allergenGate: { critical: ["ALLERGEN SHIELD ACTIVE"], protocol: "Binary Block" },
      safeGate: { status: "ACTIVE", requirement: "Digital sign-off" },
      forgeValidation: { status: "ACTIVE", check: "Label vs Spec" },
      recoveryLinks: [
        { breach: "MISSING_SPEC", action: "BLOCK_ITEM" }
      ],
      gpControl: { margin: "N/A", status: "COMPLIANCE" },
      passRejectSignals: { pass: "Verified Label", reject: "No Documentation" },
      printCard: { layout: "STATION-OFFICE", operator: "LOGOS" }
    },
    items: [
      {
        id: "all01",
        title: "Allergen Enforcement Protocol",
        tag: "SUPPLY-LCK · All Items",
        signal: "Supplier Declaration Gate",
        meta: [
          { label: "Status", value: "Locked v1.0", hi: true },
          { label: "Audit", value: "Goods-In Gate" }
        ],
        fullSpec: {
          "Rule": "Every incoming ingredient must have current supplier allergen spec sheet attached.",
          "Status Fields": "CONFIRMED | PENDING AUDIT | BLOCKED"
        },
        method: [
          "Check supplier spec folder against daily delivery.",
          "Cross-reference every ingredient.",
          "Flag missing declarations."
        ],
        criticalNote: "No supplier declaration = no service.",
        reject: "Missing Spec Sheet · Unverified Sub",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "forge-brain",
    num: "10",
    name: "FORGE\nBrain",
    version: "v2.8.0.RECOVERY",
    operator: "CORE",
    lead: { name: "CORE", role: "Strategic Lead", color: "#ffffff", icon: ShieldCheck },
    layers: {
      identity: {
        text: "The Brain evaluates, predicts, and protects.",
        pressurePoint: "Drift Prediction"
      },
      executionLaws: [
        { label: "Completeness", text: "Recipe Card Audit mandatory." },
        { label: "GP Monitor", text: "Recalculate on price shift." }
      ],
      supplyLinks: [
        { item: "Intelligence", source: "System-Wide" }
      ],
      wmm: [
        { label: "Integrity", value: "% Score" }
      ],
      timeLaw: [
        { label: "Decision", value: "<100ms" }
      ],
      allergenGate: { critical: ["DATA_MISSING"], protocol: "System Pause" },
      safeGate: { status: "ACTIVE", requirement: "Full card validation" },
      forgeValidation: { status: "ACTIVE", check: "All layers present" },
      recoveryLinks: [
        { breach: "DRIFT_DETECTED", action: "TRIGGER_RECOVERY" }
      ],
      gpControl: { margin: "OVERALL", status: "STABLE" },
      passRejectSignals: { pass: "Integrity >90", reject: "Integrity <85" },
      printCard: { layout: "SYSTEM-DASHBOARD", operator: "CORE" }
    },
    items: [
      {
        id: "fb01",
        title: "Recovery Path Engine",
        tag: "ADAPTIVE-COMMAND · Locked",
        signal: "System Stabilization Command",
        meta: [
          { label: "Logic", value: "v2.8.0", hi: true },
          { label: "Channel", value: "Cloud Recovery" }
        ],
        fullSpec: {
          "Rule": "Every BREACH event MUST generate a RECOVERY signal."
        },
        method: [
          "Evaluate breach source.",
          "Calculate downstream impact.",
          "Publish recovery commands."
        ],
        criticalNote: "Brain must evaluate predicted drift vs actual.",
        reject: "Vague Command · No Recovery Found",
        founderLawLocked: true
      }
    ]
  }
];

const AGENTS = [
  { name: "LOGOS", color: "#a3854d", engineId: "supply" },
  { name: "ASTRA", color: "#e09040", engineId: "pizzas" },
  { name: "MARCO", color: "#60e070", engineId: "burgers" },
  { name: "JEMMA", color: "#8a70e0", engineId: "mains" },
  { name: "BELLA", color: "#d0a0f0", engineId: "desserts" },
  { name: "LUNA", color: "#60c8b0", engineId: "ice-cream" },
  { name: "NATALIA", color: "#c86090", engineId: "prep" },
  { name: "CLARA", color: "#4090e0", engineId: "starters" },
  { name: "VITO", color: "#e04040", engineId: "sides" },
  { name: "HELIOS", color: "#fbb140", engineId: "sunday" },
  { name: "SAFE", color: "#a3854d", engineId: "allergen" },
  { name: "CORE", color: "#ffffff", engineId: "forge-brain" }
];

// --- Components ---



// --- Components ---

function GPCalculator() {
  const [menuPrice, setMenuPrice] = useState(25);
  const [packPrice, setPackPrice] = useState(42);
  const [packWeight, setPackWeight] = useState(10000);
  const [yieldPercent, setYieldPercent] = useState(75);
  const [portionSize, setPortionSize] = useState(200);
  const [targetGP, setTargetGP] = useState(70);
  const [result, setResult] = useState<null | {
    costPerPortion: number;
    portions: number;
    gp: number;
    maxPackPrice: number;
    pass: boolean;
  }>(null);

  const calculate = () => {
    // Guard against NaN values
    if (isNaN(Number(menuPrice)) || isNaN(Number(packPrice)) || isNaN(Number(packWeight)) || 
        isNaN(Number(yieldPercent)) || isNaN(Number(portionSize)) || isNaN(Number(targetGP))) {
      return;
    }

    const usableWeight = Number(packWeight) * (Number(yieldPercent) / 100);
    const portions = Math.max(1, Math.floor(usableWeight / Number(portionSize)));
    const costPerPortion = Number(packPrice) / portions;
    const gp = ((Number(menuPrice) - costPerPortion) / Number(menuPrice)) * 100;
    
    // Max Buy Logic: Cost = MenuPrice * (1 - TargetGP/100)
    const maxCostPerPortion = Number(menuPrice) * (1 - Number(targetGP) / 100);
    const maxPackPrice = maxCostPerPortion * portions;

    setResult({
      costPerPortion,
      portions,
      gp,
      maxPackPrice,
      pass: gp >= Number(targetGP)
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-fellini-rule p-6 space-y-4 font-sans mb-8 no-print rounded-2xl shadow-lg">
      <div className="text-[10px] text-fellini-accent border-b border-fellini-rule pb-2 mb-4 uppercase tracking-[0.2em] flex justify-between items-center font-bold">
        <span>Supply-003 GP Calculator v1.1</span>
        <span className="text-[8px] bg-fellini-accent/20 px-2 py-0.5 rounded">Live Tool · Max Buy Logic</span>
      </div>
      <div className="text-[9px] text-fellini-ghost italic mb-4">
        "What can I afford to pay?" — Max Buy Price logic enabled.
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-[8px] uppercase tracking-widest text-fellini-accent block font-bold">Menu Price £</label>
          <input 
            type="number" 
            value={isNaN(Number(menuPrice)) ? "" : menuPrice} 
            onChange={(e) => setMenuPrice(e.target.value === "" ? NaN : parseFloat(e.target.value))}
            className="w-full bg-fellini-bg border border-fellini-rule p-2.5 text-xs text-fellini-black rounded-lg focus:ring-1 focus:ring-fellini-accent outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] uppercase tracking-widest text-fellini-accent block font-bold">Pack Price £</label>
          <input 
            type="number" 
            value={isNaN(Number(packPrice)) ? "" : packPrice} 
            onChange={(e) => setPackPrice(e.target.value === "" ? NaN : parseFloat(e.target.value))}
            className="w-full bg-fellini-bg border border-fellini-rule p-2.5 text-xs text-fellini-black rounded-lg focus:ring-1 focus:ring-fellini-accent outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] uppercase tracking-widest text-fellini-accent block font-bold">Pack Weight (g)</label>
          <input 
            type="number" 
            value={isNaN(Number(packWeight)) ? "" : packWeight} 
            onChange={(e) => setPackWeight(e.target.value === "" ? NaN : parseFloat(e.target.value))}
            className="w-full bg-fellini-bg border border-fellini-rule p-2.5 text-xs text-fellini-black rounded-lg focus:ring-1 focus:ring-fellini-accent outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] uppercase tracking-widest text-fellini-accent block font-bold">Yield %</label>
          <input 
            type="number" 
            value={isNaN(Number(yieldPercent)) ? "" : yieldPercent} 
            onChange={(e) => setYieldPercent(e.target.value === "" ? NaN : parseFloat(e.target.value))}
            className="w-full bg-fellini-bg border border-fellini-rule p-2.5 text-xs text-fellini-black rounded-lg focus:ring-1 focus:ring-fellini-accent outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] uppercase tracking-widest text-fellini-accent block font-bold">Portion Size (g)</label>
          <input 
            type="number" 
            value={isNaN(Number(portionSize)) ? "" : portionSize} 
            onChange={(e) => setPortionSize(e.target.value === "" ? NaN : parseFloat(e.target.value))}
            className="w-full bg-fellini-bg border border-fellini-rule p-2.5 text-xs text-fellini-black rounded-lg focus:ring-1 focus:ring-fellini-accent outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[8px] uppercase tracking-widest text-fellini-accent block font-bold">Target GP %</label>
          <input 
            type="number" 
            value={isNaN(Number(targetGP)) ? "" : targetGP} 
            onChange={(e) => setTargetGP(e.target.value === "" ? NaN : parseFloat(e.target.value))}
            className="w-full bg-fellini-bg border border-fellini-rule p-2.5 text-xs text-fellini-black rounded-lg focus:ring-1 focus:ring-fellini-accent outline-none"
          />
        </div>
      </div>
      <button 
        onClick={calculate}
        className="w-full py-3 bg-fellini-black text-white text-[10px] rounded-xl uppercase tracking-[0.2em] font-bold hover:scale-[1.02] transition-transform"
      >
        Calculate GP & Max Buy
      </button>

      {result && (
        <div className={`p-6 rounded-xl border-2 ${result.pass ? 'border-fellini-green/30 bg-fellini-green/5' : 'border-red-500/30 bg-red-500/5'} space-y-3`}>
           <div className="flex justify-between text-[11px] font-medium text-fellini-ghost">
              <span className="uppercase tracking-tighter">True Cost:</span>
              <span className="text-fellini-black">£{result.costPerPortion.toFixed(2)}</span>
           </div>
           <div className="flex justify-between text-[11px] font-medium text-fellini-ghost">
              <span className="uppercase tracking-tighter">Portions per Pack:</span>
              <span className="text-fellini-black">{result.portions}</span>
           </div>
           <div className="flex justify-between text-[11px] font-bold border-t border-fellini-rule pt-2">
              <span className="uppercase tracking-tighter text-fellini-ghost">Result GP:</span>
              <span className={result.pass ? 'text-fellini-green' : 'text-fellini-red'}>
                {result.gp.toFixed(1)}%
              </span>
           </div>
           <div className="flex justify-between text-[11px] pt-3 border-t border-fellini-rule mt-2">
              <span className="text-fellini-accent uppercase tracking-tighter italic font-bold">Max Buy Price:</span>
              <span className="text-fellini-accent font-bold ring-1 ring-fellini-accent/20 px-2 py-0.5 rounded">
                £{result.maxPackPrice.toFixed(2)}
              </span>
           </div>
           <div className={`text-center text-[12px] font-black tracking-widest uppercase mt-4 ${result.pass ? 'text-fellini-green' : 'text-fellini-red'}`}>
             {result.pass ? '✅ PASS' : '❌ FAIL'}
           </div>
        </div>
      )}
    </div>
  );
}

function DishCard({ dish, onSelect }: { dish: Dish, onSelect: (dish: Dish) => void }) {
  const [expanded, setExpanded] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Bible Spec - ${dish.title}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600&family=DM+Mono&display=swap');
              
              @page {
                size: A4;
                margin: 0;
              }
              
              body { 
                font-family: 'Cormorant Garamond', serif; 
                padding: 60px; 
                color: #111; 
                line-height: 1.5;
                max-width: 800px;
                margin: auto;
                background: #fff;
              }

              .print-border {
                border: 1px solid #eee;
                padding: 40px;
                min-height: 900px;
                position: relative;
              }

              .header { 
                border-bottom: 3px solid #000; 
                padding-bottom: 15px; 
                margin-bottom: 40px; 
                display: flex; 
                justify-content: space-between; 
                align-items: baseline;
              }

              h1 { 
                margin: 0; 
                font-size: 38px; 
                text-transform: uppercase; 
                letter-spacing: 4px; 
                font-weight: 300;
              }

              .tag { 
                font-family: 'DM Mono', monospace; 
                font-size: 11px; 
                letter-spacing: 2px; 
                color: #888; 
                text-transform: uppercase;
              }

              .signal { 
                font-style: italic; 
                font-size: 20px; 
                margin-bottom: 40px; 
                color: #333; 
                border-left: 4px solid #ccaa66; 
                padding-left: 25px; 
                line-height: 1.4;
              }

              .meta-grid { 
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1px;
                background: #eee;
                border: 1px solid #eee;
                margin-bottom: 40px;
              }

              .meta-item {
                background: #fff;
                padding: 15px;
                font-family: 'DM Mono', monospace;
              }

              .meta-label {
                font-size: 9px;
                text-transform: uppercase;
                color: #999;
                display: block;
                margin-bottom: 4px;
                letter-spacing: 1px;
              }

              .meta-value {
                font-size: 13px;
                color: #000;
                font-weight: 600;
              }

              .section-title { 
                font-family: 'DM Mono', monospace; 
                font-size: 10px; 
                text-transform: uppercase; 
                letter-spacing: 3px; 
                border-bottom: 1px solid #eee; 
                margin: 40px 0 20px; 
                padding-bottom: 8px;
                color: #999;
              }

              .spec-row { 
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #f5f5f5;
                padding: 8px 0;
              }

              .spec-key { 
                font-family: 'DM Mono', monospace; 
                font-size: 10px; 
                text-transform: uppercase; 
                color: #777;
                width: 180px;
              }

              .spec-val { 
                font-size: 16px; 
                text-align: right;
                flex: 1;
              }

              .method { 
                padding-left: 25px; 
                font-size: 16px; 
                color: #222;
              }

              .method li { 
                margin-bottom: 12px; 
              }

              .critical-gate { 
                background: #fffcf0; 
                border: 1px solid #e0d090; 
                padding: 25px; 
                margin: 40px 0;
                position: relative;
              }

              .gate-label {
                font-family: 'DM Mono', monospace;
                font-size: 9px;
                text-transform: uppercase;
                color: #b09040;
                position: absolute;
                top: -8px;
                left: 20px;
                background: #fff;
                padding: 0 8px;
              }

              .gate-text {
                font-style: italic;
                font-size: 16px;
                color: #605020;
              }

              .reject-zone { 
                background: #fdf2f2;
                border-top: 4px solid #a00; 
                padding: 20px; 
                font-family: 'DM Mono', monospace; 
              }

              .reject-label {
                font-size: 10px;
                color: #a00;
                letter-spacing: 2px;
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
              }

              .reject-text {
                font-size: 14px;
                color: #000;
              }

              .footer { 
                margin-top: 80px; 
                font-size: 9px; 
                text-align: center; 
                color: #ccc; 
                letter-spacing: 4px; 
                font-family: 'DM Mono', monospace; 
                text-transform: uppercase;
              }

              @media print {
                body { padding: 40px; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="print-border">
              <div class="header">
                <h1>${dish.title}</h1>
                <span class="tag">Bible Ref: ${dish.tag.split(' · ')[0]}</span>
              </div>
              
              <div class="signal">"${dish.signal}"</div>
              
              <div class="meta-grid">
                ${dish.meta.map(m => `
                  <div class="meta-item">
                    <span class="meta-label">${m.label}</span>
                    <span class="meta-value">${m.value}</span>
                  </div>
                `).join('')}
              </div>
              
              <div class="section-title">Technical Specifications</div>
              <div class="spec-list">
                ${Object.entries(dish.fullSpec).map(([k,v]) => `
                  <div class="spec-row">
                    <div class="spec-key">${k}</div>
                    <div class="spec-val">${v}</div>
                  </div>
                `).join('')}
              </div>

              ${dish.method ? `
                <div class="section-title">Execution Sequence</div>
                <ol class="method">
                  ${dish.method.map(m => `<li>${m}</li>`).join('')}
                </ol>
              ` : ''}

              <div class="critical-gate">
                <span class="gate-label">Critical Control Gate</span>
                <div class="gate-text">${dish.criticalNote}</div>
              </div>

              <div class="reject-zone">
                <span class="reject-label">REJECTION CRITERIA</span>
                <span class="reject-text">${dish.reject}</span>
              </div>

              <div class="footer">RODZ 2026 // GALYONS FELLINI MASTER BIBLE // v2.8.1.FS</div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-fellini-rule bg-white/80 backdrop-blur-md mb-6 overflow-hidden group hover:shadow-xl hover:border-fellini-accent/40 transition-all rounded-2xl"
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-fellini-rule bg-fellini-bg/50">
        <div className="flex items-center gap-3">
          {dish.founderLawLocked && <Lock size={12} className="text-fellini-accent" />}
          <span className="font-sans text-xl font-bold tracking-tight text-fellini-black">
            {dish.title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="p-2 hover:bg-fellini-accent/20 text-fellini-ghost hover:text-fellini-accent transition-all no-print flex items-center gap-2 group border border-transparent hover:border-fellini-accent/30"
            title="Print Execution Card"
          >
            <Printer size={14} />
            <span className="font-mono text-[8px] uppercase tracking-widest hidden group-hover:inline">Print Spec</span>
          </button>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-fellini-accent/10 transition-all no-print"
          >
            <motion.div animate={{ rotate: expanded ? 90 : 0 }}>
              <ChevronRight size={16} className="text-fellini-ghost" />
            </motion.div>
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-6">
           <div className="font-serif italic text-xs text-fellini-parchment leading-relaxed border-l-2 border-fellini-accent/30 pl-4 py-1">
            "{dish.signal}"
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-fellini-ghost uppercase border border-fellini-rule px-2 py-0.5">
            {dish.tag}
          </span>
        </div>

        {dish.id === "sup03" && <GPCalculator />}

        <div className="grid grid-cols-3 gap-0.5 mb-8 bg-fellini-rule/10 border border-fellini-rule p-0.5 rounded-lg overflow-hidden">
          {dish.meta.map((m, i) => (
            <div key={i} className="flex flex-col p-4 bg-white/80">
              <span className="font-mono text-[8px] text-fellini-ghost uppercase mb-2 tracking-widest font-bold">{m.label}</span>
              <span className={`text-sm font-sans font-semibold ${m.hi ? 'text-fellini-accent' : 'text-fellini-black'}`}>{m.value}</span>
            </div>
          ))}
        </div>

        <button 
          onClick={() => onSelect(dish)}
          className="w-full mb-8 py-3 bg-fellini-accent/10 border border-fellini-accent/40 text-fellini-accent hover:bg-fellini-accent/20 transition-all font-sc tracking-[0.3em] text-sm uppercase flex items-center justify-center gap-3 group/recipe"
        >
          <div className="h-[1px] w-8 bg-fellini-accent/40 group-hover/recipe:w-12 transition-all" />
          Access Weights & Method
          <div className="h-[1px] w-8 bg-fellini-accent/40 group-hover/recipe:w-12 transition-all" />
        </button>

        <div className="space-y-1 mb-6">
          {Object.entries(dish.fullSpec).map(([key, val]) => (
            <div key={key} className="flex justify-between items-center border-b border-fellini-rule/20 py-1.5 px-1 group/spec">
              <span className="font-mono text-[9px] text-fellini-ghost uppercase tracking-tighter group-hover/spec:text-fellini-accent">{key}</span>
              <span className="text-[11px] text-fellini-black text-right pl-4">{val}</span>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {expanded && dish.method && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-fellini-bg/80 p-4 border border-fellini-accent/10">
                <div className="font-mono text-[8px] text-fellini-accent uppercase tracking-widest mb-3 flex items-center gap-2 font-bold">
                  <Terminal size={10} /> Execution Sequence
                </div>
                <div className="space-y-3">
                  {dish.method.map((step, i) => (
                    <div key={i} className="flex gap-4 group/step">
                      <span className="font-mono text-[9px] text-fellini-ghost group-hover/step:text-fellini-accent">{i + 1}.</span>
                      <p className="font-sans text-xs text-fellini-black leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 items-start p-4 bg-fellini-accent/5 border border-fellini-accent/20 mb-6 group/verify">
           <AlertCircle size={14} className="text-fellini-accent mt-0.5 shrink-0 group-hover/verify:animate-bounce" />
           <div>
             <div className="font-mono text-[8px] text-fellini-accent uppercase tracking-widest mb-1">Critical Verification Lock</div>
             <p className="font-sans italic text-[11px] text-fellini-ghost leading-snug">
               {dish.criticalNote}
             </p>
           </div>
        </div>

        <div className="bg-fellini-red/5 border border-fellini-red/20 p-3 flex gap-3 items-center">
           <Activity size={14} className="text-fellini-red/60" />
           <div className="font-mono text-[9px] tracking-widest text-fellini-red/80 uppercase">
             REJECT: {dish.reject}
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function AgentHUD({ lead }: { lead: Engine["lead"] }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, borderColor: lead.color }}
      className="flex items-center gap-5 p-5 bg-white border border-fellini-rule min-w-[280px] relative transition-all duration-300 group rounded-xl shadow-sm"
    >
      <div 
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-all group-hover:w-1" 
        style={{ backgroundColor: lead.color }} 
      />
      <div 
        className="w-10 h-10 flex items-center justify-center border border-fellini-rule transition-transform group-hover:rotate-12 rounded-xl bg-fellini-bg"
        style={{ color: lead.color }}
      >
        <lead.icon size={18} />
      </div>
      <div>
        <div className="font-mono text-[9px] tracking-[0.3em] text-fellini-black uppercase mb-1 font-bold">Operator // {lead.name}</div>
        <div className="font-mono text-[7px] tracking-[0.2em] text-fellini-ghost uppercase group-hover:text-fellini-black transition-colors">
          {lead.role} Protocol Engaged
        </div>
      </div>
    </motion.div>
  );
}

function AgentTabs({ activeAgent, onSelect }: { activeAgent: string, onSelect: (id: string, name: string) => void }) {
  return (
    <div className="fixed top-16 md:top-24 left-0 right-0 z-[80] flex justify-center no-print px-4 md:px-8">
          <div className="flex bg-white/70 border border-fellini-rule p-1.5 backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar rounded-full shadow-lg">
        <div className="px-4 border-r border-fellini-rule flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-fellini-accent animate-pulse" title="Allergen Layer Active" />
          <span className="font-mono text-[9px] uppercase tracking-tighter text-fellini-accent font-bold">Safe Guard</span>
        </div>
        {AGENTS.map((agent) => (
          <div key={agent.name} className="shrink-0">
            <button
              onClick={() => onSelect(agent.engineId, agent.name)}
              className={`px-3 md:px-6 py-2 transition-all duration-300 flex items-center gap-2 md:gap-3 group relative overflow-hidden`}
            >
              <div 
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500 rounded-full ${activeAgent === agent.name ? 'opacity-100 scale-x-75' : 'opacity-0 scale-x-0'}`} 
                style={{ backgroundColor: agent.color }}
              />
              <div 
                className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full transition-all ${activeAgent === agent.name ? 'scale-125' : 'scale-50 opacity-20'}`}
                style={{ backgroundColor: agent.color }}
              />
              <span className={`font-mono text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.35em] uppercase transition-colors ${activeAgent === agent.name ? 'text-fellini-black font-bold' : 'text-fellini-ghost group-hover:text-fellini-black'}`}>
                {agent.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeSegment, setActiveSegment] = useState("supply");
  const [activeAgent, setActiveAgent] = useState("LOGOS");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectEngine = (id: string, agentName?: string) => {
    setActiveSegment(id);
    if (agentName) setActiveAgent(agentName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isEntered) {
    return (
      <div className="fixed inset-0 bg-fellini-bg flex flex-col items-center justify-center p-8 text-center overscroll-none overflow-hidden h-screen select-none font-sans">
        <div className="scanline-overlay pointer-events-none opacity-20" />
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-10 p-12 bg-white/80 backdrop-blur-xl border border-fellini-rule shadow-2xl max-w-2xl rounded-2xl"
        >
          <div className="engine-rule mx-auto mb-12" />
          <span className="font-mono text-[10px] tracking-[0.5em] text-fellini-ghost uppercase block mb-6 px-12">
            GALYONS — RODZ 2026 SYSTEM KERNEL
          </span>
          <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tight text-fellini-black uppercase leading-tight mb-6">
            FELLINI MASTER BIBLE v2.8.1
          </h1>
          <div className="font-mono text-[11px] text-fellini-accent mb-12 tracking-[0.3em]">
            v2.8.1 · Memory Engine · Integrity Score: 100/100
          </div>
          <button 
            onClick={() => setIsEntered(true)}
            className="group relative font-sans text-[12px] font-semibold tracking-[0.3em] text-white uppercase bg-fellini-black px-16 py-5 hover:scale-105 transition-all rounded-full shadow-lg"
          >
            <span className="relative z-10">Initialize Bible</span>
            <motion.div 
               className="absolute inset-0 bg-fellini-accent/20 -translate-x-full"
               whileHover={{ translateX: "100%" }}
               transition={{ duration: 1.5, repeat: Infinity }}
            />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-fellini-bg min-h-screen w-full overflow-x-hidden relative selection:bg-fellini-accent/30 font-sans">
      <div className="scanline-overlay pointer-events-none fixed inset-0 z-[100] no-print opacity-10" />
      
      {/* HUD Header */}
      <header className="fixed top-0 left-0 right-0 p-4 px-6 md:p-8 md:px-12 flex justify-between items-center z-[90] bg-fellini-bg/80 backdrop-blur-md border-b border-fellini-rule no-print">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="font-sc text-sm md:text-lg tracking-[0.4em] text-fellini-black uppercase font-medium">
            Fellini System
          </div>
          <div className="h-3 md:h-4 w-[1px] bg-fellini-rule" />
          <div className="font-mono text-[8px] md:text-[9px] tracking-[0.2em] text-fellini-ghost uppercase">
            Core Anchors Deterministic · Active Lock · 04.05.2026
          </div>
        </div>
        <div className="flex items-center gap-8 font-mono text-[9px] tracking-[0.25em] text-fellini-ghost uppercase hidden lg:flex">
          <div className="flex items-center gap-4 border border-fellini-rule px-4 py-1.5 bg-fellini-accent/5">
             <span className="text-fellini-accent opacity-50">Bible:</span> v2.8.1.FS
          </div>
          <div className="flex items-center gap-2">
            <Activity size={10} className="text-fellini-green" />
            LIVE // {currentTime.toLocaleDateString()} · {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </header>

      {/* Agent Nav Tabs */}
      <AgentTabs activeAgent={activeAgent} onSelect={selectEngine} />
      
      <RecoveryCommandCenter />

      {/* Floating Sidebar Nav */}
      <nav className="fixed left-12 top-1/2 -translate-y-1/2 flex flex-col gap-10 z-[90] hidden xl:flex no-print">
        {ENGINES.map((e) => (
          <div key={e.id}>
            <button
              onClick={() => selectEngine(e.id, e.lead.name)}
              className="group flex flex-col items-start gap-2 relative pl-6"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all ${activeSegment === e.id ? 'bg-fellini-accent scale-y-150' : 'bg-fellini-rule scale-y-100'}`} />
              <div className="flex items-center gap-2">
                 <span className={`font-mono text-[9px] tracking-[0.3em] uppercase transition-all ${activeSegment === e.id ? 'text-fellini-black translate-x-2 font-bold' : 'text-fellini-ghost group-hover:text-fellini-black'}`}>
                  {e.num} // {e.id}
                </span>
              </div>
            </button>
          </div>
        ))}
      </nav>

      <main className="data-grid-bg">
        {(() => {
          const engine = ENGINES.find(e => e.id === activeSegment) || ENGINES[0];
          return (
            <motion.section
              key={engine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen grid grid-cols-1 lg:grid-cols-2 border-b border-fellini-rule relative pt-20"
            >
              {/* Intel Side */}
              <div className="p-6 pt-32 md:p-24 lg:p-32 flex flex-col justify-center bg-white/50 backdrop-blur-md relative overflow-hidden ring-1 ring-fellini-rule/10">
                <div className="relative z-10">
                  <div className="font-mono text-[10px] tracking-[0.5em] text-fellini-accent mb-12 flex items-center gap-6">
                    {engine.num} · ARCHIVE CLASSIFIED
                    <div className="h-[1.5px] grow bg-gradient-to-r from-fellini-accent/40 to-transparent" />
                  </div>
                  
                  <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl text-fellini-black mb-6 leading-[0.9] tracking-tight whitespace-pre-line uppercase font-bold">
                    {engine.name}
                  </h2>
                  
                  <div className="font-mono text-sm text-fellini-ghost mb-16 tracking-[0.25em] flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-fellini-accent" />
                    {engine.version}
                  </div>

                  <div className="border-l-2 md:border-l-4 border-fellini-accent/20 pl-6 md:pl-12 py-3 mb-10 md:mb-16 max-w-xl">
                    <p className="font-serif italic text-lg md:text-2xl text-fellini-cream leading-relaxed font-light">
                      "{engine.layers.identity.text}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-10 md:mb-16">
                    <div className="border border-fellini-rule bg-white shadow-sm rounded-xl p-6 md:p-10 relative overflow-hidden group">
                      <Orbit className="absolute -right-8 -bottom-8 text-fellini-accent/5 group-hover:text-fellini-accent/10 transition-all duration-1000 rotate-12" size={200} />
                      <div className="font-mono text-[10px] tracking-[0.4em] text-fellini-accent uppercase mb-8 flex items-center gap-2">
                         <Shield size={12} /> Execution Control Laws
                      </div>
                      <div className="space-y-6 relative z-10">
                        {engine.layers.executionLaws.map((law, idx) => (
                          <div key={idx} className="flex gap-6">
                            <div className="font-mono text-[10px] text-fellini-ghost mt-1 shrink-0">L.{idx + 1}</div>
                            <p className="font-sans italic text-base text-fellini-ghost leading-snug">
                               <span className="text-fellini-black not-italic font-mono text-[10px] tracking-widest uppercase mr-2">{law.label}:</span>
                               {law.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <AgentHUD lead={engine.lead} />
                </div>
                
                {/* Background Ghost ID */}
                <div className="absolute right-0 bottom-12 font-sc text-[22vw] text-white/[0.015] pointer-events-none select-none z-0 leading-none">
                  {engine.num}
                </div>
              </div>

              {/* Execution / Dish Cards Side */}
              <div className="p-6 md:p-16 lg:p-20 bg-white/50 backdrop-blur-sm border-l border-fellini-rule lg:overflow-y-auto lg:max-h-screen pt-20 lg:pt-20 shadow-inner">
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between items-center mb-8 md:mb-12 border-b border-fellini-rule pb-4">
                     <div className="font-mono text-[10px] tracking-[0.4em] text-fellini-ghost uppercase font-bold">
                      System Cards // Founder Law
                    </div>
                    <div className="flex gap-2">
                      <CheckCircle2 size={12} className="text-fellini-green" />
                      <span className="font-mono text-[8px] text-fellini-green uppercase tracking-widest">Verified 2026.FS</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {engine.items.map((dish) => (
                      <div key={dish.id}>
                        <DishCard dish={dish} onSelect={setSelectedDish} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          );
        })()}

        {/* Global System Footer */}
        <footer className="py-24 md:py-48 px-6 md:px-12 bg-white text-center relative overflow-hidden section-law border-t border-fellini-rule">
           <div className="engine-rule mx-auto mb-16" />
           <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="max-w-4xl mx-auto"
           >
              <h3 className="font-sans text-4xl md:text-6xl text-fellini-black uppercase tracking-widest mb-12 font-bold opacity-90">
                "Anchors deterministic. System under active lock."
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 border-t border-fellini-rule pt-20 mb-20">
                {[
                  { label: "Yield System", val: "6 Active Items" },
                  { label: "Unit Law", val: "20 Portions" },
                  { label: "Supply Engine", val: "v1.0 Locked" },
                  { label: "Service Law", val: "75°C Probe" },
                  { label: "Texture Law", val: "Shatter Lock" },
                  { label: "Ratio Law", val: "95 / 5 Rule" }
                ].map(stat => (
                  <div key={stat.label} className="text-left">
                    <div className="font-mono text-[9px] text-fellini-accent uppercase tracking-widest mb-2 whitespace-nowrap font-bold">{stat.label}</div>
                    <div className="font-sc text-sm md:text-base text-fellini-black tracking-widest whitespace-nowrap">{stat.val}</div>
                  </div>
                ))}
              </div>
              <div className="font-mono text-[11px] text-fellini-ghost tracking-[0.5em] uppercase mb-4">
                Fortune Tactical Archive // Galyons Rods 2026 // v2.8.1.FS
              </div>
              <div className="font-mono text-[8px] text-fellini-ghost/40 uppercase tracking-[0.3em]">
                System built. Operator steady. Final Service Seal Active.
              </div>
           </motion.div>
        </footer>
      </main>

      {/* --- Recipe Viewer Modal --- */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDish(null)}
              className="absolute inset-0 bg-white/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="w-full max-w-4xl h-full max-h-[90vh] bg-white border border-fellini-rule relative z-10 flex flex-col shadow-2xl overflow-hidden rounded-3xl"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-8 py-6 border-b border-fellini-rule bg-fellini-bg/80 backdrop-blur-md">
                <div>
                  <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.3em] font-bold mb-1">Recipe Protocol: {selectedDish.tag.split(' · ')[0]}</div>
                  <h2 className="font-sans text-3xl font-bold text-fellini-black tracking-tight">{selectedDish.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedDish(null)}
                  className="p-3 bg-fellini-black text-white hover:scale-110 transition-all uppercase font-sans text-[10px] font-bold tracking-widest rounded-full px-6"
                >
                  Close
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                <div className="max-w-2xl mx-auto">
                  <div className="font-serif italic text-lg text-fellini-parchment leading-relaxed border-l-4 border-fellini-accent/30 pl-8 py-2 mb-12">
                    "{selectedDish.signal}"
                  </div>

                  {/* Weights & Measures Section */}
                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <Cpu size={16} className="text-fellini-accent" />
                      <span className="font-mono text-[10px] text-fellini-white uppercase tracking-[0.4em]">Section 01: Weights & Measures</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {Object.entries(selectedDish.fullSpec).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-start py-3 border-b border-fellini-rule/30 group/row">
                          <span className="font-mono text-[10px] text-fellini-ghost uppercase tracking-wider group-hover/row:text-fellini-accent pt-1">{key}</span>
                          <span className="text-sm md:text-base text-fellini-white text-right max-w-[240px] md:max-w-[400px] leading-relaxed italic">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Method Section */}
                  {selectedDish.method && (
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <Flame size={16} className="text-fellini-accent" />
                        <span className="font-mono text-[10px] text-fellini-white uppercase tracking-[0.4em]">Section 02: Execution Sequence</span>
                      </div>
                      <div className="space-y-6">
                        {selectedDish.method.map((step, i) => (
                          <div key={i} className="flex gap-6 group/step">
                            <span className="font-mono text-xs text-fellini-accent opacity-50 group-hover/step:opacity-100 transition-opacity pt-1">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <p className="font-serif text-sm md:text-base text-fellini-white leading-relaxed tracking-wide">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Critical Lock Section */}
                  <div className="p-6 bg-fellini-accent/5 border border-fellini-accent/20 mb-8">
                    <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                      <AlertCircle size={14} /> Master Law Locked
                    </div>
                    <p className="font-serif text-sm text-fellini-white italic leading-relaxed">
                      {selectedDish.criticalNote}
                    </p>
                  </div>

                  <div className="font-mono text-[9px] text-fellini-ghost/40 text-center uppercase tracking-[0.5em] mt-12 mb-4">
                    Document End // System Verified
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
