# GigaRoute AI — GRS reference

Generated 2026-10-19 from current product main. 379 entries.

New or revised examples have not been separately recompiled. Previously verified examples retain historical compiler-checked tags; compilation does not prove runtime behavior.

New equipment event headers use `Def_OHT`, `Def_AMR`, `Def_AGV` and `Def_Humanoid`. Existing dotted callback names remain for compatibility; `model.init` is supported. Removed syntax: `print ... to message`; use `print ... to log`.

## Language basics

### Source files

GRS source files use the .grs extension and UTF-8 text. A program is a set of event blocks; a Studio Model Logic file is plain GRS source.

### Two block styles

Logic is declared with events. A block is written either with braces or with begin ... end; both compile to the same event model. Blocks must span several lines: the compiler rejects a block written on one line.

Brace style (historically compiler-checked)
```grs
event model.init {
    print("hello");
}
```

begin ... end style (no parentheses or semicolons needed) (historically compiler-checked)
```grs
begin model.init event
    print "hello"
end
```

One-line block: rejected (GRS_SURFACE_NATIVE_STRUCTURE_REQUIRED) (reference)
```grs
event model.init { print("hello"); }
```
Diagnostic: GRS_SURFACE_NATIVE_STRUCTURE_REQUIRED: GRS source must declare logic with event (or on/routine/function compatibility) { } blocks, or with native 'begin <name> event ... end' blocks

### Statements and variables

Statements are written like function calls, one per line, usually ending with a semicolon. set assigns a value to a symbol or attribute; inc and dec change a number.

set / inc / dec / print (historically compiler-checked)
```grs
event model.init {
    set(counter, 0);
    inc(counter, 1);
    dec(counter, 1);
    print("counter", counter);
}
```

### Literals and operators

Numbers, strings in double quotes, true, false and null are literals. Operators: + - * / == != < <= > >= && || !

Arithmetic, comparison, boolean, literals (historically compiler-checked)
```grs
event model.init {
    set(ok, 1 + 2 * 3 >= 7 && !(4 == 5));
    set(name, "BOX01");
    set(flag, true);
    set(none, null);
}
```

### Comments

Line comments start with // and block comments are written /* ... */.

Comments (historically compiler-checked)
```grs
event model.init {
    // line comment
    /* block
       comment */
    print("x");
}
```

### Conditions

if / else if / else choose a branch from a condition.

if / else if / else (historically compiler-checked)
```grs
event model.init {
    if (counter > 10) {
        print("big");
    } else if (counter > 5) {
        print("medium");
    } else {
        print("small");
    }
}
```

### Loops

while repeats while its condition is true; for iterates a list; break leaves a loop; continue skips to the next iteration.

while with continue and break (historically compiler-checked)
```grs
event model.init {
    set(count, 0);
    while (count < 5) {
        inc(count, 1);
        if (count == 3) {
            continue;
        }
        if (count == 4) {
            break;
        }
    }
}
```

for over a list (historically compiler-checked)
```grs
event model.init {
    for (job in vehicle.schedjobs) {
        print(job.type);
    }
}
```

### User events and calls

An event with parameters can be called like a function and can return a value. Parameters are positional.

Declare and call an event (historically compiler-checked)
```grs
event calc.double(x) {
    return(x * 2);
}

event model.init {
    set(result, calc.double(4));
    print(result);
}
```

### Compatibility forms

on, routine and function are accepted for compatibility and compile to the same event; new code should use event.

on <canonical-event> (historically compiler-checked)
```grs
on vehicle.pickup {
    print(vehicle.id);
}
```

function (historically compiler-checked)
```grs
function calc.tax(v) {
    return(v * 0.1);
}
```

### Compile errors you will see

These diagnostics come from the GRS compiler. A program with any error cannot be run.

Unclosed block (GRS_SURFACE_UNCLOSED_BLOCK) (reference)
```grs
event model.init {
    print("a");

```
Diagnostic: GRS_SURFACE_UNCLOSED_BLOCK: one or more GRS '{' or 'begin' blocks are not closed

Removed verb (GRS_SURFACE_REMOVED_ACTION): use move_to(target) (reference)
```grs
event model.init {
    travel(ST01);
}
```
Diagnostic: GRS_SURFACE_REMOVED_ACTION: travel() was removed; GigaRoute has a single movement verb -- use move_to(<target>)

Wrong argument count (GRS_SURFACE_ARGUMENT_COUNT) (reference)
```grs
event model.init {
    wait();
}
```
Diagnostic: GRS_SURFACE_ARGUMENT_COUNT: wait expects 1 argument(s)


## Getting Started

### GRS file

**Purpose:** Simulation Studio Model Logic source file.

**Syntax:**
```grs
*.grs
```

**Example (historically compiler-checked)**:
```grs
begin model.init event
    print("ready");
end
```

**Notes:** GRS uses UTF-8 text. Both native { } blocks and the supported begin <name> event ... end surface compile to the same GRS event model; legacy engine event bindings are retained for existing GRS projects.

**Related:** event, Model Logic

### Studio Station binding

**Purpose:** Connects each declared module to its own physical domain before Run.

**Syntax:**
```grs
entry_station / exit_station / level_id / elevation_mm
```

**Example (historically compiler-checked)**:
```grs
set(entry_station, "Input_A");
set(exit_station, "Output_A");
set(level_id, 0);
```

**Notes:** OHT requires Rail-attached Stations. Conveyor requires Stations on one uniquely connected nonbranching LINE path; curves and ambiguous routes are rejected. AMR requires floor Stations, not overhead Rail Stations. Use the existing Station menu's AMR floor Station action to create Level 0 ground-plane Stations. File names, print text and demo Station prefixes do not select equipment. Cross-module logical Load handoff uses call_transport(target_module, load_id, from_station, to_station).

**Related:** Studio model modules, Workspace Station

### Vehicle runtime type

**Purpose:** Declares which physical Vehicle runtime owns this GRS model.

**Syntax:**
```grs
begin model.vehicle_type.oht event
end
begin model.vehicle_type.amr event
end
```

**Example (historically compiler-checked)**:
```grs
begin model.vehicle_type.oht event
end

begin model.init event
    print("OHT model ready");
end
```

**Notes:** Declare exactly one marker for a typed model. OHT selects SimulationRuntime on Rail; AMR selects AmrSimulationRuntime in Autonomous Area. Legacy Rail and Auto Simulation runs preserve Fleet Mode. Studio blocks an untyped GRS when the saved Fleet Mode is AMR; declare the intended type explicitly.

**Related:** Simulation Setup, Fleet Mode, model.init

### Actual From-To CSV

**Purpose:** Defines recurring From-To job releases used by Auto Simulation and Static Analysis.

**Syntax:**
```grs
Time Interval,From,To
```

**Example (historically compiler-checked)**:
```grs
557.3752984,E0001,E0108
```

**Notes:** Time Interval is seconds between recurring releases for that row. Static Analysis uses moves/hour = 3600 / Time Interval. Auto Simulation schedules first_due = Time Interval and then previous_due + Time Interval, so the first job is not forced at t=0.

**Related:** Actual From-To, Static Analysis, Auto Simulation

### Studio model modules

**Purpose:** Runs newly authored OHT, AMR and Conveyor modules together, including Conveyor-only models.

**Syntax:**
```grs
begin model.module event
    set(module_id, "belt_alpha"); set(runtime_kind, "conveyor"); ...
end
```

**Example (historically compiler-checked)**:
```grs
begin model.module event
    set(module_id, "belt_alpha");
    set(runtime_kind, "conveyor");
    set(entry_station, "Input_A");
    set(exit_station, "Output_A");
    set(job_source, "script");
    set(speed_mps, 1);
end
begin model.init event
    every 8 sec call supply
end
begin supply event
    request from Input_A to Output_A
end
```

**Notes:** Declare ownership in each source file. Same module_id combines files; different modules keep separate events. Use runtime_kind oht, amr or conveyor. One fleet per OHT/AMR kind; multiple Conveyor modules are supported. Station names must match the current drawing and carrier. Compile applies the entire valid model; any error blocks a new Run. No manifest or saved .grproj is required. Optional set(run_until_seconds, 7200) in model.module overrides Studio Run Until; conflicting module declarations are rejected. Pause/Resume retains the active program; Restart uses edited sources. Existing undeclared single-runtime models retain their own execution path. For newly authored simplified GRS, see Automatic model binding: Studio selects Station/Level ownership from literal transport requests, without requiring a model declaration.

**Related:** model.init, request_transport, every_event, Studio Station binding

## Events

### Conveyor job lifecycle

**Purpose:** Receives actual creation, movement, blocked, exit-ready, downstream-release and completion callbacks from the Conveyor job.

**Syntax:**
```grs
begin conveyor.job_created event
    ...
end
begin conveyor.job_moved event
    ...
end
begin conveyor.blocked event
    ...
end
begin conveyor.exit event
    ...
end
begin conveyor.released event
    ...
end
begin conveyor.job_completed event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin conveyor.exit event
    print(module_id, load_id);
    call_transport("floor_fleet", load_id, "Floor_Pick", "Floor_Drop");
end
```

**Notes:** Use request from <entry> to <exit> to enqueue real work. every schedules its first request after the specified interval. lifecycle symbols identify the module, Job, Load and actual microsecond timestamp and remain available after a wait. conveyor.exit is the stop-distance handoff-ready boundary; conveyor.released fires after downstream acceptance. conveyor.job_completed remains the ordinary completion boundary.

**Related:** Studio model modules, every_event, request_transport, call_transport

## Getting Started

### Vehicle asset

**Purpose:** Selects an OHT or AMR Equipment instance whose embedded GLB is used by the matching runtime renderer.

**Syntax:**
```grs
begin model.vehicle_type.oht event
end
begin model.vehicle_asset.<project_instance_name> event
end
```

**Example (historically compiler-checked)**:
```grs
begin model.vehicle_type.oht event
end
begin model.vehicle_asset.oht_01 event
end
```

**Notes:** The selector suffix matches Equipment instance_name case-insensitively. With no selector, exactly one instance in the matching category (OHT Vehicle or AMR) is bound automatically. Zero or multiple candidates retain the legacy type-specific renderer and emit GRS_VEHICLE_ASSET_FALLBACK. A missing or wrong-type explicit selector blocks Run. The original static placement is hidden only while that View has matching runtime snapshots.

**Related:** Vehicle runtime type, Workspace Equipment, Simulation Studio 3D

## Declarations

### event

**Purpose:** Declares unified GRS logic. Canonical engine events and user-defined callable events use the same declaration kind.

**Syntax:**
```grs
begin name(args) event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Calc_Double(x) event
    return(x * 2);
end
```

**Notes:** Parameters are comma-separated identifiers. __gigaroute.* is reserved.

**Related:** on, routine, function, call, return

### on

**Purpose:** Compatibility declaration for a canonical engine-bound event.

**Syntax:**
```grs
on <canonical-event> { ... }
```

**Example (historically compiler-checked)**:
```grs
on vehicle.pickup {
    print(vehicle.id);
}
```

**Notes:** Use event for new code. on accepts canonical events only and cannot declare parameters.

**Related:** event, canonical events

### routine / function

**Purpose:** Compatibility aliases lowered to the same unified event implementation.

**Syntax:**
```grs
routine name { ... }
function name(args) { ... }
```

**Example (not recompiled)**:
```grs
function Calc_Tax(v) {
    return(v * 0.1);
}
```

**Notes:** New Studio templates use begin NAME event ... end. The older event NAME { } form and these aliases remain accepted for compatibility.

**Related:** event, call, return

### call / direct event call

**Purpose:** Invokes a user-defined GRS event. Expression-position calls return the event's return value.

**Syntax:**
```grs
call(eventName(args))
eventName(args)
```

**Example (not recompiled)**:
```grs
begin Calc_Double(x) event
    return(x * 2);
end

begin model.init event
    set(result, Calc_Double(4));
end
```

**Notes:** Routine lookup has priority over generic Host action lookup. Parameters are positional.

**Related:** event, return, parameters

## Control Flow

### if / else if / else

**Purpose:** Executes conditional branches.

**Syntax:**
```grs
if (<condition>) { ... }
} else if (<condition>) { ... }
} else { ... }
```

**Example (historically compiler-checked)**:
```grs
if (vehicle.phase == "idle") {
    print("idle");
}
```

**Notes:** Conditions use the GRS expression surface.

**Related:** comparison operators, &&, ||, !

### while

**Purpose:** Repeats a block while its condition is true.

**Syntax:**
```grs
while (<condition>) { ... }
```

**Example (historically compiler-checked)**:
```grs
while (count < 5) {
    inc(count, 1);
}
```

**Notes:** Use wait/resource/order-list coordination when model time must advance.

**Related:** break, continue, wait

### for

**Purpose:** Iterates a snapshot list such as vehicle.schedjobs.

**Syntax:**
```grs
for (<item> in <iterable>) { ... }
```

**Example (historically compiler-checked)**:
```grs
for (job in vehicle.schedjobs) {
    print(job.type);
}
```

**Notes:** The iterable is evaluated once when the loop begins.

**Related:** vehicle.schedjobs, break, continue

### break

**Purpose:** Leaves the innermost while/for loop.

**Syntax:**
```grs
break
```

**Example (historically compiler-checked)**:
```grs
if (job.type == "move") {
    break
}
```

**Notes:** Only valid inside a loop.

**Related:** while, for, continue

### continue

**Purpose:** Skips to the next iteration of the innermost loop.

**Syntax:**
```grs
continue
```

**Example (historically compiler-checked)**:
```grs
if (job.alive == false) {
    continue
}
```

**Notes:** Only valid inside a loop.

**Related:** while, for, break

### return

**Purpose:** Returns a value from the current user-defined event/call.

**Syntax:**
```grs
return(value)
```

**Example (historically compiler-checked)**:
```grs
return(vehicle.id);
```

**Notes:** The compiled runtime also has a null return at the natural end of an event.

**Related:** event, call

## Core Actions

### print

**Purpose:** Writes GRS output to the Script Print log and the Studio realtime log.

**Syntax:**
```grs
print(value, ...)
```

**Example (historically compiler-checked)**:
```grs
print("vehicle", vehicle.id, vehicle.phase);
```

**Notes:** Arguments are rendered in order.

**Related:** Model Logic log

### wait

**Purpose:** Suspends the current process until the requested simulation time has elapsed.

**Syntax:**
```grs
wait(seconds)
```

**Example (historically compiler-checked)**:
```grs
wait(0.25);
```

**Notes:** Uses Scheduler timed wait; it does not busy-poll.

**Related:** wait_until, scheduler

### wait_until

**Purpose:** Suspends the current process on the runtime wait-channel path until the condition can be re-evaluated after a wake.

**Syntax:**
```grs
wait_until(condition)
```

**Example (historically compiler-checked)**:
```grs
wait_until(counter >= 10);
```

**Notes:** There is no periodic condition polling. Prefer explicit event/resource/order-list coordination for high-volume models.

**Related:** wait, order, Resource

### set

**Purpose:** Assigns a GRS symbol or supported writable entity/attribute target.

**Syntax:**
```grs
set(target, value)
```

**Example (historically compiler-checked)**:
```grs
set(vehicle.current_schedjob, job);
```

**Notes:** Physical Vehicle pose/route/speed remains SimulationEngine-owned.

**Related:** inc, dec, ScheduleJob

### inc

**Purpose:** Increments a numeric target.

**Syntax:**
```grs
inc(target, amount)
```

**Example (historically compiler-checked)**:
```grs
inc(counter, 1);
```

**Notes:** Local loop values and Host-backed values use the same compiled arithmetic semantics.

**Related:** set, dec

### dec

**Purpose:** Decrements a numeric target.

**Syntax:**
```grs
dec(target, amount)
```

**Example (historically compiler-checked)**:
```grs
dec(counter, 1);
```

**Notes:** Local loop values and Host-backed values use the same compiled arithmetic semantics.

**Related:** set, inc

### create

**Purpose:** Creates one script Load entity and returns its handle.

**Syntax:**
```grs
create(name)
```

**Example (historically compiler-checked)**:
```grs
set(load, create("BOX01"));
```

**Notes:** The current process continues; create does not fork execution.

**Related:** clone, Load

### clone

**Purpose:** Clones a Load actor and forks execution from the following statement.

