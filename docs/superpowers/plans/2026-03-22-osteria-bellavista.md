# Osteria Bellavista — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a restaurant landing page with a 4-step table booking system for "Osteria Bellavista" as a deployable portfolio demo.

**Architecture:** Monorepo at `osteria-bellavista/` with `backend/` (FastAPI + SQLite) and `frontend/` (React/Vite) deployed independently — Vercel for frontend, Railway with persistent volume for backend. The booking widget is a multi-step React component that fetches available slots via `GET /slots` and submits via `POST /bookings`. Email notification to the restaurant is non-blocking.

**Tech Stack:** Python 3.11, FastAPI 0.115, Pydantic v2, slowapi, smtplib, pytest, httpx — React 18, Vite 5, CSS Modules, Vitest

---

## File Map

```
osteria-bellavista/
├── backend/
│   ├── main.py                  # FastAPI app, CORS, rate limiting, startup
│   ├── database.py              # sqlite3 helpers, table creation, seed data
│   ├── models.py                # Pydantic schemas: BookingCreate, SlotsResponse
│   ├── limiter.py               # shared slowapi Limiter instance
│   ├── email_service.py         # smtplib notification (non-blocking)
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── slots.py             # GET /slots
│   │   └── bookings.py          # POST /bookings
│   ├── tests/
│   │   ├── conftest.py          # TestClient + temp DB fixture
│   │   ├── test_db.py           # DB init/seed unit tests
│   │   ├── test_models.py       # Pydantic validation unit tests
│   │   ├── test_slots.py        # GET /slots integration tests
│   │   └── test_bookings.py     # POST /bookings integration tests
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── railway.toml
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx              # section orchestrator + smooth scroll
    │   ├── index.css            # CSS vars, reset, Google Fonts import
    │   ├── sections/
    │   │   ├── Hero.jsx         # parallax bg, tagline, CTA button
    │   │   ├── Menu.jsx         # static menu grid (4 categories)
    │   │   ├── Gallery.jsx      # photo grid (placeholder images)
    │   │   ├── About.jsx        # story, hours, address, Maps embed
    │   │   └── Footer.jsx       # copyright, social links
    │   ├── components/
    │   │   └── BookingWidget/
    │   │       ├── BookingWidget.jsx     # step orchestrator + state
    │   │       ├── StepIndicator.jsx     # progress dots (1–4)
    │   │       ├── StepDate.jsx          # date picker
    │   │       ├── StepTime.jsx          # available slot buttons
    │   │       ├── StepDetails.jsx       # name, phone, party_size form
    │   │       ├── StepSuccess.jsx       # confirmation screen
    │   │       └── BookingWidget.module.css
    │   └── api/
    │       └── bookingApi.js            # fetchSlots(), createBooking()
    ├── tests/
    │   ├── bookingApi.test.js
    │   └── BookingWidget.test.jsx
    ├── index.html
    ├── vite.config.js
    ├── .env.example
    └── vercel.json
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `osteria-bellavista/.gitignore`
- Create: `osteria-bellavista/README.md`
- Create: `osteria-bellavista/backend/requirements.txt`
- Create: `osteria-bellavista/frontend/` (via Vite)

- [ ] **Step 1: Create project root and backend directory**

```bash
mkdir -p /Users/marco/Documents/ClaudeProjects/osteria-bellavista
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git init
mkdir -p backend/routes backend/tests frontend
```

- [ ] **Step 2: Create .gitignore**

```
# Python
__pycache__/
*.pyc
*.pyo
.venv/
venv/
*.db
.env

# Node
node_modules/
dist/
.env.local

# OS
.DS_Store
```

Save to `osteria-bellavista/.gitignore`.

- [ ] **Step 3: Create backend/requirements.txt**

```
fastapi==0.115.6
uvicorn[standard]==0.32.1
pydantic==2.10.3
slowapi==0.1.9
httpx==0.28.1
pytest==8.3.4
```

- [ ] **Step 4: Create backend virtual env and install deps**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Expected: all packages install without errors.

- [ ] **Step 5: Scaffold frontend with Vite**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
npm create vite@latest frontend -- --template react
cd frontend && npm install
```

- [ ] **Step 6: Add Vitest**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/frontend
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
mkdir tests
```

- [ ] **Step 7: Update vite.config.js to include test config**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
})
```

- [ ] **Step 8: Create tests/setup.js**

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 9: Create backend empty init files**

```bash
touch /Users/marco/Documents/ClaudeProjects/osteria-bellavista/backend/routes/__init__.py
touch /Users/marco/Documents/ClaudeProjects/osteria-bellavista/backend/tests/__init__.py
```

- [ ] **Step 10: Commit scaffold**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add .
git commit -m "chore: project scaffold — backend + frontend monorepo"
```

---

## Task 2: Backend — Database Layer

**Files:**
- Create: `backend/tests/conftest.py`
- Create: `backend/tests/test_db.py`
- Create: `backend/database.py`

- [ ] **Step 1: Write conftest.py (test DB fixture)**

```python
# backend/tests/conftest.py
import os
import pytest
from fastapi.testclient import TestClient


@pytest.fixture(autouse=True)
def test_db(tmp_path, monkeypatch):
    """Each test gets an isolated SQLite file in a temp dir."""
    db_path = str(tmp_path / "test.db")
    monkeypatch.setenv("DATABASE_PATH", db_path)
    from database import init_db
    init_db()
    yield db_path


@pytest.fixture
def client(test_db):
    from main import app
    return TestClient(app)
```

- [ ] **Step 2: Write stub main.py (needed for conftest client fixture import)**

```python
# backend/main.py  (stub — will be replaced in Task 4)
from fastapi import FastAPI
app = FastAPI()
```

- [ ] **Step 3: Write failing test (RED)**

```python
# backend/tests/test_db.py
import sqlite3


def test_tables_created(test_db):
    conn = sqlite3.connect(test_db)
    tables = {r[0] for r in conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table'"
    ).fetchall()}
    assert "bookings" in tables
    assert "slots_config" in tables
    conn.close()


def test_seed_slots(test_db):
    conn = sqlite3.connect(test_db)
    rows = conn.execute("SELECT time_slot FROM slots_config").fetchall()
    slots = {r[0] for r in rows}
    assert slots == {"12:00", "13:00", "20:00", "21:00", "21:30"}
    conn.close()
```

- [ ] **Step 4: Run tests — must fail**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/backend
source .venv/bin/activate
pytest tests/test_db.py -v
```

Expected: `ModuleNotFoundError: No module named 'database'`

- [ ] **Step 5: Write database.py (GREEN)**

