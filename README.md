# POC-55-DataExhaustFromASingleTap-Adhit
# Data Exhaust From A Single Tap

A Real Rails Intelligence Library Proof of Concept focused on visualizing how a single mobile interaction generates downstream data exhaust across analytics SDKs, location providers, advertising networks, and partner ecosystems.

---

## Overview

Data Exhaust Intelligence is a production-style intelligence dashboard designed to demonstrate how seemingly simple user interactions can trigger multiple downstream data-sharing events.

The platform transforms a single synthetic mobile interaction into an interactive intelligence workflow showing:

* Data propagation chains
* Privacy implications
* Risk assessment
* Intelligence enrichment
* Downstream partner exposure

---

## Core Features

### Interactive Data Exhaust Chain

Visual representation of how a single tap propagates across multiple entities.

### Single Event Replay

Replay the complete event sequence step-by-step.

### Partner Filter System

Dynamically enable or disable:

* Analytics SDK
* Location Provider
* Ad Exchange

and instantly observe the impact on:

* Data flow
* Privacy risk
* Exposure score

### Analytics Intelligence

Includes:

* Risk Contribution Per Partner
* Cumulative Signal Analysis
* Privacy Risk Radar
* Dynamic Risk Scoring

### Emitted Fields Inspector

Displays fields generated during the interaction:

* Device ID
* Session ID
* Timestamp
* App Version
* Location
* Network Type

with sensitivity classifications.

### Intelligence Sidebar

Provides:

* Intelligence Sources
* Privacy Implications
* Mitigation Recommendations
* Risk Context

### Downloadable Dataset

Export the synthetic event sequence used throughout the demonstration.

---

## Technology Stack

### Frontend

* Next.js 14+
* TypeScript
* Tailwind CSS
* shadcn/ui
* ReactFlow
* ECharts
* Axios

### Backend

* FastAPI
* Pandas
* Python

---

## Intelligence Layer

The intelligence layer transforms downstream interaction signals into contextual privacy and exposure intelligence.

### Capabilities

* Data propagation visualization
* Privacy risk scoring
* Signal accumulation analysis
* Exposure pattern detection
* Partner risk contribution analysis
* Intelligence summarization

---

## Data Sources

The project architecture is inspired by public intelligence ecosystems including:

### CFPB

Consumer Financial Protection Bureau datasets representing consumer demand and complaint intelligence.

### GDELT

Global Database of Events, Language and Tone providing event and media intelligence.

### Synthetic Event Feed

Current implementation uses a synthetic mobile interaction dataset to simulate downstream data propagation and privacy exposure patterns.

---

## Architecture

User Tap
↓
Mobile App
↓
Analytics SDK
↓
Location Provider
↓
Ad Exchange
↓
Data Partner
↓
Intelligence Layer
├── CFPB
├── GDELT
└── Synthetic Feed

---

## Frontend Responsibilities

* Dashboard rendering
* ReactFlow visualization
* ECharts analytics
* Event replay
* Interactive filtering
* Data export
* Responsive interface

---

## Backend Responsibilities

* API endpoints
* Dataset orchestration
* Intelligence generation
* Risk scoring
* Analytics aggregation
* Mock data delivery

---

## API Endpoints

| Endpoint            | Description                  |
| ------------------- | ---------------------------- |
| /api/replay         | Returns event sequence       |
| /api/emitted-fields | Returns emitted field data   |
| /api/intelligence   | Returns intelligence summary |

---

## Setup Instructions

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

## Validation & Quality

The project successfully passed:

* Visualization Review
* Interaction Testing
* Responsive Layout Validation
* Filter Validation
* Download Validation
* API Validation

Validated areas include:

* responsiveness
* replay workflow
* filter behavior
* risk calculations
* analytics rendering
* dashboard consistency
* intelligence summaries

---

## Future Improvements

* Geospatial Intelligence Layer
* Historical Trend Analysis
* Multi-user Simulation
* Organization Relationship Mapping
* Advanced Privacy Scoring
* AI-generated Intelligence Summaries

---

## Author

Adhit J

Real Rails Batch 4 — Intelligence Library PoC

POC-55 — Data Exhaust From A Single Tap