**Syntax:**
```grs
clone(actor)
```

**Example (historically compiler-checked)**:
```grs
clone(load);
```

**Notes:** Copies script Load attributes/ownership metadata. This is intentionally different from create.

**Related:** create, Load

### tabulate

**Purpose:** Appends a value to a named runtime Table.

**Syntax:**
```grs
tabulate(tableName, value)
```

**Example (historically compiler-checked)**:
```grs
tabulate("cycle", elapsed);
```

**Notes:** Table data is script/runtime-owned modeling data, not SimulationEngine KPI state.

**Related:** Table, collection size

### insert

**Purpose:** Inserts an entity handle into a named Queue.

**Syntax:**
```grs
insert(item, queueName, position)
```

**Example (historically compiler-checked)**:
```grs
insert(load, "Q_WAIT", "begin");
```

**Notes:** Position begin inserts at the front; other positions currently append.

**Related:** Queue, send, move_to

### send

**Purpose:** Appends an entity handle to a named Queue.

**Syntax:**
```grs
send(item, queueName)
```

**Example (historically compiler-checked)**:
```grs
send(load, "Q_BUFFER");
```

**Notes:** Queue state is script/runtime-owned.

**Related:** insert, Queue

## Transport

### move_to

**Purpose:** Single GigaRoute movement verb. Station targets move a Vehicle through the existing physical route; an unresolved string target is treated as a Queue name.

**Syntax:**
```grs
move_to(target)
```

**Example (historically compiler-checked)**:
```grs
move_to(12);
move_to("ST01");
move_to("Q_WAIT");
```

**Notes:** Station resolution has priority. travel() and move_into() are removed from product GRS.

**Related:** dispatch, Queue, Station

### dispatch

**Purpose:** Creates a move ScheduleJob for a Vehicle. A Busy Vehicle keeps it in its own queue until an authoritative Idle boundary.

**Syntax:**
```grs
dispatch(vehicle, station)
```

**Example (historically compiler-checked)**:
```grs
dispatch(vehicle, "ST01");
```

**Notes:** Uses the existing RouteCatalog/SimulationEngine physical movement path; no runtime Dijkstra/A* is added.

**Related:** ScheduleJob, preempt, cancel

### claim

**Purpose:** Claims a Load for a Vehicle and creates a retrieve ScheduleJob.

**Syntax:**
```grs
claim(load, vehicle)
```

**Example (historically compiler-checked)**:
```grs
claim(load, vehicle);
```

**Notes:** Same-owner claim is idempotent. A different Vehicle cannot claim an already claimed Load.

**Related:** Load, retrieve, ScheduleJob

### cancel

**Purpose:** Cancels a live script ScheduleJob handle.

**Syntax:**
```grs
cancel(job)
```

**Example (historically compiler-checked)**:
```grs
cancel(job);
```

**Notes:** If physical movement is already committed, route/pose are not rewound or teleported; the physical Load lifecycle still completes.

**Related:** ScheduleJob, claim, dispatch

### configure

**Purpose:** Writes script-side configuration/custom attribute state for an explicit receiver or current actor.

**Syntax:**
```grs
configure(receiver, attribute, value)
configure(attribute, value)
```

**Example (historically compiler-checked)**:
```grs
configure(vehicle, "priority", 5);
```

**Notes:** Does not silently replace global Simulation Setup physical constants.

**Related:** set, preempt

### preempt

**Purpose:** Makes an alive uncommitted ScheduleJob current. If the Vehicle is busy, the selection takes priority at the next Idle boundary.

**Syntax:**
```grs
preempt(job)
preempt(vehicle, job)
```

**Example (historically compiler-checked)**:
```grs
preempt(vehicle, urgentJob);
```

**Notes:** Soft preempt only: no active-route deletion, rewind, teleport or forced phase mutation.

**Related:** vehicle.current_schedjob, ScheduleJob

## Resources

### use / get / reserve

**Purpose:** Acquires a named Resource. If it is at capacity, the current process waits on the Resource's targeted scheduler channel.

**Syntax:**
```grs
use(resource)
get(resource)
reserve(resource)
```

**Example (historically compiler-checked)**:
```grs
get(R_MACHINE);
```

**Notes:** Literal Resource names share one wake channel. Dynamic targets fall back to a single non-blocking acquisition attempt.

**Related:** free, release, Resource

### free / release

**Purpose:** Releases a named Resource and wakes eligible waiters.

**Syntax:**
```grs
free(resource)
release(resource)
```

**Example (historically compiler-checked)**:
```grs
free(R_MACHINE);
```

**Notes:** Wake-up is targeted through the Resource scheduler channel; there is no fleet polling.

**Related:** use, get, reserve

### wait_ordered

**Purpose:** Places the current actor on the currently implemented default OrderList and suspends it until ordered.

**Syntax:**
```grs
wait_ordered()
```

**Example (historically compiler-checked)**:
```grs
wait_ordered();
```

**Notes:** Current product implementation intentionally uses one implicit default OrderList for this action.

**Related:** order, OrderList

### order

**Purpose:** Releases pending actors from the default OrderList.

**Syntax:**
```grs
order(count)
```

**Example (historically compiler-checked)**:
```grs
order(1);
```

**Notes:** Uses targeted scheduler wake-up rather than a periodic scan.

**Related:** wait_ordered, OrderList

## Events

### model.init

**Purpose:** Runs once when an applied scripted simulation run starts.

**Syntax:**
```grs
begin model.init event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin model.init event
    print("start");
end
```

**Notes:** Authoritative run-start binding.

**Related:** vehicle.init

### vehicle.init

**Purpose:** Runs once for each Vehicle when the scripted run is activated.

**Syntax:**
```grs
begin vehicle.init event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin vehicle.init event
    print(vehicle.id);
end
```

**Notes:** The current Vehicle actor is available through vehicle.*.

**Related:** model.init, dispatch.request

### dispatch.request

**Purpose:** Runs at an Idle dispatch-request boundary, including initial activation.

**Syntax:**
```grs
begin dispatch.request event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin dispatch.request event
    print(vehicle.id);
end
```

**Notes:** The ScheduleJob queue guard executes before ordinary dispatch-request logic.

**Related:** dispatch, claim

### job.selected

**Purpose:** Runs once when a live ScheduleJob becomes a Vehicle's current_schedjob.

**Syntax:**
```grs
begin job.selected event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin job.selected event
    print(this.id, this.type, this.vehicle, this.location);
end
```

**Notes:** Existing engine callback name, kept for saved-model compatibility. For new OHT GRS use `begin Def_OHT job selection event`. This callback was not removed. Implemented. The event actor is the ScheduleJob handle. Re-setting the same current job does not fire again. preempt() fires only when it actually changes the current job.

**Related:** ScheduleJob, vehicle.current_schedjob, preempt, job.finished

### job.finished

**Purpose:** Runs when the committed physical job has fully completed and the Vehicle reaches the authoritative Idle handoff.

**Syntax:**
```grs
begin job.finished event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin job.finished event
    print(this.id, this.type, this.vehicle, this.load);
end
```

**Notes:** Existing engine callback name, kept for saved-model compatibility. For new OHT GRS use `begin Def_OHT job finished event`. This callback was not removed. Implemented. This is later than vehicle.setdown: configured Setdown dwell must finish first. The event actor is the completed ScheduleJob handle.

**Related:** vehicle.setdown, ScheduleJob, Load, job.selected

### vehicle.pickup

**Purpose:** Fires when a Vehicle reaches the physical Pickup boundary.

**Syntax:**
```grs
begin vehicle.pickup event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin vehicle.pickup event
    print(vehicle.station);
end
```

**Notes:** Existing engine callback name, kept for saved-model compatibility. For new OHT GRS use `begin Def_OHT pickup event`. This callback was not removed. A claimed Load becomes onboard at physical Pickup.

**Related:** vehicle.setdown, Load

### vehicle.setdown

**Purpose:** Fires when a Vehicle reaches the Setdown arrival boundary.

**Syntax:**
```grs
begin vehicle.setdown event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin vehicle.setdown event
    print(vehicle.destination);
end
```

**Notes:** Existing engine callback name, kept for saved-model compatibility. For new OHT GRS use `begin Def_OHT setdown event`. This callback was not removed. The Load remains onboard through configured Setdown dwell and unloads at the following Idle handoff.

**Related:** vehicle.pickup, Load, job.finished

### vehicle.start_move

**Purpose:** Fires at the first real linear movement in Retrieving/Moving after speed exceeds the meaningful threshold.

**Syntax:**
```grs
begin vehicle.start_move event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin vehicle.start_move event
    print(vehicle.id);
end
```

**Notes:** Existing engine callback name, kept for saved-model compatibility. For new OHT GRS use `begin Def_OHT start to move event`. This callback was not removed. The internal 0.001 mm/s wake probe is excluded; the event threshold is >0.01 mm/s.

**Related:** vehicle.speed_change, vehicle.resume

### vehicle.speed_change

**Purpose:** Fires when physical motion speed changes meaningfully, including acceleration/deceleration, Sensor BRAKE/STOP and curve-speed transitions.

**Syntax:**
```grs
begin vehicle.speed_change event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin vehicle.speed_change event
    print(vehicle.phase);
end
```

**Notes:** Existing engine callback name, kept for saved-model compatibility. For new OHT GRS use `begin Def_OHT speed change event`. This callback was not removed. First-class physical event. Empty handlers are optimized out of the physical hot path.

**Related:** vehicle.start_move, vehicle.resume

### vehicle.resume

**Purpose:** Fires when a Vehicle that previously moved resumes real movement after stopping.

**Syntax:**
```grs
begin vehicle.resume event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin vehicle.resume event
    print(vehicle.id);
end
```

**Notes:** Existing engine callback name, kept for saved-model compatibility. For new OHT GRS use `begin Def_OHT resume to drive event`. This callback was not removed. Uses an authoritative physical speed transition.

**Related:** vehicle.start_move, vehicle.speed_change

### vehicle.approach_destination

**Purpose:** Fires on the first real movement within the final route segment toward the destination.

**Syntax:**
```grs
begin vehicle.approach_destination event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin vehicle.approach_destination event
    print(vehicle.destination);
end
```

**Notes:** Existing engine callback name, kept for saved-model compatibility. For new OHT GRS use `begin Def_OHT decelerate to destination event`. This callback was not removed. No arbitrary distance polling threshold is used.

**Related:** station.pass.<station>

### station.pass.<station>

**Purpose:** Fires when a Vehicle physically crosses the named Station control point.

**Syntax:**
```grs
begin station.pass.ST01 event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin station.pass.ST01 event
    print(vehicle.id);
end
```

**Notes:** Only Stations with non-empty handlers are watched. Repeat visits fire again per route occurrence.

**Related:** vehicle.approach_destination

## Vehicle Attributes

### vehicle.id

**Purpose:** Dense Vehicle identifier for the current Vehicle actor.

**Syntax:**
```grs
vehicle.id
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.id);
```

**Notes:** Read-only physical identity.

**Related:** vehicle.station, vehicle.phase

### vehicle.station / from / destination

**Purpose:** Reads the current Station, job source and job destination from the SimulationEngine snapshot.

**Syntax:**
```grs
vehicle.station
vehicle.from
vehicle.destination
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.station, vehicle.destination);
```

**Notes:** Returns null when the corresponding Station is invalid/unset.

**Related:** vehicle.phase

### vehicle.phase / status

**Purpose:** Returns the current physical phase as a string: idle, retrieving, pickup, moving or setdown.

**Syntax:**
```grs
vehicle.phase
vehicle.status
```

**Example (not recompiled)**:
```grs
if (vehicle.phase == "idle") { ... }
```

**Notes:** SimulationEngine remains the physical truth owner.

**Related:** vehicle.station

### vehicle.schedjobs

**Purpose:** Returns the current Vehicle's live script ScheduleJob handles as a list.

**Syntax:**
```grs
vehicle.schedjobs
```

**Example (historically compiler-checked)**:
```grs
for (job in vehicle.schedjobs) { print(job.type); }
```

**Notes:** The list is scoped to one Vehicle; no Vehicle x Job fleet scan is required.

**Related:** vehicle.current_schedjob, ScheduleJob

### vehicle.current_schedjob

**Purpose:** Gets/sets the selected current ScheduleJob for the Vehicle.

**Syntax:**
```grs
vehicle.current_schedjob
```

**Example (historically compiler-checked)**:
```grs
set(vehicle.current_schedjob, job);
```

**Notes:** An incomplete explicitly selected retrieve can reserve an Idle Vehicle until its endpoints are supplied.

**Related:** preempt, ScheduleJob

## Load Attributes

### Load attributes

**Purpose:** Reads script-side material-flow state for a Load.

**Syntax:**
```grs
load.id
load.name
load.vehicle
load.location
load.destination
load.onboard
load.alive
load.state
```

**Example (historically compiler-checked)**:
```grs
print(load.state, load.location);
```

**Notes:** state is derived as created, claimed, onboard or stored. Vehicle physical pose is not duplicated in Load state.

**Related:** claim, vehicle.pickup, vehicle.setdown

## ScheduleJob Attributes

### ScheduleJob attributes

**Purpose:** Reads stable script ScheduleJob metadata.

**Syntax:**
```grs
job.id
job.type
job.vehicle
job.load
job.location
job.released_us
job.alive
job.current
```

**Example (not recompiled)**:
```grs
if (job.type == "retrieve") { print(job.location); }
```

**Notes:** Current transport lifecycle types include move, retrieve and deliver.

**Related:** dispatch, claim, cancel, preempt, job.selected, job.finished

## Collection Attributes

### Queue / Table / ObjectList size

**Purpose:** Returns the number of stored elements in supported runtime collections.

**Syntax:**
```grs
queue.size
table.size
objectList.size
```

**Example (historically compiler-checked)**:
```grs
print(queue.size);
```

**Notes:** Read-only collection size query.

**Related:** Queue, Table, ObjectList

## String Attributes

### length / substring

**Purpose:** Reads String length or returns a substring.

**Syntax:**
```grs
text.length
text.substring(start, length)
```

**Example (historically compiler-checked)**:
```grs
print(name.substring(0, 4));
```

**Notes:** substring uses a zero-based start index in the current Host implementation.

**Related:** String

## Expressions

### operators

**Purpose:** Arithmetic, comparison and boolean operators for GRS expressions.

**Syntax:**
```grs
+ - * /
== != < <= > >=
&& || !
```

**Example (not recompiled)**:
```grs
if (vehicle.id >= 0 && !done) { ... }
```

**Notes:** Native operators are compile-time lowered to the existing bytecode expression engine.

**Related:** if, while

### vehicle / self

**Purpose:** Provides the current Vehicle actor surface and current actor custom-attribute surface.

**Syntax:**
```grs
vehicle.id
vehicle.station
vehicle.phase
self.<custom_attribute>
```

**Example (historically compiler-checked)**:
```grs
set(self.priority, 3);
print(self.priority);
```

**Notes:** Custom modeling state is script-side and does not overwrite physical Vehicle state.

**Related:** set, configure, Vehicle Attributes

## Reserved / Not Active

### vehicle.work_check / vehicle.park_check

**Purpose:** Names are reserved in the canonical event namespace but are not physically wired yet.

**Syntax:**
```grs
begin vehicle.work_check event
    ...
end
begin vehicle.park_check event
    ...
end
```

**Notes:** 

**Related:** canonical events

### conveyor.enter

**Purpose:** Reserved for a Load entering an integrated Workspace Conveyor.

**Syntax:**
```grs
begin conveyor.enter event
    ...
end
```

**Notes:** 

**Related:** Workspace Conveyor, Load, future Conveyor material runtime

## Events

### conveyor.exit

**Purpose:** Fires when the Conveyor job reaches an exit-ready handoff boundary.

**Syntax:**
```grs
begin conveyor.exit event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin conveyor.exit event
    print(load_id);
end
```

**Notes:** This is an implemented callback. With stop-distance/backpressure flow it is the point where downstream call_transport can be issued.

**Related:** conveyor.blocked, conveyor.released, conveyor.job_completed, call_transport

## Reserved / Not Active

### conveyor.transfer

**Purpose:** Reserved for an authoritative Conveyor-to-Conveyor material transfer.

**Syntax:**
```grs
begin conveyor.transfer event
    ...
end
```