```python
# backend/database.py
import os
import sqlite3
import logging
from contextlib import contextmanager

logger = logging.getLogger(__name__)

_SLOTS_SEED = [
    ("12:00", 4),
    ("13:00", 4),
    ("20:00", 4),
    ("21:00", 4),
    ("21:30", 4),
]


def _get_path() -> str:
    return os.environ.get("DATABASE_PATH", "osteria.db")


@contextmanager
def get_db():
    conn = sqlite3.connect(_get_path())
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def _create_tables(conn: sqlite3.Connection) -> None:
    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            phone       TEXT,
            date        DATE    NOT NULL,
            time_slot   TEXT    NOT NULL,
            party_size  INTEGER NOT NULL,
            status      TEXT    NOT NULL DEFAULT 'confirmed',
            created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS slots_config (
            time_slot    TEXT    PRIMARY KEY,
            max_bookings INTEGER NOT NULL,
            is_active    BOOLEAN NOT NULL DEFAULT 1
        )
    """)


def _seed_slots(conn: sqlite3.Connection) -> None:
    conn.executemany(
        "INSERT OR IGNORE INTO slots_config (time_slot, max_bookings, is_active)"
        " VALUES (?, ?, 1)",
        _SLOTS_SEED,
    )


def init_db() -> None:
    with get_db() as conn:
        _create_tables(conn)
        _seed_slots(conn)
    logger.info("Database initialised at %s", _get_path())
```

- [ ] **Step 6: Run tests — must pass**

```bash
pytest tests/test_db.py -v
```

Expected: **2 PASSED**

- [ ] **Step 7: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add backend/
git commit -m "feat: backend database layer with init and seed"
```

---

## Task 3: Backend — Pydantic Models

**Files:**
- Create: `backend/models.py`
- Create: `backend/tests/test_models.py`

- [ ] **Step 1: Write failing tests first**

```python
# backend/tests/test_models.py
import pytest
from datetime import date, timedelta
from pydantic import ValidationError
from models import BookingCreate, SlotsResponse


class TestBookingCreate:
    def _valid(self, **overrides):
        data = {
            "name": "Mario Rossi",
            "date": str(date.today() + timedelta(days=1)),
            "time_slot": "20:00",
            "party_size": 2,
        }
        data.update(overrides)
        return BookingCreate(**data)

    def test_valid_booking(self):
        b = self._valid()
        assert b.name == "Mario Rossi"
        assert b.party_size == 2

    def test_name_stripped(self):
        b = self._valid(name="  Mario  ")
        assert b.name == "Mario"

    def test_name_too_long_raises(self):
        with pytest.raises(ValidationError):
            self._valid(name="x" * 101)

    def test_phone_valid_formats(self):
        for phone in ["+41 91 123 45 67", "0041911234567", "+41-91-123-45-67"]:
            b = self._valid(phone=phone)
            assert b.phone == phone

    def test_phone_too_short_raises(self):
        with pytest.raises(ValidationError):
            self._valid(phone="123")

    def test_phone_invalid_chars_raises(self):
        with pytest.raises(ValidationError):
            self._valid(phone="abc12345678")

    def test_phone_optional(self):
        b = self._valid(phone=None)
        assert b.phone is None

    def test_past_date_raises(self):
        with pytest.raises(ValidationError):
            self._valid(date=str(date.today() - timedelta(days=1)))

    def test_party_size_zero_raises(self):
        with pytest.raises(ValidationError):
            self._valid(party_size=0)

    def test_party_size_eleven_raises(self):
        with pytest.raises(ValidationError):
            self._valid(party_size=11)

    def test_party_size_boundary(self):
        assert self._valid(party_size=1).party_size == 1
        assert self._valid(party_size=10).party_size == 10


class TestSlotsResponse:
    def test_available(self):
        r = SlotsResponse(date_available=True, slots=["20:00", "21:00"])
        assert r.date_available is True
        assert len(r.slots) == 2

    def test_unavailable_empty_slots(self):
        r = SlotsResponse(date_available=False, slots=[])
        assert r.slots == []
```

- [ ] **Step 2: Run tests — expect ImportError (models.py doesn't exist)**

```bash
pytest tests/test_models.py -v
```

Expected: `ModuleNotFoundError: No module named 'models'`

- [ ] **Step 3: Write models.py**

```python
# backend/models.py
import re
from datetime import date
from pydantic import BaseModel, field_validator


class BookingCreate(BaseModel):
    name: str
    phone: str | None = None
    date: date
    time_slot: str
    party_size: int

    @field_validator("name")
    @classmethod
    def name_stripped_and_max(cls, v: str) -> str:
        v = v.strip()
        if len(v) > 100:
            raise ValueError("name must be at most 100 characters")
        return v

    @field_validator("phone")
    @classmethod
    def phone_format(cls, v: str | None) -> str | None:
        if v is None:
            return None
        if not re.match(r'^[\d\+\s\-]{7,15}$', v):
            raise ValueError(
                "phone must be 7–15 characters: digits, +, spaces, dashes"
            )
        return v

    @field_validator("date")
    @classmethod
    def date_not_past(cls, v: date) -> date:
        if v < date.today():
            raise ValueError("date cannot be in the past")
        return v

    @field_validator("party_size")
    @classmethod
    def party_size_range(cls, v: int) -> int:
        if not 1 <= v <= 10:
            raise ValueError("party_size must be between 1 and 10")
        return v


class SlotsResponse(BaseModel):
    date_available: bool
    slots: list[str]


class BookingResponse(BaseModel):
    id: int
    name: str
    date: str
    time_slot: str
    party_size: int
    status: str
```

- [ ] **Step 4: Run tests — all must pass**

```bash
pytest tests/test_models.py -v
```

Expected: **12 PASSED**

- [ ] **Step 5: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add backend/models.py backend/tests/test_models.py
git commit -m "feat: Pydantic models with validation (BookingCreate, SlotsResponse)"
```

---

## Task 4: Backend — GET /slots Endpoint

**Files:**
- Create: `backend/limiter.py`
- Create: `backend/routes/slots.py`
- Create: `backend/tests/test_slots.py`
- Modify: `backend/main.py`

- [ ] **Step 1: Write failing integration tests**

```python
# backend/tests/test_slots.py
from datetime import date, timedelta


TOMORROW = str(date.today() + timedelta(days=1))


def test_slots_returns_all_active_on_empty_day(client):
    resp = client.get(f"/slots?date={TOMORROW}")
    assert resp.status_code == 200
    data = resp.json()
    assert data["date_available"] is True
    assert set(data["slots"]) == {"12:00", "13:00", "20:00", "21:00", "21:30"}


def test_slots_missing_date_returns_422(client):
    resp = client.get("/slots")
    assert resp.status_code == 422


def test_slots_past_date_returns_empty(client):
    yesterday = str(date.today() - timedelta(days=1))
    # Past date still returns response (no bookings possible, but endpoint works)
    resp = client.get(f"/slots?date={yesterday}")
    assert resp.status_code == 200


def test_slots_full_slot_hidden(client, test_db):
    import sqlite3
    conn = sqlite3.connect(test_db)
    # Fill up the 20:00 slot (max_bookings=4)
    for i in range(4):
        conn.execute(
            "INSERT INTO bookings (name, date, time_slot, party_size, status)"
            " VALUES (?, ?, '20:00', 2, 'confirmed')",
            (f"Guest{i}", TOMORROW),
        )
    conn.commit()
    conn.close()

    resp = client.get(f"/slots?date={TOMORROW}")
    assert resp.status_code == 200
    data = resp.json()
    assert "20:00" not in data["slots"]
    assert data["date_available"] is True


def test_slots_all_full_returns_unavailable(client, test_db):
    import sqlite3
    conn = sqlite3.connect(test_db)
    for slot in ["12:00", "13:00", "20:00", "21:00", "21:30"]:
        for i in range(4):
            conn.execute(
                "INSERT INTO bookings (name, date, time_slot, party_size, status)"
                " VALUES (?, ?, ?, 2, 'confirmed')",
                (f"Guest{i}", TOMORROW, slot),
            )
    conn.commit()
    conn.close()

    resp = client.get(f"/slots?date={TOMORROW}")
    data = resp.json()
    assert data["date_available"] is False
    assert data["slots"] == []
```

