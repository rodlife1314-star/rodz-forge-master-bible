# 🧠 FORGE RECOVERY BRAIN — ARCHITECTURE (v2.8.0)

This documentation tracks the backend infrastructure required to power the Adaptive Recovery Layer.

## 1. 🛰️ PUB/SUB — "PULSE"
The system uses a Cloud Pub/Sub topic to broadcast breach events from sensors/manual flags.

### Setup Commands
```bash
# Create the breach event topic
gcloud pubsub topics create forge-breach-events

# Create a subscription for logging and debugging
gcloud pubsub subscriptions create forge-breach-viewer \
    --topic=forge-breach-events
```

## 2. ⚡ CLOUD FUNCTION — "RECOVERY BRAIN"
The "Brain" processes breaches and returns a stabilization path.

### Deployment Script
```bash
gcloud functions deploy forge-recovery-brain \
  --runtime python310 \
  --trigger-topic forge-breach-events \
  --entry-point handle_breach \
  --region europe-west1
```

### 🐍 Logic Matrix (main.py)
```python
import base64
import json

def handle_breach(event, context):
    """Triggered from a message on a Cloud Pub/Sub topic."""
    pubsub_message = base64.b64decode(event['data']).decode('utf-8')
    data = json.loads(pubsub_message)
    
    breach_type = data.get("breach")
    engine = data.get("engine")

    # Recovery Logic Matrix
    logic_matrix = {
        "OIL_TEMP_LOW": {
            "action": "HALT_FRY_STATION",
            "instruction": "Abort batch. Reset oil to 180°C.",
            "system_adjustment": "Delay SIDE-001 (Potatoes) +8min",
            "integrity_recovery": 91
        },
        "YORKSHIRE_FAIL": {
            "action": "REFIRE_BATCH",
            "instruction": "Discard and re-fire Yorkshire batch 01.",
            "system_adjustment": "Delay ENGINE-09 (Meat) +12min",
            "integrity_recovery": 92
        },
        "ALLERGEN_MISSING_SPEC": {
            "action": "SUPPLY_GATE_LOCK",
            "instruction": "Reject delivery. Return to supplier.",
            "system_adjustment": "Flag substitution risk for Station 11",
            "integrity_recovery": 95
        }
    }

    recovery_path = logic_matrix.get(breach_type, {
        "action": "OPERATOR_INTERVENTION",
        "instruction": "Unmapped breach detected. Manual override required.",
        "system_adjustment": "Pause all engines.",
        "integrity_recovery": 85
    })

    print(f"RECIPE RECOVERY INITIATED: {json.dumps(recovery_path)}")
    return recovery_path
```

## 3. 🛡️ UI SHIELD RESPONSE
The frontend (App.tsx) polls or receives these events via Firestore and displays them in the `RecoveryCommandCenter`.