**Notes:** No dedicated conveyor.transfer callback is wired. Cross-module logical handoff currently uses conveyor.exit / conveyor.released with call_transport.

**Related:** Workspace Conveyor, transfer, future Conveyor material runtime

## Events

### conveyor.blocked

**Purpose:** Fires when the Conveyor job enters its actual blocked/backpressure state.

**Syntax:**
```grs
begin conveyor.blocked event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin conveyor.blocked event
    print(load_id);
end
```

**Notes:** This callback is emitted from the Conveyor runtime state transition; no synthetic polling timer is used.

**Related:** conveyor.exit, conveyor.released, conveyor.job_completed

### conveyor.released

**Purpose:** Fires after a blocked/exit-ready Conveyor Load is accepted by the downstream owner.

**Syntax:**
```grs
begin conveyor.released event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin conveyor.released event
    print(load_id);
end
```

**Notes:** 

**Related:** conveyor.blocked, conveyor.exit, call_transport

## Reserved / Not Active

### conveyor.sensor.on

**Purpose:** Reserved for a real Conveyor sensor ON transition.

**Syntax:**
```grs
begin conveyor.sensor.on event
    ...
end
```

**Notes:** Conveyor Job movement does not implement a physical sensor state; this event remains reserved.

**Related:** Workspace Conveyor, sensor, future Conveyor material runtime

### conveyor.sensor.off

**Purpose:** Reserved for a real Conveyor sensor OFF transition.

**Syntax:**
```grs
begin conveyor.sensor.off event
    ...
end
```

**Notes:** Conveyor Job movement does not implement a physical sensor state; this event remains reserved.

**Related:** Workspace Conveyor, sensor, future Conveyor material runtime

## Removed Syntax

### travel / move_into

**Purpose:** Historical subsystem-specific movement verbs are intentionally removed from product GRS.

**Syntax:**
```grs
travel(...)  // removed
move_into(...)  // removed
```

**Example (historically compiler-checked)**:
```grs
move_to("ST01");
```

**Notes:** Compiler emits GRS_SURFACE_REMOVED_ACTION and directs users to move_to().

**Related:** move_to

## Transport

### Work_Accept

**Purpose:** Optional read-only acceptance predicate for explicit GRS claim(load, vehicle).

**Syntax:**
```grs
begin Work_Accept(vehicle, load, pickup) event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin Work_Accept(vehicle, load, pickup) event
    return(pickup != null);
end
```

**Notes:** Runs synchronously immediately before a new explicit script claim mutates Load/ScheduleJob state. It must return Bool. State writes, waits, clone, RNG, transport/resource mutation and unknown Host actions are rejected before execution. If absent, claim() behavior is unchanged. Native Random/Real dispatch and easy transport do not synthesize a Load just to call this predicate.

**Related:** claim, Load, ScheduleJob, read-only evaluation

## Resources

### WIP / Traffic capacity pattern

**Purpose:** Models endpoint/WIP capacity with the existing Resource acquire/release and targeted wake path.

**Syntax:**
```grs
get(WIP_RESOURCE)
...
free(WIP_RESOURCE)
```

**Example (not recompiled)**:
```grs
get(R_ST01_WIP);
// process work
free(R_ST01_WIP);
```

**Notes:** Resource capacity is the authoritative capacity in this pattern. Station occupancy/reservation is physical Vehicle occupancy and is intentionally not treated as the same value. Capacity waits use targeted scheduler wake, not polling.

**Related:** use, get, reserve, free, resource.capacity, station_occupancy_count

## Not Implemented

### catalog-only actions

**Purpose:** These words may exist in parser/action-catalog infrastructure, but the current product EngineScriptHost does not provide executable Simulation Studio semantics for them as statements.

**Syntax:**
```grs
terminate / remove / add / delete
open / read / write / close
schedule / choose (AutoMod statement form)
```

**Example (not recompiled)**:
```grs
// Use the implemented function forms instead:
choose(list, "min", "released_us");
schedule_in("my.event", 5);
terminate_load(load);
file_read_lines("data.txt");
```

**Notes:** Issue #30: the function forms choose(list [, mode, ...]), schedule_in(event, seconds) and schedule_at(event, seconds) ARE implemented (OHT) and listed in the callable index. Only the AutoMod-style statement keywords above remain parser-recognized without runtime meaning. Help must follow actual runtime support, not parser recognition alone.

**Related:** choose, schedule_in, schedule_at, terminate_load, file_read_lines, Action Catalog

## Control Flow

### return (no value)

**Purpose:** Returns from the current user-defined event without a value.

**Syntax:**
```grs
return
return(value)
```

**Example (historically compiler-checked)**:
```grs
if (done) {
    return
}
```

**Notes:** A bare return produces null. return(value) preserves the existing return-value behavior.

**Related:** event, call, return(value)

## Core Actions

### clone source actor

**Purpose:** Forks script execution after cloning the selected Load actor.

**Syntax:**
```grs
clone()
clone(load)
```

**Example (historically compiler-checked)**:
```grs
clone(load);
```

**Notes:** With no EntityHandle argument, clone uses the current actor. With an explicit Load handle, that Load is copied (ownership/location/destination/onboard/custom attributes) and the cloned execution branch continues with the copied Load as actor. This is runtime execution machinery, not a user-facing Process declaration.

**Related:** create, Load, Runtime Clone, Event execution model

### insert optional position

**Purpose:** Inserts an entity into a named Queue with an optional position.

**Syntax:**
```grs
insert(item, queue)
insert(item, queue, "begin")
insert(item, queue, "end")
```

**Example (historically compiler-checked)**:
```grs
insert(load, "Q_WAIT");
```

**Notes:** begin inserts at the front. Omitted position, end, and other current position values append.

**Related:** Queue, send

## Collection Attributes

### List.size

**Purpose:** Returns the number of values in a runtime List.

**Syntax:**
```grs
list.size
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.schedjobs.size);
```

**Notes:** 

**Related:** vehicle.schedjobs, Queue.size, Table.size, ObjectList.size

## Vehicle Attributes

### Vehicle attribute aliases

**Purpose:** Documents implemented native aliases for Vehicle queries.

**Syntax:**
```grs
vehicle.location == vehicle.station
vehicle.schedulejobs == vehicle.schedjobs
vehicle.status == vehicle.phase
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.location, vehicle.schedulejobs.size, vehicle.status);
```

**Notes:** Aliases resolve to the same current physical/script state; they do not duplicate state.

**Related:** vehicle.station, vehicle.schedjobs, vehicle.phase

### Vehicle zone

**Purpose:** Sets or reads a logical Vehicle zone such as building, floor, or operating area.

**Syntax:**
```grs
set(vehicle.zone, "ZONE")
set_vehicle_zone(vehicle, "ZONE")
vehicle_zone(vehicle)
```

**Example (historically compiler-checked)**:
```grs
set(vehicle.zone, "FAB_A_7F");
print(vehicle_zone(vehicle));
```

**Notes:** Zone is logical metadata. It does not automatically change routing, dispatch, Following, or Sensor behavior. Blank means UNASSIGNED.

**Related:** Path zone, current path zone, Simulation Setup Vehicle Zone

## Path / Routing

### Path zone

**Purpose:** Reads or changes the logical zone assigned to a directed Path ID.

**Syntax:**
```grs
path_zone(pathId)
set_path_zone(pathId, "ZONE")
```

**Example (historically compiler-checked)**:
```grs
set_path_zone(12, "FAB_B_3F");
print(path_zone(12));
```

**Notes:** This changes logical runtime metadata only. It does not change route weight, direction, physical length, or automatically restrict route search. Workspace Selected Path Zone is the authoring source for Path.zone.

**Related:** Vehicle zone, route weight, Workspace Selected Path Zone

### Path type (rail type name)

**Purpose:** Reads the rail type attribute of a directed Path ID: its type name and whether the rail belongs to OHT or AGV.

**Syntax:**
```grs
path_type_name(pathId)
path_type(pathId)
vehicle_type_name(vehicle)
vehicle_path_type_name(vehicle)
```

**Example (historically compiler-checked)**:
```grs
print(path_type(12), path_type_name(12));
print(vehicle_type_name(vehicle), vehicle_path_type_name(vehicle));
```

**Notes:** The type name is authored in Workspace (select rails and a Vehicle object, right-click Type Name...), by DXF layer AGV_PATH* (rail kind default), or by the model.module type_name field. A Vehicle spawns on the rails whose type name equals its own. Read-only at run time; it does not restrict routing.

**Related:** Path zone, model.module type_name

## Getting Started

### model.module type_name

**Purpose:** Declares the rail type name a module's Vehicles spawn on.

**Syntax:**
```grs
begin model.module event
    set(module_id, "agv_a");
    set(runtime_kind, "agv");
    set(type_name, "LINE_A");
end
```

**Example (historically compiler-checked)**:
```grs
set(runtime_kind, "oht");
set(type_name, "LINE_A");
```