- [ ] **Step 2: Run tests — expect 404 (route not registered)**

```bash
pytest tests/test_slots.py -v
```

Expected: all fail with `assert 404 == 200`

- [ ] **Step 3: Create limiter.py (shared Limiter instance)**

```python
# backend/limiter.py
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
```

**Why a separate module:** both `routes/slots.py` and `routes/bookings.py` need the same `Limiter` instance that's registered on `app.state.limiter`. If each route creates its own instance, the `RateLimitExceeded` error handler won't fire correctly (it's tied to `app.state.limiter`).

- [ ] **Step 4: Write routes/slots.py**

```python
# backend/routes/slots.py
import logging
from datetime import date as date_type

from fastapi import APIRouter, Query, Request

from database import get_db
from limiter import limiter
from models import SlotsResponse

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/slots", response_model=SlotsResponse)
@limiter.limit("30/minute")
def get_slots(request: Request, date: date_type = Query(...)):
    with get_db() as conn:
        active_slots = conn.execute(
            "SELECT time_slot, max_bookings FROM slots_config WHERE is_active = 1"
        ).fetchall()

        available: list[str] = []
        for row in active_slots:
            slot = row["time_slot"]
            max_b = row["max_bookings"]
            count = conn.execute(
                "SELECT COUNT(*) FROM bookings"
                " WHERE date = ? AND time_slot = ? AND status = 'confirmed'",
                (str(date), slot),
            ).fetchone()[0]
            if count < max_b:
                available.append(slot)

    available.sort()
    return SlotsResponse(date_available=len(available) > 0, slots=available)
```

- [ ] **Step 5: Update main.py stub to include the router**

```python
# backend/main.py
import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from database import init_db
from limiter import limiter
from routes.slots import router as slots_router

logging.basicConfig(level=logging.INFO)

app = FastAPI(title="Osteria Bellavista API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

CORS_ORIGIN = os.environ.get("CORS_ORIGIN", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[CORS_ORIGIN],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(slots_router)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.on_event("startup")
def startup():
    init_db()
```

- [ ] **Step 6: Run tests — all must pass**

```bash
pytest tests/test_slots.py -v
```

Expected: **5 PASSED**

- [ ] **Step 7: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add backend/
git commit -m "feat: GET /slots endpoint with availability logic"
```

---

## Task 5: Backend — POST /bookings Endpoint

**Files:**
- Create: `backend/routes/bookings.py`
- Create: `backend/tests/test_bookings.py`

- [ ] **Step 1: Write failing tests**

```python
# backend/tests/test_bookings.py
from datetime import date, timedelta
import pytest

TOMORROW = str(date.today() + timedelta(days=1))

VALID_PAYLOAD = {
    "name": "Mario Rossi",
    "date": TOMORROW,
    "time_slot": "20:00",
    "party_size": 2,
}


def test_create_booking_returns_201(client):
    resp = client.post("/bookings", json=VALID_PAYLOAD)
    assert resp.status_code == 201
    data = resp.json()
    assert data["name"] == "Mario Rossi"
    assert data["status"] == "confirmed"
    assert data["time_slot"] == "20:00"
    assert "id" in data


def test_create_booking_with_phone(client):
    payload = {**VALID_PAYLOAD, "phone": "+41 91 123 45 67"}
    resp = client.post("/bookings", json=payload)
    assert resp.status_code == 201


def test_invalid_party_size_returns_422(client):
    payload = {**VALID_PAYLOAD, "party_size": 0}
    resp = client.post("/bookings", json=payload)
    assert resp.status_code == 422


def test_past_date_returns_422(client):
    payload = {**VALID_PAYLOAD, "date": str(date.today() - timedelta(days=1))}
    resp = client.post("/bookings", json=payload)
    assert resp.status_code == 422


def test_nonexistent_slot_returns_422(client):
    # "99:99" is not in slots_config — route raises 422 at DB lookup, not Pydantic
    payload = {**VALID_PAYLOAD, "time_slot": "99:99"}
    resp = client.post("/bookings", json=payload)
    assert resp.status_code == 422


def test_full_slot_returns_409(client, test_db):
    import sqlite3
    conn = sqlite3.connect(test_db)
    for i in range(4):
        conn.execute(
            "INSERT INTO bookings (name, date, time_slot, party_size, status)"
            " VALUES (?, ?, '20:00', 2, 'confirmed')",
            (f"Guest{i}", TOMORROW),
        )
    conn.commit()
    conn.close()

    resp = client.post("/bookings", json=VALID_PAYLOAD)
    assert resp.status_code == 409


def test_booking_persisted_in_db(client, test_db):
    import sqlite3
    client.post("/bookings", json=VALID_PAYLOAD)
    conn = sqlite3.connect(test_db)
    rows = conn.execute("SELECT * FROM bookings").fetchall()
    assert len(rows) == 1
    assert rows[0][1] == "Mario Rossi"  # name column
    conn.close()
```

- [ ] **Step 2: Run tests — expect 404**

```bash
pytest tests/test_bookings.py -v
```

Expected: fail with `assert 404 == 201`

- [ ] **Step 3: Write routes/bookings.py**

```python
# backend/routes/bookings.py
import logging

from fastapi import APIRouter, HTTPException, Request

from database import get_db
from limiter import limiter
from models import BookingCreate, BookingResponse

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/bookings", response_model=BookingResponse, status_code=201)
@limiter.limit("5/minute")
def create_booking(request: Request, booking: BookingCreate):
    with get_db() as conn:
        slot_row = conn.execute(
            "SELECT max_bookings FROM slots_config"
            " WHERE time_slot = ? AND is_active = 1",
            (booking.time_slot,),
        ).fetchone()
        if not slot_row:
            raise HTTPException(status_code=422, detail="Invalid time slot")

        count = conn.execute(
            "SELECT COUNT(*) FROM bookings"
            " WHERE date = ? AND time_slot = ? AND status = 'confirmed'",
            (str(booking.date), booking.time_slot),
        ).fetchone()[0]
        if count >= slot_row["max_bookings"]:
            raise HTTPException(status_code=409, detail="Time slot fully booked")

        cursor = conn.execute(
            "INSERT INTO bookings (name, phone, date, time_slot, party_size, status)"
            " VALUES (?, ?, ?, ?, ?, 'confirmed')",
            (
                booking.name,
                booking.phone,
                str(booking.date),
                booking.time_slot,
                booking.party_size,
            ),
        )
        booking_id = cursor.lastrowid
        row = conn.execute(
            "SELECT * FROM bookings WHERE id = ?", (booking_id,)
        ).fetchone()

    # Email is fire-and-forget — import here to allow easy mocking
    try:
        from email_service import send_notification
        send_notification(dict(row))
    except Exception as exc:
        logger.error("Email notification failed for booking %s: %s", booking_id, exc)

    return BookingResponse(
        id=row["id"],
        name=row["name"],
        date=row["date"],
        time_slot=row["time_slot"],
        party_size=row["party_size"],
        status=row["status"],
    )
```

- [ ] **Step 4: Register bookings router in main.py**

Add after `from routes.slots import router as slots_router`:

```python
from routes.bookings import router as bookings_router
```

And after `app.include_router(slots_router)`:

```python
app.include_router(bookings_router)
```

- [ ] **Step 5: Create email_service.py stub (needed for import)**

```python
# backend/email_service.py
import logging
import os
import smtplib
from email.mime.text import MIMEText

logger = logging.getLogger(__name__)

RESTAURANT_EMAIL = os.environ.get("RESTAURANT_EMAIL", "")
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD", "")


def send_notification(booking: dict) -> None:
    """Send booking details to restaurant. No-op if env vars not set."""
    if not RESTAURANT_EMAIL or not SMTP_USER or not SMTP_PASSWORD:
        logger.debug("Email env vars not set — skipping notification")
        return

    body = (
        f"Nuova prenotazione!\n\n"
        f"Nome:    {booking['name']}\n"
        f"Telefono: {booking.get('phone') or 'non fornito'}\n"
        f"Data:    {booking['date']}\n"
        f"Orario:  {booking['time_slot']}\n"
        f"Coperti: {booking['party_size']}\n"
        f"ID:      {booking['id']}\n"
    )
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = (
        f"Nuova prenotazione — {booking['date']} {booking['time_slot']}"
    )
    msg["From"] = SMTP_USER
    msg["To"] = RESTAURANT_EMAIL

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)

    logger.info("Email sent to %s for booking %s", RESTAURANT_EMAIL, booking["id"])
