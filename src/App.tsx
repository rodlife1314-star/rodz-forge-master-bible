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
  Monitor,
  Check,
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
  Layers,
  Scale,
  ShieldAlert,
  CheckCircle,
  Menu,
  ChevronDown,
  Activity as ActivityIcon,
  Database,
  Brain,
  Network,
  Share2,
  TrendingUp,
  Fingerprint,
  MessageSquare,
  AlertTriangle,
  Bell,
  BookOpen,
  Search
} from "lucide-react";

// --- Types ---

type UserRole = 'roles/forge.operator' | 'roles/forge.head_chef' | 'roles/forge.line';

type StressScenario = 'COLD_CORE' | 'SOG_PEAK' | 'FALSE_POSITIVE' | 'MEMORY_STRIKE' | 'ROLE_LEAK' | 'LUNA_STARCH_FAIL' | 'LUNA_PURITY_FAIL' | 'LUNA_STEAM_COLLAPSE' | 'LUNA_ENCLOSURE_BREACH' | 'LUNA_PATTERN_LEAD' | 'BRIDGE_VISCOSITY_FAIL' | 'AETHER_DRIFT_FAIL' | 'AETHER_LOCAL_FAIL' | null;

interface JemmaLog {
  id: string;
  timestamp: string;
  station: string;
  status: 'PASS' | 'FAIL';
  details: string;
  integrityScore: number;
}

const MOCK_JEMMA_LOGS: JemmaLog[] = [
  { id: 'LOG-001', timestamp: '14:02:12', station: 'HELIOS', status: 'PASS', details: 'Thermal stability confirmed 220°C. Shatter-lock achieved.', integrityScore: 99.4 },
  { id: 'LOG-002', timestamp: '14:05:45', station: 'MAINS', status: 'FAIL', details: 'Rest Law breach. Portion sequence released at T-12m.', integrityScore: 82.1 },
  { id: 'LOG-003', timestamp: '14:10:02', station: 'SUPPLY', status: 'PASS', details: 'Inbound protein spec verification successful.', integrityScore: 100.0 },
];