**Notes:** Supported for runtime_kind oht and agv. vehicle_count Vehicles spawn on rails whose type name is LINE_A (OHT: on that rail's Stations; AGV: on that rail). Without type_name, Workspace Vehicle objects with a Type Name, or the established placement, are used.

**Related:** Path type, runtime_kind, vehicle_count

## Vehicle Attributes

### Current Path zone

**Purpose:** Returns the zone of the Path the Vehicle currently occupies.

**Syntax:**
```grs
vehicle_path_zone(vehicle)
current_path_zone(vehicle)
```

**Example (historically compiler-checked)**:
```grs
if (vehicle_path_zone(vehicle) == "FAB_A_7F") {
    print("vehicle is in A 7F");
}
```

**Notes:** The value is read-only through these accessors. Use set_path_zone(pathId, zone) or Workspace Path settings to edit Path zone. Off-map Vehicles return an empty string.

**Related:** Vehicle zone, Path zone

## Getting Started

### Event execution model

**Purpose:** Defines the Simulation Studio authoring policy: native model logic is event-centered and does not introduce a separate user-facing Process type.

**Syntax:**
```grs
begin model.init event
    ...
end
begin vehicle.pickup event
    ...
end
begin dispatch.request event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin model.init event
    print("model initialized");
end
```

**Notes:** Simulation Studio Model Logic accepts native GRS source; historical model source should be translated to GRS before validation.

**Related:** event, model.init, vehicle.*, dispatch.request, clone, wait

### Simulation Setup + GRS workload

**Purpose:** Uses the Real or Random From-To workload selected in Simulation Setup while GRS adds user policy callbacks and model logic.

**Syntax:**
```grs
begin model.init event
    ...
end
begin vehicle.pickup event
    ...
end
begin vehicle.setdown event
    ...
end
```

**Example (historically compiler-checked)**:
```grs
begin vehicle.pickup event
    vehicle_dwell(8);
end
```

**Notes:** This describes the existing single-runtime Studio path without model.module declarations. Real/Random From-To remains active even when configure_motion() is called. Declared Studio modules use their own job_source setting (script by default), independently of Auto Simulation Setup.

**Related:** Simulation Setup, Real From-To, Random From-To, configure_motion, disable_native_job_source

## Core Actions

### disable_native_job_source

**Purpose:** Explicitly disables native Real/Random From-To release when the GRS model generates its own Load workload.

**Syntax:**
```grs
disable_native_job_source()
```

**Example (historically compiler-checked)**:
```grs
begin model.init event
    disable_native_job_source();
end
```

**Notes:** Call this only when GRS itself owns demand generation. configure_motion() does not change workload ownership. Declared modules with job_source=script disable native generation during preparation and need no explicit disable call. A Native declaration conflicts with explicit script transport or source-disable actions.

**Related:** configure_motion, create, spawn_event, file_read_lines, Simulation Setup

### oht.motion_off

**Purpose:** Turns off the OHT Pickup/Setdown transfer (Slide/Hoist) motion to keep the run light. Travel is unchanged.

**Syntax:**
```grs
oht.motion_off()
```

**Example (historically compiler-checked)**:
```grs
begin model.init event
    oht.motion_off();
end
```

**Notes:** Call from model.init with no arguments. The Core pickup/setdown stop time is kept, so simulation results do not change; only the Slide/Hoist animation is skipped and the carrier switches between port and gripper at the handoff point. The setting applies to the OHT module that declares it.

**Related:** stk.motion_off, amr.motion_off, vehicle_dwell, Simulation Setup

### oht.color_fixed

**Purpose:** Turns off the Vehicle-phase color change (Idle/Retrieving/Pickup/Moving/Setdown) so the OHT keeps its original model color.

**Syntax:**
```grs
oht.color_fixed()
```

**Example (historically compiler-checked)**:
```grs
begin model.init event
    oht.color_fixed();
end
```

**Notes:** Call from model.init with no arguments. Only the display color changes; travel, pickup/setdown time and simulation results are unchanged. Useful for recording videos where a constant OHT color is easier to follow.

**Related:** oht.motion_off, set_vehicle_color, Simulation Setup

### stk.motion_off

**Purpose:** Turns off STK Crane motion so the Crane does not move separately.

**Syntax:**
```grs
stk.motion_off()
```

**Example (historically compiler-checked)**:
```grs
begin model.init event
    asrs_stocker_initialize();
    stk.motion_off();
end
```

**Notes:** Call from model.init with no arguments, before the first outbound request. Crane X/Z travel, Fork extend/retract and the pickup/deposit hold time all become 0, so each Crane job step completes immediately. Inventory, Port Lane and handoff events still occur in the same order. Rejected once the first outbound has started.

**Related:** oht.motion_off, amr.motion_off, asrs_stocker_initialize, asrs_request_first_outbound

### amr.motion_off

**Purpose:** Turns off the AMR transfer (load/unload) motion setting.

**Syntax:**
```grs
amr.motion_off()
```

**Example (historically compiler-checked)**:
```grs
begin model.init event
    amr.motion_off();
end
```

**Notes:** Call from model.init with no arguments. The AMR currently has no transfer motion, so the setting is only stored in the AMR engine; travel and the pickup/setdown stop time are unchanged.

**Related:** oht.motion_off, stk.motion_off

## Getting Started

### Readable function names

**Purpose:** Model functions use Pascal_Underscore names; equipment acronyms remain uppercase.

**Syntax:**
```grs
call OHT_System_Initialize()
call ASRS_Seed_Shelf_FOUP(101)
call AMR_System_Initialize()
call Conveyor_System_Initialize()
call Process_Complete()
```

**Example (historically compiler-checked)**:
```grs
begin Process_Complete event
    print "process complete"
end
```

**Notes:** Existing camelCase model declarations/calls remain compatible through one unambiguous case/underscore-insensitive alias. Canonical dotted hooks such as model.init, vehicle.pickup_complete, conveyor.blocked and equipment.load_arrived are unchanged. Existing snake_case runtime built-ins keep their implementation names; Help displays the same callable in readable Pascal_Underscore form.

**Related:** Runtime Function Index, Native OHT / ASRS Functions, Example Model Functions, Model Functions (current source)

## Runtime Function Index

### Abs(value)

**Purpose:** Absolute value.

**Syntax:**
```grs
call Abs(value)
```

**Notes:** 

**Related:** 

### Fabs(value)

**Purpose:** Floating-point absolute value.

**Syntax:**
```grs
call Fabs(value)
```

**Notes:** 

**Related:** 

### Sqrt(value)

**Purpose:** Square root.

**Syntax:**
```grs
call Sqrt(value)
```

**Notes:** 

**Related:** 

### Pow(base, exponent)

**Purpose:** Power function.

**Syntax:**
```grs
call Pow(base, exponent)
```

**Notes:** 

**Related:** 

### Exp(value)

**Purpose:** Natural exponential.

**Syntax:**
```grs
call Exp(value)
```

**Notes:** 

**Related:** 

### Log(value)

**Purpose:** Natural logarithm.

**Syntax:**
```grs
call Log(value)
```

**Notes:** 

**Related:** 

### Log10(value)

**Purpose:** Base-10 logarithm.

**Syntax:**
```grs
call Log10(value)
```

**Notes:** 

**Related:** 

### Sin(value)

**Purpose:** Sine.

**Syntax:**
```grs
call Sin(value)
```

**Notes:** 

**Related:** 

### Cos(value)

**Purpose:** Cosine.

**Syntax:**
```grs
call Cos(value)
```

**Notes:** 

**Related:** 

### Tan(value)

**Purpose:** Tangent.

**Syntax:**
```grs
call Tan(value)
```

**Notes:** 

**Related:** 

### Array_Inc(list_name, index [, index ...], amount)

**Purpose:** Compatibility helper for incrementing a numeric indexed List element.

**Syntax:**
```grs
call Array_Inc(list_name, index [, index ...], amount)
```

**Notes:** Preferred GRS syntax is 'inc ListName(1) by amount'. Unwritten numeric cells begin at 0 after the List type is established.

**Related:** 

### Array_Dec(list_name, index [, index ...], amount)

**Purpose:** Compatibility helper for decrementing a numeric indexed List element.

**Syntax:**
```grs
call Array_Dec(list_name, index [, index ...], amount)
```

**Notes:** Preferred GRS syntax is 'dec ListName(1) by amount'.

**Related:** 

### List_Get(list, index)

**Purpose:** Reads a List value by index.

**Syntax:**
```grs
call List_Get(list, index)
```

**Notes:** 

**Related:** 

### List_Insert(list, value)

**Purpose:** Inserts a value into a runtime List.

**Syntax:**
```grs
call List_Insert(list, value)
```

**Notes:** 

**Related:** 

### List_Remove(list, value)

**Purpose:** Removes a value from a runtime List.

**Syntax:**
```grs
call List_Remove(list, value)
```

**Notes:** 

**Related:** 

### List_Size(list)

**Purpose:** Returns runtime List size.

**Syntax:**
```grs
call List_Size(list)
```

**Notes:** 

**Related:** 

### List_Snapshot(list)

**Purpose:** Returns a snapshot of a runtime List.

**Syntax:**
```grs
call List_Snapshot(list)
```

**Notes:** 

**Related:** 

### Table_Clear(table)

**Purpose:** Clears a runtime table.

**Syntax:**
```grs
call Table_Clear(table)
```

**Notes:** 

**Related:** 

### Table_Relative_Average(table, ...)

**Purpose:** Returns a relative table average.

**Syntax:**
```grs
call Table_Relative_Average(table, ...)
```

**Notes:** 

**Related:** 

### Concat(...)

**Purpose:** Concatenates values as text.

**Syntax:**
```grs
call Concat(...)
```

**Notes:** 

**Related:** 

### Field(text, delimiter, index)

**Purpose:** Reads a 1-based delimited text field.

**Syntax:**
```grs
call Field(text, delimiter, index)
```

**Notes:** 

**Related:** 

### Normalize_Station(station)

**Purpose:** Normalizes a station identifier for model use.

**Syntax:**
```grs
call Normalize_Station(station)
```

**Notes:** 

**Related:** 

### Trailing_Number(text)

**Purpose:** Reads a trailing numeric suffix.

**Syntax:**
```grs
call Trailing_Number(text)
```

**Notes:** 

**Related:** 

### To_Number(value)

**Purpose:** Converts a value to Number.

**Syntax:**
```grs
call To_Number(value)
```

**Notes:** 

**Related:** 

### To_String(value)

**Purpose:** Converts a value to String.

**Syntax:**
```grs
call To_String(value)
```

**Notes:** 

**Related:** 

### Least_Counter_Index(values)

**Purpose:** Returns the least-used counter index.

**Syntax:**
```grs
call Least_Counter_Index(values)
```

**Notes:** 

**Related:** 

### Weighted_Choice(weight1, value1, weight2, value2, ...)

**Purpose:** Selects one value from weight/value pairs.

**Syntax:**
```grs
call Weighted_Choice(weight1, value1, weight2, value2, ...)
```

**Notes:** Weights are read from even argument positions; negative weights are treated as zero.

**Related:** 

### File_Read_Lines(path)

**Purpose:** Reads model-root-relative text lines.

**Syntax:**
```grs
call File_Read_Lines(path)
```

**Notes:** Subject to the GRS file I/O policy.

**Related:** 

### File_Write_Line(path, text)

**Purpose:** Writes a model-root-relative text line.

**Syntax:**
```grs
call File_Write_Line(path, text)
```

**Notes:** Subject to the GRS file I/O policy.

**Related:** 

### File_Append_Line(path, text)

**Purpose:** Appends a model-root-relative text line.

**Syntax:**
```grs
call File_Append_Line(path, text)
```

**Notes:** Subject to the GRS file I/O policy.

**Related:** 

### Configure_Motion(...)

**Purpose:** Configures supported motion options.

**Syntax:**
```grs
call Configure_Motion(...)
```

**Notes:** 

**Related:** 

### Disable_Native_Job_Source()

**Purpose:** Disables native Real/Random workload release for a GRS-owned workload.

**Syntax:**
```grs
call Disable_Native_Job_Source()
```

**Notes:** 

**Related:** 

### oht.motion_off()

**Purpose:** Disables the OHT Pickup/Setdown transfer (Hoist/Slide) motion; travel is unchanged.

**Syntax:**
```grs
call oht.motion_off()
```

**Notes:** Call from model.init. The Core pickup/setdown stop time is kept, so only the transfer motion is skipped.

**Related:** 

### Preload_Buffer_Cell(cell)

**Purpose:** Places a new FOUP into an empty Buffer Cell at the start of the run.

**Syntax:**
```grs
call Preload_Buffer_Cell(cell)
```

**Notes:** Call from model.init, e.g. preload_buffer_cell("BUFFER_2_R1_C1"). The Cell becomes occupied exactly as after a completed store, so `move from buffer` can take it later.

**Related:** 

### Buffer_Move_Cell_Wait(source_cell, target_cell [, vehicle])

**Purpose:** Moves the FOUP in one Buffer Cell into another empty Buffer Cell and waits until it is set down (GRS sentence: `move from buffer A to buffer B`).

**Syntax:**
```grs
call Buffer_Move_Cell_Wait(source_cell, target_cell [, vehicle])
```

**Notes:** The source Cell is freed at Pickup and the target Cell becomes occupied at Setdown. Rejected (logged) when the source is empty/reserved or the target is occupied/reserved/unreachable.

**Related:** 

### oht.color_fixed()

**Purpose:** Turns off the Vehicle-phase color change so the OHT keeps its original model color.

**Syntax:**
```grs
call oht.color_fixed()
```

**Notes:** Call from model.init. Only the display color changes; travel, pickup/setdown time and results are unchanged.

**Related:** 

### stk.motion_off()

**Purpose:** Disables STK Crane X/Z travel and Fork motion; Crane pickup/deposit hold time also becomes 0.

**Syntax:**
```grs
call stk.motion_off()
```

**Notes:** Call from model.init before the first outbound. Crane job steps complete immediately without separate Crane movement.

**Related:** 

### amr.motion_off()

**Purpose:** Disables the AMR transfer (load/unload) motion.

**Syntax:**
```grs
call amr.motion_off()
```

**Notes:** The AMR currently has no transfer motion, so this only records the setting for the Core engine.

**Related:** 

### Every_Event(event_name, interval_seconds)

**Purpose:** Schedules a recurring event.

**Syntax:**
```grs
call Every_Event(event_name, interval_seconds)
```

**Notes:** Easy syntax 'every ... call ...' lowers to this callable.

**Related:** 

### Spawn_Event(event_name, ...)

**Purpose:** Starts a user event execution.

**Syntax:**
```grs
call Spawn_Event(event_name, ...)
```

**Notes:** 

**Related:** 

### Schedule_In(event_name, relative_seconds [, actor])

**Purpose:** Starts a user event relative_seconds from now.

**Syntax:**
```grs
call Schedule_In(event_name, relative_seconds [, actor])
```

**Notes:** Argument capture beyond the target actor is Not Implemented (same limit as spawn_event/clone_to_event).

**Related:** 

### Schedule_At(event_name, absolute_simulation_seconds [, actor])

**Purpose:** Starts a user event at an absolute simulation time.

**Syntax:**
```grs
call Schedule_At(event_name, absolute_simulation_seconds [, actor])
```

**Notes:** 

**Related:** 

### Clone_To_Event(event_name, ...)

**Purpose:** Clones the current execution actor into another event.

**Syntax:**
```grs
call Clone_To_Event(event_name, ...)
```

**Notes:** 

**Related:** 

### Terminate_Load(load)

**Purpose:** Terminates a scripted Load.

**Syntax:**
```grs
call Terminate_Load(load)
```

**Notes:** 

**Related:** 

### Vehicle_Dwell(seconds)

**Purpose:** Applies a Vehicle dwell.

**Syntax:**
```grs
call Vehicle_Dwell(seconds)
```

**Notes:** 

**Related:** 

### Vehicle_Resume_Hold(vehicle)

**Purpose:** Places a Vehicle resume hold.

**Syntax:**
```grs
call Vehicle_Resume_Hold(vehicle)
```

**Notes:** 

**Related:** 

### Vehicle_Resume_Release(vehicle)

**Purpose:** Releases a Vehicle resume hold.

**Syntax:**
```grs
call Vehicle_Resume_Release(vehicle)
```

**Notes:** 

**Related:** 

### Set_Vehicle_Color(vehicle, color)

**Purpose:** Sets the scripted Vehicle presentation color.

**Syntax:**
```grs
call Set_Vehicle_Color(vehicle, color)
```

**Notes:** 

**Related:** 

### Declare_Attribute_Type(name, type)

**Purpose:** Declares the expected type (Bool/Integer/Number/String/Time/Distance/EntityRef) for a custom Attribute name.

**Syntax:**
```grs
call Declare_Attribute_Type(name, type)
```

**Notes:** Once declared, set()/configure() writes of a mismatched Value kind are rejected (returns false) instead of silently coercing to 0/"". Integer/Number/Time/Distance all gate on the same underlying Number kind -- GRS Value has no narrower numeric type, so the distinction is documentation/unit intent. Does not retroactively validate values already written.

**Related:** 

### Attribute_Declared_Type(name)

**Purpose:** Returns the declared type name for a custom Attribute, or null if undeclared.

**Syntax:**
```grs
call Attribute_Declared_Type(name)
```

**Notes:** 

**Related:** 

### Conveyor_Running()

**Purpose:** Returns true while the current Conveyor module is started.

**Syntax:**
```grs
call Conveyor_Running()
```

**Notes:** 

**Related:** 

### Conveyor_Speed()

**Purpose:** Returns the belt speed in mm/s.

**Syntax:**
```grs
call Conveyor_Speed()
```

**Notes:** 

**Related:** 

### Conveyor_Length()

**Purpose:** Returns the total route length in mm.

**Syntax:**
```grs
call Conveyor_Length()
```

**Notes:** 

**Related:** 

### Conveyor_Load_Count()

**Purpose:** Returns the current number of Loads on the Conveyor.

**Syntax:**
```grs
call Conveyor_Load_Count()
```

**Notes:** 

**Related:** 

### Conveyor_Blocked()

**Purpose:** Returns true while any Load on the Conveyor is currently blocked.

**Syntax:**
```grs
call Conveyor_Blocked()
```

**Notes:** 

**Related:** 

### Conveyor_Entry_Ready()

**Purpose:** Returns true while the Conveyor entry can currently accept a new Load.

**Syntax:**
```grs
call Conveyor_Entry_Ready()
```

**Notes:** This is the same gate canAcceptLoad() already enforces before admission.

**Related:** 

### Conveyor_Entry()

**Purpose:** Returns the configured entry Station name.

**Syntax:**
```grs
call Conveyor_Entry()
```

**Notes:** 

**Related:** 

### Conveyor_Exit()

**Purpose:** Returns the configured exit Station name.

**Syntax:**
```grs
call Conveyor_Exit()
```

**Notes:** 

**Related:** 

### Sim_Time()

**Purpose:** Returns current simulation time.

**Syntax:**
```grs
call Sim_Time()
```

**Notes:** 

**Related:** 

### Request_Transport(from_station, to_station, ...)

**Purpose:** Requests a transport job.

**Syntax:**
```grs
call Request_Transport(from_station, to_station, ...)
```

**Notes:** 

**Related:** 

### Buffer_Cell(cell_id)

**Purpose:** Returns one authored Buffer Cell Entity by ID.

**Syntax:**
```grs
call Buffer_Cell(cell_id)
```

**Notes:** Example: buffer_cell("BUFFER_12_R1_C1").occupied.

**Related:** 

### Buffer_Cells(group_id)

**Purpose:** Returns Buffer Cell Entities in row-major order for a Buffer group.

**Syntax:**
```grs
call Buffer_Cells(group_id)
```

**Notes:** Group IDs are BUFFER_<EquipmentInstanceId>.

**Related:** 

### Call_Transport(target_module, load_id, from_station, to_station)

**Purpose:** Hands the same logical Load to another declared module.

**Syntax:**
```grs
call Call_Transport(target_module, load_id, from_station, to_station)
```

**Notes:** 

**Related:** 

### Reassign_Retrieve(...)

**Purpose:** Reassigns scripted retrieve work.

**Syntax:**
```grs
call Reassign_Retrieve(...)
```

**Notes:** 

**Related:** 

### Path_Distance(from, to)

**Purpose:** Returns path distance.

**Syntax:**
```grs
call Path_Distance(from, to)
```

**Notes:** 

**Related:** 

### Station_Distance(from, to)

**Purpose:** Returns station-to-station distance.

**Syntax:**
```grs
call Station_Distance(from, to)
```

**Notes:** 

**Related:** 

### Station_Vehicle_List(station)

**Purpose:** Returns Vehicles associated with a station.

**Syntax:**
```grs
call Station_Vehicle_List(station)
```

**Notes:** 

**Related:** 

### Path_Zone(path_id)

**Purpose:** Returns a Path logical zone.

**Syntax:**
```grs
call Path_Zone(path_id)
```

**Notes:** 

**Related:** 

### Set_Path_Zone(path_id, zone)

**Purpose:** Sets a Path logical zone.

**Syntax:**
```grs
call Set_Path_Zone(path_id, zone)
```

**Notes:** 

**Related:** 

### Vehicle_Zone(vehicle)

**Purpose:** Returns a Vehicle logical zone.

**Syntax:**
```grs
call Vehicle_Zone(vehicle)
```

**Notes:** 

**Related:** 

### Set_Vehicle_Zone(vehicle, zone)

**Purpose:** Sets a Vehicle logical zone.

**Syntax:**
```grs
call Set_Vehicle_Zone(vehicle, zone)
```

**Notes:** 

**Related:** 

### Vehicle_Path_Zone(vehicle)

**Purpose:** Returns the Vehicle's current Path zone.

**Syntax:**
```grs
call Vehicle_Path_Zone(vehicle)
```

**Notes:** 

**Related:** 

### Current_Path_Zone(vehicle)

**Purpose:** Alias for the Vehicle's current Path zone.

**Syntax:**
```grs
call Current_Path_Zone(vehicle)
```

**Notes:** 

**Related:** 

### Path_Type_Name(path_id)

**Purpose:** Returns a Path's rail type name (Workspace Type Name).

**Syntax:**
```grs
call Path_Type_Name(path_id)
```

**Notes:** 

**Related:** 

### Path_Type(path_id)

**Purpose:** Returns a Path's rail vehicle type: OHT or AGV.

**Syntax:**
```grs
call Path_Type(path_id)
```

**Notes:** 

**Related:** 

### Vehicle_Type_Name(vehicle)

**Purpose:** Returns the type name the Vehicle was spawned with (empty if none).

**Syntax:**
```grs
call Vehicle_Type_Name(vehicle)
```

**Notes:** 

**Related:** 

### Vehicle_Path_Type_Name(vehicle)

**Purpose:** Returns the rail type name of the Vehicle's current Path.

**Syntax:**
```grs
call Vehicle_Path_Type_Name(vehicle)
```

**Notes:** 

**Related:** 

### Current_Path_Type_Name(vehicle)

**Purpose:** Alias for the Vehicle's current Path type name.

**Syntax:**
```grs
call Current_Path_Type_Name(vehicle)
```

**Notes:** 

**Related:** 

### Resource_Capacity(resource)

**Purpose:** Returns resource capacity.

**Syntax:**
```grs
call Resource_Capacity(resource)
```

**Notes:** 

**Related:** 

### Resource_In_Use(resource)

**Purpose:** Returns current resource usage.

**Syntax:**
```grs
call Resource_In_Use(resource)
```

**Notes:** 

**Related:** 

### Resource_Name(resource)

**Purpose:** Returns resource name.

**Syntax:**
```grs
call Resource_Name(resource)
```

**Notes:** 

**Related:** 

### Station_Name(station)

**Purpose:** Returns the Station Control Point name for a Station index.

**Syntax:**
```grs
call Station_Name(station)
```

**Notes:** Returns "" for an out-of-range index.

**Related:** 

### Station_Occupancy_Count(station)

**Purpose:** Returns the current reservation count for a Station.

**Syntax:**
```grs
call Station_Occupancy_Count(station)
```

**Notes:** Projects the existing reservation counter as-is; there is no separate multi-vehicle capacity model to report, so capacity/remaining_space are Not Implemented rather than fabricated.

**Related:** 

### Station_Reserved(station)

**Purpose:** Returns true while any Vehicle currently reserves the Station.

**Syntax:**
```grs
call Station_Reserved(station)
```

**Notes:** This is the same boolean reservation gate dispatch already enforces (stationReserved()).

**Related:** 

### Use(resource_name)

**Purpose:** Acquires one unit of a Resource (alias of get/reserve).

**Syntax:**
```grs
call Use(resource_name)
```

**Notes:** 

**Related:** 

### Get(resource_name)

**Purpose:** Acquires one unit of a Resource (alias of use/reserve).

**Syntax:**
```grs
call Get(resource_name)
```

**Notes:** 

**Related:** 

### Reserve(resource_name)

**Purpose:** Acquires one unit of a Resource (alias of use/get).

**Syntax:**
```grs
call Reserve(resource_name)
```

**Notes:** 

**Related:** 

### Easy_Assign_Vehicle(vehicle)

**Purpose:** Assigns the easy-syntax Load to a Vehicle.

**Syntax:**
```grs
call Easy_Assign_Vehicle(vehicle)
```

**Notes:** Normally generated by easy syntax.

**Related:** 

### Easy_Create_Load(type)

**Purpose:** Creates the easy-syntax Load.

**Syntax:**
```grs
call Easy_Create_Load(type)
```

**Notes:** Normally generated by easy syntax.

**Related:** 

### Easy_Transport_Retrieve(station, ...)

**Purpose:** Runs easy-syntax retrieve transport.

**Syntax:**
```grs
call Easy_Transport_Retrieve(station, ...)
```

**Notes:** Normally generated by easy syntax.

**Related:** 

### Easy_Transport_Deliver_Wait(station)

**Purpose:** Runs easy-syntax deliver-and-wait transport.

**Syntax:**
```grs
call Easy_Transport_Deliver_Wait(station)
```

**Notes:** Normally generated by easy syntax.

**Related:** 

### Buffer_Move_To_Wait(station, buffer)

**Purpose:** Stores the current retrieve draft into a Buffer Cell after physical Setdown completes.

**Syntax:**
```grs
call Buffer_Move_To_Wait(station, buffer)
```

**Notes:** Generated by: move to <Station> buffer <BUFFER_ID>.

**Related:** 

### Buffer_Move_From_Wait(buffer, station [, vehicle])

**Purpose:** Retrieves the stored Load from a Buffer Cell and waits for delivery completion.

**Syntax:**
```grs
call Buffer_Move_From_Wait(buffer, station [, vehicle])
```

**Notes:** Generated by: move from buffer <BUFFER_ID> to <Station> [using vehicle OHT_02].

**Related:** 

### Humanoid_Create(name, place | name, x_m, y_m)

**Purpose:** Creates a Humanoid at a Station/defined place or x/y (m).

**Syntax:**
```grs
call Humanoid_Create(name, place | name, x_m, y_m)
```

**Notes:** Battery starts full.

**Related:** 

### Humanoid_Define_Place(name, x_m, y_m [, work_height_mm])

**Purpose:** Defines a named work place for humanoid_walk_to/pick/place.

**Syntax:**
```grs
call Humanoid_Define_Place(name, x_m, y_m [, work_height_mm])
```

**Notes:** Defined places win over Station names. Default work height is 900 mm.

**Related:** 

### Humanoid_Define_Obstacle(name, x1_m, y1_m, x2_m, y2_m [, level_id [, z_min_m [, z_max_m]]])

**Purpose:** Defines a rectangular obstacle Humanoids walk around (optionally limited to a height range).

**Syntax:**
```grs
call Humanoid_Define_Obstacle(name, x1_m, y1_m, x2_m, y2_m [, level_id [, z_min_m [, z_max_m]]])
```

**Notes:** Levels without obstacles keep straight-line x route_factor. A walk with no route is rejected. Already planned walks are not re-planned. Height range (default floor to ceiling): an obstacle blocks a Humanoid only if z_max > 0.1 m and z_min < its height, so a low curb is stepped over and an overhead beam is walked under. AMR positions at request time are treated as temporary obstacles on the walk.

**Related:** 

### Humanoid_Remove_Obstacle(name)

**Purpose:** Removes an obstacle (true if it existed).

**Syntax:**
```grs
call Humanoid_Remove_Obstacle(name)
```

**Notes:** Affects walks requested afterwards.

**Related:** 

### Humanoid_Define_Zone(name, x1_m, y1_m, x2_m, y2_m [, capacity [, level_id]])

**Purpose:** Defines a corridor/area that at most `capacity` (default 1) Humanoids may be walking through at once.

**Syntax:**
```grs
call Humanoid_Define_Zone(name, x1_m, y1_m, x2_m, y2_m [, capacity [, level_id]])
```

**Notes:** A Humanoid entering from outside waits at the entrance until the zone has room (first-requested first-served). Only walking time inside the zone is counted; standing Humanoids and other vehicle types do not occupy it. Zones on one level must not overlap.

**Related:** 

### Humanoid_Route_Distance(robot, place)

**Purpose:** Planned walking distance in m (obstacle detour x route_factor) without moving; -1 if unknown or unroutable.

**Syntax:**
```grs
call Humanoid_Route_Distance(robot, place)
```

**Notes:** 

**Related:** 

### Humanoid_Zone_Wait(robot)

**Purpose:** Total seconds the Humanoid has waited at zone entrances.

**Syntax:**
```grs
call Humanoid_Zone_Wait(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Set(robot, parameter, value)

**Purpose:** Overrides one spec value for one Humanoid.

**Syntax:**
```grs
call Humanoid_Set(robot, parameter, value)
```

**Notes:** walk_speed/carry_speed/cart_speed/accel/decel are m/s(^2); turn_speed deg/s; payload_one_arm/payload_two_arm/item_mass kg; *_seconds, robot_time_factor, route_factor, battery_capacity_wh, battery_percent, *_power_w, low_battery_percent, mass_kg.

**Related:** 

### Humanoid_Spec([robot,] parameter)

**Purpose:** Returns a spec/body value (height_mm, shoulder_height_mm, max_reach_height_mm, forward_reach_mm, walk_speed, ...).

**Syntax:**
```grs
call Humanoid_Spec([robot,] parameter)
```

**Notes:** 

**Related:** 

### Humanoid_Walk_To(robot, place)

**Purpose:** Turns and walks to a Station/defined place. Returns seconds.

**Syntax:**
```grs
call Humanoid_Walk_To(robot, place)
```

**Notes:** Straight-line distance x route_factor with trapezoidal speed; carry/cart speeds apply automatically. Fires humanoid.arrived.

**Related:** 

### Humanoid_Walk(robot, meters)

**Purpose:** Walks straight ahead. Returns seconds.

**Syntax:**
```grs
call Humanoid_Walk(robot, meters)
```

**Notes:** 

**Related:** 

### Humanoid_Turn(robot, degrees)

**Purpose:** Turns in place (+ counter-clockwise). Returns seconds.

**Syntax:**
```grs
call Humanoid_Turn(robot, degrees)
```

**Notes:** 

**Related:** 

### Humanoid_Stairs(robot, steps)

**Purpose:** Climbs (+) or descends (-) stair steps. Returns seconds.

**Syntax:**
```grs
call Humanoid_Stairs(robot, steps)
```

**Notes:** Rejected while a cart is attached.

**Related:** 

### Humanoid_Pose(robot, pose)

**Purpose:** Changes posture: stand, carry, reach_high, reach_mid, bend, crouch, kneel, sit. Returns seconds.

**Syntax:**
```grs
call Humanoid_Pose(robot, pose)
```

**Notes:** Joint-space synchronized move; the slowest joint (trapezoidal profile) sets the time.

**Related:** 

### Humanoid_Pick(robot, item [, height_mm [, mass_kg]])

**Purpose:** Aligns, takes the posture for the height, reaches, grasps and lifts an item. Returns seconds.

**Syntax:**
```grs
call Humanoid_Pick(robot, item [, height_mm [, mass_kg]])
```

**Notes:** Items above payload_one_arm use both hands. Height outside the reach envelope is rejected. Fires humanoid.pick_complete.

**Related:** 

### Humanoid_Place(robot [, item] [, height_mm])

**Purpose:** Puts down the held item (right hand first). Returns seconds.

**Syntax:**
```grs
call Humanoid_Place(robot [, item] [, height_mm])
```

**Notes:** Fires humanoid.place_complete.

**Related:** 

### Humanoid_Transfer(robot, item, from_place, to_place [, from_height_mm, to_height_mm])

**Purpose:** Walk + pick + walk + place in one call. Returns seconds.

**Syntax:**
```grs
call Humanoid_Transfer(robot, item, from_place, to_place [, from_height_mm, to_height_mm])
```

**Notes:** 

**Related:** 

### Humanoid_Handover(giver, receiver [, item])

**Purpose:** Hands an item to another Humanoid within arm reach. Returns seconds.

**Syntax:**
```grs
call Humanoid_Handover(giver, receiver [, item])
```

**Notes:** Both robots are busy until completion. Fires humanoid.handover_complete.

**Related:** 

### Humanoid_Attach_Cart(robot, cart)

**Purpose:** Grips a cart handle; later walks use cart speed. Returns seconds.

**Syntax:**
```grs
call Humanoid_Attach_Cart(robot, cart)
```

**Notes:** 

**Related:** 

### Humanoid_Detach_Cart(robot)

**Purpose:** Releases the cart. Returns seconds.

**Syntax:**
```grs
call Humanoid_Detach_Cart(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Open_Door(robot [, door])

**Purpose:** Opens a door/cover. Returns seconds.

**Syntax:**
```grs
call Humanoid_Open_Door(robot [, door])
```

**Notes:** Standard time x robot_time_factor.

**Related:** 

### Humanoid_Close_Door(robot [, door])

**Purpose:** Closes a door/cover. Returns seconds.

**Syntax:**
```grs
call Humanoid_Close_Door(robot [, door])
```

**Notes:** Standard time x robot_time_factor.

**Related:** 

### Humanoid_Press_Button(robot [, count])

**Purpose:** Presses a button/switch count times. Returns seconds.

**Syntax:**
```grs
call Humanoid_Press_Button(robot [, count])
```

**Notes:** 

**Related:** 

### Humanoid_Turn_Valve(robot, turns)

**Purpose:** Turns a valve/knob. Returns seconds.

**Syntax:**
```grs
call Humanoid_Turn_Valve(robot, turns)
```

**Notes:** 

**Related:** 

### Humanoid_Type(robot, text | character_count)

**Purpose:** Types on an HMI/keyboard. Returns seconds.

**Syntax:**
```grs
call Humanoid_Type(robot, text | character_count)
```

**Notes:** 

**Related:** 

### Humanoid_Scan(robot [, target])

**Purpose:** Reads a barcode/RFID. Returns seconds.

**Syntax:**
```grs
call Humanoid_Scan(robot [, target])
```

**Notes:** 

**Related:** 

### Humanoid_Inspect(robot [, seconds [, target]])

**Purpose:** Visual inspection. Returns seconds.

**Syntax:**
```grs
call Humanoid_Inspect(robot [, seconds [, target]])
```

**Notes:** Without seconds uses inspect_seconds x robot_time_factor.

**Related:** 

### Humanoid_Fasten(robot [, count])

**Purpose:** Fastens bolts/screws. Returns seconds.

**Syntax:**
```grs
call Humanoid_Fasten(robot [, count])
```

**Notes:** 

**Related:** 

### Humanoid_Tool_Change(robot [, tool])

**Purpose:** Changes a hand tool. Returns seconds.

**Syntax:**
```grs
call Humanoid_Tool_Change(robot [, tool])
```

**Notes:** 

**Related:** 

### Humanoid_Work(robot, seconds [, label])

**Purpose:** Any other job for a fixed time (manual assembly, cleaning, ...). Returns seconds.

**Syntax:**
```grs
call Humanoid_Work(robot, seconds [, label])
```

**Notes:** 

**Related:** 

### Humanoid_Wait(robot, seconds)

**Purpose:** Idles for a fixed time. Returns seconds.

**Syntax:**
```grs
call Humanoid_Wait(robot, seconds)
```

**Notes:** 

**Related:** 

### Humanoid_Charge(robot [, target_percent])

**Purpose:** Charges the battery to target (default 100%). Returns seconds.

**Syntax:**
```grs
call Humanoid_Charge(robot [, target_percent])
```

**Notes:** Fires humanoid.charged.

**Related:** 

### Humanoid_Joint(robot, joint_name, degrees)

**Purpose:** Moves one joint to an absolute angle. Returns seconds.

**Syntax:**
```grs
call Humanoid_Joint(robot, joint_name, degrees)
```

**Notes:** 

**Related:** 

### Humanoid_Joints(robot, joint_name, degrees [, joint_name, degrees ...])

**Purpose:** Moves multiple joints simultaneously. Returns seconds.

**Syntax:**
```grs
call Humanoid_Joints(robot, joint_name, degrees [, joint_name, degrees ...])
```

**Notes:** The slowest joint determines the synchronized duration.

**Related:** 

### Humanoid_Location(robot)

**Purpose:** Returns the current place name or null.

**Syntax:**
```grs
call Humanoid_Location(robot)
```

**Notes:** Committed place (the destination while walking).

**Related:** 

### Humanoid_X(robot)

**Purpose:** Returns x (m).

**Syntax:**
```grs
call Humanoid_X(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Y(robot)

**Purpose:** Returns y (m).

**Syntax:**
```grs
call Humanoid_Y(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Z(robot)

**Purpose:** Returns z (m) at the Humanoid position.

**Syntax:**
```grs
call Humanoid_Z(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Level(robot)

**Purpose:** Returns the Level ID the Humanoid stands on.

**Syntax:**
```grs
call Humanoid_Level(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Holding(robot [, hand])

**Purpose:** Returns the held item (left/right/any) or null.

**Syntax:**
```grs
call Humanoid_Holding(robot [, hand])
```

**Notes:** 

**Related:** 

### Humanoid_Free_Hands(robot)

**Purpose:** Returns the number of free hands (0..2).

**Syntax:**
```grs
call Humanoid_Free_Hands(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Battery(robot)

**Purpose:** Returns battery percent.

**Syntax:**
```grs
call Humanoid_Battery(robot)
```

**Notes:** Fires humanoid.battery_low when crossing low_battery_percent.

**Related:** 

### Humanoid_Busy(robot)

**Purpose:** Returns true until the current action ends.

**Syntax:**
```grs
call Humanoid_Busy(robot)
```

**Notes:** 

**Related:** 

### Humanoid_State(robot)

**Purpose:** Returns the current action name or idle.

**Syntax:**
```grs
call Humanoid_State(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Posture(robot)

**Purpose:** Returns the current posture name.

**Syntax:**
```grs
call Humanoid_Posture(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Distance(robot)

**Purpose:** Returns walked distance (m).

**Syntax:**
```grs
call Humanoid_Distance(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Utilization(robot)

**Purpose:** Returns busy time / elapsed time since creation (0..1).

**Syntax:**
```grs
call Humanoid_Utilization(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Actions(robot)

**Purpose:** Returns completed action count.

**Syntax:**
```grs
call Humanoid_Actions(robot)
```

**Notes:** 

**Related:** 

### Humanoid_Last_Error(robot)

**Purpose:** Returns the last rejection reason or null.

**Syntax:**
```grs
call Humanoid_Last_Error(robot)
```

**Notes:** Rejected actions return 0 seconds and fire humanoid.rejected.

**Related:** 

### Humanoid_Self()

**Purpose:** Inside a humanoid.* event returns the Humanoid name.

**Syntax:**
```grs
call Humanoid_Self()
```

**Notes:** 

**Related:** 

### Humanoid_Event_Action()

**Purpose:** Inside a humanoid.* event returns the action name.

**Syntax:**
```grs
call Humanoid_Event_Action()
```

**Notes:** 

**Related:** 

### Humanoid_Count()

**Purpose:** Returns the number of Humanoids in this module.

**Syntax:**
```grs
call Humanoid_Count()
```

**Notes:** 

**Related:** 

### Humanoid_Joint_Deg(robot, joint_name)

**Purpose:** Returns the committed target angle of one Humanoid joint.

**Syntax:**
```grs
call Humanoid_Joint_Deg(robot, joint_name)
```

**Notes:** 

**Related:** 

## Attribute Reference

### vehicle.id [OHT, AMR]

**Purpose:** Returns the dense runtime Vehicle/Robot ID.

**Syntax:**
```grs
vehicle.id
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.id);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR. Physical runtime identity; not a user-defined attribute.

**Related:** 

### vehicle.station [OHT, AMR]

**Purpose:** Returns the current/last Station index.

**Syntax:**
```grs
vehicle.station
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.station);
```

**Notes:** Type: Number or null. Access: read-only. Modules: OHT, AMR. Alias vehicle.location resolves to the same value.

**Related:** vehicle.location

### vehicle.from [OHT, AMR]

**Purpose:** Returns the current Job source Station index.

**Syntax:**
```grs
vehicle.from
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.from);
```

**Notes:** Type: Number or null. Access: read-only. Modules: OHT, AMR.

**Related:** vehicle.fromstation

### vehicle.destination [OHT, AMR]

**Purpose:** Returns the current destination Station index.

**Syntax:**
```grs
vehicle.destination
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.destination);
```

**Notes:** Type: Number or null. Access: read-only. Modules: OHT, AMR.

**Related:** vehicle.destinationstation

### vehicle.phase [OHT, AMR]

**Purpose:** Returns the authoritative runtime phase/status text.

**Syntax:**
```grs
vehicle.phase
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.phase);
```

**Notes:** Type: String. Access: read-only. Modules: OHT, AMR. Alias vehicle.status resolves to the same value.

**Related:** vehicle.status

### vehicle.current_speed [OHT, AMR]

**Purpose:** Returns authoritative current linear speed.

**Syntax:**
```grs
vehicle.current_speed
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.current_speed);
```

**Notes:** Type: Number (mm/s). Access: read-only. Modules: OHT, AMR. OHT reads the Rail Vehicle motion speed; AMR reads the robot linear speed.

**Related:** vehicle.speed / vehicle.velocity

### vehicle.remaining_distance [OHT, AMR]

**Purpose:** Returns remaining distance on the current route.

**Syntax:**
```grs
vehicle.remaining_distance
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.remaining_distance);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT, AMR. Zero is valid at a destination or when no route is active.

**Related:** vehicle.route_remaining / vehicle.route_remaining_distance

### vehicle.x [OHT, AMR]

**Purpose:** Returns current world X position.

**Syntax:**
```grs
vehicle.x
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.x);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT, AMR.

**Related:** vehicle.x_mm

### vehicle.y [OHT, AMR]

**Purpose:** Returns current world Y position.

**Syntax:**
```grs
vehicle.y
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.y);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT, AMR.

**Related:** vehicle.y_mm

### vehicle.heading [OHT, AMR]

**Purpose:** Returns current heading in radians.

**Syntax:**
```grs
vehicle.heading
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.heading);
```

**Notes:** Type: Number (rad) or null. Access: read-only. Modules: OHT, AMR. OHT can return null only when a legacy snapshot has no authoritative heading.

**Related:** vehicle.heading_rad

### vehicle.rotating_in_place [OHT, AMR]

**Purpose:** Returns true while the runtime is rotating in place.

**Syntax:**
```grs
vehicle.rotating_in_place
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.rotating_in_place);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT, AMR.

**Related:** 

### vehicle.current_path [OHT]

**Purpose:** Returns the directed Rail Path ID currently occupied by the OHT.

**Syntax:**
```grs
vehicle.current_path
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.current_path);
```

**Notes:** Type: Number or null. Access: read-only. Modules: OHT. AMR free-floor motion has no equivalent Rail Path ID.

**Related:** vehicle.path

### vehicle.has_assigned_job [OHT]

**Purpose:** Returns whether the physical OHT owns a real transport Job.

**Syntax:**
```grs
vehicle.has_assigned_job
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.has_assigned_job);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT. This is physical Job ownership, not merely a script custom attribute.

**Related:** 

### vehicle.service_remaining_seconds [OHT]

**Purpose:** Returns remaining Pickup/Setdown service time.

**Syntax:**
```grs
vehicle.service_remaining_seconds
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.service_remaining_seconds);
```

**Notes:** Type: Number (s). Access: read-only. Modules: OHT. Returns zero outside Pickup/Setdown.

**Related:** 

### vehicle.service_duration_seconds [OHT]

**Purpose:** Returns configured duration of the active Pickup/Setdown service phase.

**Syntax:**
```grs
vehicle.service_duration_seconds
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.service_duration_seconds);
```

**Notes:** Type: Number (s). Access: read-only. Modules: OHT. Returns zero outside Pickup/Setdown.

**Related:** 

### vehicle.angular_speed [AMR]

**Purpose:** Returns current AMR angular speed.

**Syntax:**
```grs
vehicle.angular_speed
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.angular_speed);
```

**Notes:** Type: Number (rad/s). Access: read-only. Modules: AMR.

**Related:** vehicle.angular_speed_rad_s

### vehicle.z [AMR]

**Purpose:** Returns current AMR 2.5D elevation.

**Syntax:**
```grs
vehicle.z
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.z);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: AMR.