```

- [ ] **Step 6: Run all backend tests**

```bash
pytest tests/ -v
```

Expected: **all tests PASSED** (test_db: 2, test_models: 12, test_slots: 5, test_bookings: 7 = **26 PASSED**)

- [ ] **Step 7: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add backend/
git commit -m "feat: POST /bookings endpoint with slot validation and email notification"
```

---

## Task 6: Backend — Dockerfile + Deploy Config

**Files:**
- Create: `backend/Dockerfile`
- Create: `backend/railway.toml`
- Create: `backend/.env.example`

- [ ] **Step 1: Write Dockerfile**

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

- [ ] **Step 2: Write railway.toml**

```toml
[build]
builder = "DOCKERFILE"

[deploy]
startCommand = "uvicorn main:app --host 0.0.0.0 --port $PORT"
healthcheckPath = "/health"
restartPolicyType = "ON_FAILURE"
```

**Note on Railway persistent volume:** In Railway dashboard, add a volume mounted at `/data` and set `DATABASE_PATH=/data/osteria.db` as an env var. The SQLite file will survive redeploys.

- [ ] **Step 3: Write .env.example**

```text
# Copy to .env and fill in values (never commit .env)
DATABASE_PATH=osteria.db
RESTAURANT_EMAIL=ristorante@example.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail@gmail.com
SMTP_PASSWORD=your_app_password
# Change to Vercel URL in production (e.g. https://osteria-bellavista.vercel.app)
CORS_ORIGIN=http://localhost:5173
```

- [ ] **Step 4: Verify Docker build (optional local check)**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/backend
docker build -t osteria-backend .
```

Expected: build completes without errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add backend/Dockerfile backend/railway.toml backend/.env.example
git commit -m "chore: backend Docker + Railway deploy config"
```

---

## Task 7: Frontend — Scaffold (CSS, Fonts, App Shell)

**Files:**
- Modify: `frontend/index.html`
- Modify: `frontend/src/index.css`
- Modify: `frontend/src/App.jsx`
- Modify: `frontend/src/main.jsx`
- Create: `frontend/.env.example`

- [ ] **Step 1: Update index.html with Google Fonts + meta**

```html
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Osteria Bellavista — Cucina ticinese a Lugano. Prenota il tuo tavolo online." />
    <title>Osteria Bellavista — Lugano</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Write index.css (CSS variables + reset)**

```css
/* src/index.css */

:root {
  /* Palette */
  --dark:       #1a1a1a;
  --olive:      #3d6b4f;
  --olive-dark: #2d5040;
  --terracotta: #c4614a;
  --sand:       #e8d5b0;
  --cream:      #f7f3ee;
  --white:      #ffffff;

  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans:  'Inter', system-ui, sans-serif;

  /* Spacing */
  --section-pad: clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 8rem);
  --radius:      6px;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  font-family: var(--font-sans);
  color: var(--dark);
  background: var(--cream);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

img {
  display: block;
  max-width: 100%;
}

button {
  cursor: pointer;
  font-family: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 3: Write main.jsx**

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 4: Write App.jsx shell (imports only — sections added next)**

```jsx
// src/App.jsx
import Hero from './sections/Hero.jsx'
import Menu from './sections/Menu.jsx'
import Gallery from './sections/Gallery.jsx'
import BookingSection from './sections/BookingSection.jsx'
import About from './sections/About.jsx'
import Footer from './sections/Footer.jsx'

export default function App() {
  return (
    <>
      <Hero />
      <Menu />
      <Gallery />
      <BookingSection />
      <About />
      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Create .env.example**

```
VITE_API_URL=http://localhost:8000
```

- [ ] **Step 6: Create placeholder section files so App.jsx doesn't crash**

Create each file with a minimal export:

```jsx
// src/sections/Hero.jsx
export default function Hero() { return <section id="hero" /> }
```

Repeat for `Menu.jsx`, `Gallery.jsx`, `BookingSection.jsx`, `About.jsx`, `Footer.jsx`.

- [ ] **Step 7: Verify dev server starts**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/frontend
npm run dev
```

Expected: `http://localhost:5173` loads with blank page (no errors in console).

- [ ] **Step 8: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add frontend/
git commit -m "feat: frontend scaffold — Vite, fonts, CSS vars, App shell"
```

---

## Task 8: Frontend — Hero Section

**Files:**
- Modify: `frontend/src/sections/Hero.jsx`
- Create: `frontend/src/sections/Hero.module.css`
- Create: `frontend/tests/Hero.test.jsx`

- [ ] **Step 1: Write failing test (RED)**

```jsx
// frontend/tests/Hero.test.jsx
import { render, screen } from '@testing-library/react'
import Hero from '../src/sections/Hero'

test('renders CTA button with booking text', () => {
  render(<Hero />)
  expect(screen.getByText(/Prenota un tavolo/i)).toBeInTheDocument()
})

test('renders restaurant logo name', () => {
  render(<Hero />)
  expect(screen.getByText(/Osteria Bellavista/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — must fail**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/frontend
npx vitest run tests/Hero.test.jsx
```

Expected: FAIL (Hero is an empty stub from Task 7)

- [ ] **Step 3: Write Hero.module.css**

```css
/* Hero uses a dark bg + parallax background image */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  overflow: hidden;
}

.bg {
  position: absolute;
  inset: 0;
  background-image: url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80');
  background-size: cover;
  background-position: center;
  opacity: 0.35;
  will-change: transform;
}

.nav {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem clamp(1.5rem, 6vw, 8rem);
}

.logo {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  letter-spacing: 0.15em;
  color: var(--olive);
  text-transform: uppercase;
}

.navLinks {
  display: flex;
  gap: 2rem;
  list-style: none;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  color: rgba(232, 213, 176, 0.7);
}

.navLinks a:hover {
  color: var(--sand);
}

.content {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--section-pad);
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--olive);
  text-transform: uppercase;
  margin-bottom: 1.25rem;
}

.title {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 7vw, 5rem);
  font-weight: 700;
  color: var(--sand);
  line-height: 1.1;
  max-width: 14ch;
  margin-bottom: 1.5rem;
}

.tagline {
  font-size: 1.05rem;
  color: rgba(232, 213, 176, 0.6);
  max-width: 40ch;
  margin-bottom: 2.5rem;
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--olive);
  color: var(--white);
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 2rem;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background 0.2s, transform 0.15s;
  width: fit-content;
}