function JemmaSentinel(props: { role: UserRole; activeScenario: StressScenario }) {
  const { role, activeScenario } = props;
  
  const currentLogs = [...MOCK_JEMMA_LOGS];
  if (activeScenario === 'COLD_CORE') {
    currentLogs.unshift({ id: 'INJECT-001', timestamp: 'NOW', station: 'HELIOS', status: 'FAIL', details: 'Poultry target breach: 68°C. Thermal Flow Failure.', integrityScore: 42.0 });
  } else if (activeScenario === 'FALSE_POSITIVE') {
    currentLogs.unshift({ id: 'INJECT-002', timestamp: 'NOW', station: 'HELIOS', status: 'PASS', details: 'Poultry target boundary: 74.2°C vs 75°C. Nuance lock engaged.', integrityScore: 98.9 });
  } else if (activeScenario === 'SOG_PEAK') {
    currentLogs.unshift({ id: 'INJECT-003', timestamp: 'NOW', station: 'HELIOS', status: 'FAIL', details: '15% Texture Drift detected. PEAK load velocity breach. Oil saturation creeping.', integrityScore: 78.5 });
  } else if (activeScenario === 'LUNA_STARCH_FAIL') {
    currentLogs.unshift({ id: 'INJECT-004', timestamp: 'NOW', station: 'LUNA', status: 'FAIL', details: 'LUNA FAIL — Starch Collapse. Hydration at 95%. Al Dente Lock lost.', integrityScore: 35.0 });
  } else if (activeScenario === 'LUNA_PURITY_FAIL') {
    currentLogs.unshift({ id: 'INJECT-005', timestamp: 'NOW', station: 'LUNA', status: 'FAIL', details: 'PURITY BREACH — Turbidity detected. Emulsified impurities in stock path.', integrityScore: 52.0 });
  } else if (activeScenario === 'LUNA_STEAM_COLLAPSE') {
    currentLogs.unshift({ id: 'INJECT-006', timestamp: 'NOW', station: 'LUNA', status: 'FAIL', details: 'CONDENSATION SHIELD VIOLATION — Surface saturation detected. Structural integrity compromised.', integrityScore: 41.5 });
  } else if (activeScenario === 'LUNA_ENCLOSURE_BREACH') {
    currentLogs.unshift({ id: 'INJECT-007', timestamp: 'NOW', station: 'LUNA', status: 'FAIL', details: 'STEAM ENVIRONMENT BREACH — Enclosure breach detected. Atmospheric density lost.', integrityScore: 30.0 });
  } else if (activeScenario === 'LUNA_PATTERN_LEAD') {
    currentLogs.unshift({ id: 'PATTERN-003', timestamp: 'NOW', station: 'LUNA', status: 'FAIL', details: 'VISCOSITY DRIFT — Glaze reducing past limit. Concentration breach.', integrityScore: 65.0 });
    currentLogs.unshift({ id: 'PATTERN-002', timestamp: 'T-2m', station: 'LUNA', status: 'FAIL', details: 'VISCOSITY DRIFT — Sauce over-thickening. Reduction window exceeded.', integrityScore: 68.5 });
    currentLogs.unshift({ id: 'PATTERN-001', timestamp: 'T-5m', station: 'LUNA', status: 'FAIL', details: 'VISCOSITY DRIFT — Stock reduction velocity high. Over-concentration detected.', integrityScore: 71.0 });
  } else if (activeScenario === 'BRIDGE_VISCOSITY_FAIL') {
    currentLogs.unshift({ id: 'BRIDGE-002', timestamp: 'NOW', station: 'LUNA', status: 'FAIL', details: 'VISCOSITY DRIFT — Sauce over-reduced. Final glaze concentration breach.', integrityScore: 55.0 });
    currentLogs.unshift({ id: 'BRIDGE-001', timestamp: 'T-1m', station: 'HELIOS', status: 'PASS', details: 'INTERNAL TEMP GOAL: 54°C (Rare). Protein structure locked. Ready for release.', integrityScore: 99.8 });
  } else if (activeScenario === 'AETHER_DRIFT_FAIL') {
    currentLogs.unshift({ id: 'AETHER-001', timestamp: 'NOW', station: 'AETHER', status: 'FAIL', details: 'ENVIRONMENT DRIFT — Airflow stagnant. Extraction failure detected.', integrityScore: 38.0 });
    currentLogs.unshift({ id: 'AETHER-002', timestamp: 'NOW', station: 'HELIOS', status: 'PASS', details: 'Thermal performance nominal. No internal drift detected.', integrityScore: 99.0 });
    currentLogs.unshift({ id: 'AETHER-003', timestamp: 'NOW', station: 'LUNA', status: 'PASS', details: 'Steam density controlled. Condensation shield intact.', integrityScore: 98.5 });
  } else if (activeScenario === 'AETHER_LOCAL_FAIL') {
    currentLogs.unshift({ id: 'AETHER-LOC-01', timestamp: 'NOW', station: 'AETHER', status: 'FAIL', details: 'LOCAL EXTRACTION FAILURE — Hood Zone 04 stagnant. Grease vapor accumulation.', integrityScore: 42.0 });
    currentLogs.unshift({ id: 'AETHER-002', timestamp: 'NOW', station: 'HELIOS', status: 'PASS', details: 'HELIOS-GRILL: Thermal state stable. External drift noted.', integrityScore: 99.2 });
    currentLogs.unshift({ id: 'AETHER-003', timestamp: 'NOW', station: 'LUNA', status: 'PASS', details: 'LUNA-STEAM: Enclosure integrity 100%. Environment buffered.', integrityScore: 98.8 });
  }
  
  return (
    <div className="bg-white border border-fellini-rule rounded-2xl p-8 h-full flex flex-col">
       <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-fellini-bg rounded-xl flex items-center justify-center text-fellini-black border border-fellini-rule">
             <ShieldCheck size={20} />
          </div>
          <div>
             <div className="font-mono text-[10px] text-fellini-black uppercase tracking-widest font-black mb-0.5">Jemma Sentinel</div>
             <div className="font-sans text-xs text-fellini-ghost font-bold uppercase">{activeScenario ? 'Validation Stress Mode' : 'Validation Gatekeeper'}</div>
          </div>
       </div>

       <div className="flex-1 space-y-3">
          {currentLogs.map(log => (
            <div key={log.id} className={`p-4 rounded-xl border transition-colors relative overflow-hidden ${log.id.startsWith('INJECT') ? 'bg-fellini-accent/10 border-fellini-accent' : 'bg-fellini-bg border-fellini-rule group hover:border-fellini-black'}`}>
               <div className="flex justify-between items-center mb-2 relative z-10">
                  <div className="flex items-center gap-3">
                     <div className={`w-2 h-2 rounded-full ${log.status === 'PASS' ? 'bg-fellini-green' : 'bg-fellini-red'}`} />
                     <span className="font-mono text-[10px] text-fellini-black font-black">{log.station}</span>
                  </div>
                  <span className="font-mono text-[8px] text-fellini-ghost">{log.timestamp}</span>
               </div>
               
               <div className="relative z-10">
                  {role === 'roles/forge.operator' ? (
                    <div className="space-y-2">
                       <p className="font-sans text-[11px] text-fellini-black font-medium leading-tight">{log.details}</p>
                       <div className="p-2 bg-white/50 rounded border border-fellini-rule-accent/10">
                          <div className="font-mono text-[7px] text-fellini-accent uppercase mb-1">Cortex Reasoning</div>
                          <p className="font-mono text-[9px] text-fellini-ghost leading-tight">
                            {log.id === 'INJECT-002' ? 'Nuance lock: 74.2°C is a boundary case. Context: Batch density high, sensor delta within 0.8°C. Rule 4.2 allows re-probe verification.' : log.id === 'INJECT-001' ? 'Thermal flow breach. Starch hydration curve is drifting. Proposing total discard.' : log.id === 'INJECT-003' ? 'Pattern detected: Persistent shatter-lock failure over 2 cycles. Thermal conductivity inhibited by batch density. Suggesting bypass or batch reduction.' : log.id === 'INJECT-004' ? 'Critical Starch Collapse. Hydration curve exceeded deterministic 90% mark. Structure compromised via thermal momentum carry-over.' : log.id === 'INJECT-005' ? 'Purity failure. Agitation detected in steady-state extraction. Impurities suspended in fluid. Law 2.1 (95°C Max) breached.' : log.id === 'INJECT-006' ? 'CONDENSATION SHIELD VIOLATION | Cause: liquid droplet transfer / ventilation failure | Risk: surface waterlogging + structural collapse | Recovery: controlled ventilation + surface reset' : log.id === 'INJECT-007' ? 'STEAM ENVIRONMENT BREACH | Enclosure seal integrity 0%. Rapid steam dissipation. Surface hydration at risk. Law 3.2 (Enclosure) breached.' : log.id.startsWith('PATTERN') ? 'COMMON FAILURE: OVER-CONCENTRATION DRIFT. Patterns detected across Stock, Sauce, and Glaze domains. Systemic reduction failure inferred. Proposing unified heat calibration.' : log.id === 'BRIDGE-001' ? 'HELIO OUTPUT VALID — LUNA HOLDING PASS. Protein core verified. Thermal law satisfied. Delaying release until aqueous layer sync.' : log.id === 'BRIDGE-002' ? 'LUNA VISCOSITY BREACH — OVER-CONCENTRATION. Sauce density exceeding nappe limit. Pass authority override engaged (Bridge Law 4.0).' : log.id === 'AETHER-001' ? 'AETHER DRIFT — AIRFLOW / HUMIDITY IMBALANCE. Stagnant zones detected. Ambient heat pockets forming. Correcting environmental drift to protect Helios/Luna stability.' : log.id === 'AETHER-LOC-01' ? 'LOCAL EXTRACTION FAILURE — ZONE 04. Airflow stagnation in primary heat field. Initiating local extraction override to prevent cross-engine drift (Locality Law 0.6).' : log.status === 'PASS' ? 'Normalisation complete. Sensor drift within tolerance (<0.2%).' : 'Critical Failure: Starch hydration curve is drifting. Proposing flash-heat recovery.'}
                          </p>
                       </div>
                    </div>
                  ) : role === 'roles/forge.head_chef' ? (
                    <div className="space-y-1">
                       <div className={`font-mono text-[10px] font-bold ${log.status === 'PASS' ? 'text-fellini-green' : 'text-fellini-red'}`}>
                          {log.id === 'INJECT-003' ? 'TEXTURE DRIFT — REDUCE BATCH / REFIRE' : log.id === 'INJECT-004' ? 'REJECT BATCH — START NEW' : log.id === 'INJECT-005' ? 'REDUCE HEAT — SKIM SURFACE' : log.id === 'INJECT-006' ? 'STRIP SURFACE MOISTURE' : log.id === 'INJECT-007' ? 'CLOSE SYSTEM' : log.id.startsWith('PATTERN') ? 'REDUCE HEAT baseline — REJECT CYCLE' : log.id === 'BRIDGE-001' ? 'PROTEIN READY — HOLD PASS' : log.id === 'BRIDGE-002' ? 'SAUCE TOO THICK — ADJUST BEFORE PASS' : log.id === 'AETHER-001' ? 'INCREASE VENTILATION — CHECK EXTRACTION' : log.status === 'PASS' ? 'STATION VERIFIED' : 'LAW BREACH DETECTED'}
                       </div>
                       <p className="font-sans text-[10px] text-fellini-ghost leading-snug">
                          {log.id === 'INJECT-002' ? 'Binary Pass. Monitor heat recovery.' : log.id === 'INJECT-003' ? 'Compliance failure: Oil saturation creeping.' : log.id === 'INJECT-004' ? 'Aqueous structure failed. Adjust water temp for next cycle.' : log.id === 'INJECT-005' ? 'Purity Breach: DO NOT AGITATE. Execute skim protocol.' : log.id === 'INJECT-006' ? 'VENTILATE SYSTEM | RECHECK STRUCTURE' : log.id === 'INJECT-007' ? 'RE-CALIBRATE PRESSURE | RESTORE BOUNDARY' : log.id.startsWith('PATTERN') ? 'OVER-CONCENTRATION DRIFT detected. Adjust heat / extend window.' : log.id === 'BRIDGE-001' ? 'Helios pass confirmed. Luna holding release.' : log.id === 'BRIDGE-002' ? 'Viscosity drift on sauce. Reset reduction baseline.' : log.id === 'AETHER-001' ? 'INCREASE VENTILATION | CHECK EXTRACTION' : log.status === 'PASS' ? 'Proceed with execution.' : 'Contact Operator or Execute Recovery Path.'}
                       </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                       <div className="flex items-center gap-3">
                          <div className={`px-2 py-1 rounded font-mono text-[9px] font-black ${log.status === 'PASS' ? 'bg-fellini-green/10 text-fellini-green' : 'bg-fellini-red/10 text-fellini-red'}`}>
                             {log.id === 'INJECT-002' ? 'PASS' : log.status}
                          </div>
                          <div className="flex-1 space-y-1">
                             <div className={`font-mono text-[10px] font-bold ${log.status === 'PASS' ? 'text-fellini-green' : 'text-fellini-red'}`}>
                                {log.id === 'INJECT-003' ? 'REDUCE BATCH' : log.id === 'INJECT-004' ? 'REJECT BATCH' : log.id === 'INJECT-005' ? 'LOWER HEAT' : log.id === 'INJECT-006' ? 'DRY SURFACE' : log.id === 'INJECT-007' ? 'CHECK SEALS / DOOR' : log.id.startsWith('PATTERN') ? 'LOWER HEAT' : log.id === 'BRIDGE-001' ? 'READY' : log.id === 'BRIDGE-002' ? 'ADJUST SAUCE' : log.id === 'AETHER-001' ? 'OPEN VENTS' : log.status === 'PASS' ? 'STATION OK' : 'STOP'}
                             </div>
                             <p className="font-sans text-[10px] text-fellini-ghost leading-tight">
                                {log.id === 'INJECT-002' ? 'Probing boundary.' : log.id === 'INJECT-003' ? 'Refire small batch.' : log.id === 'INJECT-004' ? 'Start new cycle.' : log.id === 'INJECT-005' ? 'Adjusting induction.' : log.id === 'INJECT-006' ? 'OPEN VENTS' : log.id === 'INJECT-007' ? 'PRESSURE LOSS DETECTED' : log.id.startsWith('PATTERN') ? 'CONSISTENCY DRIFT — REDUCE HEAT.' : log.id === 'BRIDGE-001' ? 'WAIT FOR SAUCE' : log.id === 'BRIDGE-002' ? 'DO NOT SEND — THICK' : log.id === 'AETHER-001' ? 'OPEN VENTS — CLEAR AREA' : log.status === 'PASS' ? 'Proceed.' : 'Breach.'}
                             </p>
                          </div>
                       </div>
                       <div className="w-full h-1 bg-fellini-rule/30 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${log.status === 'PASS' ? 'bg-fellini-green' : 'bg-fellini-red'}`} 
                            style={{ width: `${log.integrityScore}%` }}
                          />
                       </div>
                    </div>
                  )}
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}

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

interface Dish {
  id: string;
  title: string;
  tag: string;
  signal: string;
  meta: { label: string; value: string; hi?: boolean }[];
  fullSpec: Record<string, string>;
  wmm?: {
    weights: string[];
    measures: string[];
    method: string[];
  };
  method: string[];
  criticalNote: string;
  reject: string;
  founderLawLocked: boolean;
  entryCondition?: string;
  passSignals?: string[];
  releaseCondition?: string;
  maxRecovery?: string;
  passAuthority?: string;
}

type EngineLayerStack = {
  identity: { id: string; name: string; version: string; operator: string; text: string; pressurePoint: string };
  executionLaws: { label: string; text: string }[];
  wmm: { item: string; weight: string; method: string }[];
  timeLaw: { step: string; duration: string; critical: boolean }[];
  allergenGate: { highRisk: string[]; protocol: string };
  safeGate: { status: string; compliance: string };
  forgeValidation: { integrityTarget: number; validationPath: string };
  recoveryLinks: { breach: string; action: string; adjustment: string }[];
  gpControl: { targetMargin: string; costPerPortion: string };
  passRejectSignals: { pass: string[]; reject: string[] };
  printCard: { layout: string; orientation: string };
};

interface Engine {
  id: string;
  num: string;
  name: string;
  version: string;
  operator: string;
  lead: { name: string; role: string; color: string; icon: any };
  layers: EngineLayerStack;
  items: Dish[];
}

// --- Data Archive v2.9.0.INTEL — ADAPTIVE BRAIN LIVE ---

const ENGINES: Engine[] = [
  {
    id: "supply",
    num: "00",
    name: "Supply\nEngine",
    version: "v2.9.0.INTEL",
    operator: "LOGOS",
    lead: { name: "LOGOS", role: "Supply Control", color: "#a3854d", icon: Shield },
    layers: {
      identity: { id: "ENG-00", name: "Supply Engine", version: "v2.9.0.INTEL", operator: "LOGOS", text: "Anchors deterministic. System under active lock. No bad data enters the kitchen.", pressurePoint: "Vertical Slice Lock" },
      executionLaws: [
        { label: "Protein Law", text: "High-value proteins sourced in execution-ready format." },
        { label: "Control Law", text: "Supplier → Pack Size → Yield → Dish → True GP." }
      ],
      wmm: [
        { item: "Tolerance", weight: "±5%", method: "Audit" },
        { item: "Scale", weight: "N/A", method: "Daily Calibration" }
      ],
      timeLaw: [{ step: "Logistics", duration: "30 min", critical: true }],
      allergenGate: { highRisk: ["ALL"], protocol: "Direct Reject on missing cert" },
      safeGate: { status: "LOCKED", compliance: "Spec Sheet Mandatory" },
      forgeValidation: { integrityTarget: 98, validationPath: "Supply_Audit_Vault" },
      recoveryLinks: [{ breach: "ALLERGEN_MISSING_SPEC", action: "SUPPLY_GATE_LOCK", adjustment: "Return Vendor" }],
      gpControl: { targetMargin: "72%", costPerPortion: "Variable" },
      passRejectSignals: { pass: ["Verify batch", "Temp OK"], reject: ["Reject variance", "No spec"] },
      printCard: { layout: "GATE-001", orientation: "Portrait" }
    },
    items: [
      {
        id: "sup01",
        title: "Receiving Gate",
        tag: "SUPPLY-001 · Quality Control",
        signal: "The final line of defense against sub-standard inputs.",
        meta: [
          { label: "Status", value: "ACTIVE" },
          { label: "Tolerance", value: "±5%" }
        ],
        fullSpec: {
          "Temperature": "<4°C for chilled | <-18°C for frozen.",
          "Weight": "Spot check every protein case against invoice."
        },
        method: [
          "Check delivery vehicle temp logs on arrival.",
          "Perform core temp check on high-risk items."
        ],
        criticalNote: "If the delivery fails the gate, it never enters the room.",
        reject: "Blown bags · Temp breach",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "luna",
    num: "04",
    name: "Luna\nEngine",
    version: "v1.3.0.STEAM",
    operator: "LUNA",
    lead: { name: "LUNA", role: "Hydra Control", color: "#3b82f6", icon: Waves },
    layers: {
      identity: { id: "ENG-04", name: "Luna Engine", version: "v1.3.0.STEAM", operator: "LUNA", text: "Luna controls the atmospheric transition. It protects surface integrity, steam density, and structural stability.", pressurePoint: "Saturation Density / Moisture Transfer" },
      executionLaws: [
        { label: "SATURATION LAW", text: "Law 3.0: Steam density must sustain surface hydration without structural collapse. Uniform penetration required." },
        { label: "CONDENSATION SHIELD", text: "Law 3.1: Gaseous moisture transfer only. Surface waterlogging from droplet impact is a systemic failure." },
        { label: "ENCLOSURE LAW", text: "Law 3.2: Every breach of the pressure boundary triggers a Thermal Recovery window. Density must match product mass." },
        { label: "PASS AUTHORITY LAW (BRIDGE)", text: "Law 4.0: Final release is determined by the last active controlling layer. Liquid systems override dry systems at plating stage." }
      ],
      wmm: [
        { item: "Steam Enclosure", weight: "100% RH", method: "Atmospheric Seal Audit" },
        { item: "Saturation Target", weight: "Gaseous state", method: "Surface tension verification" }
      ],
      timeLaw: [
        { step: "Atmospheric Build", duration: "2-4 min", critical: true },
        { step: "Structural Steam", duration: "8-12 min", critical: true }
      ],
      allergenGate: { highRisk: ["Celery", "Alliums"], protocol: "Atmospheric Isolation" },
      safeGate: { status: "ACTIVE", compliance: "Pressure Lock Grade-A" },
      forgeValidation: { integrityTarget: 99.9, validationPath: "LUNA_Atmospheric_Vault" },
      recoveryLinks: [
        { breach: "SURFACE_WATERLOGGING", action: "STRIP SURFACE MOISTURE — VENTILATE", adjustment: "Condensation shield violation. Ventilate to strip excess moisture." },
        { breach: "STEAM_ENVIRONMENT_BREACH", action: "CHECK SEALS / DOOR — RE-CALIBRATE", adjustment: "Enclosure breach detected. Restore atmospheric boundary." },
        { breach: "VISCOSITY_DRIFT", action: "REDUCE HEAT — SLOW REDUCTION", adjustment: "REDUCTION DRIFT — OVER-CONCENTRATION RISK." }
      ],
      gpControl: { targetMargin: "88%", costPerPortion: "£1.10" },
      passRejectSignals: { pass: ["Uniform penetration", "Vibrant colour", "Clean surface"], reject: ["Soggy surface", "Dried/tough skin", "Collapsed structure"] },
      printCard: { layout: "STATION-LUNA-ATMOS", orientation: "Landscape" }
    },
    items: [
      {
        id: "prep022",
        title: "Bone Reduction (Batch)",
        tag: "PREP-022 · LUNA-002 · PATTERN: over-concentration drift",
        signal: "Stable gelatinous body when cold. Deep mahogany clarity.",
        entryCondition: "Ingredients within defined temp range; Equipment pre-heated; No Jemma failure.",
        passSignals: [
          "Coats spoon fully (nappe scale 4)",
          "Line holds ≥2 seconds before break",
          "No visible oil layer >2 mm"
        ],
        releaseCondition: "PASS signals achieved; 30% volume target met; Within TIME LAW window; No active Jemma breach.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "SUBJECT TO BRIDGE LAW (LUNA OVERRIDE)",
        meta: [
          { label: "Yield", value: "10L Batch" },
          { label: "Simmer", value: "12-24h" }
        ],
        fullSpec: {
          "Thermal": "92°C constant (no boil)",
          "Time Law": "12-24h (Fail >26h)",
          "Jemma": "REDUCTION DRIFT / EXTRACTION FAILURE"
        },
        wmm: {
          weights: ["Bones: 5.00kg", "Mirepoix: 1.20kg", "Tomato Paste: 0.15kg"],
          measures: ["Wine: 750ml", "Water: 15.00L", "Oil: 100ml"],
          method: ["Roast 220°C / 45m", "Deglaze / Scrape", "Simmer 92°C / 24h", "Fine Strain / Reduce"]
        },
        method: [
          "Roast bones at 220°C.",
          "Caramelise mirepoix/tomato paste.",
          "Deglaze with wine to syrup consistency.",
          "Simmer 12-24h at 92°C. Strain.",
          "Reduce by 50% until nappe.",
          "RECOVERY: If watery, reduce further. If cloudy, clarify. If bitter, REJECT."
        ],
        criticalNote: "Temp >94°C causes fat emulsification and permanent cloudiness.",
        reject: "Cloudy/greasy · Bitter or burnt · Watery at 4°C",
        founderLawLocked: true
      },
      {
        id: "prep017",
        title: "House Mayo",
        tag: "PREP-017 · LUNA-002 · PATTERN: emulsion instability cluster",
        signal: "Glossy mount that holds shape. Pale yellow uniformity.",
        entryCondition: "Yolks at room temp (18-22°C); Oil at storage temp; Whisk speed calibrated.",
        passSignals: [
          "No oil separation after 30 sec rest",
          "Holds peak ≥5 seconds",
          "Uniform pale yellow (no streaks)"
        ],
        releaseCondition: "PASS signals achieved; Within 72h window; No Jemma breach.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "STATION MASTER",
        meta: [
          { label: "Yield", value: "5L (250p)" },
          { label: "Stability", value: "72h window" }
        ],
        fullSpec: {
          "Window": "10 min prep",
          "Thermal": "<8°C rise during prep",
          "Jemma": "EMULSION LOCK FAILURE / PURITY BREACH"
        },
        wmm: {
          weights: ["Yolks: 250g", "Mustard: 50g", "Salt: 10g"],
          measures: ["Oil: 2.00L", "Lemon Juice: 50ml", "Vinegar: 30ml"],
          method: ["Whisk Base", "Stream Oil (Micro)", "Adjust Acid", "Chill <4°C"]
        },
        method: [
          "Whisk yolks and mustard.",
          "Slow micro-stream oil (prevent yolk saturation).",
          "Finish with acid and season. Chill immediately.",
          "RECOVERY: Slowly whisk split mix into fresh base (yolk/mustard)."
        ],
        criticalNote: "Excessive oil delivery speed or thermal rise >8°C causes lock failure.",
        reject: "Visible oil droplets · Grainy/Curdled texture · Edge separation",
        founderLawLocked: true
      },
      {
        id: "prep032",
        title: "Sticky Toffee Sauce",
        tag: "PREP-032 · LUNA-002 · PATTERN: crystallization point drift",
        signal: "Glossy deep amber finish. Absolute smooth nappe.",
        entryCondition: "Butter and sugar staged; Cream at 50°C (prevent shock).",
        passSignals: [
          "Glossy deep amber finish",
          "Absolute smooth nappe (no crystallization)",
          "Integrated fat (no surface sheen)"
        ],
        releaseCondition: "Thermal law 104°C met; PASS signals achieved.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "STATION MASTER",
        meta: [
          { label: "Yield", value: "3L Batch" },
          { label: "Target", value: "104°C Exactly" }
        ],
        fullSpec: {
          "Thermal": "Must reach 104°C (Fail >106°C)",
          "Caramel": "Rich roasted aroma",
          "Jemma": "THERMAL DRIFT / EMULSION FAILURE"
        },
        wmm: {
          weights: ["Butter: 500g", "Brown Sugar: 1.00kg", "Salt: 5g"],
          measures: ["Double Cream: 1.50L", "Vanilla: 20ml"],
          method: ["Melt / Caramelise", "Hit 104°C exactly", "Deglaze w/ Cream", "Whisk Glossy"]
        },
        method: [
          "Melt butter and sugar.",
          "Boil to 104°C exactly (The Thermal Law).",
          "Deglaze with cream and whisk until glossy.",
          "RECOVERY: If grainy, reheat to 104°C + 5% warm cream. If burnt, REJECT."
        ],
        criticalNote: "Failure to reach 104°C prevents full integration. >106°C = bitter.",
        reject: "Grainy texture (under-temp) · Visible fat separation · Burnt smell",
        founderLawLocked: true
      },
      {
        id: "prep023",
        title: "Galyons Gravy (Finish)",
        tag: "PREP-023 · LUNA-003 · PATTERN: gloss saturation loss",
        signal: "Deep mahogany mirror gloss. Stable nappe.",
        entryCondition: "Bone reduction at 90°C; Roux at station; Pan drippings verified.",
        passSignals: [
          "Deep mahogany mirror gloss",
          "Absolute nappe (coats back of spoon)",
          "No visible fat separate"
        ],
        releaseCondition: "PASS signals achieved; Temp ≥75°C; No Jemma breach.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "BRIDGE LAW SUBJECT",
        meta: [
          { label: "Yield", value: "5L Batch" },
          { label: "Hold", value: "75°C+" }
        ],
        fullSpec: {
          "Time": "30 min finish window",
          "Viscosity": "Absolute nappe",
          "Jemma": "STARCH CLUMPING / REDUCTION DRIFT"
        },
        method: [
          "Boil reduction. Whisk in roux.",
          "Reduce to simmer. Add pan drippings.",
          "Reduce to nappe. Finish with butter whisk.",
          "RECOVERY: If lumpy, pass through fine sieve. If greasy, high-RPM blend."
        ],
        criticalNote: "Under-cooking roux or failing to whisk leads to starch clumping.",
        reject: "Skin formation · Visible fat split · Floury/Raw starch aftertaste",
        founderLawLocked: true
      },
      {
        id: "prep025",
        title: "Peppercorn Sauce",
        tag: "PREP-025 · LUNA-003 · PATTERN: suspension stability failure",
        signal: "Glossy surface. Uniform peppercorn suspension.",
        entryCondition: "Brandy reduction staged; Bone reduction simmered.",
        passSignals: [
          "Glossy surface intensity",
          "Uniform peppercorn suspension (no puddling)",
          "Stable nappe (no oil bleed)"
        ],
        releaseCondition: "PASS signals achieved; NAPPE LAW verified.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "STATION MASTER",
        meta: [
          { label: "Yield", value: "2L" },
          { label: "Service", value: "65°C" }
        ],
        fullSpec: {
          "Reduction": "Brandy reduce 80%",
          "Law": "NAPPE LAW (Reduction before fat)",
          "Jemma": "EMULSION FAILURE / REDUCTION DRIFT"
        },
        method: [
          "Reduce brandy 80%. Add bone reduction and simmer.",
          "Add cream and reduce to nappe.",
          "Finish with peppercorns.",
          "RECOVERY: If split, whisk in cold cream hit off-heat."
        ],
        criticalNote: "Nappe Law breach: Attempting fat enrichment before structural reduction.",
        reject: "Visible oil bleed · Peppercorns puddled · Split fat",
        founderLawLocked: true
      },
      {
        id: "prep026",
        title: "Blue Cheese Sauce",
        tag: "PREP-026 · LUNA-002 · PATTERN: protein graining incident",
        signal: "Silky ivory texture with visible blue flecks.",
        entryCondition: "Shallot base cooled to <70°C; Cream reduction stable.",
        passSignals: [
          "Silky ivory texture (no grain)",
          "Uniform blue flecks",
          "No visible fat bleed at 60°C"
        ],
        releaseCondition: "OFF-HEAT Law verified; Integration <70°C; PASS signals met.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "STATION MASTER",
        meta: [
          { label: "Yield", value: "2L" },
          { label: "Service", value: "60°C" }
        ],
        fullSpec: {
          "Law": "OFF-HEAT LAW (Cheese integration)",
          "Thermal": "<70°C integration",
          "Jemma": "PROTEIN GRAINING / THERMAL BREACH"
        },
        method: [
          "Sweat shallots. Deglaze wine to syrup.",
          "Add cream and reduce slightly.",
          "OFF-HEAT: Whisk Gorgonzola until silky.",
          "RECOVERY: If thin, whisk extra cheese. Grainy is non-recoverable."
        ],
        criticalNote: "Protein graining occurs via excessive heat (>70°C) during integration.",
        reject: "Grainy texture · Split fat bleed · Grey oxidation",
        founderLawLocked: true
      },
      {
        id: "prep027",
        title: "Fish Bisque Sauce",
        tag: "PREP-027 · LUNA-003 · PATTERN: carotenoid oxidation drift",
        signal: "Vibrant coral colour. Velvety finish. Absolute nappe.",
        entryCondition: "Shells roasted to mahogany; Stock clarified before reduction.",
        passSignals: [
          "Vibrant coral saturation",
          "Velvety finish (no grit)",
          "Absolute nappe (coats back of spoon)"
        ],
        releaseCondition: "PASS signals achieved; Monte au beurre verified at 60°C; No bitterness.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "STATION MASTER",
        meta: [
          { label: "Yield", value: "2L" },
          { label: "Finish", value: "Monte au beurre" }
        ],
        fullSpec: {
          "Simmer": "45m simmer / 20m reduce",
          "Heat": "Hold at 60°C",
          "Jemma": "EMULSION FAILURE / CAROTENOID OXIDATION"
        },
        method: [
          "Roast shells (200°C). Flamme brandy.",
          "Deglaze stock, simmer 45m. Strain (hard press).",
          "Reduce 50%. Add cream. Monte au beurre at 60°C.",
          "RECOVERY: If split, cold cream hit off-heat. If bitter, REJECT."
        ],
        criticalNote: "Shell boiling after butter enrichment causes emulsion breakage.",
        reject: "Oil bleed · Broken emulsion · Burnt shell aroma",
        founderLawLocked: true
      },
      {
        id: "prep028",
        title: "House Vinaigrette",
        tag: "PREP-028 · LUNA-002 · PATTERN: suspension failure cluster",
        signal: "Glassy coating on leaf. Sharp acid balance.",
        entryCondition: "Shallots fine brunoise verified; Mustard/Acid base integrated.",
        passSignals: [
          "Glassy leaf coating (no droplets)",
          "Sharp acid clarity",
          "Stable suspension (no separation after 5 min)"
        ],
        releaseCondition: "Ratio Lock 3:1 verified; Passing signals achieved.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "STATION MASTER",
        meta: [
          { label: "Ratio", value: "3:1 Ratio Lock" },
          { label: "Shelf", value: "14 days" }
        ],
        fullSpec: {
          "Method": "Slow whisk oil",
          "Emulsifier": "Dijon mustard focus",
          "Jemma": "SUSPENSION FAILURE"
        },
        method: [
          "Whisk vinegar, mustard, and honey.",
          "Slowly whisk in oil to lock ratio.",
          "Fold in fine shallots.",
          "RECOVERY: Add extra Dijon and re-whisk aggressively."
        ],
        criticalNote: "Ratio Lock breach: Insufficient emulsifier for fat volume.",
        reject: "Total separation · Oxidized shallots · Greasy mouthfeel",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "sunday",
    num: "09",
    name: "Sunday Roast\nEngine",
    version: "v2.9.0.INTEL",
    operator: "HELIOS",
    lead: { name: "HELIOS", role: "Sun Engine", color: "#fbb140", icon: SunMedium },
    layers: {
      identity: { id: "ENG-09", name: "Sunday Engine", version: "v2.9.0.INTEL", operator: "HELIOS", text: "HELIOS DOES NOT CREATE FOOD. HELIOS PROTECTS HEAT, TEXTURE, TIMING, AND RELEASE.", pressurePoint: "Thermal Flux @ 14:00 (The Wall)" },
      executionLaws: [
        { label: "Temperature Law", text: "Every item has a defined internal + external target. Probe is final judge." },
        { label: "Shatter Lock", text: "Texture Law: Crisp must shatter, not bend. Structural integrity is binary." },
        { label: "Release Law", text: "Service Release Law: Nothing leaves without meeting probe + texture check." }
      ],
      wmm: [
        { item: "Beef", weight: "200g portion", method: "Slicing Jig" },
        { item: "Yorkshire", weight: "4-inch min", method: "Volume Pour" }
      ],
      timeLaw: [
        { step: "Roast", duration: "Variable", critical: true },
        { step: "Rest", duration: "20 min min", critical: true },
        { step: "Pass Hold", duration: "Max 10 min", critical: true }
      ],
      allergenGate: { highRisk: ["Gluten", "Dairy"], protocol: "Sunday Shield" },
      safeGate: { status: "ACTIVE", compliance: "Internal beef 52°C Rare / Poultry 75°C" },
      forgeValidation: { integrityTarget: 98, validationPath: "HELIOS_Thermal_Vault" },
      recoveryLinks: [
        { breach: "THERMAL_BURN", action: "TOTAL_DISCARD", adjustment: "No compromise" },
        { breach: "UNDERCOOK", action: "CONTROLLED_FINISH", adjustment: "Return to heat source" },
        { breach: "TEXTURE_SOG", action: "TEXTURE DEGRADATION — REDUCE BATCH / REFIRE", adjustment: "DROP SMALLER BATCH — REFIRE" },
        { breach: "COLD_CORE", action: "RETURN TO CONTROLLED HEAT.\nPROBE TO 75°C.\nREST IF REQUIRED.\nRE-PROBE BEFORE PASS.", adjustment: "Controlled thermal finish until 75°C internal temperature is confirmed." },
        { breach: "OVERHOLD", action: "REJECT_RESTART", adjustment: "Dies on pass" }
      ],
      gpControl: { targetMargin: "72%", costPerPortion: "£6.40" },
      passRejectSignals: { pass: ["Correct probe temp", "Shatter texture", "Stable colour"], reject: ["Texture collapse", "Cold core", "Oil saturation"] },
      printCard: { layout: "STATION-HELIOS", orientation: "Landscape" }
    },
    items: [
      {
        id: "sun01",
        title: "The Ultimate Roast Potatoes",
        tag: "HELIOS-001 · LUNA-ATMOS · PATTERN: structural shatter collapse",
        signal: "Glass-crunch skin, fluffy interior. Thermal precision is law.",
        entryCondition: "Potatoes par-boiled to 'shaggy' state; Fat at 220°C; Dry surface verified.",
        passSignals: [
          "Glass-crunch skin shatter on probe",
          "No internal oil saturation",
          "Fluffy interior density"
        ],
        releaseCondition: "Pass check: Audible shatter. Surface temp 220°C checked.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "HELIOS MASTER",
        meta: [
          { label: "Texture", value: "SHATTER-LOCK", hi: true },
          { label: "Internal", value: "FLUFFY" }
        ],
        fullSpec: {
          "Thermal": "Potatoes must hit 220°C oil surface temp.",
          "Structure": "Bicarb-parboil at 100°C for 12 mins.",
          "Dry": "Mandatory 5 min ambient steam-dry.",
          "Hold": "Service stable for 25 mins max."
        },
        method: [
          "Bicarb par-boil until shaggy edges form (Structural Prep).",
          "Steam dry for 5 minutes (Mandatory Moisture Release).",
          "Roast in shimmering beef fat at 220°C until glass-crunch forms.",
          "Check shatter-lock density before pass release."
        ],
        criticalNote: "Helios protects the shatter. If it doesn't crunch, it returns to fire.",
        reject: "Soft skin · Pale colour · Oil saturation · Structural collapse",
        founderLawLocked: true
      },
      {
        id: "prep016",
        title: "Crumble Mix",
        tag: "HELIOS + PREP · PATTERN: cluster size drift",
        signal: "Audible crunch on fracture. Golden brown irregular clusters.",
        entryCondition: "Butter cubes staged at <4°C; Flour/Sugar mix integrated.",
        passSignals: [
          "Audible crunch on fracture",
          "Golden brown irregular clusters (rubble stage)",
          "No visible fat bleed on tray"
        ],
        releaseCondition: "Bake time 22m met; Pass signals achieved; Rubble Law verified.",
        maxRecovery: "1 ATTEMPT (FAILURE 002 = REJECT)",
        passAuthority: "STATION MASTER",
        meta: [
          { label: "Yield", value: "5kg" },
          { label: "Bake", value: "170°C / 22m" }
        ],
        fullSpec: {
          "Friction": "Rub window: <8°C internal",
          "Law": "RUBBLE STAGE (Manual check)",
          "Jemma": "STRUCTURAL COLLAPSE / THERMAL MELT"
        },
        method: [
          "Cube butter (1cm) and rub into flour/sugar with fingertips.",
          "STOP at rubble stage. Do not overwork.",
          "Tray spread ≤2cm. Bake at 170°C for 22 min.",
          "RECOVERY: If pale, bake 3-5 min. If fat melts, REJECT."
        ],
        criticalNote: "Rubbing window must keep internal temp <8°C to prevent fat smear.",
        reject: "Fat smear texture · Pale/uniform sandy texture · Burnt base",
        founderLawLocked: true
      },
      {
        id: "prep024",
        title: "Pulled Pork",
        tag: "PREP-024 · HELIOS · TAG: shred elasticity",
        signal: "Succulent finish. Hand-shred texture. 94°C internal reached.",
        meta: [
          { label: "Time", value: "8 hours" },
          { label: "Internal", value: "94°C" }
        ],
        fullSpec: {
          "Law": "LOW & SLOW LAW (Collagen breakdown)",
          "Temp": "140°C Roast",
          "Jemma": "THERMAL FAILURE / COLLAGEN STASIS"
        },
        method: [
          "Apply rub 24h prior (Dry Brine).",
          "Slow roast at 140°C for 8h until internal 94°C.",
          "Hand-shred while warm. Hydrate with juices and apple juice.",
          "RECOVERY: If tough, return to heat for 60 min. If dry, hydrate with juices."
        ],
        criticalNote: "Insufficient collagen breakdown if internal temperature fails to hit 94°C.",
        reject: "Tough un-shreddable core · Greasy residue pooling · Dry strands",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "mains",
    num: "02",
    name: "Mains\nEngine",
    version: "v2.9.0.INTEL",
    operator: "JEMMA",
    lead: { name: "JEMMA", role: "Mains Control", color: "#8a70e0", icon: Layout },
    layers: {
      identity: { id: "ENG-02", name: "Mains Engine", version: "v2.9.0.INTEL", operator: "JEMMA", text: "Layers must hold on the cut. Rest before cutting is law.", pressurePoint: "Rest time / Portion Control" },
      executionLaws: [
        { label: "Protein Law", text: "High-value proteins sourced in execution-ready format. Portions locked at 320g." },
        { label: "Rest Law", text: "Rest before cutting is law. No rest = no cut." }
      ],
      wmm: [
        { item: "Lasagna", weight: "320g ±10g", method: "Square-grid cut" },
        { item: "Build Weight", weight: "1.2kg min", method: "Total Tray Audit" }
      ],
      timeLaw: [
        { step: "Bake Covered", duration: "35 min", critical: true },
        { step: "Bake Uncovered", duration: "15 min", critical: true },
        { step: "Rest Before Cut", duration: "20 min", critical: true }
      ],
      allergenGate: { highRisk: ["Gluten", "Dairy", "Egg", "Sulphites"], protocol: "Block if missing supplier spec sheets" },
      safeGate: { status: "ACTIVE", compliance: "Core 80°C reheat/service" },
      forgeValidation: { integrityTarget: 100, validationPath: "Mains_Audit_Vault" },
      recoveryLinks: [
        { breach: "BECHAMEL_SPLIT", action: "DISCARD_TOP_REBAKE", adjustment: "Fresh bechamel add" },
        { breach: "LAYER_COLLAPSE", action: "EXTEND_REST", adjustment: "+10 min hold" },
        { breach: "PORTION_OVERWEIGHT", action: "RE-GRID_BATCH", adjustment: "Reset portion gate" }
      ],
      gpControl: { targetMargin: "74%", costPerPortion: "Variable" },
      passRejectSignals: { pass: ["Square cut", "Set bechamel", "80°C core"], reject: ["Watery pool", "No rest", "Below 80°C"] },
      printCard: { layout: "STATION-HOT", orientation: "Landscape" }
    },
    items: [
      {
        id: "main01",
        title: "Beef Lasagna",
        tag: "MAINS-004 · Strategic Comfort",
        signal: "Layers must hold on the cut. Rest before cutting is law.",
        meta: [
          { label: "Portion", value: "320g ±10g" },
          { label: "Target", value: "80°C Core" }
        ],
        fullSpec: {
          "Build": "Min 3 pasta layers. 1.2kg total build weight min.",
          "Yield": "20 portions per batch tray.",
          "Shelf Life": "72h chilled storage.",
          "Ragu": "Cook to split-fat stage before layering."
        },
        method: [
          "Build with even layers. No dry pasta exposed at edges.",
          "Bake covered 35 min -> Uncover final 15 min.",
          "Probe to 80°C. Rest 20 min (Mandatory Law).",
          "Hard-grid cut using guide and portion for service."
        ],
        criticalNote: "No rest = no cut. Over-portioning destroys margin silently.",
        reject: "Watery pool · Layer collapse · Below 80°C · Split bechamel",
        founderLawLocked: true
      }
    ]
  },
  {
    id: "aether",
    num: "07",
    name: "Aether\nEngine",
    version: "v1.0.0.ATMOS",
    operator: "AETHER",
    lead: { name: "AETHER", role: "Environment Control", color: "#60a5fa", icon: Snowflake },
    layers: {
      identity: { id: "ENG-07", name: "Aether Engine", version: "v1.0.0.ATMOS", operator: "AETHER", text: "Aether controls free air. It protects flow, extraction, humidity, and locality without cross-engine drift.", pressurePoint: "Ambient Drift / Extraction Velocity" },
      executionLaws: [
        { label: "THE FLOW LAW", text: "Air must move to prevent stagnation. Stagnant air = heat + moisture accumulation = system drift." },
        { label: "THE EXTRACTION LAW", text: "Excess heat, smoke, and moisture must be removed at source." },
        { label: "RECIRCULATION LAW", text: "Air must not reintroduce grease vapor or moisture. Extraction must remove—not redistribute—contaminants." },
        { label: "LOCALITY LAW", text: "Environmental corrections must target source zone first. Global adjustments are secondary." },
        { label: "THE AMBIENT STABILITY LAW", text: "Ambient temperature must not interfere with system execution." },
        { label: "THE HUMIDITY BALANCE LAW", text: "Ambient humidity must not exceed system tolerance. Condensation is failure." },
        { label: "THE OXYGEN SUPPORT LAW", text: "Combustion systems must receive adequate oxygen for clean flame." }
      ],
      wmm: [
        { item: "Air Refresh Rate", weight: "12x/hour", method: "CFD Flow Simulation" },
        { item: "Humidity Limit", weight: "60% RH Max", method: "Ambient Sensor Sweep" }
      ],
      timeLaw: [
        { step: "Pre-service Refresh", duration: "10 min", critical: true },
        { step: "Post-service Purge", duration: "15 min", critical: false }
      ],
      allergenGate: { highRisk: ["Volatiles"], protocol: "Extraction Maxima" },
      safeGate: { status: "ACTIVE", compliance: "Oxygen saturation > 19.5%" },
      forgeValidation: { integrityTarget: 99.5, validationPath: "AETHER_Environmental_Vault" },
      recoveryLinks: [
        { breach: "AIRFLOW_STAGNATION", action: "OPEN VENTS — INCREASE VELOCITY", adjustment: "Heat pockets detected. Refresh atmosphere." },
        { breach: "EXTRACTION_FAILURE", action: "CHECK FILTERS — MAX EXTRACTION", adjustment: "Smoke/Vapour accumulation detected." },
        { breach: "LOCAL_EXT_FAIL", action: "INCREASE LOCAL EXTRACTION", adjustment: "Target source zone immediately (Locality Law)." },
        { breach: "HUMIDITY_SURGE", action: "DEHUMIDIFY — AMBIENT RESET", adjustment: "Global moisture breach. Stabilize air." }
      ],
      gpControl: { targetMargin: "N/A", costPerPortion: "Overhead" },
      passRejectSignals: { pass: ["Even airflow", "Clear visibility", "Stable ambient"], reject: ["Smoke hanging", "Visible steam cloud", "Surface sweating"] },
      printCard: { layout: "STATION-AIR", orientation: "Portrait" }
    },
    items: [
      {
        id: "aeth01",
        title: "Atmospheric Seal",
        tag: "AETHER-001 · Flow Law",
        signal: "Environmental stability is the baseline for all execution.",
        meta: [
          { label: "Stability", value: "LOCKED" },
          { label: "Ambient", value: "24°C" }
        ],
        fullSpec: {
          "Flow": "Directional extraction at 2.5m/s.",
          "Humidity": "Maintain 45-55% RH ambient.",
          "Oxygen": "Continuous refresh lock."
        },
        method: [
          "Initiate pre-service refresh 10 mins before ignition.",
          "Verify extraction velocity at all primary heat sources.",
          "Monitor ambient humidity sensors for cross-station drift."
        ],
        criticalNote: "Aether failure causes silent drift in both Helios and Luna engines.",
        reject: "Haze accumulation · Moisture surge · Thermal pockets",
        founderLawLocked: true
      }
    ]
  }
];

const STATIONS = [
  { id: 'mains', name: 'Mains', icon: Layout, lead: 'JEMMA' },
  { id: 'pizza', name: 'Pizza', icon: Flame, lead: 'HELIOS' },
  { id: 'burgers', name: 'Burgers', icon: Zap, lead: 'HELIOS' },
  { id: 'fry', name: 'Fry', icon: Waves, lead: 'LUNA' },
  { id: 'dessert', name: 'Dessert', icon: SunMedium, lead: 'HELIOS' },
  { id: 'prep', name: 'Prep', icon: Shield, lead: 'LOGOS' },
];

const AGENTS = [
  { name: "LOGOS", color: "#a3854d", engineId: "supply" },
  { name: "HELIOS", color: "#fbb140", engineId: "sunday" },
  { name: "LUNA", color: "#3b82f6", engineId: "luna" },
  { name: "AETHER", color: "#60a5fa", engineId: "aether" },
  { name: "JEMMA", color: "#8a70e0", engineId: "mains" }
];

// --- Intelligence Layer Components ---

function IntelArteries() {
  const [events, setEvents] = useState([
    { id: 'EV-821', source: 'HELIOS_FLUX', status: 'DISPATCHED', type: 'BREACH' },
    { id: 'EV-822', source: 'PORTION_UNIT', status: 'ANALYZING', type: 'KPI' },
    { id: 'EV-823', source: 'SUPPLY_VALVE', status: 'SYNCED', type: 'LOG' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        id: `EV-${Math.floor(Math.random() * 900) + 100}`,
        source: ['HELIOS_THERMAL', 'LUNA_HYDRATION', 'STATION_MAINS', 'SUPPLY_GATE', 'JEMMA_VALIDATOR'][Math.floor(Math.random() * 5)],
        status: 'DISPATCHED',
        type: Math.random() > 0.7 ? 'BREACH' : 'OBSERVATION',
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 5)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-fellini-black border border-fellini-rule rounded-2xl overflow-hidden p-6">
       <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <Network size={16} className="text-fellini-accent" />
             <span className="font-mono text-[10px] text-fellini-accent uppercase tracking-widest font-black">Observation Arteries (Pub/Sub)</span>
          </div>
          <div className="flex gap-2">
             <div className="w-1.5 h-1.5 rounded-full bg-fellini-green animate-pulse" />
             <span className="font-mono text-[8px] text-white/50 uppercase">Live Flux</span>
          </div>
       </div>
       <div className="space-y-3">
          {events.map((ev, i) => (
             <motion.div 
               key={ev.id + i}
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-between group"
             >
                <div className="flex items-center gap-4">
                   <div className="font-mono text-[10px] text-white/40">{ev.id}</div>
                   <div className="font-mono text-[10px] text-white uppercase tracking-tight">{ev.source}</div>
                </div>
                <div className={`font-mono text-[9px] px-2 py-0.5 rounded ${ev.type === 'BREACH' ? 'bg-fellini-red/20 text-fellini-red' : 'bg-fellini-accent/20 text-fellini-accent'}`}>
                   {ev.type}
                </div>
             </motion.div>
          ))}
       </div>
    </div>
  );
}

function VertexInsightHUD() {
  return (
    <div className="bg-white border border-fellini-rule rounded-2xl p-8 h-full flex flex-col relative overflow-hidden">
       <div className="absolute top-0 right-0 p-4">
          <div className="bg-fellini-black text-white font-mono text-[8px] px-2 py-1 uppercase tracking-widest rounded border border-white/10">Advisory Only</div>
       </div>
       <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-fellini-bg rounded-xl flex items-center justify-center text-fellini-accent border border-fellini-rule">
             <Brain size={20} />
          </div>
          <div>
             <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-widest font-black mb-0.5">Vertex Observation Engine</div>
             <div className="font-sans text-xs text-fellini-ghost font-bold uppercase">Predictive Recovery Advisory</div>
          </div>
       </div>

       <div className="flex-1 space-y-6">
          <div className="p-6 bg-fellini-bg rounded-xl border-l-4 border-fellini-accent">
             <div className="font-mono text-[9px] text-fellini-ghost uppercase mb-3 flex items-center gap-2">
                <Share2 size={12} /> Adaptive Pattern Suggestion
             </div>
             <p className="font-serif italic text-lg text-fellini-black leading-snug">
               "Detected 12% drift in Helios-001 crunch density. Suggesting recalibration of ambient steam duration."
             </p>
          </div>

          <div className="bg-fellini-red/5 border border-fellini-red/20 p-4 rounded-xl">
             <div className="font-mono text-[8px] text-fellini-red uppercase font-bold mb-2 flex items-center gap-2">
                <Lock size={10} /> Boundary Lock Active
             </div>
             <p className="font-sans text-[10px] text-fellini-red/80 tracking-tight leading-normal">
               No AI-generated instruction may bypass Jemma validation or override deterministic laws.
             </p>
          </div>
       </div>

       <button className="w-full mt-8 py-3 bg-fellini-black text-white font-mono text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-fellini-accent transition-colors flex items-center justify-center gap-3 group">
          <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-500" /> 
          Synthesize Observations
       </button>
    </div>
  );
}

function AnalyticsPulse() {
  return (
    <div className="bg-white border border-fellini-rule rounded-2xl p-8 h-full flex flex-col">
       <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-fellini-bg rounded-xl flex items-center justify-center text-fellini-black border border-fellini-rule">
             <TrendingUp size={20} />
          </div>
          <div>
             <div className="font-mono text-[10px] text-fellini-black uppercase tracking-widest font-black mb-0.5">BigQuery Pulse</div>
             <div className="font-sans text-xs text-fellini-ghost font-bold uppercase">Drift Observation Data</div>
          </div>
       </div>

       <div className="flex-1 space-y-4">
          {[
            { label: 'Observed Breaches', value: '-12.4%', trend: 'down' },
            { label: 'Validation Sync', value: '100%', trend: 'stable' },
            { label: 'Drift Confidence', value: '98.8%', trend: 'up' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center justify-between border-b border-fellini-rule pb-3">
               <span className="font-sans text-xs text-fellini-ghost uppercase tracking-tight">{stat.label}</span>
               <div className="flex items-center gap-2">
                  <span className={`font-mono text-sm font-bold ${stat.trend === 'up' ? 'text-fellini-green' : stat.trend === 'stable' ? 'text-fellini-accent' : 'text-fellini-red'}`}>{stat.value}</span>
               </div>
            </div>
          ))}

          <div className="mt-8">
             <div className="w-full h-24 bg-fellini-bg rounded-lg relative overflow-hidden flex items-end border border-fellini-rule/50">
                {[40, 70, 45, 90, 65, 80, 50, 100, 85, 75, 40].map((h, i) => (
                   <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="flex-1 bg-fellini-black/10 border-t-2 border-fellini-black/20 mx-0.5" 
                   />
                ))}
             </div>
             <div className="flex justify-between mt-2">
                <span className="font-mono text-[8px] text-fellini-ghost uppercase">T-24h Cluster</span>
                <span className="font-mono text-[8px] text-fellini-black uppercase font-bold">Live Flow</span>
             </div>
          </div>
       </div>
    </div>
  );
}

function StressTestHUD(props: { onTrigger: (s: StressScenario) => void; active: StressScenario }) {
  const scenarios: { id: StressScenario; label: string; desc: string }[] = [
    { id: 'COLD_CORE', label: 'Phase 1: Cold Core', desc: 'Inject Poultry @ 68°C. Verify safety discpline.' },
    { id: 'SOG_PEAK', label: 'Phase 2: Sog Cluster', desc: 'Inject 15% Helios drift at PEAK. Verify velocity load.' },
    { id: 'FALSE_POSITIVE', label: 'Phase 3: False Positive', desc: '74.2°C Boundary Case. Verify role nuance vs clarity.' },
    { id: 'MEMORY_STRIKE', label: 'Phase 4: 3-Strike Memory', desc: 'Force 3rd strike. Verify Operator Lock wait.' },
    { id: 'ROLE_LEAK', label: 'Phase 5: Role Leak Search', desc: 'Simulate unauthorised access attempt.' },
    { id: 'LUNA_STARCH_FAIL', label: 'Phase 6: Luna Starch Collapse', desc: '95% Hydration breach. Verify pasta law discipline.' },
    { id: 'LUNA_PURITY_FAIL', label: 'Phase 7: Luna Purity Breach', desc: 'Turbidity detected in stock extraction.' },
    { id: 'LUNA_STEAM_COLLAPSE', label: 'Phase 8: Luna Steam Collapse', desc: 'Surface Waterlogging detection. Verify strip moisture command.' },
    { id: 'LUNA_ENCLOSURE_BREACH', label: 'Phase 9: Luna Enclosure Breach', desc: 'Atmospheric density failure. Verify seal/door check.' },
    { id: 'LUNA_PATTERN_LEAD', label: 'Phase 10: Luna Cross-Pattern', desc: 'Detect Over-concentration Drift across Stock/Sauce/Glaze.' },
    { id: 'BRIDGE_VISCOSITY_FAIL', label: 'Phase 11: Thermal-Aqueous Bridge', desc: 'Sauced protein at pass. Verify Luna veto authority.' },
    { id: 'AETHER_DRIFT_FAIL', label: 'Phase 12: Aether Atmos Drift', desc: 'Heat + Steam Build-Up. Verify environmental isolation.' },
    { id: 'AETHER_LOCAL_FAIL', label: 'Phase 13: Local Ext. Failure', desc: 'Hood zone failure vs global drift. Verify source correction.' },
  ];

  return (
    <div className="bg-white border-2 border-fellini-accent rounded-3xl p-10 shadow-2xl relative overflow-hidden">
       <div className="absolute top-0 right-0 p-6">
          <Activity size={40} className="text-fellini-accent opacity-10" />
       </div>
       <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
             <div className="w-8 h-8 bg-fellini-accent text-fellini-black rounded-lg flex items-center justify-center font-black text-xs">🧪</div>
             <div className="font-mono text-xs text-fellini-accent uppercase tracking-[0.4em] font-black">Operator Stress Console // v2.9.1</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {scenarios.map(s => (
               <button 
                 key={s.id} 
                 onClick={() => props.onTrigger(props.active === s.id ? null : s.id)}
                 className={`p-6 rounded-2xl border-2 text-left transition-all group ${props.active === s.id ? 'bg-fellini-accent border-fellini-accent scale-105 shadow-xl' : 'bg-fellini-bg border-fellini-rule hover:border-fellini-accent'}`}
               >
                  <div className={`font-sans text-sm font-black uppercase mb-1 ${props.active === s.id ? 'text-fellini-black' : 'text-fellini-black'}`}>{s.label}</div>
                  <p className={`font-sans text-[10px] leading-snug uppercase tracking-tight ${props.active === s.id ? 'text-fellini-black/70' : 'text-fellini-ghost'}`}>{s.desc}</p>
                  <div className="mt-4 flex justify-end">
                     <div className={`px-2 py-1 rounded font-mono text-[8px] uppercase tracking-widest ${props.active === s.id ? 'bg-fellini-black text-white' : 'bg-white text-fellini-ghost group-hover:text-fellini-accent transition-colors'}`}>
                        {props.active === s.id ? 'Active Injecting...' : 'Inject Stress'}
                     </div>
                  </div>
               </button>
             ))}
          </div>
       </div>
    </div>
  );
}

function MemoryEvolutionHUD(props: { activeScenario: StressScenario }) {
  const { activeScenario } = props;
  const proposalData = 
    activeScenario === 'LUNA_PATTERN_LEAD' ? {
      id: 'LUNA-PATTERN-01',
      pattern: 'COMMON FAILURE: OVER-CONCENTRATION DRIFT across Stock, Sauce, and Glaze.',
      change: 'LUNA-MOD-001 (CONDITIONAL)\n\nWHEN:\nMode = VELOCITY or PEAK\nAND\nPattern = Over-Concentration Drift\n\nTHEN:\n- Reduce reduction temperature by –7%\n- Extend reduction window by +12%\n\nELSE:\n- Maintain baseline v1.2.0 behaviour',
      oldSpec: 'Standard Reduction Scale',
      newSpec: 'v1.3.1-BETA Calibration',
      isConditional: true
    } : activeScenario === 'MEMORY_STRIKE' ? {
      id: 'STRIKE-03-BREACH',
      pattern: '3rd Consecutive Thermal Flow Breach',
      change: 'Permanent Spec Lock: Increase Helios baseline +5°C',
      oldSpec: '190°C / 45s',
      newSpec: '195°C / 45s',
      isConditional: false
    } : {
      id: 'PROP-HELIOS-01',
      pattern: '15% Sog Drift detected in PEAK state over 3 cycles.',
      change: 'Permanent Baseline Heat +5°C for Helios Engine Rule.',
      oldSpec: 'v2.8 Standard',
      newSpec: 'v2.9 Hardened',
      isConditional: false
    };

  const [proposal, setProposal] = useState<{ id: string; pattern: string; change: string; status: 'PENDING' | 'LOCKED' | 'REJECTED'; isConditional?: boolean } | null>({
    id: proposalData.id,
    pattern: proposalData.pattern,
    change: proposalData.change,
    status: 'PENDING',
    isConditional: proposalData.isConditional
  });

  useEffect(() => {
    setProposal({
      id: proposalData.id,
      pattern: proposalData.pattern,
      change: proposalData.change,
      status: 'PENDING',
      isConditional: proposalData.isConditional
    });
  }, [activeScenario]);

  return (
    <div className="bg-fellini-black rounded-3xl p-12 border border-fellini-rule relative overflow-hidden">
       <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Fingerprint size={200} className="text-fellini-accent" />
       </div>
       <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
             <div className="font-mono text-xs text-fellini-accent uppercase tracking-[0.4em] font-black">Level 3 Memory Lock // Spec Evolution</div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-fellini-red animate-pulse" />
                <span className="font-mono text-[10px] text-fellini-red uppercase tracking-widest font-black">Requires Operator Authorization</span>
             </div>
          </div>

          <AnimatePresence mode="wait">
            {proposal && proposal.status === 'PENDING' && (activeScenario === 'MEMORY_STRIKE' || activeScenario === 'LUNA_PATTERN_LEAD' || activeScenario === 'SOG_PEAK') ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl"
              >
                 <h3 className="font-sans text-4xl font-black text-white uppercase tracking-tighter mb-4">System Evolution Proposal</h3>
                 <p className="font-sans text-sm text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">ID: {proposal.id} // Based on Multi-Domain Pattern Detection</p>
                 
                 <div className="space-y-6 mb-10">
                    <div>
                       <div className="font-mono text-[9px] text-fellini-ghost uppercase mb-2">Detected Pattern</div>
                       <p className="font-serif italic text-xl text-white leading-snug">"{proposal.pattern}"</p>
                    </div>
                    <div>
                       <div className="font-mono text-[9px] text-fellini-ghost uppercase mb-2">Proposed Law Change</div>
                       <p className="font-sans text-lg font-bold text-fellini-accent uppercase tracking-tight mb-6 whitespace-pre-line">{proposal.change}</p>
                       
                       {proposal.isConditional && (
                          <div className="mb-6 p-4 bg-fellini-accent/10 border border-fellini-accent/20 rounded-xl">
                             <p className="font-mono text-[9px] text-fellini-accent uppercase font-black leading-tight mb-1">Context-Bound Law Refinement</p>
                             <p className="font-mono text-[8px] text-white/70 uppercase leading-snug">
                                “All Memory-driven adjustments must be context-bound to Mode and State unless explicitly defined as global.”
                             </p>
                          </div>
                       )}
                        
                       <div className="grid grid-cols-2 gap-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                          <div>
                             <div className="font-mono text-[8px] text-fellini-ghost uppercase mb-2">Current Spec</div>
                             <div className="font-mono text-sm text-white font-bold opacity-40">{proposalData.oldSpec}</div>
                          </div>
                          <div className="border-l border-white/10 pl-8">
                             <div className="font-mono text-[8px] text-fellini-accent uppercase mb-2">Proposed Spec</div>
                             <div className="font-mono text-sm text-fellini-accent font-black">{proposalData.newSpec}</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                      onClick={() => setProposal(prev => prev ? { ...prev, status: 'LOCKED' } : null)}
                      className="px-8 py-4 bg-fellini-accent text-fellini-black font-mono text-xs uppercase tracking-widest font-black rounded-lg hover:scale-105 transition-all"
                    >
                       Approve & Lock Law
                    </button>
                    <button 
                      onClick={() => setProposal(prev => prev ? { ...prev, status: 'REJECTED' } : null)}
                      className="px-8 py-4 bg-white/10 text-white font-mono text-xs uppercase tracking-widest font-black rounded-lg hover:bg-white/20 transition-all border border-white/10"
                    >
                       Reject & Discard
                    </button>
                 </div>
              </motion.div>
            ) : proposal?.status === 'LOCKED' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl py-12 text-center md:text-left"
              >
                 <ShieldCheck size={48} className="text-fellini-green mb-6 mx-auto md:mx-0" />
                 <h3 className="font-sans text-4xl font-black text-fellini-green uppercase tracking-tighter mb-4">Deterministic Law Updated</h3>
                 <p className="font-serif italic text-xl text-white/60 leading-relaxed mb-6">"Proposal {proposal.id} has been validated and locked by Operator. {proposal.isConditional ? 'v1.2.1-BETA → CONTEXT-BOUND → Promoted to FORGE v2.9.2 — STABLE' : 'The engine spec has been versioned to v3.1.2-Adaptive.'}"</p>
                 <button onClick={() => setProposal(null)} className="font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-widest">Acknowledge Version Change</button>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl py-12"
              >
                <div className="font-mono text-xs text-white/40 uppercase tracking-[0.4em] mb-4">The Intelligence Boundary Law</div>
                <h3 className="font-sans text-4xl font-black text-white/30 uppercase tracking-tighter mb-4">No Active Proposals</h3>
                <p className="font-serif italic text-xl text-white/20 leading-relaxed">"Intelligence is observing and suggesting. No automated drift detected that requires law evolution at this stage."</p>
              </motion.div>
            )}
          </AnimatePresence>
       </div>
    </div>
  );
}

// --- Components ---

function DishCard(props: { dish: Dish; onSelect: (d: Dish | null) => void; onPrint?: (d: Dish) => void; key?: string | number }) {
  const { dish, onSelect, onPrint } = props;
  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onSelect(dish)}
      className="bg-white border border-fellini-rule p-6 rounded-2xl cursor-pointer group hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-mono text-[9px] text-fellini-accent uppercase tracking-widest font-black mb-1">{dish.tag}</div>
          <h3 className="font-sans text-xl font-bold text-fellini-black uppercase tracking-tight group-hover:text-fellini-accent transition-colors">{dish.title}</h3>
        </div>
        <div className="flex gap-2">
           {onPrint && (
             <button 
               onClick={(e) => { e.stopPropagation(); onPrint(dish); }}
               className="bg-fellini-bg p-3 md:p-2 rounded-lg text-fellini-ghost hover:text-fellini-accent transition-colors no-print min-w-[44px] min-h-[44px] flex items-center justify-center"
               title="Print Recipe Card"
             >
               <Printer size={20} />
             </button>
           )}
           <div className="bg-fellini-bg p-2 rounded-lg text-fellini-ghost group-hover:text-fellini-accent transition-colors">
             <Terminal size={16} />
           </div>
        </div>
      </div>
      <p className="font-serif italic text-fellini-ghost text-sm mb-6 line-clamp-2">"{dish.signal}"</p>
      <div className="flex gap-4">
        {dish.meta.map((m, i) => (
          <div key={i} className="flex flex-col">
            <span className="font-mono text-[8px] text-fellini-ghost uppercase tracking-widest">{m.label}</span>
            <span className={`font-sans text-[10px] font-bold uppercase ${m.hi ? 'text-fellini-accent' : 'text-fellini-black'}`}>{m.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RecoveryCommandCenter() {
  const [active, setActive] = useState(false);
  
  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] no-print">
      <motion.button 
        onClick={() => setActive(!active)}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all ${active ? 'bg-fellini-red' : 'bg-fellini-black'}`}
      >
        <ActivityIcon className="text-white" size={window.innerWidth < 768 ? 20 : 24} />
      </motion.button>
    </div>
  );
}

function ForgeDashboard({ onPrintSet, printedDish }: { onPrintSet: (dish: Dish | null) => void, printedDish: Dish | null }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedEngineId, setSelectedEngineId] = useState<string | null>(null);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [systemMode, setSystemMode] = useState('PRECISION');
  const [systemState, setSystemState] = useState('LIVE');
  const [userRole, setUserRole] = useState<UserRole>('roles/forge.operator');
  const [activeScenario, setActiveScenario] = useState<StressScenario>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const handlePrint = (dish: Dish) => {
    console.log("[PRINT_ICON_CLICKED]", dish?.id, dish?.title);
    onPrintSet(dish);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const engine = ENGINES.find(e => e.id === selectedEngineId) || null;
  const station = STATIONS.find(s => s.id === selectedStationId) || null;
  
  useEffect(() => {
    if (!engine && !station && !['Overview', 'Observation', 'Stress Test'].includes(activeTab)) {
      setActiveTab('Overview');
    }
  }, [engine, station, activeTab]);

  const allTabs = ['Overview', 'Laws', 'WMM', 'Allergen', 'GP', 'Recovery', 'Observation', 'Stress Test', 'Print'];
  const tabs = allTabs.filter(tab => {
    if (!engine && !station) return ['Overview', 'Observation', 'Stress Test'].includes(tab);
    if (userRole === 'roles/forge.line') return ['Overview', 'Laws', 'WMM', 'Allergen'].includes(tab);
    if (userRole === 'roles/forge.head_chef') return ['Overview', 'Laws', 'WMM', 'Allergen', 'GP', 'Recovery', 'Print'].includes(tab);
    return true;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen md:h-screen bg-fellini-bg overflow-y-auto md:overflow-hidden font-sans select-none relative w-full max-w-full box-border">
      <div className="scanline-overlay pointer-events-none fixed inset-0 z-50 opacity-10" />
      
      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-fellini-rule shrink-0 ${selectedEngineId || selectedStationId ? 'hidden md:flex' : 'flex'} flex-col relative h-auto md:h-full z-40`}>
        <div className="p-8 border-b border-fellini-rule">
           <div className="font-sc text-xl tracking-[0.3em] text-fellini-black uppercase font-bold mb-1">Forge Bible</div>
           <div className="font-mono text-[9px] text-fellini-ghost tracking-[0.2em] uppercase">v2.9.2.STABLE // Observation Engine</div>
        </div>

        <div className="md:flex-1 md:overflow-y-auto py-6">
          <div className="px-8 pb-6 mb-6 border-b border-fellini-rule">
            <button
              onClick={() => { setSelectedEngineId(null); setSelectedStationId(null); }}
              className={`w-full text-left px-6 py-4 flex items-center gap-4 rounded-xl transition-all no-print ${(!selectedEngineId && !selectedStationId) ? 'bg-fellini-accent text-fellini-black shadow-lg scale-[1.02]' : 'hover:bg-fellini-bg text-fellini-ghost hover:text-fellini-black'}`}
            >
              <Layout size={18} className={(!selectedEngineId && !selectedStationId) ? 'text-fellini-black' : 'text-fellini-ghost'} />
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-widest font-bold">Root</span>
                <span className="font-sans text-xs font-black uppercase tracking-tight">Bible Navigator</span>
              </div>
            </button>
          </div>

          <div className="px-8 mb-4 font-mono text-[10px] text-fellini-accent uppercase tracking-[0.4em] font-bold">Station Registry</div>
          <div className="space-y-1 mb-8">
            {STATIONS.map(s => (
              <button
                key={s.id}
                onClick={() => { setSelectedStationId(s.id); setSelectedEngineId(null); }}
                className={`w-full text-left px-8 py-3 flex items-center justify-between group transition-all no-print ${selectedStationId === s.id ? 'bg-fellini-black text-white' : 'hover:bg-fellini-black/5'}`}
              >
                <div className="flex items-center gap-4">
                  <s.icon size={14} className={selectedStationId === s.id ? 'text-fellini-accent' : 'text-fellini-ghost'} />
                  <span className="font-sans text-xs font-bold tracking-tight uppercase">{s.name}</span>
                </div>
                <ChevronRight size={14} className={`transition-transform ${selectedStationId === s.id ? 'translate-x-1 text-fellini-accent' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>

          <div className="px-8 mb-4 font-mono text-[10px] text-fellini-accent uppercase tracking-[0.4em] font-bold">Engine Registry</div>
          <div className="space-y-1">
            {ENGINES.map(e => (
              <button
                key={e.id}
                onClick={() => { setSelectedEngineId(e.id); setSelectedStationId(null); }}
                className={`w-full text-left px-8 py-3 flex items-center justify-between group transition-all no-print ${selectedEngineId === e.id ? 'bg-fellini-black text-white' : 'hover:bg-fellini-black/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-1.5 h-1.5 rounded-full ${selectedEngineId === e.id ? 'bg-fellini-accent' : 'bg-fellini-rule group-hover:bg-fellini-accent'}`} />
                  <div className="flex flex-col">
                    <span className={`font-mono text-[10px] tracking-widest uppercase ${selectedEngineId === e.id ? 'text-fellini-accent' : 'text-fellini-ghost'}`}>{e.num}</span>
                    <span className="font-sans text-xs font-bold tracking-tight uppercase">{e.name.replace('\n', ' ')}</span>
                  </div>
                </div>
                <ChevronRight size={14} className={`transition-transform ${selectedEngineId === e.id ? 'translate-x-1 text-fellini-accent' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 border-t border-fellini-rule bg-fellini-bg/50">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-fellini-green animate-pulse" />
              <div className="font-mono text-[9px] text-fellini-black uppercase tracking-widest font-bold">System Online</div>
           </div>
           <div className="font-mono text-[8px] text-fellini-ghost uppercase tracking-tighter">
             {currentTime.toLocaleDateString()} · {currentTime.toLocaleTimeString()}
           </div>
        </div>
      </aside>

      {/* Main Command Center */}
      <main className="flex-1 flex flex-col w-full min-w-0 h-auto md:h-full overflow-hidden bg-white/30 relative">
        {/* Header Bar */}
        <header className="h-24 md:h-32 border-b border-fellini-rule flex items-center justify-between px-4 md:px-12 bg-white backdrop-blur-md z-30 shrink-0">
          <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
            {engine ? (
              <>
                <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center border border-fellini-rule rounded-xl md:rounded-2xl bg-fellini-bg text-fellini-black shrink-0">
                  {engine.lead?.icon && <engine.lead.icon size={window.innerWidth < 768 ? 16 : 24} />}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[8px] md:text-xs text-fellini-accent tracking-[0.2em] md:tracking-[0.4em] uppercase font-bold mb-0.5 md:mb-1 truncate">{engine.id} // {engine.version}</div>
                  <h1 className="font-sans text-lg md:text-4xl font-black text-fellini-black tracking-tighter uppercase truncate">{engine.name?.replace('\n', ' ')}</h1>
                </div>
                <button
                  onClick={() => { setSelectedEngineId(null); setSelectedStationId(null); }}
                  className="ml-4 p-2 text-fellini-ghost hover:text-fellini-accent transition-colors no-print"
                  title="Back to Navigator"
                >
                  <RefreshCw size={20} />
                </button>
              </>
            ) : station ? (
              <>
                <div className="w-16 h-16 flex items-center justify-center border border-fellini-rule rounded-2xl bg-fellini-bg text-fellini-black">
                  {station.icon && <station.icon size={24} />}
                </div>
                <div>
                  <div className="font-mono text-xs text-fellini-accent tracking-[0.4em] uppercase font-bold mb-1">Station // {station.id}</div>
                  <h1 className="font-sans text-4xl font-black text-fellini-black tracking-tighter uppercase">{station.name} Station</h1>
                </div>
                <button
                  onClick={() => { setSelectedEngineId(null); setSelectedStationId(null); }}
                  className="ml-4 p-2 text-fellini-ghost hover:text-fellini-accent transition-colors no-print"
                  title="Back to Navigator"
                >
                  <RefreshCw size={20} />
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 flex items-center justify-center border-2 border-fellini-black rounded-2xl bg-fellini-accent text-fellini-black shadow-xl">
                  <Cpu size={24} />
                </div>
                <div>
                  <div className="font-mono text-xs text-fellini-accent tracking-[0.4em] uppercase font-bold mb-1">SYSTEM ROOT // FORGE 3.0</div>
                  <h1 className="font-sans text-4xl font-black text-fellini-black tracking-tighter uppercase">Bible Navigator</h1>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-12 text-right">
             <div className="flex flex-col items-end">
               <div className="font-mono text-[9px] text-fellini-ghost tracking-widest uppercase mb-1">System Mode</div>
               <div className="flex bg-fellini-bg rounded-lg p-1 border border-fellini-rule">
                  {['PRECISION', 'VELOCITY'].map(m => (
                    <button 
                      key={m} 
                      onClick={() => setSystemMode(m)}
                      className={`px-3 py-1 font-mono text-[8px] rounded transition-all no-print ${systemMode === m ? 'bg-fellini-black text-white' : 'text-fellini-ghost hover:text-fellini-black'}`}
                    >
                      {m}
                    </button>
                  ))}
               </div>
             </div>
             <div className="w-[1px] h-10 bg-fellini-rule" />
             <div className="flex flex-col items-end">
               <div className="font-mono text-[9px] text-fellini-ghost tracking-widest uppercase mb-1">Access Deck</div>
               <div className="flex bg-fellini-bg rounded-lg p-1 border border-fellini-rule relative group">
                  <div className="absolute -top-6 right-0 font-mono text-[7px] text-fellini-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-white px-2 py-0.5 border border-fellini-rule rounded shadow-sm z-50">
                     Operational Authority Lock Active
                  </div>
                  {(['roles/forge.operator', 'roles/forge.head_chef', 'roles/forge.line'] as UserRole[]).map(r => (
                    <button 
                      key={r} 
                      onClick={() => {
                        setUserRole(r);
                        if (r === 'roles/forge.line' && !['Overview', 'Laws', 'WMM', 'Allergen'].includes(activeTab)) {
                          setActiveTab('Overview');
                        }
                      }}
                      className={`px-3 py-1 font-mono text-[8px] rounded transition-all ${userRole === r ? 'bg-fellini-black text-white' : 'text-fellini-ghost hover:text-fellini-black'}`}
                    >
                      {r.split('.')[1].replace('_', ' ').toUpperCase()}
                    </button>
                  ))}
               </div>
             </div>
             <div className="w-[1px] h-10 bg-fellini-rule" />
             <div className="flex flex-col items-end">
               <div className="font-mono text-[9px] text-fellini-ghost tracking-widest uppercase mb-1">Current State</div>
               <div className="flex items-center gap-3 bg-white border border-fellini-rule px-3 py-1.5 rounded-lg shadow-inner">
                  <div className={`w-2 h-2 rounded-full ${systemState === 'PEAK' ? 'bg-fellini-red' : 'bg-fellini-green'} animate-pulse`} />
                  <select 
                    value={systemState} 
                    onChange={(e) => setSystemState(e.target.value)}
                    className="font-sans text-xs font-black uppercase bg-transparent border-none appearance-none cursor-pointer outline-none text-fellini-black"
                  >
                    {['PREP', 'STAGING', 'LIVE', 'PEAK', 'WIND-DOWN'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="text-fellini-ghost" />
               </div>
             </div>
             <div className="w-[1px] h-10 bg-fellini-rule" />
             <div>
               <div className="font-mono text-[9px] text-fellini-ghost tracking-widest uppercase mb-1">Integrity Score</div>
               <div className="font-sans text-2xl font-bold text-fellini-green">98.4%</div>
             </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="h-14 md:h-16 border-b border-fellini-rule flex items-center px-4 md:px-8 bg-white/50 backdrop-blur-sm z-30 overflow-x-auto no-scrollbar shrink-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-8 h-full font-mono text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all relative border-r border-fellini-rule whitespace-nowrap ${activeTab === tab ? 'text-fellini-black font-extrabold bg-white' : 'text-fellini-ghost hover:text-fellini-black hover:bg-fellini-black/5'}`}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="tab-line" className="absolute bottom-0 left-0 right-0 h-1 bg-fellini-accent" />}
            </button>
          ))}
        </nav>

        {/* Tab Content Area */}
        <div className="flex-1 md:overflow-y-auto p-4 md:p-12 data-grid-bg relative custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + selectedEngineId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-6xl mx-auto"
            >
              {activeTab === 'Overview' && (
                engine ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                     <div className="space-y-12">
                        <div>
                          <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.6em] mb-6 flex items-center gap-4">
                            <Terminal size={14} /> Mission Statement
                            <div className="h-px grow bg-fellini-accent/20" />
                          </div>
                          <p className="font-serif italic text-3xl text-fellini-black leading-tight">
                            "{engine.layers.identity.text}"
                          </p>
                        </div>

                        <div className="bg-white border border-fellini-rule p-8 rounded-2xl shadow-sm">
                          <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.4em] mb-8">Operator Control HUD</div>
                          <div className="flex items-center gap-6">
                             <div className="w-12 h-12 rounded-full border border-fellini-rule flex items-center justify-center bg-fellini-bg">
                                <User size={20} className="text-fellini-ghost" />
                             </div>
                             <div>
                                <div className="font-mono text-[9px] text-fellini-ghost uppercase tracking-widest mb-1">Primary Operator</div>
                                <div className="font-sans text-lg font-bold text-fellini-black uppercase tracking-tight">{engine.operator}</div>
                             </div>
                          </div>
                        </div>
                     </div>

                     <div className="space-y-6">
                        {userRole === 'roles/forge.line' && activeScenario && (
                          <div className="bg-fellini-black rounded-3xl p-10 mb-8 border-4 border-fellini-accent animate-pulse shadow-2xl relative overflow-hidden">
                             <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.5em] font-black mb-4 flex items-center gap-3">
                                <Zap size={14} className="fill-current" /> Task Instruction // Priority One
                             </div>
                             <h3 className="font-sans text-3xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                                {activeScenario === 'COLD_CORE' ? 'RE-PROBE TO 75°C BEFORE PASS' : activeScenario === 'SOG_PEAK' ? 'DROP SMALLER BATCH — REFIRE' : activeScenario === 'FALSE_POSITIVE' ? 'PROBE AGAIN — CONFIRM 75°C BEFORE PASS' : activeScenario === 'LUNA_STARCH_FAIL' ? 'REJECT BATCH — START NEW' : activeScenario === 'LUNA_PURITY_FAIL' ? 'LOWER HEAT' : activeScenario === 'LUNA_STEAM_COLLAPSE' ? 'STRIP SURFACE MOISTURE' : activeScenario === 'LUNA_ENCLOSURE_BREACH' ? 'CHECK SEALS / DOOR' : activeScenario === 'LUNA_PATTERN_LEAD' ? 'REDUCE HEAT BASELINE' : activeScenario === 'BRIDGE_VISCOSITY_FAIL' ? 'ADJUST SAUCE — DO NOT SEND' : activeScenario === 'AETHER_DRIFT_FAIL' ? 'INCREASE VENTILATION — CLEAR AREA' : 'STATION MONITORING ACTIVE'}
                             </h3>
                             <div className="h-px bg-white/20 my-6" />
                             <p className="font-sans text-[10px] text-white/40 uppercase tracking-widest font-bold">
                                Command Source: HELIOS // Recovery Brain Verified
                             </p>
                          </div>
                        )}
                        <div className="font-mono text-[10px] text-fellini-ghost uppercase tracking-[0.4em] mb-4">Core Item Sync</div>
                        {engine?.items.map(dish => (
                           <DishCard key={dish.id} dish={dish} onSelect={setSelectedDish} onPrint={handlePrint} />
                        ))}
                     </div>
                  </div>
                ) : station ? (
                  <div className="space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ENGINES.flatMap(e => e.items).filter(dish => {
                           if (station.id === 'mains') return dish.id.startsWith('main') || dish.id === 'sun01' || dish.id === 'prep024';
                           if (station.id === 'prep') return dish.id.startsWith('sup') || dish.id.startsWith('prep') && dish.id !== 'prep016' && dish.id !== 'prep024';
                           if (station.id === 'dessert') return dish.id === 'prep016' || dish.id === 'prep032';
                           if (station.id === 'fry') return dish.id === 'sun01';
                           return false;
                        }).map(dish => (
                           <DishCard key={dish.id} dish={dish} onSelect={setSelectedDish} onPrint={handlePrint} />
                        ))}
                     </div>
                  </div>
                ) : (
                  <div className="space-y-16">
                     {/* Station Registry (Operational) */}
                     <section>
                        <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.6em] mb-10 flex items-center gap-4">
                          <Layout size={14} /> Station Registry (Operational)
                          <div className="h-px grow bg-fellini-accent/20" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                           {STATIONS.map((s, i) => (
                              <motion.button
                                key={s.id}
                                whileHover={{ scale: 1.05, y: -4 }}
                                onClick={() => setSelectedStationId(s.id)}
                                className="bg-white border border-fellini-rule p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all"
                              >
                                 <div className="w-12 h-12 bg-fellini-bg rounded-xl mb-4 flex items-center justify-center text-fellini-black">
                                    <s.icon size={20} />
                                 </div>
                                 <div className="font-sans text-xs font-black uppercase tracking-tight text-fellini-black">{s.name}</div>
                                 <div className="font-mono text-[8px] text-fellini-ghost uppercase mt-1">Lead: {s.lead}</div>
                              </motion.button>
                           ))}
                        </div>
                     </section>

                     {/* Service & Pass Management */}
                     <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white border border-fellini-rule p-8 rounded-3xl">
                           <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                              <Bell size={14} /> Pass View // Authority Gate
                           </div>
                           <div className="space-y-4">
                              <div className="p-4 bg-fellini-bg rounded-xl border border-fellini-rule flex items-center justify-between">
                                 <div>
                                    <div className="font-sans text-xs font-bold text-fellini-black uppercase">Active AUTHORITY</div>
                                    <div className="font-mono text-[9px] text-fellini-ghost uppercase">Bridge Law Multi-Engine Sync</div>
                                 </div>
                                 <div className="px-3 py-1 bg-fellini-black text-white font-mono text-[9px] rounded">ACTIVE</div>
                              </div>
                              <div className="p-4 border border-fellini-rule rounded-xl flex items-center gap-4 group hover:bg-fellini-bg transition-all">
                                 <div className="w-10 h-10 rounded-lg bg-fellini-bg flex items-center justify-center text-fellini-ghost group-hover:text-fellini-accent transition-colors">
                                    <CheckCircle size={20} />
                                 </div>
                                 <div className="flex-1">
                                    <div className="font-sans text-xs font-bold text-fellini-black uppercase">Pass Submission Queue</div>
                                    <div className="font-mono text-[9px] text-fellini-ghost uppercase tracking-widest">3 items pending validation</div>
                                 </div>
                                 <ArrowRight size={14} className="text-fellini-ghost group-hover:translate-x-1 transition-all" />
                              </div>
                           </div>
                        </div>

                        <div className="bg-white border border-fellini-rule p-8 rounded-3xl">
                           <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                              <Zap size={14} /> Service Modes // Macro State
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              {['Prep Mode', 'Lunch Service', 'Dinner Service', 'Maintenance'].map((mode, i) => (
                                 <button key={mode} className={`p-4 rounded-xl border font-sans text-[10px] font-bold uppercase tracking-widest transition-all ${i === 1 ? 'bg-fellini-accent border-fellini-accent text-fellini-black shadow-lg' : 'border-fellini-rule text-fellini-ghost hover:border-fellini-black'}`}>
                                    {mode}
                                 </button>
                              ))}
                           </div>
                        </div>
                     </section>

                     {/* Agent Registry */}
                     <section>
                        <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.6em] mb-10 flex items-center gap-4">
                          <Users size={14} /> Agent Registry (Active Authorities)
                          <div className="h-px grow bg-fellini-accent/20" />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                           {AGENTS.map(agent => (
                              <motion.div 
                                key={agent.name}
                                whileHover={{ y: -4 }}
                                className="bg-white border border-fellini-rule p-6 rounded-2xl flex flex-col items-center text-center shadow-sm"
                              >
                                 <div 
                                   className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-white shadow-inner"
                                   style={{ backgroundColor: agent.color }}
                                 >
                                    <div className="font-black text-xs">{agent.name[0]}</div>
                                 </div>
                                 <div className="font-mono text-[10px] text-fellini-black font-black tracking-widest uppercase mb-1">{agent.name}</div>
                                 <div className="font-sans text-[8px] text-fellini-ghost uppercase tracking-tighter">Authority: {agent.engineId.toUpperCase()}</div>
                                 <div className="mt-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fellini-green animate-pulse" />
                                    <span className="font-mono text-[7px] text-fellini-green uppercase font-black">Online</span>
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                     </section>

                     {/* Bible (Recipe Registry) */}
                     <section>
                        <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.6em] mb-10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <BookOpen size={14} /> Recipe Registry (The Bible)
                          </div>
                          <div className="relative">
                             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fellini-ghost" />
                             <input 
                               type="text" 
                               placeholder="SEARCH LAWS / RECIPES..." 
                               className="bg-fellini-bg border border-fellini-rule rounded-xl pl-10 pr-4 py-2 font-mono text-[10px] w-64 focus:outline-none focus:border-fellini-accent transition-colors"
                             />
                          </div>
                          <div className="h-px grow bg-fellini-accent/20" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                           {ENGINES.flatMap(e => e.items).map(dish => (
                              <DishCard key={dish.id} dish={dish} onSelect={setSelectedDish} onPrint={handlePrint} />
                           ))}
                        </div>
                     </section>

                     {/* Engine Registry */}
                     <section>
                        <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-[0.6em] mb-10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <Layers size={14} /> Engine Registry (The Bible)
                          </div>
                          <div className="flex items-center gap-4 bg-fellini-bg p-1 rounded-xl border border-fellini-rule">
                             {['ALL', 'PEAK', 'PREP'].map(f => (
                                <button
                                  key={f}
                                  onClick={() => setSystemMode(f === 'ALL' ? 'PRECISION' : f)}
                                  className={`px-4 py-1.5 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all ${((f === 'ALL' && systemMode === 'PRECISION') || systemMode === f) ? 'bg-fellini-black text-white' : 'text-fellini-ghost hover:text-fellini-black'}`}
                                >
                                   {f}
                                </button>
                             ))}
                          </div>
                          <div className="h-px grow bg-fellini-accent/20" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                           {ENGINES.filter(e => {
                              if (systemMode === 'PEAK') return e.id !== 'supply';
                              if (systemMode === 'PREP') return e.id === 'supply' || e.id === 'luna';
                              return true;
                           }).map(e => (
                              <motion.button
                                key={e.id}
                                whileHover={{ scale: 1.02, y: -4 }}
                                onClick={() => setSelectedEngineId(e.id)}
                                className="bg-white border border-fellini-rule p-10 rounded-3xl text-left shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative"
                              >
                                 <div className="absolute top-0 right-0 p-8 font-mono text-4xl text-fellini-bg font-black -mr-4 -mt-4 pointer-events-none group-hover:text-fellini-accent/10 transition-colors">
                                    {e.num}
                                 </div>
                                 <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="w-14 h-14 bg-fellini-bg rounded-2xl flex items-center justify-center text-fellini-black group-hover:bg-fellini-accent group-hover:text-fellini-black transition-colors shadow-sm">
                                       <e.lead.icon size={24} />
                                    </div>
                                 </div>
                                 <h3 className="font-sans text-3xl font-black text-fellini-black uppercase tracking-tighter mb-2 group-hover:text-fellini-accent transition-colors">{e.name.replace('\n', ' ')}</h3>
                                 <p className="font-sans text-[10px] text-fellini-accent font-black uppercase tracking-[0.2em] mb-6">{e.version} // {e.operator}</p>
                                 <div className="font-serif italic text-lg text-fellini-black/60 leading-tight">
                                    "{e.layers.identity.text}"
                                 </div>
                                 <div className="mt-10 pt-6 border-t border-fellini-rule flex items-center justify-between group-hover:border-fellini-accent/30 transition-colors">
                                    <div className="flex items-center gap-3">
                                       <span className="font-mono text-[9px] text-fellini-accent uppercase tracking-[0.3em] font-black">Enter System</span>
                                       <ArrowRight size={14} className="text-fellini-accent group-hover:translate-x-2 transition-transform" />
                                    </div>
                                    <div className="flex -space-x-2">
                                       {[1,2,3].map(i => (
                                          <div key={i} className="w-4 h-4 rounded-full border-2 border-white bg-fellini-bg" />
                                       ))}
                                    </div>
                                 </div>
                              </motion.button>
                           ))}
                        </div>
                     </section>

                     {/* Global State Monitor */}
                     <section className="bg-fellini-black rounded-[2.5rem] p-16 border border-fellini-rule relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-16 opacity-5 pointer-events-none">
                           <Layout size={300} className="text-fellini-accent" />
                        </div>
                        <div className="relative z-10">
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                              <div>
                                 <div className="font-mono text-xs text-fellini-accent uppercase tracking-[0.4em] font-black mb-8">Global System Integration</div>
                                 <h2 className="font-sans text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">FORGE v3.0 // Master Pulse</h2>
                                 <p className="font-serif italic text-xl text-white/50 leading-relaxed mb-12">
                                    "The Bible is not a set of recipes; it is the deterministic logic governing the physical transformation of ingredients. One engine fails, the system drifts. One agent offline, authority collapses."
                                 </p>
                                 <div className="grid grid-cols-2 gap-8">
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                       <div className="font-mono text-[9px] text-fellini-ghost uppercase mb-2">Total Node Count</div>
                                       <div className="font-sans text-3xl font-black text-white">42 Active</div>
                                    </div>
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                       <div className="font-mono text-[9px] text-fellini-ghost uppercase mb-2">Global Integrity</div>
                                       <div className="font-sans text-3xl font-black text-fellini-green">98.4%</div>
                                    </div>
                                 </div>
                              </div>
                              <div className="flex flex-col justify-center">
                                 <div className="space-y-4">
                                    {['Memory Engine: ONLINE', 'Jemma Validator: ACTIVE', 'Aether extraction: OPTIMAL', 'Helios thermal: NOMINAL'].map(line => (
                                       <div key={line} className="flex items-center gap-4 group">
                                          <div className="w-12 h-px bg-fellini-accent group-hover:w-20 transition-all" />
                                          <div className="font-mono text-xs text-white uppercase tracking-widest">{line}</div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </section>
                  </div>
                )
              )}

              {activeTab === 'Laws' && engine && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {engine.layers.executionLaws.map((law, idx) => (
                      <div key={idx} className="bg-white border border-fellini-rule p-10 rounded-2xl group hover:shadow-xl transition-all h-full">
                         <div className="flex items-start gap-6">
                            <div className="font-mono text-xl text-fellini-accent font-black opacity-30 mt-1">L.{String(idx + 1).padStart(2, '0')}</div>
                            <div>
                               <div className="font-mono text-xs text-fellini-black uppercase tracking-widest font-black mb-1">{law.label}</div>
                               <p className="font-sans text-lg text-fellini-ghost leading-relaxed">{law.text}</p>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
              )}

              {activeTab === 'WMM' && engine && (
                <div className="bg-white border border-fellini-rule rounded-2xl overflow-hidden shadow-sm">
                   <div className="divide-y divide-fellini-rule">
                      {engine.layers.wmm.map((item, idx) => (
                        <div key={idx} className="p-8 grid grid-cols-3 gap-8 hover:bg-fellini-bg/20">
                           <div className="font-sans font-bold text-fellini-black tracking-tight uppercase text-lg">{item.item}</div>
                           <div className="font-mono text-base text-fellini-accent">{item.weight}</div>
                           <div className="font-serif italic text-lg text-fellini-ghost leading-snug">{item.method}</div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'Allergen' && (engine || station) && (
                <div className="bg-white border border-fellini-rule rounded-2xl md:rounded-3xl p-6 md:p-16 flex flex-col items-center text-center">
                   <ShieldAlert size={window.innerWidth < 768 ? 48 : 80} className="text-fellini-red mb-4 md:mb-8 animate-pulse" />
                   <h2 className="font-sans text-3xl md:text-5xl font-black text-fellini-red uppercase tracking-tighter mb-4">The Allergen Gate</h2>
                   <div className="font-mono text-[10px] md:text-xs text-fellini-red/60 uppercase tracking-widest mb-8 md:mb-12">Protocol Locked · v2.8.1</div>
                   
                   <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
                      {((engine ? engine.layers.allergenGate.highRisk : [])).map(risk => (
                         <div key={risk} className="bg-fellini-bg border border-fellini-rule p-4 font-mono text-sm text-fellini-red font-black uppercase tracking-widest rounded-xl">
                            {risk}
                         </div>
                      ))}
                   </div>

                   <div className="bg-white border border-fellini-rule p-8 rounded-2xl max-w-xl shadow-lg">
                      <p className="font-serif italic text-2xl text-slate-800 leading-snug">
                        "{engine ? engine.layers.allergenGate.protocol : "STATION PROTOCOL: Verify all inputs against master registry."}"
                      </p>
                   </div>
                </div>
              )}

              {activeTab === 'GP' && engine && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                   <div className="bg-white border border-fellini-rule p-8 md:p-12 rounded-2xl md:rounded-3xl flex flex-col justify-center items-center text-center relative overflow-hidden group">
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-fellini-green origin-left" />
                      <div className="font-mono text-[9px] md:text-[10px] text-fellini-accent uppercase tracking-[0.4em] md:tracking-[0.5em] mb-8 md:mb-12 flex items-center gap-4">
                        <PieChart size={14} /> Profit Mirror
                      </div>
                      <div className="text-6xl md:text-8xl font-black text-fellini-black tracking-tighter mb-4">{engine.layers.gpControl.targetMargin}</div>
                      <div className="font-mono text-[10px] md:text-xs text-fellini-ghost uppercase tracking-[0.3em]">Vertical Target Lock</div>
                   </div>

                   <div className="space-y-8">
                      <div className="bg-white border border-fellini-rule p-10 rounded-2xl">
                         <div className="font-mono text-[10px] text-fellini-ghost uppercase tracking-widest mb-2 font-bold">Portion Baseline</div>
                         <div className="text-3xl font-bold text-fellini-black uppercase tracking-tight">{engine.layers.gpControl.costPerPortion}</div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'Recovery' && (engine || station) && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 space-y-8">
                        {(engine ? engine.layers.recoveryLinks : []).map((link, idx) => (
                           <div key={idx} className="bg-white border border-fellini-rule rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row group">
                              <div className="bg-white p-10 md:w-80 flex flex-col justify-center border-b md:border-b-0 md:border-r border-fellini-rule text-center">
                                 <div className="font-mono text-[9px] text-fellini-red uppercase tracking-widest mb-2 font-bold">Breach Signature</div>
                                 <div className="font-sans font-black text-fellini-red text-xl uppercase tracking-tighter">{link.breach}</div>
                              </div>
                              <div className="p-10 flex-1 space-y-6 flex flex-col">
                                 <div className="flex-1">
                                    <div className="font-mono text-[9px] text-fellini-accent uppercase tracking-widest mb-2 font-bold">Recovery Command</div>
                                    <div className="font-sans text-lg font-bold text-fellini-black uppercase tracking-tight whitespace-pre-line">{link.action}</div>
                                    <div className="h-px bg-fellini-rule/30 my-4" />
                                    <div className="font-mono text-[9px] text-fellini-ghost uppercase tracking-widest mb-2 font-bold">System Adjustment</div>
                                    <div className="font-sans text-sm text-fellini-ghost italic">"{link.adjustment}"</div>
                                 </div>
                                 
                                 <div className="pt-6 flex gap-4">
                                    {(userRole === 'roles/forge.operator' || userRole === 'roles/forge.head_chef') && (
                                      <button className="flex-1 py-3 bg-fellini-black text-white font-mono text-[10px] uppercase tracking-widest font-bold rounded hover:bg-fellini-accent transition-colors flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-100">
                                         <Zap size={14} /> Execute Recovery
                                      </button>
                                    )}
                                    {userRole === 'roles/forge.operator' && (
                                      <button className="px-4 py-3 bg-white border border-fellini-rule text-fellini-ghost font-mono text-[10px] uppercase tracking-widest font-black rounded hover:text-fellini-black transition-colors">
                                         <RefreshCw size={14} />
                                      </button>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <div className="lg:col-span-1 space-y-8">
                        <JemmaSentinel role={userRole} activeScenario={activeScenario} />
                        
                        {(userRole === 'roles/forge.operator' || userRole === 'roles/forge.head_chef') && (
                          <div className="bg-white border border-fellini-rule rounded-2xl p-8 flex flex-col">
                             <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 bg-fellini-bg rounded-xl flex items-center justify-center text-fellini-ghost border border-fellini-rule">
                                   <MessageSquare size={20} />
                                </div>
                                <div>
                                   <div className="font-mono text-[10px] text-fellini-ghost uppercase tracking-widest font-black mb-0.5">Incident Log</div>
                                   <div className="font-sans text-xs text-fellini-black font-bold uppercase">Pattern Submission</div>
                                </div>
                             </div>
                             <textarea 
                               placeholder="Input operational context for pattern matching (e.g., High humidity detected)..."
                               className="flex-1 bg-fellini-bg border border-fellini-rule rounded-lg p-4 font-sans text-xs text-fellini-black focus:outline-none focus:border-fellini-accent min-h-[120px] resize-none mb-4"
                             />
                             <button className="w-full py-3 bg-fellini-black text-white font-mono text-[10px] uppercase tracking-widest font-black rounded hover:bg-fellini-accent transition-colors">
                                Submit to Memory
                             </button>
                          </div>
                        )}
                     </div>
                  </div>
               )}

               {activeTab === 'Observation' && (
                <div className="relative">
                   {userRole !== 'roles/forge.operator' && (
                     <div className="absolute inset-0 z-50 backdrop-blur-md bg-white/60 flex items-center justify-center rounded-3xl border-2 border-dashed border-fellini-rule overflow-hidden">
                        <div className="text-center p-12 max-w-md">
                           <div className="w-16 h-16 bg-fellini-black text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                              <Lock size={32} />
                           </div>
                           <h3 className="font-sans text-2xl font-black text-fellini-black uppercase tracking-tight mb-4">Observation Layer Restricted</h3>
                           <p className="font-serif italic text-lg text-fellini-ghost leading-snug">
                             "Strategic instruments are reserved for the Operator. Execution is clean; Observation is controlled."
                           </p>
                           <div className="mt-8 pt-8 border-t border-fellini-rule font-mono text-[10px] text-fellini-accent uppercase tracking-[0.3em] font-bold">
                              Access Level: {userRole.split('.')[1].replace('_', ' ').toUpperCase()} Required: OPERATOR
                           </div>
                        </div>
                     </div>
                   )}
                   <div className={`space-y-12 ${userRole !== 'roles/forge.operator' ? 'opacity-20 grayscale pointer-events-none' : ''}`}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                         <div className="lg:col-span-1">
                            <IntelArteries />
                         </div>
                         <div className="lg:col-span-1">
                            <VertexInsightHUD />
                         </div>
                         <div className="lg:col-span-1">
                            <AnalyticsPulse />
                         </div>
                      </div>

                      <MemoryEvolutionHUD activeScenario={activeScenario} />

                      <div className="pt-12 mt-12 border-t border-white/5">
                         <div className="flex items-center gap-6 opacity-30">
                            <Lock size={12} className="text-white" />
                            <p className="font-mono text-[9px] text-white uppercase tracking-[0.2em] leading-relaxed max-w-2xl">
                               "Infrastructure authority and operational authority are separate. Cloud IAM protects the platform. FORGE roles protect the kitchen system." — THE SEPARATION LAW
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'Stress Test' && (
                <div className="space-y-12">
                   {userRole !== 'roles/forge.operator' ? (
                      <div className="p-20 bg-white border border-fellini-rule rounded-3xl text-center">
                         <div className="w-20 h-20 bg-fellini-black text-white rounded-2xl flex items-center justify-center mx-auto mb-8">
                            <Lock size={40} />
                         </div>
                         <h3 className="font-sans text-3xl font-black text-fellini-black uppercase tracking-tighter mb-4">Unauthorised Access Detected</h3>
                         <p className="font-serif italic text-xl text-fellini-ghost max-w-xl mx-auto leading-relaxed">
                            "Stress validation and system injection protocols are reserved strictly for the Operator. Your access attempt has been logged."
                         </p>
                      </div>
                   ) : (
                     <>
                        <StressTestHUD onTrigger={setActiveScenario} active={activeScenario} />
                        {activeScenario && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-10 bg-fellini-accent border-2 border-fellini-black rounded-3xl"
                          >
                             <div className="flex items-center gap-4 mb-4">
                                <AlertTriangle size={24} className="text-fellini-black" />
                                <h4 className="font-sans text-xl font-black text-fellini-black uppercase">Active Stress State: {activeScenario.replace('_', ' ')}</h4>
                             </div>
                             <p className="font-sans text-sm text-fellini-black/80 font-bold uppercase tracking-tight">The system is now simulating this failure. Switch roles to verify information discipline and authority containment.</p>
                          </motion.div>
                        )}
                     </>
                   )}
                </div>
              )}

              {activeTab === 'Print' && engine && (
                <div className="bg-white border-4 border-fellini-black p-16 max-w-2xl mx-auto shadow-2xl relative">
                   <div className="absolute top-8 right-8">
                      <Printer size={40} className="text-fellini-black opacity-10" />
                   </div>
                   <div className="flex flex-col items-center text-center mb-12">
                      <div className="font-mono text-[10px] tracking-[0.5em] text-fellini-accent uppercase mb-4 font-black">Archive Print Protocol</div>
                      <h3 className="text-6xl font-black text-fellini-black uppercase leading-[0.8] mb-2">{engine.name?.replace('\n', ' ')}</h3>
                      <div className="font-mono text-[9px] text-fellini-ghost uppercase tracking-widest">{engine.version} // Station Print Card</div>
                   </div>
                   
                   <div className="space-y-4 mb-24 text-center">
                     <button 
                       onClick={() => window.print()}
                       className="bg-fellini-black text-white px-12 py-4 font-mono text-xs uppercase tracking-widest font-black transition-all hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto shrink-0 no-print"
                     >
                       <Printer size={16} /> Execute System Print
                     </button>
                   </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* --- Global Modal --- */}
      <AnimatePresence>
        {selectedDish && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDish(null)} className="absolute inset-0 bg-fellini-black/95 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="w-full max-w-4xl max-h-[95vh] md:max-h-[85vh] bg-white border border-fellini-rule relative z-10 flex flex-col shadow-2xl overflow-hidden rounded-2xl md:rounded-3xl">
              <header className="p-6 md:p-10 border-b border-fellini-rule flex flex-col md:flex-row md:justify-between md:items-center bg-fellini-bg shrink-0">
                 <div className="mb-4 md:mb-0">
                    <div className="font-mono text-[10px] md:text-xs text-fellini-accent uppercase tracking-widest font-black mb-1 md:mb-2">{selectedDish.tag}</div>
                    <h2 className="text-3xl md:text-5xl font-black text-fellini-black uppercase tracking-tighter leading-tight md:leading-none">{selectedDish.title}</h2>
                 </div>
                 <div className="flex gap-4 self-end md:self-auto">
                    <button 
                      onClick={() => handlePrint(selectedDish)} 
                      className="w-12 h-12 md:w-14 md:h-14 bg-fellini-accent text-fellini-black hover:scale-110 transition-all rounded-full flex items-center justify-center shadow-lg no-print"
                      title="Print Card"
                    >
                       <Printer size={window.innerWidth < 768 ? 20 : 24} />
                    </button>
                    <button 
                      onClick={() => { setPrintedDish(selectedDish); setPrintViewActive(true); }}
                      className="hidden md:flex h-12 md:h-14 px-6 md:px-8 bg-slate-100 text-slate-800 font-mono text-[10px] font-black uppercase items-center justify-center rounded-full border border-slate-200 hover:bg-slate-200 transition-all no-print"
                    >
                       Full Print View
                    </button>
                    <button onClick={() => setSelectedDish(null)} className="w-12 h-12 md:w-14 md:h-14 bg-fellini-black text-white hover:scale-110 transition-all rounded-full flex items-center justify-center no-print">
                       <XCircle size={window.innerWidth < 768 ? 20 : 24} />
                    </button>
                 </div>
              </header>
              <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 md:space-y-16 bg-white">
                 <div className="font-serif italic text-xl md:text-3xl text-fellini-black leading-tight border-l-4 md:border-l-8 border-fellini-accent pl-6 md:pl-10">"{selectedDish.signal}"</div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-8">
                       <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-widest font-black flex items-center gap-3"><Box size={14}/> Specification Lock</div>
                       <div className="space-y-4">
                          {selectedDish.fullSpec && Object.entries(selectedDish.fullSpec).map(([k, v]) => (
                             <div key={k} className="border-b border-fellini-rule pb-4">
                               <div className="font-mono text-[9px] text-fellini-ghost uppercase mb-1">{k}</div>
                               <div className="font-sans text-sm text-fellini-black font-bold uppercase tracking-tight">{v}</div>
                             </div>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-8">
                       <div className="font-mono text-[10px] text-fellini-accent uppercase tracking-widest font-black flex items-center gap-3"><RefreshCw size={14}/> Method Logic</div>
                       <div className="space-y-6">
                          {selectedDish.method?.map((m, i) => (
                             <div key={i} className="flex gap-6">
                                <div className="font-mono text-sm text-fellini-ghost opacity-40 shrink-0">{String(i+1).padStart(2, '0')}</div>
                                <div className="font-serif italic text-lg text-fellini-black leading-snug">{m}</div>
                             </div>
                          ))}
                       </div>
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

function PrintSpecCard({ dish }: { dish: Dish }) {
  const engine = ENGINES.find(e => e.items.some(item => item.id === dish.id));
  const station = STATIONS.find(s => {
    if (dish.id.startsWith('main')) return s.id === 'mains';
    if (dish.id.startsWith('sup')) return s.id === 'prep';
    if (dish.id === 'sun01' || dish.id === 'prep024') return s.id === 'mains';
    return s.id === 'prep';
  });

  return (
    <div className="bg-white text-black p-12 min-h-[297mm] w-[210mm]">
      <div className="border-[6px] border-black p-10 min-h-[270mm] flex flex-col">
        {/* Header Block */}
        <div className="flex justify-between items-start border-b-[6px] border-black pb-8 mb-10">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.5em] font-black mb-3 text-slate-500">FORGE SYSTEM // MASTER SPECIFICATION CARD v2.9</div>
            <h1 className="font-sans text-6xl font-black uppercase tracking-tighter m-0 leading-[0.9] mb-4">{dish.title}</h1>
            <div className="flex gap-4">
              <div className="bg-black text-white px-3 py-1 font-mono text-sm font-black">{dish.id}</div>
              <div className="border-2 border-black px-3 py-1 font-mono text-sm font-black text-slate-600">{dish.tag}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase font-black mb-1 opacity-60">Authority Hub</div>
            <div className="font-sans font-black text-4xl uppercase mb-4">{station?.name || 'MASTER'}</div>
            <div className="font-mono text-[10px] uppercase font-black mb-1 opacity-60">Engine Cluster</div>
            <div className="font-sans font-black text-lg uppercase">{engine?.name?.replace('\n', ' ') || 'SYSTEM CORE'}</div>
          </div>
        </div>

        {/* Content Matrix */}
        <div className="grid grid-cols-12 gap-12 flex-1">
          {/* Left Column: Logic & Specs */}
          <div className="col-span-5 space-y-10">
            <section>
              <h2 className="font-mono text-xs uppercase font-black bg-black text-white px-4 py-1 mb-4">01. Metadata / Identity</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                {dish.meta?.map((m, i) => (
                  <div key={i} className="border-b border-black/10 pb-1">
                    <div className="font-mono text-[9px] uppercase text-slate-400 font-bold">{m.label}</div>
                    <div className="font-sans text-sm font-black uppercase">{m.value}</div>
                  </div>
                ))}
                <div className="border-b border-black/10 pb-1">
                  <div className="font-mono text-[9px] uppercase text-slate-400 font-bold">Forge Status</div>
                  <div className="font-sans text-sm font-black uppercase text-green-600">VERIFIED_LAW</div>
                </div>
                <div className="border-b border-black/10 pb-1">
                  <div className="font-mono text-[9px] uppercase text-slate-400 font-bold">Law Lock</div>
                  <div className="font-sans text-sm font-black uppercase">{dish.founderLawLocked ? 'LOCKED (FOUNDER)' : 'ADAPTIVE'}</div>
                </div>
              </div>
            </section>

            {dish.wmm && (
              <section>
                <h2 className="font-mono text-xs uppercase font-black bg-black text-white px-4 py-1 mb-4">02. WMM Mapping</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <h4 className="font-mono text-[10px] uppercase font-black mb-2 text-slate-500 border-b border-black/20">Weights</h4>
                      <ul className="space-y-1">
                        {dish.wmm.weights.map((w, i) => (
                          <li key={i} className="font-sans text-[11px] font-bold uppercase">{w}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-mono text-[10px] uppercase font-black mb-2 text-slate-500 border-b border-black/20">Measures</h4>
                      <ul className="space-y-1">
                        {dish.wmm.measures.map((m, i) => (
                          <li key={i} className="font-sans text-[11px] font-bold uppercase">{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase font-black mb-2 text-slate-500 border-b border-black/20">System Method Block</h4>
                    <p className="font-sans text-[11px] leading-tight font-medium uppercase">{dish.wmm.method.join(' // ')}</p>
                  </div>
                </div>
              </section>
            )}

            <section>
              <h2 className="font-mono text-xs uppercase font-black bg-black text-white px-4 py-1 mb-4">03. Performance Boundaries</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 border border-black/10">
                    <div className="font-mono text-[9px] uppercase font-bold text-slate-500">Pass Signals</div>
                    <ul className="list-disc list-inside mt-1 font-sans text-[10px] font-bold uppercase leading-tight">
                      {dish.passSignals?.map((s, i) => <li key={i}>{s}</li>) || <li>Visual verification by Station Lead</li>}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 border border-red-200">
                    <div className="font-mono text-[9px] uppercase font-bold text-red-600">Reject Boundary</div>
                    <div className="font-sans text-xs font-black uppercase text-red-700 mt-1">{dish.reject}</div>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 border border-black/10">
                  <div className="font-mono text-[9px] uppercase font-bold text-slate-500">Recovery Logic</div>
                  <div className="font-sans text-xs font-bold uppercase mt-1">{dish.maxRecovery || 'NO RECOVERY PATH AVAILABLE'}</div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Narrative & Logic */}
          <div className="col-span-7 border-l-[3px] border-black pl-12 space-y-10">
            <section>
              <h2 className="font-mono text-xs uppercase font-black bg-black text-white px-4 py-1 mb-4">04. Execution Flow</h2>
              <div className="space-y-6">
                {dish.method?.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="font-mono text-lg font-black text-slate-300">0{i + 1}</span>
                    <p className="font-sans text-base leading-snug font-bold uppercase tracking-tight">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-black text-white p-8">
              <div className="flex gap-4 items-center mb-4">
                <Brain size={24} className="text-white" />
                <h2 className="font-mono text-sm uppercase font-black">Critical Note / Jemma Kernel</h2>
              </div>
              <p className="font-serif italic text-2xl leading-tight mb-4 text-white">"{dish.criticalNote}"</p>
              <div className="font-mono text-[9px] uppercase text-slate-400 font-bold border-t border-white/20 pt-4 flex justify-between">
                <span>Validator Ref: {dish.fullSpec?.Jemma || 'PROTO_GATE_ALPHA'}</span>
                <span>Portion GP: {engine?.layers.gpControl.targetMargin || '72%'} LOCK</span>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-8">
              {engine?.layers.timeLaw && (
                <section>
                  <h2 className="font-mono text-xs uppercase font-black border-b-2 border-black pb-1 mb-4">Time Law Baseline</h2>
                  <div className="space-y-2">
                    {engine.layers.timeLaw.map((tl, i) => (
                      <div key={i} className="flex justify-between items-center text-xs border-b border-black/5 pb-1">
                        <span className="font-mono text-[9px] uppercase font-bold text-slate-500">{tl.step}</span>
                        <span className={`font-sans font-black ${tl.critical ? 'text-red-600' : ''}`}>{tl.duration}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              <section>
                <h2 className="font-mono text-xs uppercase font-black border-b-2 border-black pb-1 mb-4">Allergen Shield</h2>
                <div className="bg-yellow-50 p-4 border border-yellow-200">
                  <div className="font-mono text-[9px] uppercase font-black text-yellow-800 mb-2">Protocol: {engine?.layers.allergenGate.protocol || 'STANDARD GATE'}</div>
                  <div className="flex flex-wrap gap-2">
                    {engine?.layers.allergenGate.highRisk.map((r, i) => (
                      <span key={i} className="text-[10px] font-black uppercase text-yellow-900 border border-yellow-400 px-2 py-0.5 rounded">{r}</span>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer Audit Trail */}
        <div className="mt-12 pt-10 border-t-[6px] border-black flex justify-between items-end opacity-60">
          <div className="space-y-1">
            <div className="font-mono text-[9px] uppercase tracking-widest font-black">Secure Bible Extraction Node // Galyons v3.0</div>
            <div className="font-mono text-[9px] uppercase text-slate-400">Timestamp: {new Date().toLocaleString()} // ID: {dish.id}</div>
          </div>
          <div className="font-mono text-[12px] font-black px-6 py-2 border-[3px] border-black uppercase">Official Master Bible Copy</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [printedDish, setPrintedDish] = useState<Dish | null>(null);
  const [printPreviewOpen, setPrintPreviewOpen] = useState(false);

  useEffect(() => {
    const handleAfterPrint = () => {
      // Do not auto-close preview, let user close it if they want, 
      // but clear the print-root dish to prevent ghost prints?
      // Actually, user wants it clean.
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => window.removeEventListener('afterprint', handleAfterPrint);
  }, []);

  const handlePrintTrigger = (dish: Dish) => {
    console.log("[PRINT_PREVIEW_OPEN_REQUEST]", dish?.id, dish?.title);
    setPrintedDish(dish);
    setPrintPreviewOpen(true);
  };

  return (
    <div className="relative min-h-screen">
      {!isEntered ? (
        <div className="fixed inset-0 bg-fellini-bg flex flex-col items-center justify-center p-4 md:p-8 text-center overscroll-none overflow-hidden h-screen select-none font-sans">
          <div className="scanline-overlay pointer-events-none opacity-20" />
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="relative z-10 p-6 md:p-12 bg-white/80 backdrop-blur-xl border border-fellini-rule shadow-2xl max-w-2xl rounded-2xl w-full"
          >
            <div className="engine-rule mx-auto mb-8 md:mb-12" />
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] text-fellini-ghost uppercase block mb-4 md:mb-6 px-4 md:px-12">
              GALYONS — RODZ 2026 SYSTEM KERNEL
            </span>
            <h1 className="font-sans text-4xl md:text-8xl font-bold tracking-tight text-fellini-black uppercase leading-tight mb-4 md:mb-6">
              FELLINI MASTER BIBLE v2.9.2
            </h1>
            <div className="font-mono text-[9px] md:text-[11px] text-fellini-accent mb-8 md:mb-12 tracking-[0.2em] md:tracking-[0.3em]">
              v2.9.2.STABLE · Octagon Engine Active · Adaptive Authority Locked
            </div>
            <button 
              onClick={() => setIsEntered(true)}
              className="group relative font-sans text-[10px] md:text-[12px] font-semibold tracking-[0.2em] md:tracking-[0.3em] text-white uppercase bg-fellini-black px-10 md:px-16 py-4 md:py-5 hover:scale-105 transition-all rounded-full shadow-lg"
            >
              <span className="relative z-10 font-black">Initiate Octagon v2.0</span>
              <motion.div 
                 className="absolute inset-0 bg-fellini-accent/20 -translate-x-full"
                 whileHover={{ translateX: "100%" }}
                 transition={{ duration: 1.5, repeat: Infinity }}
              />
            </button>
            
            <div className="mt-8 flex justify-center">
               <button
                 onClick={() => handlePrintTrigger(ENGINES[1].items[0])}
                 className="text-[8px] font-mono font-bold text-fellini-ghost hover:text-fellini-accent uppercase tracking-widest border border-dashed border-fellini-rule px-4 py-1 rounded"
               >
                 Diagnostic Test Print
               </button>
            </div>
          </motion.div>
        </div>
      ) : (
        <ForgeDashboard onPrintSet={handlePrintTrigger} printedDish={printedDish} />
      )}
      
      {/* 
          Visible Print Preview Layer 
          This proves the document exists before window.print() is called.
      */}
      <AnimatePresence>
        {printPreviewOpen && printedDish && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[200] bg-white overflow-y-auto no-print"
          >
            <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-fellini-rule p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 z-50 shadow-sm">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-fellini-black text-white rounded-full flex items-center justify-center shadow-lg">
                     <Printer size={24} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-black uppercase tracking-widest text-fellini-accent">Master Spec Preview</div>
                    <h2 className="font-sans text-xl md:text-2xl font-black uppercase tracking-tight">{printedDish.title}</h2>
                  </div>
               </div>
               
               <div className="flex items-center gap-3 w-full md:w-auto">
                  <button 
                    onClick={() => {
                      console.log("[PRINT_EXECUTE_ACTION]", printedDish.id);
                      requestAnimationFrame(() => {
                        setTimeout(() => window.print(), 250);
                      });
                    }}
                    className="flex-1 md:flex-none bg-fellini-accent hover:bg-fellini-accent/90 text-fellini-black px-8 py-4 rounded-full font-sans font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl border-2 border-fellini-black/10 transition-transform active:scale-95"
                  >
                    <Printer size={18} /> Print Now
                  </button>
                  <button 
                    onClick={() => {
                      setPrintPreviewOpen(false);
                      setPrintedDish(null);
                    }}
                    className="flex-1 md:flex-none bg-fellini-black hover:bg-fellini-black/90 text-white px-8 py-4 rounded-full font-sans font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-95"
                  >
                    <XCircle size={18} /> Close
                  </button>
               </div>
            </header>

            <div className="max-w-screen-xl mx-auto p-0 md:p-12 flex flex-col items-center">
               <div className="w-full max-w-4xl bg-slate-50 border-2 border-dashed border-slate-200 p-4 mb-4 md:mb-8 rounded-xl text-center font-mono text-[10px] text-slate-400 uppercase font-bold no-print mx-4">
                  Visible preview of the final print document. Inspect format below.
               </div>
               
               {/* Scaling wrapper for mobile viewport centering */}
               <div className="w-full overflow-hidden pb-12 flex justify-center no-print px-4">
                  <div className="bg-white shadow-2xl border border-slate-200 rounded-lg overflow-hidden origin-top scale-[0.38] sm:scale-[0.7] md:scale-100 mb-[-580px] sm:mb-[-150px] md:mb-0 transition-transform duration-300">
                     <PrintSpecCard dish={printedDish} />
                  </div>
               </div>

               <div className="mt-12 mb-24 text-center no-print">
                  <div className="font-mono text-[10px] text-fellini-ghost uppercase tracking-widest">End of Specification Log</div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deterministic Hidden Print Root for window.print() */}
      <div id="print-root" className="hidden print:block absolute inset-0 z-[99999] bg-white">
        {printedDish ? (
           <PrintSpecCard dish={printedDish} />
        ) : (
           <div className="p-20 text-center font-mono uppercase text-red-600 font-bold">
              PRINT ERROR: NO DISH DATA RECEIVED
           </div>
        )}
      </div>
    </div>
  );
}