**Related:** vehicle.z_mm

### vehicle.traffic_state [AMR]

**Purpose:** Returns AMR traffic state text (Cruise/Slow/Stop).

**Syntax:**
```grs
vehicle.traffic_state
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.traffic_state);
```

**Notes:** Type: String. Access: read-only. Modules: AMR.

**Related:** vehicle.traffic

### vehicle.schedjobs [OHT]

**Purpose:** Returns the alive ScheduleJobs associated with the OHT Vehicle.

**Syntax:**
```grs
vehicle.schedjobs
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.schedjobs.size);
```

**Notes:** Type: List<ScheduleJob>. Access: read-only. Modules: OHT. AMR automatic dispatch does not expose this OHT ScheduleJob list.

**Related:** vehicle.schedulejobs

### vehicle.current_schedjob [OHT]

**Purpose:** Gets or selects the current OHT ScheduleJob.

**Syntax:**
```grs
vehicle.current_schedjob
```

**Example (historically compiler-checked)**:
```grs
set(vehicle.current_schedjob, job);
```

**Notes:** Type: ScheduleJob or null. Access: read/write. Modules: OHT. Only a live job owned by the same Vehicle can be selected.

**Related:** vehicle.currentschedjob

### vehicle.battery [AMR]

**Purpose:** Returns AMR battery percentage.