.cta:hover {
  background: var(--olive-dark);
  transform: translateY(-1px);
}

.scroll {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(232, 213, 176, 0.3);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

@media (max-width: 640px) {
  .navLinks { display: none; }
}
```

- [ ] **Step 4: Write Hero.jsx (GREEN)**

```jsx
// src/sections/Hero.jsx
import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const bgRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg} ref={bgRef} />

      <nav className={styles.nav}>
        <span className={styles.logo}>Osteria Bellavista</span>
        <ul className={styles.navLinks}>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#booking">Prenota</a></li>
          <li><a href="#about">Contatti</a></li>
        </ul>
      </nav>

      <div className={styles.content}>
        <p className={styles.subtitle}>Dal 1987 · Lugano</p>
        <h1 className={styles.title}>Una cucina che racconta il territorio.</h1>
        <p className={styles.tagline}>
          Sapori autentici del Ticino, in riva al lago. Ingredienti locali,
          ricette di famiglia, accoglienza di casa.
        </p>
        <a href="#booking" className={styles.cta}>
          Prenota un tavolo →
        </a>
      </div>

      <span className={styles.scroll}>▼ scroll</span>
    </section>
  )
}
```

- [ ] **Step 5: Run test — must pass**

```bash
npx vitest run tests/Hero.test.jsx
```

Expected: **2 PASSED**

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```

Navigate to `http://localhost:5173` — hero with dark background, parallax on scroll, olive CTA button.

- [ ] **Step 7: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add frontend/src/sections/Hero.jsx frontend/src/sections/Hero.module.css frontend/tests/Hero.test.jsx
git commit -m "feat: Hero section with parallax and CTA"
```

---

## Task 9: Frontend — Menu + Gallery + About + Footer Sections

**Files:**
- Create: `frontend/tests/StaticSections.test.jsx`
- Modify: `frontend/src/sections/Menu.jsx`, `Menu.module.css`
- Modify: `frontend/src/sections/Gallery.jsx`, `Gallery.module.css`
- Modify: `frontend/src/sections/About.jsx`, `About.module.css`
- Modify: `frontend/src/sections/Footer.jsx`

These are static sections. Implement each as a self-contained component.

- [ ] **Step 1: Write failing smoke tests (RED)**

```jsx
// frontend/tests/StaticSections.test.jsx
import { render, screen } from '@testing-library/react'
import Menu from '../src/sections/Menu'
import Footer from '../src/sections/Footer'

test('Menu renders at least one dish category', () => {
  render(<Menu />)
  expect(screen.getByText(/Antipasti/i)).toBeInTheDocument()
})