**Syntax:**
```grs
vehicle.battery
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.battery);
```

**Notes:** Type: Number. Access: read-only. Modules: AMR.

**Related:** vehicle.batterypercent

### vehicle.blocked_by [OHT, AMR]

**Purpose:** Returns the directly recorded leader/blocker Vehicle, or null when not currently blocked.

**Syntax:**
```grs
vehicle.blocked_by
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.blocked_by);
```

**Notes:** Type: Vehicle or null. Access: read-only. Modules: OHT, AMR. Only the Core-recorded direct blocker is returned. Dependency chains and root cause are not inferred.

**Related:** 

### vehicle.blocked_since_seconds [OHT, AMR]

**Purpose:** Returns the simulation time this Vehicle began waiting on its current blocked_by, or null when not blocked.

**Syntax:**
```grs
vehicle.blocked_since_seconds
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.blocked_since_seconds);
```

**Notes:** Type: Number (s) or null. Access: read-only. Modules: OHT, AMR.

**Related:** 

### vehicle.blocked_elapsed_seconds [OHT, AMR]

**Purpose:** Returns current simulation time minus blocked_since_seconds, or null when not blocked.

**Syntax:**
```grs
vehicle.blocked_elapsed_seconds
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.blocked_elapsed_seconds);
```

**Notes:** Type: Number (s) or null. Access: read-only. Modules: OHT, AMR. Computed on read from the existing blocked_since timestamp; no extra polling state is created.

**Related:** 

### vehicle.waiting_for_station [AMR]

**Purpose:** Returns true while the AMR finished loading/unloading but is waiting for its destination Station slot to free.

**Syntax:**
```grs
vehicle.waiting_for_station
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.waiting_for_station);
```

**Notes:** Type: Bool. Access: read-only. Modules: AMR. Event-driven: re-evaluated only when the Station frees, not polled.

**Related:** 

### load.id [OHT]

**Purpose:** Returns the script Load ID.

**Syntax:**
```grs
load.id
```

**Example (historically compiler-checked)**:
```grs
print(load.id);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** 

### load.name [OHT]

**Purpose:** Returns the script Load name.

**Syntax:**
```grs
load.name
```

**Example (historically compiler-checked)**:
```grs
print(load.name);
```

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** 

### load.vehicle [OHT]

**Purpose:** Returns the claimed/onboard Vehicle handle.

**Syntax:**
```grs
load.vehicle
```

**Example (historically compiler-checked)**:
```grs
print(load.vehicle);
```

**Notes:** Type: Vehicle or null. Access: read-only. Modules: OHT.

**Related:** 

### load.location [OHT]

**Purpose:** Returns or supplies the off-Vehicle source/location Station.

**Syntax:**
```grs
load.location
```

**Example (historically compiler-checked)**:
```grs
print(load.location);
```

**Notes:** Type: Number or null. Access: read/write. Modules: OHT. Writes participate in pending scripted transport endpoint binding.

**Related:** load.from / load.source aliases are accepted by transport binding

### load.destination [OHT]

**Purpose:** Returns or supplies the active delivery destination Station.

**Syntax:**
```grs
load.destination
```

**Example (historically compiler-checked)**:
```grs
print(load.destination);
```

**Notes:** Type: Number or null. Access: read/write. Modules: OHT. Writes participate in pending scripted transport endpoint binding.

**Related:** load.to / load.target aliases are accepted by transport binding

### load.onboard [OHT]

**Purpose:** Returns true while the Load is physically onboard its carrier.

**Syntax:**
```grs
load.onboard
```

**Example (historically compiler-checked)**:
```grs
print(load.onboard);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** 

### load.alive [OHT]

**Purpose:** Returns whether the script Load is live.

**Syntax:**
```grs
load.alive
```

**Example (historically compiler-checked)**:
```grs
print(load.alive);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** 

### load.state [OHT]

**Purpose:** Returns created, claimed, onboard, or stored.

**Syntax:**
```grs
load.state
```

**Example (historically compiler-checked)**:
```grs
print(load.state);
```

**Notes:** Type: String. Access: read-only. Modules: OHT. Derived from current script material ownership/location.

**Related:** 

### buffer.id [OHT]

**Purpose:** Canonical Cell ID BUFFER_<instance>_R<row>_C<column>.

**Syntax:**
```grs
buffer.id
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").id);
```

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** 

### buffer.name [OHT]

**Purpose:** Alias of the canonical Cell ID.

**Syntax:**
```grs
buffer.name
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").name);
```

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** 

### buffer.type [OHT]

**Purpose:** Returns side_buffer_cell.

**Syntax:**
```grs
buffer.type
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").type);
```

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** 

### buffer.enabled [OHT]

**Purpose:** True for an authored Cell registered into the active model session.

**Syntax:**
```grs
buffer.enabled
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").enabled);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** 

### buffer.group_id [OHT]

**Purpose:** Canonical Buffer group ID BUFFER_<EquipmentInstanceId>.

**Syntax:**
```grs
buffer.group_id
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").group_id);
```

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** buffer.group

### buffer.instance_id [OHT]

**Purpose:** Workspace Equipment instance ID that owns this Cell.

**Syntax:**
```grs
buffer.instance_id
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").instance_id);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** 

### buffer.row [OHT]

**Purpose:** 1-based row index.

**Syntax:**
```grs
buffer.row
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").row);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** 

### buffer.column [OHT]

**Purpose:** 1-based column index.

**Syntax:**
```grs
buffer.column
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").column);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** 

### buffer.capacity [OHT]

**Purpose:** One FOUP per Cell.

**Syntax:**
```grs
buffer.capacity
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").capacity);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** 

### buffer.occupied [OHT]

**Purpose:** True only after the physical Setdown dwell completes.

**Syntax:**
```grs
buffer.occupied
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").occupied);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT. A reservation alone is not occupancy.

**Related:** 

### buffer.reserved [OHT]

**Purpose:** True while a store or retrieve transport owns this Cell.

**Syntax:**
```grs
buffer.reserved
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").reserved);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** 

### buffer.available [OHT]

**Purpose:** True only when not occupied and not reserved.

**Syntax:**
```grs
buffer.available
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").available);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** 

### buffer.load [OHT]

**Purpose:** Stored or reserved Load Entity.

**Syntax:**
```grs
buffer.load
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").load);
```

**Notes:** Type: Load or null. Access: read-only. Modules: OHT.

**Related:** 

### buffer.load_id [OHT]

**Purpose:** Script Load ID for the stored/reserved Load.

**Syntax:**
```grs
buffer.load_id
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").load_id);
```

**Notes:** Type: Number or null. Access: read-only. Modules: OHT.

**Related:** 

### buffer.logical_load_id [OHT]

**Purpose:** Cross-module logical Load ID when one exists.

**Syntax:**
```grs
buffer.logical_load_id
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").logical_load_id);
```

**Notes:** Type: Number or null. Access: read-only. Modules: OHT.

**Related:** 

### buffer.station [OHT]

**Purpose:** Rail Station used as the Cell transfer point for the current stored/reserved Load.

**Syntax:**
```grs
buffer.station
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").station);
```

**Notes:** Type: Number or null. Access: read-only. Modules: OHT.

**Related:** 

### buffer.state [OHT]

**Purpose:** empty, reserved_store, occupied, or reserved_retrieve.

**Syntax:**
```grs
buffer.state
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").state);
```

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** 

### buffer.x [OHT]

**Purpose:** Authored world X of the Cell transfer/support point.

**Syntax:**
```grs
buffer.x
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").x);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT.

**Related:** 

### buffer.y [OHT]

**Purpose:** Authored world Y of the Cell transfer/support point.

**Syntax:**
```grs
buffer.y
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").y);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT.

**Related:** 

### buffer.z [OHT]

**Purpose:** Authored world Z of the Cell transfer/support point.

**Syntax:**
```grs
buffer.z
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").z);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT.

**Related:** 

### buffer.width [OHT]

**Purpose:** Clear internal Cell width.

**Syntax:**
```grs
buffer.width
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").width);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT.

**Related:** 

### buffer.depth [OHT]

**Purpose:** Clear internal Cell depth.

**Syntax:**
```grs
buffer.depth
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").depth);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT.

**Related:** 

### buffer.height [OHT]

**Purpose:** Clear internal Cell height.

**Syntax:**
```grs
buffer.height
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").height);
```

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT.

**Related:** 

### buffer.occupied_since_seconds [OHT]

**Purpose:** Elapsed simulated time since the latest completed store.

**Syntax:**
```grs
buffer.occupied_since_seconds
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").occupied_since_seconds);
```

**Notes:** Type: Number (s) or null. Access: read-only. Modules: OHT. Computed on read; no polling timer.

**Related:** 

### buffer.updated_us [OHT]

**Purpose:** Simulation timestamp of the latest reservation/occupancy transition.

**Syntax:**
```grs
buffer.updated_us
```

**Example (historically compiler-checked)**:
```grs
print(buffer_cell("BUFFER_12_R1_C1").updated_us);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** 

### job.id [OHT]

**Purpose:** Returns the stable ScheduleJob ID.

**Syntax:**
```grs
job.id
```

**Example (historically compiler-checked)**:
```grs
print(job.id);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** 

### job.type [OHT]

**Purpose:** Returns current move/retrieve/deliver job type.

**Syntax:**
```grs
job.type
```

**Example (historically compiler-checked)**:
```grs
print(job.type);
```

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** 

### job.vehicle [OHT]

**Purpose:** Returns the owning Vehicle.

**Syntax:**
```grs
job.vehicle
```

**Example (historically compiler-checked)**:
```grs
print(job.vehicle);
```

**Notes:** Type: Vehicle or null. Access: read-only. Modules: OHT.

**Related:** 

### job.load [OHT]

**Purpose:** Returns the associated Load for material jobs.

**Syntax:**
```grs
job.load
```

**Example (historically compiler-checked)**:
```grs
print(job.load);
```

**Notes:** Type: Load or null. Access: read-only. Modules: OHT.

**Related:** 

### job.location [OHT]

**Purpose:** Returns or changes the target Station of an uncommitted job.

**Syntax:**
```grs
job.location
```

**Example (historically compiler-checked)**:
```grs
print(job.location);
```

**Notes:** Type: Number or null. Access: read/write before commit. Modules: OHT. Committed physical jobs reject location rewrites.

**Related:** 

### job.released_us [OHT]

**Purpose:** Returns the script release time in microseconds.

**Syntax:**
```grs
job.released_us
```

**Example (historically compiler-checked)**:
```grs
print(job.released_us);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** 

### job.alive [OHT]

**Purpose:** Returns whether the ScheduleJob is live.

**Syntax:**
```grs
job.alive
```

**Example (historically compiler-checked)**:
```grs
print(job.alive);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** 

### job.current [OHT]

**Purpose:** Returns whether the ScheduleJob is selected as current work.

**Syntax:**
```grs
job.current
```

**Example (historically compiler-checked)**:
```grs
print(job.current);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** 

### queue.size [OHT, AMR]

**Purpose:** Returns the current number of Queue items.

**Syntax:**
```grs
queue.size
```

**Example (historically compiler-checked)**:
```grs
print(queue.size);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR.

**Related:** queue.current

### queue.head [OHT, AMR]

**Purpose:** Returns the first item in the Queue, or null when empty.

**Syntax:**
```grs
queue.head
```

**Example (historically compiler-checked)**:
```grs
print(queue.head);
```

**Notes:** Type: EntityRef or null. Access: read-only. Modules: OHT, AMR.

**Related:** 

### queue.tail [OHT, AMR]

**Purpose:** Returns the last item in the Queue, or null when empty.

**Syntax:**
```grs
queue.tail
```

**Example (historically compiler-checked)**:
```grs
print(queue.tail);
```

**Notes:** Type: EntityRef or null. Access: read-only. Modules: OHT, AMR.

**Related:** 

### resource.capacity [OHT, AMR]

**Purpose:** Returns the configured Resource capacity.

**Syntax:**
```grs
resource.capacity
```

**Example (historically compiler-checked)**:
```grs
print(resource.capacity);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR.

**Related:** 

### resource.in_use [OHT, AMR]

**Purpose:** Returns the current number of acquired Resource units.

**Syntax:**
```grs
resource.in_use
```

**Example (historically compiler-checked)**:
```grs
print(resource.in_use);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR.

**Related:** 

### resource.available [OHT, AMR]

**Purpose:** Returns capacity minus in_use.

**Syntax:**
```grs
resource.available
```

**Example (historically compiler-checked)**:
```grs
print(resource.available);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR. See resource.holder_count/waiter_count/holders/waiters/oldest_hold_seconds/oldest_wait_seconds for ownership. free() releases a unit held by the same process, else by the same actor (cross-event Load flow); any other free or a double free is rejected with [SIM_SCRIPT_RESOURCE_RELEASE_REJECT].

**Related:** resource.remaining_space

### resource.state [OHT, AMR]

**Purpose:** Returns "full" when in_use >= capacity, otherwise "available".

**Syntax:**
```grs
resource.state
```

**Example (historically compiler-checked)**:
```grs
print(resource.state);
```

**Notes:** Type: String. Access: read-only. Modules: OHT, AMR.

**Related:** 

### resource.holder_count [OHT]

**Purpose:** Returns the number of acquired Resource units tracked by the script runtime.

**Syntax:**
```grs
resource.holder_count
```

**Example (historically compiler-checked)**:
```grs
print(resource.holder_count);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT. Ownership is process-scoped; physical Equipment ownership is not implied.

**Related:** 

### resource.waiter_count [OHT]

**Purpose:** Returns the number of processes waiting for Resource capacity.

**Syntax:**
```grs
resource.waiter_count
```

**Example (historically compiler-checked)**:
```grs
print(resource.waiter_count);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT. Waiters are registered only after a failed acquire and wake through the existing targeted Resource channel.

**Related:** 

### resource.holders [OHT]

**Purpose:** Returns actors associated with current Resource claims.

**Syntax:**
```grs
resource.holders
```

**Example (historically compiler-checked)**:
```grs
print(resource.holders.size);
```

**Notes:** Type: List<EntityRef>. Access: read-only. Modules: OHT. Processes without an Entity actor still count in holder_count but are omitted from this EntityRef list.

**Related:** 

### resource.waiters [OHT]

**Purpose:** Returns actors associated with current Resource waits.

**Syntax:**
```grs
resource.waiters
```

**Example (historically compiler-checked)**:
```grs
print(resource.waiters.size);
```

**Notes:** Type: List<EntityRef>. Access: read-only. Modules: OHT. Processes without an Entity actor still count in waiter_count but are omitted from this EntityRef list.

**Related:** 

### resource.oldest_hold_seconds [OHT]

**Purpose:** Returns elapsed simulation time since the oldest current Resource acquisition.

**Syntax:**
```grs
resource.oldest_hold_seconds
```

**Example (historically compiler-checked)**:
```grs
print(resource.oldest_hold_seconds);
```

**Notes:** Type: Number (s) or null. Access: read-only. Modules: OHT.

**Related:** 

### resource.oldest_wait_seconds [OHT]

**Purpose:** Returns elapsed simulation time since the oldest current Resource wait began.

**Syntax:**
```grs
resource.oldest_wait_seconds
```

**Example (historically compiler-checked)**:
```grs
print(resource.oldest_wait_seconds);
```

**Notes:** Type: Number (s) or null. Access: read-only. Modules: OHT.

**Related:** 

### orderlist.size [OHT, AMR]

**Purpose:** Returns the current number of pending OrderList entries.

**Syntax:**
```grs
orderlist.size
```

**Example (historically compiler-checked)**:
```grs
print(orderlist.size);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR.

**Related:** orderlist.current, orderlist.pending_count

### table.size [OHT, AMR]

**Purpose:** Returns the current number of Table cells.

**Syntax:**
```grs
table.size
```

**Example (historically compiler-checked)**:
```grs
print(table.size);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR.

**Related:** 

### objectList.size [OHT, AMR]

**Purpose:** Returns the current number of ObjectList items.

**Syntax:**
```grs
objectList.size
```

**Example (historically compiler-checked)**:
```grs
print(objectList.size);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR.

**Related:** 

### list.size [OHT, AMR]

**Purpose:** Returns the number of values in a runtime List.

**Syntax:**
```grs
list.size
```

**Example (historically compiler-checked)**:
```grs
print(vehicle.schedjobs.size);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR.

**Related:** 

### text.substring [OHT, AMR]

**Purpose:** Returns a substring using zero-based start and length.

**Syntax:**
```grs
text.substring(start, length)
```

**Example (historically compiler-checked)**:
```grs
print(name.substring(0, 4));
```

**Notes:** Type: String. Access: read-only. Modules: OHT, AMR.

**Related:** 

## Native OHT / ASRS Functions

### OHT_System_Initialize()

**Purpose:** Initializes the native OHT model session.

**Syntax:**
```grs
call OHT_System_Initialize()
```

**Notes:** Uses the existing OHT engine.

**Related:** 

### ASRS_Stocker_Initialize()

**Purpose:** Initializes stocker inventory and cycle state.

**Syntax:**
```grs
call ASRS_Stocker_Initialize()
```

**Notes:** Call before shelf seeding and first outbound.

**Related:** 

### ASRS_External_Handoff_Mode()

**Purpose:** Hands outbound FOUPs to downstream modules.

**Syntax:**
```grs
call ASRS_External_Handoff_Mode()
```

**Notes:** Set before the first outbound cycle.

**Related:** 

### ASRS_Seed_Shelf_FOUP(foup_id)

**Purpose:** Seeds one FOUP in initial shelf inventory.

**Syntax:**
```grs
call ASRS_Seed_Shelf_FOUP(foup_id)
```

**Notes:** Requires initialized stocker.

**Related:** 

### ASRS_Request_First_Outbound()

**Purpose:** Starts the first outbound cycle.

**Syntax:**
```grs
call ASRS_Request_First_Outbound()
```

**Notes:** Requires initialized stocker and occupied shelf inventory.

**Related:** 

### ASRS_Current_FOUP()

**Purpose:** Returns the active outbound FOUP ID or null.

**Syntax:**
```grs
call ASRS_Current_FOUP()
```

**Notes:** 

**Related:** 

### ASRS_Capacity()

**Purpose:** Returns the total Shelf slot capacity.

**Syntax:**
```grs
call ASRS_Capacity()
```

**Notes:** 

**Related:** 

### ASRS_Occupied_Count()

**Purpose:** Returns the current number of occupied/reserved-outbound Shelf slots.

**Syntax:**
```grs
call ASRS_Occupied_Count()
```

**Notes:** 

**Related:** 

### ASRS_Free_Count()

**Purpose:** Returns the current number of empty Shelf slots.

**Syntax:**
```grs
call ASRS_Free_Count()
```

**Notes:** 

**Related:** 

### ASRS_Slot_Load(slot_index)

**Purpose:** Returns the FOUP ID stored at a Shelf slot index, or null if empty.

**Syntax:**
```grs
call ASRS_Slot_Load(slot_index)
```

**Notes:** 

**Related:** 

### ASRS_Crane_Count()

**Purpose:** Returns the number of Cranes in the Stocker.

**Syntax:**
```grs
call ASRS_Crane_Count()
```

**Notes:** 

**Related:** 

### ASRS_Crane_State(crane_index)

**Purpose:** Returns the Crane's current handoff state.

**Syntax:**
```grs
call ASRS_Crane_State(crane_index)
```

**Notes:** One of idle/move_to_pickup/picking/move_to_storage/storing/move_to_retrieve/retrieving/move_to_output/unloading.

**Related:** 

### ASRS_Add_In_Lane(station, slot_count[, transfer_height_mm])

**Purpose:** Adds an inbound Port Lane: OHT sets down at the Station, then an N-slot conveyor feeds the Crane.

**Syntax:**
```grs
call ASRS_Add_In_Lane(station, slot_count[, transfer_height_mm])
```

**Notes:** Call after asrs_stocker_initialize and before asrs_request_first_outbound. Masks one Shelf cell as slot 0. Returns the lane index.

**Related:** 

### ASRS_Add_Out_Lane(station, slot_count[, transfer_height_mm])

**Purpose:** Adds an outbound Port Lane: the Crane deposits ahead into an N-slot conveyor and OHT picks up at the Station.

**Syntax:**
```grs
call ASRS_Add_Out_Lane(station, slot_count[, transfer_height_mm])
```

**Notes:** Same call order as asrs_add_in_lane. Returns the lane index.

**Related:** 

### ASRS_Add_Bidirectional_Lane(station, slot_count, direction[, transfer_height_mm])

**Purpose:** Adds a Port Lane whose direction ("in" or "out") can change while it is empty.

**Syntax:**
```grs
call ASRS_Add_Bidirectional_Lane(station, slot_count, direction[, transfer_height_mm])
```

**Notes:** Use asrs_set_lane_direction to switch. Returns the lane index.

**Related:** 

### ASRS_Set_Lane_Direction(lane, direction)

**Purpose:** Switches a bidirectional Port Lane to "in" or "out".

**Syntax:**
```grs
call ASRS_Set_Lane_Direction(lane, direction)
```

**Notes:** Returns false if the lane is not bidirectional or still holds FOUPs.

**Related:** 

### ASRS_Set_Lane_Slot_Move_Seconds(lane, seconds)

**Purpose:** Sets how long the conveyor takes to advance a FOUP by one slot.

**Syntax:**
```grs
call ASRS_Set_Lane_Slot_Move_Seconds(lane, seconds)
```

**Notes:** Call before asrs_request_first_outbound.

**Related:** 

### ASRS_Lane_Count()

**Purpose:** Returns the number of Port Lanes.

**Syntax:**
```grs
call ASRS_Lane_Count()
```

**Notes:** 

**Related:** 

### ASRS_Lane_Slot_Load(lane, slot)

**Purpose:** Returns the FOUP ID physically on a Lane slot, or null if empty or only reserved.

**Syntax:**
```grs
call ASRS_Lane_Slot_Load(lane, slot)
```

**Notes:** slot 0 is the Crane end; the last slot is the OHT end.

**Related:** 

### ASRS_Set_Rack(bays, levels, cell_width_mm, cell_height_mm, cell_depth_mm)

**Purpose:** Sets the Rack size (default 8 x 6, 650 x 500 x 700 mm). Replaces the empty Stocker, so no Lane or seeded FOUP may exist yet.

**Syntax:**
```grs
call ASRS_Set_Rack(bays, levels, cell_width_mm, cell_height_mm, cell_depth_mm)
```

**Notes:** Call right after asrs_stocker_initialize. Example: asrs_set_rack(10, 6, 450, 400, 1000) is the default Place STK.

**Related:** 

### ASRS_Add_In_Port(station, bay, level [, depth_mm])

**Purpose:** Uses one front-column Shelf cell as an In Port (a one-slot Lane): the OHT sets down straight into that cell and the Crane stores from it.

**Syntax:**
```grs
call ASRS_Add_In_Port(station, bay, level [, depth_mm])
```

**Notes:** Call after asrs_set_rack and before asrs_request_first_outbound. The OHT transfer height is the cell's FOUP centre height. Returns the lane index.

**Related:** 

### ASRS_Add_Out_Port(station, bay, level [, depth_mm])

**Purpose:** Uses one front-column Shelf cell as an Out Port (a one-slot Lane): the Crane retrieves into that cell and the OHT picks up from it.

**Syntax:**
```grs
call ASRS_Add_Out_Port(station, bay, level [, depth_mm])
```

**Notes:** Same call order as asrs_add_in_port. Returns the lane index.

**Related:** 

### ASRS_Set_Out_Buffer(cell_id)

**Purpose:** Adds a Side Buffer Cell as a destination for FOUPs leaving an Out Lane; each FOUP reserves the first free candidate and the Cell becomes occupied when the OHT Setdown completes.

**Syntax:**
```grs
call ASRS_Set_Out_Buffer(cell_id)
```

**Notes:** Call after asrs_stocker_initialize and before asrs_request_first_outbound, once per Cell. Lane mode only. A Load set down on an In Lane Station by any other OHT job is accepted by that Lane automatically.

**Related:** 

## Getting Started

### Global Init / default OHT AMR Humanoid

**Purpose:** Create the default OHT, AMR and Humanoid counts directly from one global initialization event.

**Syntax:**
```grs
begin model.init event
    vi_OHT = 10
    vi_Humanoid = 3
    vi_AMR = 3
end
```

**Example (not recompiled)**:
```grs
begin model.init event
    vi_OHT = 10
    vi_Humanoid = 3
    vi_AMR = 3
end
begin OHT.init event
    set i = 0
    while i < vi_OHT
    begin
        inc i by 1
        print "OHT", i, " is initialized" to log
    end
end
begin Humanoid.init event
    set i = 0
    while i < vi_Humanoid
    begin
        inc i by 1
        print "Humanoid", i, " is initialized" to log
    end
end
begin AMR.init event
    set i = 0
    while i < vi_AMR
    begin
        inc i by 1
        print "AMR", i, " is initialized" to log
    end
end
```

**Notes:** New global-init script has exactly one model.init with three positive integer vi_* values and these three typed events. At Compile the already-placed drawing supplies one OHT rail Level and one AMR floor Level (each with two distinct Stations); scripted Job Source is used with no synthetic traffic. Existing C++ Core creates vi_OHT/vi_AMR vehicles. Three-dimensional default humanoids are created at a floor Station. The typed init events run once at simulation time zero and print to the Studio message log. Other legacy and previously declared auto-bound scripts retain their existing behavior. All five previous helper initializers are NOT required for this opt-in.

**Related:** model.init, OHT.init, AMR.init, Humanoid.init, print to log

## Humanoid

### Humanoid walk events (two-file global init)

**Purpose:** Run starts OHT 10, AMR 3 and Humanoid 3 and drives Humanoid 1 and 2 back and forth through physical floor Stations.

**Syntax:**
```grs
model_init.grs + humanoid_logic.grs
```

**Example (not recompiled)**:
```grs
begin Def_Humanoid walk resume event
    wait for 0.5 sec