test('Footer renders restaurant name', () => {
  render(<Footer />)
  expect(screen.getByText(/Osteria Bellavista/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run tests — must fail**

```bash
npx vitest run tests/StaticSections.test.jsx
```

Expected: FAIL (stubs have no content)

- [ ] **Step 3: Write Menu.jsx + Menu.module.css**

```css
/* Menu.module.css */
.section {
  background: var(--cream);
  padding: var(--section-pad);
}

.label {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 0.75rem;
}

.title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: var(--dark);
  margin-bottom: 3rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}

.category {
  background: var(--white);
  border-radius: var(--radius);
  padding: 1.5rem;
}

.categoryName {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--olive);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--cream);
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  border-bottom: 1px dotted var(--cream);
  gap: 1rem;
}

.item:last-child { border-bottom: none; }

.price {
  color: var(--terracotta);
  font-weight: 500;
  white-space: nowrap;
}
```

```jsx
// Menu.jsx
import styles from './Menu.module.css'

const MENU = [
  {
    name: 'Antipasti',
    items: [
      { dish: 'Salumi e formaggi ticinesi', price: 'CHF 18' },
      { dish: 'Carpaccio di manzo', price: 'CHF 16' },
      { dish: 'Bruschetta al pomodoro', price: 'CHF 10' },
    ],
  },
  {
    name: 'Primi',
    items: [
      { dish: 'Risotto al Merlot e salsiccia', price: 'CHF 24' },
      { dish: 'Tagliatelle al ragù ticinese', price: 'CHF 22' },
      { dish: 'Minestrone della nonna', price: 'CHF 16' },
    ],
  },
  {
    name: 'Secondi',
    items: [
      { dish: 'Brasato al Merlot', price: 'CHF 34' },
      { dish: 'Filetto di persico del lago', price: 'CHF 30' },
      { dish: 'Costolette d\'agnello', price: 'CHF 36' },
    ],
  },
  {
    name: 'Dolci',
    items: [
      { dish: 'Torta di noci ticinese', price: 'CHF 9' },
      { dish: 'Panna cotta al grappa', price: 'CHF 10' },
      { dish: 'Sorbetto al limone', price: 'CHF 8' },
    ],
  },
]

export default function Menu() {
  return (
    <section className={styles.section} id="menu">
      <p className={styles.label}>Il Menu</p>
      <h2 className={styles.title}>Sapori autentici del Ticino</h2>
      <div className={styles.grid}>
        {MENU.map(cat => (
          <div key={cat.name} className={styles.category}>
            <h3 className={styles.categoryName}>{cat.name}</h3>
            {cat.items.map(item => (
              <div key={item.dish} className={styles.item}>
                <span>{item.dish}</span>
                <span className={styles.price}>{item.price}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Write Gallery.jsx + Gallery.module.css**

```css
/* Gallery.module.css */
.section {
  background: var(--dark);
  padding: var(--section-pad);
}

.label {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--olive);
  margin-bottom: 0.75rem;
}

.title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: var(--sand);
  margin-bottom: 2rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 0.75rem;
}

.grid img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: var(--radius);
}

.grid img:first-child {
  grid-column: span 2;
  height: 320px;
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .grid img:first-child { grid-column: span 1; height: 220px; }
}
```

```jsx
// Gallery.jsx
import styles from './Gallery.module.css'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Piatto principale' },
  { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', alt: 'Pasta fresca' },
  { src: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', alt: 'Carne alla griglia' },
  { src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80', alt: 'Interno ristorante' },
  { src: 'https://images.unsplash.com/photo-1551183053-bf91798d792b?w=600&q=80', alt: 'Dessert' },
]

export default function Gallery() {
  return (
    <section className={styles.section} id="gallery">
      <p className={styles.label}>Galleria</p>
      <h2 className={styles.title}>I nostri piatti</h2>
      <div className={styles.grid}>
        {PHOTOS.map(p => (
          <img key={p.src} src={p.src} alt={p.alt} loading="lazy" />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Write About.jsx + About.module.css**

```css
/* About.module.css */
.section {
  background: var(--cream);
  padding: var(--section-pad);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.label {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--terracotta);
  margin-bottom: 0.75rem;
}

.title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.25rem);
  color: var(--dark);
  margin-bottom: 1.25rem;
}

.text {
  font-size: 1rem;
  color: #444;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.info dt {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--olive);
  margin-top: 1.25rem;
}

.info dd {
  font-size: 0.95rem;
  color: var(--dark);
  margin-top: 0.2rem;
}

.map {
  width: 100%;
  height: 320px;
  border-radius: var(--radius);
  border: none;
  filter: grayscale(30%);
}

@media (max-width: 768px) {
  .section { grid-template-columns: 1fr; gap: 2.5rem; }
}
```

```jsx
// About.jsx
import styles from './About.module.css'

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div>
        <p className={styles.label}>Chi siamo</p>
        <h2 className={styles.title}>Una storia di famiglia dal 1987</h2>
        <p className={styles.text}>
          Osteria Bellavista nasce dalla passione della famiglia Luisoni per la
          cucina ticinese autentica. Ogni piatto racconta la storia di questo
          territorio: ingredienti a km zero, ricette tramandate di generazione
          in generazione, un'accoglienza che fa sentire a casa.
        </p>
        <dl className={styles.info}>
          <dt>Indirizzo</dt>
          <dd>Via Lago 12, 6900 Lugano</dd>

          <dt>Telefono</dt>
          <dd>+41 91 XXX XX XX</dd>

          <dt>Orari</dt>
          <dd>Mar–Dom: 12:00–14:00 / 19:30–22:00</dd>
          <dd>Lunedì: chiuso</dd>
        </dl>
      </div>
      <div>
        <iframe
          className={styles.map}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2783.5!2d8.9511!3d46.0037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDAwJzEzLjMiTiA4wrA1NyczOS45IkU!5e0!3m2!1sit!2sch!4v1234"
          title="Posizione Osteria Bellavista"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Write Footer.jsx**

```jsx
// Footer.jsx
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.brand}>Osteria Bellavista</span>
        <span className={styles.copy}>© {new Date().getFullYear()} — Via Lago 12, Lugano</span>
        <div className={styles.links}>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">IG</a>
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">FB</a>
        </div>
      </div>
    </footer>
  )
}
```

```css
/* Footer.module.css */
.footer {
  background: var(--dark);
  padding: 2rem clamp(1.5rem, 6vw, 8rem);
}

.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.brand {
  font-family: var(--font-serif);
  color: var(--olive);
  font-size: 0.95rem;
}

.copy {
  font-size: 0.8rem;
  color: rgba(232, 213, 176, 0.4);
}

.links {
  display: flex;
  gap: 1.5rem;
  font-size: 0.8rem;
  color: rgba(232, 213, 176, 0.5);
}

.links a:hover { color: var(--sand); }
```

- [ ] **Step 7: Run tests — must pass**

```bash
npx vitest run tests/StaticSections.test.jsx
```

Expected: 2 passed

- [ ] **Step 8: Commit all sections + tests**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add frontend/src/sections/ frontend/tests/StaticSections.test.jsx
git commit -m "feat: Menu, Gallery, About, Footer sections with smoke tests"
```

---

## Task 10: Frontend — Booking API Layer + Tests

**Files:**
- Create: `frontend/src/api/bookingApi.js`
- Create: `frontend/tests/bookingApi.test.js`

- [ ] **Step 1: Write failing tests**

```js
// frontend/tests/bookingApi.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchSlots, createBooking } from '../src/api/bookingApi'

const mockFetch = vi.fn()
globalThis.fetch = mockFetch

describe('fetchSlots', () => {
  beforeEach(() => mockFetch.mockReset())

  it('calls correct URL and returns parsed JSON', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ date_available: true, slots: ['20:00'] }),
    })
    const result = await fetchSlots('2026-04-01')
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/slots?date=2026-04-01')
    )
    expect(result.date_available).toBe(true)
    expect(result.slots).toEqual(['20:00'])
  })

  it('throws on non-ok response', async () => {
    mockFetch.mockResolvedValue({ ok: false })
    await expect(fetchSlots('2026-04-01')).rejects.toThrow('Failed to fetch slots')
  })
})

describe('createBooking', () => {
  beforeEach(() => mockFetch.mockReset())

  it('POSTs JSON and returns parsed response', async () => {
    const payload = { name: 'Mario', date: '2026-04-01', time_slot: '20:00', party_size: 2 }
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1, ...payload, status: 'confirmed' }),
    })
    const result = await createBooking(payload)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/bookings'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(result.id).toBe(1)
    expect(result.status).toBe('confirmed')
  })

  it('throws with server error message on failure', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ detail: 'Time slot fully booked' }),
    })
    await expect(createBooking({})).rejects.toThrow('Time slot fully booked')
  })
})
```

- [ ] **Step 2: Run tests — expect failures**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/frontend
npx vitest run tests/bookingApi.test.js
```

Expected: `Cannot find module '../src/api/bookingApi'`

- [ ] **Step 3: Write bookingApi.js**

```js
// src/api/bookingApi.js
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export async function fetchSlots(date) {
  const res = await fetch(`${API_BASE}/slots?date=${date}`)
  if (!res.ok) throw new Error('Failed to fetch slots')
  return res.json()
}

export async function createBooking(data) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.detail ?? 'Booking failed')
  }
  return res.json()
}
```

- [ ] **Step 4: Run tests — all must pass**

```bash
npx vitest run tests/bookingApi.test.js
```

Expected: **4 PASSED**

- [ ] **Step 5: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add frontend/src/api/ frontend/tests/bookingApi.test.js
git commit -m "feat: booking API layer with unit tests"
```

---

## Task 11: Frontend — Booking Widget

**Files:**

- Create: `frontend/tests/BookingWidget.test.jsx`
- Create: `frontend/src/components/BookingWidget/BookingWidget.jsx`
- Create: `frontend/src/components/BookingWidget/BookingWidget.module.css`
- Create: `frontend/src/components/BookingWidget/StepIndicator.jsx`
- Create: `frontend/src/components/BookingWidget/StepIndicator.module.css`
- Create: `frontend/src/components/BookingWidget/StepDate.jsx`
- Create: `frontend/src/components/BookingWidget/StepTime.jsx`
- Create: `frontend/src/components/BookingWidget/StepDetails.jsx`
- Create: `frontend/src/components/BookingWidget/StepSuccess.jsx`
- Create: `frontend/src/sections/BookingSection.jsx`
- Create: `frontend/src/sections/BookingSection.module.css`

- [ ] **Step 1: Write failing BookingWidget test (RED)**

```jsx
// frontend/tests/BookingWidget.test.jsx
import { render, screen } from '@testing-library/react'
import BookingWidget from '../src/components/BookingWidget/BookingWidget'

test('renders date picker step on first render', () => {
  render(<BookingWidget />)
  expect(screen.getByText(/Scegli una data/i)).toBeInTheDocument()
})

test('renders step indicator with all 4 step labels', () => {
  render(<BookingWidget />)
  expect(screen.getByText(/Data/i)).toBeInTheDocument()
  expect(screen.getByText(/Orario/i)).toBeInTheDocument()
  expect(screen.getByText(/Dettagli/i)).toBeInTheDocument()
  expect(screen.getByText(/Conferma/i)).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test — must fail**

```bash
npx vitest run tests/BookingWidget.test.jsx
```

Expected: FAIL (BookingWidget not yet implemented)

- [ ] **Step 3: Write BookingWidget.module.css**

```css
.widget {
  background: var(--white);
  border-radius: 12px;
  padding: 2.5rem;
  max-width: 520px;
  margin: 0 auto;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
}

.error {
  color: var(--terracotta);
  font-size: 0.875rem;
  margin-top: 0.75rem;
  padding: 0.6rem 1rem;
  background: #fdf2f0;
  border-radius: var(--radius);
}

.stepTitle {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  color: var(--dark);
  margin: 1.5rem 0 1rem;
}

/* Shared button styles */
.btnPrimary {
  background: var(--olive);
  color: var(--white);
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background 0.2s;
}

.btnPrimary:hover { background: var(--olive-dark); }
.btnPrimary:disabled { opacity: 0.5; cursor: not-allowed; }

.btnGhost {
  background: none;
  border: none;
  color: var(--olive);
  font-size: 0.9rem;
  padding: 0.4rem 0;
  text-decoration: underline;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

/* Date picker */
.dateInput {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #ddd;
  border-radius: var(--radius);
  font-size: 1rem;
  font-family: var(--font-sans);
  color: var(--dark);
  margin-top: 0.5rem;
}

.dateInput:focus {
  outline: none;
  border-color: var(--olive);
}

/* Slot buttons */
.slotsGrid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.slotBtn {
  background: var(--cream);
  border: 1.5px solid #ddd;
  border-radius: var(--radius);
  padding: 0.65rem 1.1rem;
  font-size: 0.9rem;
  color: var(--dark);
  transition: border-color 0.15s, background 0.15s;
}

.slotBtn:hover {
  border-color: var(--olive);
  background: #f0f5f2;
}

/* Form inputs */
.formGroup {
  margin-bottom: 1.25rem;
}

.formLabel {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--olive);
  margin-bottom: 0.4rem;
}

.formInput {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #ddd;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-family: var(--font-sans);
}

.formInput:focus {
  outline: none;
  border-color: var(--olive);
}

/* Success */
.success {
  text-align: center;
  padding: 1rem 0;
}

.successIcon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.successTitle {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  color: var(--olive);
  margin-bottom: 0.75rem;
}

.successSummary {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.8;
}
```

- [ ] **Step 4: Write StepIndicator.jsx**

```jsx
// StepIndicator.jsx
import styles from './StepIndicator.module.css'

export default function StepIndicator({ steps, current }) {
  return (
    <div className={styles.indicator}>
      {steps.map((label, i) => (
        <div key={label} className={styles.step}>
          <div className={`${styles.dot} ${i <= current ? styles.active : ''}`}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`${styles.label} ${i === current ? styles.currentLabel : ''}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
```

```css
/* frontend/src/components/BookingWidget/StepIndicator.module.css */
.indicator {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  flex: 1;
  position: relative;
}

.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 14px;
  left: calc(50% + 14px);
  width: calc(100% - 28px);
  height: 1px;
  background: #e0e0e0;
}

.dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--cream);
  color: #aaa;
  border: 2px solid #e0e0e0;
  z-index: 1;
  transition: all 0.2s;
}

.dot.active {
  background: var(--olive);
  color: var(--white);
  border-color: var(--olive);
}

.label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #aaa;
}

.currentLabel {
  color: var(--olive);
  font-weight: 500;
}
```

- [ ] **Step 5: Write StepDate.jsx**

```jsx
// StepDate.jsx
import { useState } from 'react'
import styles from './BookingWidget.module.css'

export default function StepDate({ onNext, loading, error }) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState('')

  return (
    <div>
      <h3 className={styles.stepTitle}>Scegli una data</h3>
      <label htmlFor="date-input" className={styles.formLabel}>Data</label>
      <input
        id="date-input"
        type="date"
        className={styles.dateInput}
        min={today}
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <span />
        <button
          className={styles.btnPrimary}
          disabled={!date || loading}
          onClick={() => onNext(date)}
        >
          {loading ? 'Caricamento...' : 'Avanti →'}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Write StepTime.jsx**

```jsx
// StepTime.jsx
import styles from './BookingWidget.module.css'

export default function StepTime({ slots, onNext, onBack }) {
  return (
    <div>
      <h3 className={styles.stepTitle}>Scegli l'orario</h3>
      <div className={styles.slotsGrid}>
        {slots.map(slot => (
          <button
            key={slot}
            className={styles.slotBtn}
            onClick={() => onNext(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.btnGhost} onClick={onBack}>← Indietro</button>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Write StepDetails.jsx**

```jsx
// StepDetails.jsx
import { useState } from 'react'
import styles from './BookingWidget.module.css'

export default function StepDetails({ onNext, onBack, loading, error }) {
  const [form, setForm] = useState({ name: '', phone: '', party_size: 2 })

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  return (
    <div>
      <h3 className={styles.stepTitle}>I tuoi dati</h3>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="name">Nome *</label>
        <input
          id="name"
          className={styles.formInput}
          value={form.name}
          onChange={e => set('name', e.target.value)}
          placeholder="Mario Rossi"
          maxLength={100}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="phone">Telefono (opzionale)</label>
        <input
          id="phone"
          className={styles.formInput}
          value={form.phone}
          onChange={e => set('phone', e.target.value)}
          placeholder="+41 91 123 45 67"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="party">Numero coperti *</label>
        <input
          id="party"
          type="number"
          className={styles.formInput}
          value={form.party_size}
          onChange={e => set('party_size', parseInt(e.target.value, 10))}
          min={1}
          max={10}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <button className={styles.btnGhost} onClick={onBack}>← Indietro</button>
        <button
          className={styles.btnPrimary}
          disabled={!form.name.trim() || loading}
          onClick={() => onNext(form)}
        >
          {loading ? 'Invio...' : 'Conferma prenotazione →'}
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Write StepSuccess.jsx**

```jsx
// StepSuccess.jsx
import styles from './BookingWidget.module.css'

export default function StepSuccess({ booking }) {
  return (
    <div className={styles.success}>
      <div className={styles.successIcon}>🌿</div>
      <h3 className={styles.successTitle}>Prenotazione confermata!</h3>
      <p className={styles.successSummary}>
        Ci vediamo {booking.date} alle {booking.time_slot}.<br />
        Abbiamo riservato un tavolo per {booking.party_size}{' '}
        {booking.party_size === 1 ? 'persona' : 'persone'}.<br />
        <br />
        Il ristorante ti aspetta — a presto!
      </p>
    </div>
  )
}
```

- [ ] **Step 9: Write BookingWidget.jsx (orchestrator)**

```jsx
// BookingWidget.jsx
import { useState } from 'react'
import styles from './BookingWidget.module.css'
import StepIndicator from './StepIndicator.jsx'
import StepDate from './StepDate.jsx'
import StepTime from './StepTime.jsx'
import StepDetails from './StepDetails.jsx'
import StepSuccess from './StepSuccess.jsx'
import { fetchSlots, createBooking } from '../../api/bookingApi.js'

const STEPS = ['Data', 'Orario', 'Dettagli', 'Conferma']

export default function BookingWidget() {
  const [step, setStep] = useState(0)
  const [date, setDate] = useState('')
  const [slots, setSlots] = useState([])
  const [timeSlot, setTimeSlot] = useState('')
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDateNext = async (selectedDate) => {
    setError('')
    setLoading(true)
    try {
      const data = await fetchSlots(selectedDate)
      if (!data.date_available) {
        setError('Nessuna disponibilità per questa data — prova con un\'altra.')
        return
      }
      setDate(selectedDate)
      setSlots(data.slots)
      setStep(1)
    } catch {
      setError('Errore nel caricamento degli orari. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  const handleTimeNext = (slot) => {
    setTimeSlot(slot)
    setStep(2)
  }

  const handleDetailsNext = async (formData) => {
    setError('')
    setLoading(true)
    try {
      const result = await createBooking({
        name: formData.name,
        phone: formData.phone || undefined,
        date,
        time_slot: timeSlot,
        party_size: formData.party_size,
      })
      setBooking(result)
      setStep(3)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.widget}>
      <StepIndicator steps={STEPS} current={step} />
      {step === 0 && (
        <StepDate onNext={handleDateNext} loading={loading} error={error} />
      )}
      {step === 1 && (
        <StepTime slots={slots} onNext={handleTimeNext} onBack={() => setStep(0)} />
      )}
      {step === 2 && (
        <StepDetails
          onNext={handleDetailsNext}
          onBack={() => setStep(1)}
          loading={loading}
          error={error}
        />
      )}
      {step === 3 && <StepSuccess booking={booking} />}
    </div>
  )
}
```

- [ ] **Step 10: Write BookingSection.jsx**

```jsx
// src/sections/BookingSection.jsx
import BookingWidget from '../components/BookingWidget/BookingWidget.jsx'
import styles from './BookingSection.module.css'

export default function BookingSection() {
  return (
    <section className={styles.section} id="booking">
      <p className={styles.label}>Prenota il tuo tavolo</p>
      <h2 className={styles.title}>Scegli la data e l'orario</h2>
      <BookingWidget />
    </section>
  )
}
```

```css
/* BookingSection.module.css */
.section {
  background: var(--cream);
  padding: var(--section-pad);
}

.label {
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--olive);
  margin-bottom: 0.75rem;
  text-align: center;
}

.title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: var(--dark);
  margin-bottom: 2.5rem;
  text-align: center;
}
```

- [ ] **Step 11: Run BookingWidget tests — must pass**

```bash
npx vitest run tests/BookingWidget.test.jsx
```

Expected: 2 passed

- [ ] **Step 12: Verify widget works end-to-end with running backend**

```bash
# Terminal 1 — backend
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/backend
source .venv/bin/activate
uvicorn main:app --reload

# Terminal 2 — frontend
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista/frontend
cp .env.example .env
npm run dev
```

Navigate to `http://localhost:5173`, scroll to booking section, complete all 4 steps.

- [ ] **Step 13: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add frontend/src/components/ frontend/src/sections/BookingSection.jsx frontend/src/sections/BookingSection.module.css frontend/tests/BookingWidget.test.jsx
git commit -m "feat: 4-step booking widget (StepDate, StepTime, StepDetails, StepSuccess)"
```

---

## Task 12: Frontend — Vercel Deploy Config

**Files:**
- Create: `frontend/vercel.json`

- [ ] **Step 1: Write vercel.json**

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This ensures React Router (if used later) and direct URL access work correctly on Vercel.

- [ ] **Step 2: Set VITE_API_URL env var in Vercel dashboard**

After deploying frontend to Vercel:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-railway-backend-url`

- [ ] **Step 3: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/osteria-bellavista
git add frontend/vercel.json
git commit -m "chore: Vercel SPA rewrite config"
```

---

## Task 13: Portfolio Card Update

**Files:**
- Modify: `Portfolio/index.html`

The existing portfolio has 3 "Coming Soon" project slots. Update Slot 1 to reflect the completed Osteria Bellavista project.

- [ ] **Step 1: Read the current portfolio index.html to find the project card**

```bash
grep -n "Coming Soon\|progetto\|project" /Users/marco/Documents/ClaudeProjects/Portfolio/index.html | head -30
```

- [ ] **Step 2: Replace the first "Coming Soon" card**

Find the first coming-soon project card and replace its content with:

```html
<!-- Project 1: Osteria Bellavista -->
<div class="project-card" data-tags="Web App React FastAPI Python">
  <div class="project-header blue">
    <span class="project-tag">Web App</span>
  </div>
  <div class="project-body">
    <h3>Osteria Bellavista</h3>
    <p>Landing page + sistema prenotazioni per ristorante ticinese.
       React frontend, FastAPI backend, prenotazione in 4 step
       con notifica automatica al ristorante.</p>
    <div class="project-tags">
      <span>React</span><span>FastAPI</span><span>Python</span><span>SQLite</span>
    </div>
    <a href="https://osteria-bellavista.vercel.app" target="_blank" rel="noreferrer"
       class="project-link">Vedi demo →</a>
  </div>
</div>
```

**Note:** Replace the href with the actual Vercel URL after deploy. Match the exact HTML structure used by existing project cards in the file.

- [ ] **Step 3: Commit**

```bash
cd /Users/marco/Documents/ClaudeProjects/Portfolio
git add index.html
git commit -m "feat: add Osteria Bellavista to portfolio card slot 1"
```

---

## Deploy Checklist

> **Note:** This plan targets Railway for backend deployment. Render is out of scope and not covered here.

Before going live, verify these steps:

- [ ] Push `osteria-bellavista` to a new GitHub repo
- [ ] Connect Vercel to the `frontend/` subdirectory — set **Root Directory** to `frontend`
- [ ] Set `VITE_API_URL` env var in Vercel to the Railway backend URL
- [ ] Deploy backend to Railway — set **Root Directory** to `backend`
- [ ] Add Railway persistent volume mounted at `/data`
- [ ] Set Railway env vars: `DATABASE_PATH=/data/osteria.db`, `RESTAURANT_EMAIL`, `SMTP_*`, `CORS_ORIGIN`
- [ ] Verify `GET /health` returns `{"status": "ok"}`
- [ ] Test full booking flow on production URL
- [ ] Update portfolio card link with final Vercel URL

---

## Running All Tests

```bash
# Backend
cd osteria-bellavista/backend
source .venv/bin/activate
pytest tests/ -v
# Expected: 26+ PASSED, 0 failed

# Frontend
cd ../frontend
npx vitest run
# Expected: 10 PASSED, 0 failed
```