end
begin Def_Humanoid walk start event
    print this humanoid, " walk start now" to log
end
begin Def_Humanoid arrived at station event
    if (current station = humanoid_1)
        dispatch this humanoid to humanoid_2
    else if (current station = humanoid_2)
        dispatch this humanoid to humanoid_1
end
```

**Notes:** Opt-in requires two GRS files: model_init.grs with vi_OHT, vi_AMR, vi_Humanoid and OHT.init, AMR.init, Humanoid.init; and humanoid_logic.grs with walk resume/start/arrived at station events. All three Init callbacks must complete across all modules before any regular t=0 event or initial humanoid walk begins. A waiting/failed Init rejects Run before simulation time advances. In model_init.grs the authored spwan Def_Humanoid(1 or 2) to humanoid_1 or humanoid_2 is accepted as compatibility syntax. These compile to native humanoid_create, humanoid_walk_to, humanoid.arrived and a suspended 0.5-second wait. Each physical arrival triggers the next leg, without every-event polling. Humanoid 3 remains idle until explicitly dispatched; Job flows removed from this project are not auto restored. Existing auto-bound and explicitly declared module behavior is unchanged.

**Related:** Humanoid.init, humanoid.arrived, humanoid_create, humanoid_walk_to, print to log

## Getting Started

### Automatic model binding

**Purpose:** Studio automatically connects literal GRS From-To Station requests to the Workspace OHT, AMR, AGV or Conveyor Runtime at Compile. No explicit module-binding declaration is required for this form.

**Syntax:**
```grs
begin model.init event
    every 20 sec call supply
end
begin supply event
    request from Ceiling_Pick to Ceiling_Drop
end
```

**Example (not recompiled)**:
```grs
begin model.init event
    every 20 sec call supply
end
begin supply event
    request from Ceiling_Pick to Ceiling_Drop
end
```

**Notes:** Define real transport events; Studio determines Station carrier and Level once during Compile and keeps the original Runtime, scheduler and FOUP identity. Different Station owners can share one source when event ownership is unambiguous. Unknown/cross-Level Station pairs and multi-owner control flow reject Compile instead of guessing. Dynamic Station expressions and native-only models still require explicit ownership information in existing compatible projects until an internal owner-selection path is available. Existing Simulation Setup supplies fleet count/speed/pickup/setdown defaults. Saved explicit module declarations and older auto configuration files continue loading for compatibility; new GRS code should not author a module-binding event. An optional single model.init may call OHT_Init/AMR_Init/Humanoid_Init/ASRS_Init/Conveyor_Init and those typed routines are dispatched to matching physical runtimes.

**Related:** model.init, request_transport, every_event, Station binding, Simulation Setup

### Common color_off

**Purpose:** Keeps original model colors by switching off phase or pose colors for matching OHT, AMR, AGV and Humanoid runtimes in the current Studio session.

**Syntax:**
```grs
color_off()
color_off("oht")
color_off("amr")
color_off("agv")
color_off("humanoid")
```

**Example (not recompiled)**:
```grs
begin model.init event
    color_off()
end
```

**Notes:** Available in a declared Studio model session. With no argument all matching runtimes are affected, regardless of which module owns the call. One quoted type limits the scope; AMR and AGV are distinct. A missing target or unsupported argument fails with a GRS_COLOR_OFF diagnostic. Motion, Job timing and FOUP ownership are unchanged. Legacy oht.color_fixed / amr.color_fixed / humanoid.color_fixed remain accepted. Auto/legacy undeclared execution is unchanged.

**Related:** Studio model modules, oht.color_fixed, amr.color_fixed, humanoid.color_fixed

### Automatic transfer target

**Purpose:** Hands a logical Load to the one existing prepared runtime that owns the destination Station route, with no explicit target module name.

**Syntax:**
```grs
call_transport(load_id, "Floor_Pick", "Floor_Drop")
```

**Example (not recompiled)**:
```grs
begin conveyor.exit event
    call_transport(load_id, "Floor_Pick", "Floor_Drop")
end
```

**Notes:** Three arguments select a destination only when exactly one non-source runtime validates both Station endpoints. An unknown or ambiguous target is rejected with GRS_TRANSFER_NO_TARGET or GRS_TRANSFER_AMBIGUOUS_TARGET. The previous four-argument call_transport(target_module,load_id,from,to) remains unchanged. Source Setdown and destination capacity, event timing, and Load ownership all use the existing physical transfer protocol; no new polling or Load ID namespace is introduced.

**Related:** call_transport, Studio model modules, Station binding

## Events

### Def_OHT event syntax

**Purpose:** Public OHT event syntax. Write readable event phrases instead of authoring the engine's dotted callback identifiers.

**Syntax:**
```grs
begin Def_OHT <event name> event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT job assigned event
    print "job assigned" to log
end
```

**Notes:** The GRS compiler lowers these event declarations to the engine's existing internal callbacks. Existing project event keys still load for compatibility. OHT actor is available as this OHT when applicable.

**Related:** Def_OHT, OHT, GRS Events

### Def_OHT pickup

**Purpose:** Arrives at the physical pickup boundary.

**Syntax:**
```grs
begin Def_OHT pickup event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT pickup event
    print "Def_OHT pickup" to log
end
```

**Notes:** The Load is loaded at the existing physical pickup boundary. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT setdown

**Purpose:** Arrives at the physical setdown boundary.

**Syntax:**
```grs
begin Def_OHT setdown event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT setdown event
    print "Def_OHT setdown" to log
end
```

**Notes:** The unloading completion occurs after the configured setdown dwell. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT speed change

**Purpose:** Physical Vehicle speed changes.

**Syntax:**
```grs
begin Def_OHT speed change event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT speed change event
    print "Def_OHT speed change" to log
end
```

**Notes:** Uses existing engine speed transitions, not polling. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT resume to drive

**Purpose:** A stopped Vehicle starts driving again.

**Syntax:**
```grs
begin Def_OHT resume to drive event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT resume to drive event
    print "Def_OHT resume to drive" to log
end
```

**Notes:** Uses a real resume transition. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT start to move

**Purpose:** The Vehicle starts actual travel.

**Syntax:**
```grs
begin Def_OHT start to move event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT start to move event
    print "Def_OHT start to move" to log
end
```

**Notes:** Ignores the internal near-zero wake probe. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT job finished

**Purpose:** A physical ScheduleJob reaches its completed handoff.

**Syntax:**
```grs
begin Def_OHT job finished event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT job finished event
    print "Def_OHT job finished" to log
end
```

**Notes:** Fires after setdown dwell; actor is the completed ScheduleJob. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT job selection

**Purpose:** A live ScheduleJob becomes selected.

**Syntax:**
```grs
begin Def_OHT job selection event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT job selection event
    print "Def_OHT job selection" to log
end
```

**Notes:** Actor is the selected ScheduleJob; unchanged selection does not re-fire. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT decelerate to destination

**Purpose:** The Vehicle reaches the final prepared travel span.

**Syntax:**
```grs
begin Def_OHT decelerate to destination event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT decelerate to destination event
    print "Def_OHT decelerate to destination" to log
end
```

**Notes:** Fires on actual movement in the final span. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT arrived at station

**Purpose:** The Vehicle reaches its pickup or setdown Station.

**Syntax:**
```grs
begin Def_OHT arrived at station event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT arrived at station event
    print "Def_OHT arrived at station" to log
end
```

**Notes:** Fires once at the arrival boundary before the pickup/setdown event. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT job assigned

**Purpose:** An idle OHT begins its next Job or explicit travel.

**Syntax:**
```grs
begin Def_OHT job assigned event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT job assigned event
    print "Def_OHT job assigned" to log
end
```

**Notes:** 2026-10-17: fires on Idle-to-travel/Pickup transition; actor is the assigned Vehicle. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT passing station

**Purpose:** The OHT passes a Station on its route.

**Syntax:**
```grs
begin Def_OHT passing station event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT passing station event
    print "Def_OHT passing station" to log
end
```

**Notes:** 2026-10-17: fires for each physically crossed Station, excluding departure; no fleet-wide polling. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT steer change

**Purpose:** The OHT starts a discrete heading change at a corner.

**Syntax:**
```grs
begin Def_OHT steer change event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT steer change event
    print "Def_OHT steer change" to log
end
```

**Notes:** 2026-10-17: fires on a meaningful turn even with in-place rotation disabled; continuous arc steering is excluded. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_OHT destination change

**Purpose:** The OHT starts a new travel leg toward its destination.

**Syntax:**
```grs
begin Def_OHT destination change event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_OHT destination change event
    print "Def_OHT destination change" to log
end
```

**Notes:** 2026-10-17: fires at travel-leg start (initial travel or post-pickup delivery), up to twice per Job. The engine uses an internal callback key; write the Def_OHT event header in new GRS models.

**Related:** Def_OHT, print to log

### Def_AMR / Def_AGV event syntax

**Purpose:** AMR and AGV (AMR Core Fixed Path) use the same 12 event phrases as Def_OHT: pickup, setdown, speed change, resume to drive, start to move, job finished, job selection, decelerate to destination, arrived at station, job assigned, passing station, destination change.

**Syntax:**
```grs
begin Def_AMR <event name> event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_AMR passing station event
    print "passing ", vehicle.passing_station_name to log
end
```

**Notes:** Def_AGV and Def_AMR lower to the same events. steer change is OHT only. Observation is enabled only for events you implement and never changes physics. This AMR / this AGV is the actor Vehicle. passing station radius is max(250 mm, body radius); vehicle.passing_station_name reads the station just passed.

**Related:** Def_AMR, Def_AGV, AMR, AGV, GRS Events

### Def_Humanoid event syntax

**Purpose:** Humanoid uses the same 12 event phrases. Job means humanoid_transfer; pickup/setdown fire when humanoid_pick/humanoid_place start.

**Syntax:**
```grs
begin Def_Humanoid <event name> event
    ...
end
```

**Example (not recompiled)**:
```grs
begin Def_Humanoid job finished event
    print "done ", this Humanoid to log
end
```

**Notes:** this Humanoid is humanoid_self(); humanoid_event_place() reads the place just passed (within 400 mm) inside passing station. resume to drive occurs only in live walking. steer change is OHT only.

**Related:** Def_Humanoid, Humanoid, GRS Events

## Runtime Function Index

### Array_Get(list_name, index [, index ...])

**Purpose:** Compatibility helper for reading an AutoMod-style indexed List variable.

**Syntax:**
```grs
call Array_Get(list_name, index [, index ...])
```

**Notes:** Preferred GRS syntax is ListName(1) / Matrix(1, 2). Indices are 1-based positive integers; rank is inferred automatically. Implementation spelling: array_get().

**Related:** Collections

### Array_Set(list_name, index [, index ...], value)

**Purpose:** Compatibility helper for writing an AutoMod-style indexed List variable.

**Syntax:**
```grs
call Array_Set(list_name, index [, index ...], value)
```

**Notes:** Preferred GRS syntax is 'set ListName(1) = value'. Element type and rank are inferred from GRS source; no separate Variable declaration is required. Implementation spelling: array_set().

**Related:** Collections

### Automod_Uniform(mean, half_range)

**Purpose:** Returns a uniform random value in [mean-half_range, mean+half_range].

**Syntax:**
```grs
call Automod_Uniform(mean, half_range)
```

**Notes:** This preserves the imported-model mean/half-range contract; it is not a min/max signature. Implementation spelling: automod_uniform().

**Related:** Text / Conversion

### Choose(list [, mode [, attribute [, value]]])

**Purpose:** Selects one candidate from a List. mode: "first" (default) returns the first entity; "random" draws uniformly via the existing automod RNG stream; "min"/"max" pick by numeric attribute (deterministic tie-break: lowest List index wins); "where" returns the first entity whose named attribute equals value.

**Syntax:**
```grs
call Choose(list [, mode [, attribute [, value]]])
```

**Notes:** #30 P6: OHT only for now -- weighted_choice/automod_uniform and this whole general call-utility surface are not yet wired into the AMR Host. Returns null when the list is empty or no candidate matches; never guesses at a dependency chain or root cause. Implementation spelling: choose().

**Related:** Collections

### Color_Off(["oht" | "amr" | "agv" | "humanoid"])

**Purpose:** Keeps the original model colors across matching Studio OHT, AMR, AGV and Humanoid runtimes.

**Syntax:**
```grs
call Color_Off(["oht" | "amr" | "agv" | "humanoid"])
```

**Notes:** Studio declared-model sessions only. With no argument, applies to all matching runtimes; with a type, only to that type. Does not change Jobs, timing or motion. Existing type-specific color_fixed calls remain supported. Implementation spelling: color_off().

**Related:** Simulation

### amr.color_fixed()

**Purpose:** Turns off the Vehicle-phase color change so the AMR keeps its original model color.

**Syntax:**
```grs
call amr.color_fixed()
```

**Notes:** Call from model.init. Only the display color changes; travel, pickup/setdown time and results are unchanged. Implementation spelling: amr.color_fixed().

**Related:** Simulation

### humanoid.color_fixed()

**Purpose:** Turns off the pose color change so every Humanoid keeps its original model color.

**Syntax:**
```grs
call humanoid.color_fixed()
```

**Notes:** Call from model.init. Only the display color changes; motion, timing and results are unchanged. Implementation spelling: humanoid.color_fixed().

**Related:** Humanoid

### OHT_Vehicle_List()

**Purpose:** Returns every OHT Vehicle of this module as a list. `for each v in Def_OHT` lowers to it.

**Syntax:**
```grs
call OHT_Vehicle_List()
```

**Notes:** Implemented runtime callable. Implementation spelling: oht_vehicle_list().

**Related:** Transport / Routing

### Humanoid_Dispatch_Async(robot, place)

**Purpose:** Starts a walk to a Station/defined place without suspending the caller. Returns seconds.

**Syntax:**
```grs
call Humanoid_Dispatch_Async(robot, place)
```

**Notes:** Same physical walk as humanoid_walk_to, but the calling GRS process continues; the next leg is driven by humanoid.arrived. Implementation spelling: humanoid_dispatch_async().

**Related:** Humanoid

### Humanoid_Queue_Initial_Dispatch(robot, place)

**Purpose:** Registers an initial walk during Humanoid.init. Returns true.

**Syntax:**
```grs
call Humanoid_Queue_Initial_Dispatch(robot, place)
```

**Notes:** Started at t=0 only after every OHT.init, AMR.init and Humanoid.init has completed (global Init barrier). Implementation spelling: humanoid_queue_initial_dispatch().

**Related:** Humanoid

### Humanoid_Face(robot, place)

**Purpose:** Turns in place to face a place or Station (absolute heading, shortest turn). Returns seconds.

**Syntax:**
```grs
call Humanoid_Face(robot, place)
```

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_face().

**Related:** Humanoid

### Humanoid_Event_Place()

**Purpose:** Inside a Def_Humanoid passing station event returns the place name that was just passed (lower case).

**Syntax:**
```grs
call Humanoid_Event_Place()
```

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_event_place().

**Related:** Humanoid

## Attribute Reference

### job.physical_committed [OHT]

**Purpose:** Returns true once SimulationEngine already owns the physical route for this ScheduleJob.

**Syntax:**
```grs
job.physical_committed
```

**Example (not recompiled)**:
```grs
print(job.physical_committed);
```

**Notes:** Type: Bool. Access: read-only. Modules: OHT. #30 P4: source/destination Station, assigned/pickup/setdown/completed timestamps, and cancel state/reason are Not Implemented as ScheduleJob Attributes -- the current ScheduleJob struct does not own that state, and this Issue does not fabricate a sidecar owner for it.

**Related:** OHT

### text.length [OHT, AMR]

**Purpose:** Returns UTF-8 byte length of the current Host String.

**Syntax:**
```grs
text.length
```

**Example (not recompiled)**:
```grs
print(name.length);
```

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR. 

**Related:** OHT, AMR
