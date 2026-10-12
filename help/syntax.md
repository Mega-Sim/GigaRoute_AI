# GigaRoute AI - GRS (GigaRoute Script) reference

Generated 2026-10-12 from the Help window of GigaRoute Simulation Studio. Entries: 344.

Examples marked compiler-checked were compiled with the GRS compiler front end (a compile does not guarantee runtime behavior).

## Language basics

### Source files

GRS source files use the .grs extension and UTF-8 text. A program is a set of event blocks; a Studio Model Logic file is plain GRS source.

### Two block styles

Logic is declared with events. A block is written either with braces or with begin ... end; both compile to the same event model. Blocks must span several lines: the compiler rejects a block written on one line.

Brace style - compiles
```
event model.init {
    print("hello");
}
```

begin ... end style (no parentheses or semicolons needed) - compiles
```
begin model.init event
    print "hello"
end
```

One-line block: rejected (GRS_SURFACE_NATIVE_STRUCTURE_REQUIRED) - rejected by the compiler: GRS_SURFACE_NATIVE_STRUCTURE_REQUIRED: GRS source must declare logic with event (or on/routine/function compatibility) { } blocks, or with native 'begin <name> event ... end' blocks
```
event model.init { print("hello"); }
```

### Statements and variables

Statements are written like function calls, one per line, usually ending with a semicolon. set assigns a value to a symbol or attribute; inc and dec change a number.

set / inc / dec / print - compiles
```
event model.init {
    set(counter, 0);
    inc(counter, 1);
    dec(counter, 1);
    print("counter", counter);
}
```

### Literals and operators

Numbers, strings in double quotes, true, false and null are literals. Operators: + - * / == != < <= > >= && || !

Arithmetic, comparison, boolean, literals - compiles
```
event model.init {
    set(ok, 1 + 2 * 3 >= 7 && !(4 == 5));
    set(name, "BOX01");
    set(flag, true);
    set(none, null);
}
```

### Comments

Line comments start with // and block comments are written /* ... */.

Comments - compiles
```
event model.init {
    // line comment
    /* block
       comment */
    print("x");
}
```

### Conditions

if / else if / else choose a branch from a condition.

if / else if / else - compiles
```
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

while with continue and break - compiles
```
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

for over a list - compiles
```
event model.init {
    for (job in vehicle.schedjobs) {
        print(job.type);
    }
}
```

### User events and calls

An event with parameters can be called like a function and can return a value. Parameters are positional.

Declare and call an event - compiles
```
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

on <canonical-event> - compiles
```
on vehicle.pickup {
    print(vehicle.id);
}
```

function - compiles
```
function calc.tax(v) {
    return(v * 0.1);
}
```

### Compile errors you will see

These diagnostics come from the GRS compiler. A program with any error cannot be run.

Unclosed block (GRS_SURFACE_UNCLOSED_BLOCK) - rejected by the compiler: GRS_SURFACE_UNCLOSED_BLOCK: one or more GRS '{' or 'begin' blocks are not closed
```
event model.init {
    print("a");

```

Removed verb (GRS_SURFACE_REMOVED_ACTION): use move_to(target) - rejected by the compiler: GRS_SURFACE_REMOVED_ACTION: travel() was removed; GigaRoute has a single movement verb -- use move_to(<target>)
```
event model.init {
    travel(ST01);
}
```

Wrong argument count (GRS_SURFACE_ARGUMENT_COUNT) - rejected by the compiler: GRS_SURFACE_ARGUMENT_COUNT: wait expects 1 argument(s)
```
event model.init {
    wait();
}
```

## Getting Started

### Studio model modules

Purpose: Runs newly authored OHT, AMR and Conveyor modules together, including Conveyor-only models.

Syntax:
```
begin model.module event
    set(module_id, "belt_alpha"); set(runtime_kind, "conveyor"); ...
end
```

Example (compiler-checked):
```
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

Notes: Declare ownership in each source file. Same module_id combines files; different modules keep separate events. Use runtime_kind oht, amr or conveyor. One fleet per OHT/AMR kind; multiple Conveyor modules are supported. Station names must match the current drawing and carrier. Compile applies the entire valid model; any error blocks a new Run. No manifest or saved .grproj is required. Pause/Resume retains the active program; Restart uses edited sources. Existing undeclared single-runtime models retain their own execution path.

Related: model.init, request_transport, every_event, Studio Station binding

### Studio Station binding

Purpose: Connects each declared module to its own physical domain before Run.

Syntax:
```
entry_station / exit_station / level_id / elevation_mm
```

Example (compiler-checked):
```
set(entry_station, "Input_A");
set(exit_station, "Output_A");
set(level_id, 0);
```

Notes: OHT requires Rail-attached Stations. Conveyor requires Stations on one uniquely connected nonbranching LINE path; curves and ambiguous routes are rejected. AMR requires floor Stations, not overhead Rail Stations. Use the existing Station menu's AMR floor Station action to create Level 0 ground-plane Stations. File names, print text and demo Station prefixes do not select equipment. Cross-module logical Load handoff uses call_transport(target_module, load_id, from_station, to_station).

Related: Studio model modules, Workspace Station

### GRS file

Purpose: Simulation Studio Model Logic source file.

Syntax:
```
*.grs
```

Example (compiler-checked):
```
begin model.init event
    print("ready");
end
```

Notes: GRS uses UTF-8 text. Both native { } blocks and the supported begin <name> event ... end surface compile to the same GRS event model; dotted canonical event names keep their exact spelling.

Related: event, Model Logic

### Vehicle runtime type

Purpose: Declares which physical Vehicle runtime owns this GRS model.

Syntax:
```
begin model.vehicle_type.oht event
end
begin model.vehicle_type.amr event
end
```

Example (compiler-checked):
```
begin model.vehicle_type.oht event
end

begin model.init event
    print("OHT model ready");
end
```

Notes: Declare exactly one marker for a typed model. Legacy Rail and Auto Simulation runs preserve Fleet Mode. Studio blocks an untyped GRS when the saved Fleet Mode is AMR; declare the intended type explicitly.

Related: Simulation Setup, Fleet Mode, model.init

### Vehicle asset

Purpose: Selects an OHT or AMR Equipment instance whose embedded GLB is used by the matching runtime renderer.

Syntax:
```
begin model.vehicle_type.oht event
end
begin model.vehicle_asset.<project_instance_name> event
end
```

Example (compiler-checked):
```
begin model.vehicle_type.oht event
end
begin model.vehicle_asset.oht_01 event
end
```

Notes: The selector suffix matches Equipment instance_name case-insensitively. With no selector, exactly one instance in the matching category (OHT Vehicle or AMR) is bound automatically. Zero or multiple candidates retain the legacy type-specific renderer and emit GRS_VEHICLE_ASSET_FALLBACK. A missing or wrong-type explicit selector blocks Run. The original static placement is hidden only while that View has matching runtime snapshots.

Related: Vehicle runtime type, Workspace Equipment, Simulation Studio 3D

### Actual From-To CSV

Purpose: Defines recurring From-To job releases used by Auto Simulation and Static Analysis.

Syntax:
```
Time Interval,From,To
```

Example (compiler-checked):
```
557.3752984,E0001,E0108
```

Notes: Time Interval is seconds between recurring releases for that row. Static Analysis uses moves/hour = 3600 / Time Interval. Auto Simulation schedules first_due = Time Interval and then previous_due + Time Interval, so the first job is not forced at t=0.

Related: Actual From-To, Static Analysis, Auto Simulation

### model.module type_name

Purpose: Declares the rail type name a module's Vehicles spawn on.

Syntax:
```
begin model.module event
    set(module_id, "agv_a");
    set(runtime_kind, "agv");
    set(type_name, "LINE_A");
end
```

Example (compiler-checked):
```
set(runtime_kind, "oht");
set(type_name, "LINE_A");
```

Notes: Supported for runtime_kind oht and agv. vehicle_count Vehicles spawn on rails whose type name is LINE_A (OHT: on that rail's Stations; AGV: on that rail). Without type_name, Workspace Vehicle objects with a Type Name, or the established placement, are used.

Related: Path type, runtime_kind, vehicle_count

### Event execution model

Purpose: Defines the Simulation Studio authoring policy: native model logic is event-centered and does not introduce a separate user-facing Process type.

Syntax:
```
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

Example (compiler-checked):
```
begin model.init event
    print("model initialized");
end
```

Notes: Simulation Studio Model Logic accepts native GRS source; historical model source should be translated to GRS before validation.

Related: event, model.init, vehicle.*, dispatch.request, clone, wait

### Simulation Setup + GRS workload

Purpose: Uses the Real or Random From-To workload selected in Simulation Setup while GRS adds user policy callbacks and model logic.

Syntax:
```
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

Example (compiler-checked):
```
begin vehicle.pickup event
    vehicle_dwell(8);
end
```

Notes: This describes the existing single-runtime Studio path without model.module declarations. Real/Random From-To remains active even when configure_motion() is called. Declared Studio modules use their own job_source setting (script by default), independently of Auto Simulation Setup.

Related: Simulation Setup, Real From-To, Random From-To, configure_motion, disable_native_job_source

### Readable function names

Purpose: Model functions use Pascal_Underscore names; equipment acronyms remain uppercase.

Syntax:
```
call OHT_System_Initialize()
call ASRS_Seed_Shelf_FOUP(101)
call AMR_System_Initialize()
call Conveyor_System_Initialize()
call Process_Complete()
```

Example (compiler-checked):
```
begin Process_Complete event
    print "process complete"
end
```

Notes: Existing camelCase model declarations/calls remain compatible through one unambiguous case/underscore-insensitive alias. Canonical dotted hooks such as model.init, vehicle.pickup_complete, conveyor.blocked and equipment.load_arrived are unchanged. Existing snake_case runtime built-ins keep their implementation names; Help displays the same callable in readable Pascal_Underscore form.

Related: Runtime Function Index, Native OHT / ASRS Functions, Example Model Functions, Model Functions (current source)

## Declarations and Control Flow

#### Declarations

### event

Purpose: Declares unified GRS logic. Canonical engine events and user-defined callable events use the same declaration kind.

Syntax:
```
begin name(args) event
    ...
end
```

Example (compiler-checked):
```
begin calc.double(x) event
    return(x * 2);
end
```

Notes: Parameters are comma-separated identifiers. __gigaroute.* is reserved.

Related: on, routine, function, call, return

### on

Purpose: Compatibility declaration for a canonical engine-bound event.

Syntax:
```
on <canonical-event> { ... }
```

Example (compiler-checked):
```
on vehicle.pickup {
    print(vehicle.id);
}
```

Notes: Use event for new code. on accepts canonical events only and cannot declare parameters.

Related: event, canonical events

### routine / function

Purpose: Compatibility aliases lowered to the same unified event implementation.

Syntax:
```
routine name { ... }
function name(args) { ... }
```

Example (compiler-checked):
```
function calc.tax(v) {
    return(v * 0.1);
}
```

Notes: New Studio templates use begin NAME event ... end. The older event NAME { } form and these aliases remain accepted for compatibility.

Related: event, call, return

### call / direct event call

Purpose: Invokes a user-defined GRS event. Expression-position calls return the event's return value.

Syntax:
```
call(eventName(args))
eventName(args)
```

Example (compiler-checked):
```
begin calc.double(x) event
    return(x * 2);
end

begin model.init event
    set(result, calc.double(4));
end
```

Notes: Parameters are positional.

Related: event, return, parameters

#### Control Flow

### if / else if / else

Purpose: Executes conditional branches.

Syntax:
```
if (<condition>) { ... }
} else if (<condition>) { ... }
} else { ... }
```

Example (compiler-checked):
```
if (vehicle.phase == "idle") {
    print("idle");
}
```

Notes: Conditions use the GRS expression surface.

Related: comparison operators, &&, ||, !

### while

Purpose: Repeats a block while its condition is true.

Syntax:
```
while (<condition>) { ... }
```

Example (compiler-checked):
```
while (count < 5) {
    inc(count, 1);
}
```

Notes: Use wait/resource/order-list coordination when model time must advance.

Related: break, continue, wait

### for

Purpose: Iterates a snapshot list such as vehicle.schedjobs.

Syntax:
```
for (<item> in <iterable>) { ... }
```

Example (compiler-checked):
```
for (job in vehicle.schedjobs) {
    print(job.type);
}
```

Notes: The iterable is evaluated once when the loop begins.

Related: vehicle.schedjobs, break, continue

### break

Purpose: Leaves the innermost while/for loop.

Syntax:
```
break
```

Example (compiler-checked):
```
if (job.type == "move") {
    break
}
```

Notes: Only valid inside a loop.

Related: while, for, continue

### continue

Purpose: Skips to the next iteration of the innermost loop.

Syntax:
```
continue
```

Example (compiler-checked):
```
if (job.alive == false) {
    continue
}
```

Notes: Only valid inside a loop.

Related: while, for, break

### return

Purpose: Returns a value from the current user-defined event/call.

Syntax:
```
return(value)
```

Example (compiler-checked):
```
return(vehicle.id);
```

Notes: The compiled runtime also has a null return at the natural end of an event.

Related: event, call

### return (no value)

Purpose: Returns from the current user-defined event without a value.

Syntax:
```
return
return(value)
```

Example (compiler-checked):
```
if (done) {
    return
}
```

Notes: A bare return produces null. return(value) preserves the existing return-value behavior.

Related: event, call, return(value)

## Actions

#### Core Actions

### print

Purpose: Writes GRS output to the Script Print log and the Studio realtime log.

Syntax:
```
print(value, ...)
```

Example (compiler-checked):
```
print("vehicle", vehicle.id, vehicle.phase);
```

Notes: Arguments are rendered in order.

Related: Model Logic log

### wait

Purpose: Suspends the current process until the requested simulation time has elapsed.

Syntax:
```
wait(seconds)
```

Example (compiler-checked):
```
wait(0.25);
```

Related: wait_until

### wait_until

Purpose: Suspends the current process on the runtime wait-channel path until the condition can be re-evaluated after a wake.

Syntax:
```
wait_until(condition)
```

Example (compiler-checked):
```
wait_until(counter >= 10);
```

Notes: There is no periodic condition polling. Prefer explicit event/resource/order-list coordination for high-volume models.

Related: wait, order, Resource

### set

Purpose: Assigns a GRS symbol or supported writable entity/attribute target.

Syntax:
```
set(target, value)
```

Example (compiler-checked):
```
set(vehicle.current_schedjob, job);
```

Related: inc, dec, ScheduleJob

### inc

Purpose: Increments a numeric target.

Syntax:
```
inc(target, amount)
```

Example (compiler-checked):
```
inc(counter, 1);
```

Related: set, dec

### dec

Purpose: Decrements a numeric target.

Syntax:
```
dec(target, amount)
```

Example (compiler-checked):
```
dec(counter, 1);
```

Related: set, inc

### create

Purpose: Creates one script Load entity and returns its handle.

Syntax:
```
create(name)
```

Example (compiler-checked):
```
set(load, create("BOX01"));
```

Notes: The current process continues; create does not fork execution.

Related: clone, Load

### clone

Purpose: Clones a Load actor and forks execution from the following statement.

Syntax:
```
clone(actor)
```

Example (compiler-checked):
```
clone(load);
```

Notes: Copies script Load attributes/ownership metadata. This is intentionally different from create.

Related: create, Load

### tabulate

Purpose: Appends a value to a named runtime Table.

Syntax:
```
tabulate(tableName, value)
```

Example (compiler-checked):
```
tabulate("cycle", elapsed);
```

Related: Table, collection size

### insert

Purpose: Inserts an entity handle into a named Queue.

Syntax:
```
insert(item, queueName, position)
```

Example (compiler-checked):
```
insert(load, "Q_WAIT", "begin");
```

Notes: Position begin inserts at the front; other positions currently append.

Related: Queue, send, move_to

### send

Purpose: Appends an entity handle to a named Queue.

Syntax:
```
send(item, queueName)
```

Example (compiler-checked):
```
send(load, "Q_BUFFER");
```

Notes: Queue state is script/runtime-owned.

Related: insert, Queue

### clone source actor

Purpose: Forks script execution after cloning the selected Load actor.

Syntax:
```
clone()
clone(load)
```

Example (compiler-checked):
```
clone(load);
```

Notes: With no EntityHandle argument, clone uses the current actor. With an explicit Load handle, that Load is copied (ownership/location/destination/onboard/custom attributes) and the cloned execution branch continues with the copied Load as actor. This is runtime execution machinery, not a user-facing Process declaration.

Related: create, Load, Runtime Clone, Event execution model

### insert optional position

Purpose: Inserts an entity into a named Queue with an optional position.

Syntax:
```
insert(item, queue)
insert(item, queue, "begin")
insert(item, queue, "end")
```

Example (compiler-checked):
```
insert(load, "Q_WAIT");
```

Notes: begin inserts at the front. Omitted position, end, and other current position values append.

Related: Queue, send

### disable_native_job_source

Purpose: Explicitly disables native Real/Random From-To release when the GRS model generates its own Load workload.

Syntax:
```
disable_native_job_source()
```

Example (compiler-checked):
```
begin model.init event
    disable_native_job_source();
end
```

Notes: Call this only when GRS itself owns demand generation. configure_motion() does not change workload ownership. Declared modules with job_source=script disable native generation during preparation and need no explicit disable call. A Native declaration conflicts with explicit script transport or source-disable actions.

Related: configure_motion, create, spawn_event, file_read_lines, Simulation Setup

### oht.motion_off

Purpose: Turns off the OHT Pickup/Setdown transfer (Slide/Hoist) motion to keep the run light. Travel is unchanged.

Syntax:
```
oht.motion_off()
```

Example (compiler-checked):
```
begin model.init event
    oht.motion_off();
end
```

Notes: Call from model.init with no arguments. The Core pickup/setdown stop time is kept, so simulation results do not change; only the Slide/Hoist animation is skipped and the carrier switches between port and gripper at the handoff point. The setting applies to the OHT module that declares it.

Related: stk.motion_off, amr.motion_off, vehicle_dwell, Simulation Setup

### oht.color_fixed

Purpose: Turns off the Vehicle-phase color change (Idle/Retrieving/Pickup/Moving/Setdown) so the OHT keeps its original model color.

Syntax:
```
oht.color_fixed()
```

Example (compiler-checked):
```
begin model.init event
    oht.color_fixed();
end
```

Notes: Call from model.init with no arguments. Only the display color changes; travel, pickup/setdown time and simulation results are unchanged. Useful for recording videos where a constant OHT color is easier to follow.

Related: oht.motion_off, set_vehicle_color, Simulation Setup

### stk.motion_off

Purpose: Turns off STK Crane motion so the Crane does not move separately.

Syntax:
```
stk.motion_off()
```

Example (compiler-checked):
```
begin model.init event
    asrs_stocker_initialize();
    stk.motion_off();
end
```

Notes: Call from model.init with no arguments, before the first outbound request. Crane X/Z travel, Fork extend/retract and the pickup/deposit hold time all become 0, so each Crane job step completes immediately. Inventory, Port Lane and handoff events still occur in the same order. Rejected once the first outbound has started.

Related: oht.motion_off, amr.motion_off, asrs_stocker_initialize, asrs_request_first_outbound

### amr.motion_off

Purpose: Turns off the AMR transfer (load/unload) motion setting.

Syntax:
```
amr.motion_off()
```

Example (compiler-checked):
```
begin model.init event
    amr.motion_off();
end
```

Notes: Call from model.init with no arguments. The AMR currently has no transfer motion, so the setting is only stored in the AMR engine; travel and the pickup/setdown stop time are unchanged.

Related: oht.motion_off, stk.motion_off

#### Transport

### move_to

Purpose: Single GigaRoute movement verb. Station targets move a Vehicle through the existing physical route; an unresolved string target is treated as a Queue name.

Syntax:
```
move_to(target)
```

Example (compiler-checked):
```
move_to(12);
move_to("ST01");
move_to("Q_WAIT");
```

Notes: Station resolution has priority. travel() and move_into() are removed from product GRS.

Related: dispatch, Queue, Station

### dispatch

Purpose: Creates a move ScheduleJob for a Vehicle. A Busy Vehicle keeps it in its own queue until an authoritative Idle boundary.

Syntax:
```
dispatch(vehicle, station)
```

Example (compiler-checked):
```
dispatch(vehicle, "ST01");
```

Related: ScheduleJob, preempt, cancel

### claim

Purpose: Claims a Load for a Vehicle and creates a retrieve ScheduleJob.

Syntax:
```
claim(load, vehicle)
```

Example (compiler-checked):
```
claim(load, vehicle);
```

Notes: Same-owner claim is idempotent. A different Vehicle cannot claim an already claimed Load.

Related: Load, retrieve, ScheduleJob

### cancel

Purpose: Cancels a live script ScheduleJob handle.

Syntax:
```
cancel(job)
```

Example (compiler-checked):
```
cancel(job);
```

Notes: If physical movement is already committed, route/pose are not rewound or teleported; the physical Load lifecycle still completes.

Related: ScheduleJob, claim, dispatch

### configure

Purpose: Writes script-side configuration/custom attribute state for an explicit receiver or current actor.

Syntax:
```
configure(receiver, attribute, value)
configure(attribute, value)
```

Example (compiler-checked):
```
configure(vehicle, "priority", 5);
```

Notes: Does not silently replace global Simulation Setup physical constants.

Related: set, preempt

### preempt

Purpose: Makes an alive uncommitted ScheduleJob current. If the Vehicle is busy, the selection takes priority at the next Idle boundary.

Syntax:
```
preempt(job)
preempt(vehicle, job)
```

Example (compiler-checked):
```
preempt(vehicle, urgentJob);
```

Notes: Soft preempt only: no active-route deletion, rewind, teleport or forced phase mutation.

Related: vehicle.current_schedjob, ScheduleJob

### Work_Accept

Purpose: Optional read-only acceptance predicate for explicit GRS claim(load, vehicle).

Syntax:
```
begin Work_Accept(vehicle, load, pickup) event
    ...
end
```

Example (compiler-checked):
```
begin Work_Accept(vehicle, load, pickup) event
    return(pickup != null);
end
```

Notes: Runs synchronously immediately before a new explicit script claim mutates Load/ScheduleJob state. It must return Bool. If absent, claim() behavior is unchanged. Native Random/Real dispatch and easy transport do not synthesize a Load just to call this predicate.

Related: claim, Load, ScheduleJob, read-only evaluation

#### Resources

### use / get / reserve

Purpose: Acquires a named Resource. If it is at capacity, the current process waits until capacity becomes available.

Syntax:
```
use(resource)
get(resource)
reserve(resource)
```

Example (compiler-checked):
```
get(R_MACHINE);
```

Notes: Literal Resource names share one wake channel. Dynamic targets fall back to a single non-blocking acquisition attempt.

Related: free, release, Resource

### free / release

Purpose: Releases a named Resource and wakes eligible waiters.

Syntax:
```
free(resource)
release(resource)
```

Example (compiler-checked):
```
free(R_MACHINE);
```

Related: use, get, reserve

### wait_ordered

Purpose: Places the current actor on the currently implemented default OrderList and suspends it until ordered.

Syntax:
```
wait_ordered()
```

Example (compiler-checked):
```
wait_ordered();
```

Notes: Current product implementation intentionally uses one implicit default OrderList for this action.

Related: order, OrderList

### order

Purpose: Releases pending actors from the default OrderList.

Syntax:
```
order(count)
```

Example (compiler-checked):
```
order(1);
```

Related: wait_ordered, OrderList

### WIP / Traffic capacity pattern

Purpose: Models endpoint/WIP capacity with the existing Resource acquire/release and targeted wake path.

Syntax:
```
get(WIP_RESOURCE)
...
free(WIP_RESOURCE)
```

Example (compiler-checked):
```
get(R_ST01_WIP);
free(R_ST01_WIP);
```

Notes: Resource capacity is the authoritative capacity in this pattern. Station occupancy/reservation is physical Vehicle occupancy and is intentionally not treated as the same value.

Related: use, get, reserve, free, resource.capacity, station_occupancy_count

## Events

### Conveyor job lifecycle

Purpose: Receives actual creation, movement, blocked, exit-ready, downstream-release and completion callbacks from the Conveyor job.

Syntax:
```
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

Example (compiler-checked):
```
begin conveyor.exit event
    print(module_id, load_id);
    call_transport("floor_fleet", load_id, "Floor_Pick", "Floor_Drop");
end
```

Notes: Use request from <entry> to <exit> to enqueue real work. every schedules its first request after the specified interval. lifecycle symbols identify the module, Job, Load and actual microsecond timestamp and remain available after a wait. conveyor.exit is the stop-distance handoff-ready boundary; conveyor.released fires after downstream acceptance. conveyor.job_completed remains the ordinary completion boundary.

Related: Studio model modules, every_event, request_transport, call_transport

### model.init

Purpose: Runs once when an applied scripted simulation run starts.

Syntax:
```
begin model.init event
    ...
end
```

Example (compiler-checked):
```
begin model.init event
    print("start");
end
```

Notes: Authoritative run-start binding.

Related: vehicle.init

### vehicle.init

Purpose: Runs once for each Vehicle when the scripted run is activated.

Syntax:
```
begin vehicle.init event
    ...
end
```

Example (compiler-checked):
```
begin vehicle.init event
    print(vehicle.id);
end
```

Notes: The current Vehicle actor is available through vehicle.*.

Related: model.init, dispatch.request

### dispatch.request

Purpose: Runs at an Idle dispatch-request boundary, including initial activation.

Syntax:
```
begin dispatch.request event
    ...
end
```

Example (compiler-checked):
```
begin dispatch.request event
    print(vehicle.id);
end
```

Notes: The ScheduleJob queue guard executes before ordinary dispatch-request logic.

Related: dispatch, claim

### job.selected

Purpose: Runs once when a live ScheduleJob becomes a Vehicle's current_schedjob.

Syntax:
```
begin job.selected event
    ...
end
```

Example (compiler-checked):
```
begin job.selected event
    print(this.id, this.type, this.vehicle, this.location);
end
```

Notes: Implemented. The event actor is the ScheduleJob handle. Re-setting the same current job does not fire again. preempt() fires only when it actually changes the current job.

Related: ScheduleJob, vehicle.current_schedjob, preempt, job.finished

### job.finished

Purpose: Runs when the committed physical job has fully completed and the Vehicle reaches the authoritative Idle handoff.

Syntax:
```
begin job.finished event
    ...
end
```

Example (compiler-checked):
```
begin job.finished event
    print(this.id, this.type, this.vehicle, this.load);
end
```

Notes: Implemented. This is later than vehicle.setdown: configured Setdown dwell must finish first. The event actor is the completed ScheduleJob handle.

Related: vehicle.setdown, ScheduleJob, Load, job.selected

### vehicle.pickup

Purpose: Fires when a Vehicle reaches the physical Pickup boundary.

Syntax:
```
begin vehicle.pickup event
    ...
end
```

Example (compiler-checked):
```
begin vehicle.pickup event
    print(vehicle.station);
end
```

Notes: A claimed Load becomes onboard at physical Pickup.

Related: vehicle.setdown, Load

### vehicle.setdown

Purpose: Fires when a Vehicle reaches the Setdown arrival boundary.

Syntax:
```
begin vehicle.setdown event
    ...
end
```

Example (compiler-checked):
```
begin vehicle.setdown event
    print(vehicle.destination);
end
```

Notes: The Load remains onboard through configured Setdown dwell and unloads at the following Idle handoff.

Related: vehicle.pickup, Load, job.finished

### vehicle.start_move

Purpose: Fires at the first real linear movement in Retrieving/Moving after speed exceeds the meaningful threshold.

Syntax:
```
begin vehicle.start_move event
    ...
end
```

Example (compiler-checked):
```
begin vehicle.start_move event
    print(vehicle.id);
end
```

Notes: The internal 0.001 mm/s wake probe is excluded; the event threshold is >0.01 mm/s.

Related: vehicle.speed_change, vehicle.resume

### vehicle.speed_change

Purpose: Fires when physical motion speed changes meaningfully, including acceleration/deceleration, Sensor BRAKE/STOP and curve-speed transitions.

Syntax:
```
begin vehicle.speed_change event
    ...
end
```

Example (compiler-checked):
```
begin vehicle.speed_change event
    print(vehicle.phase);
end
```

Notes: First-class physical event. Empty handlers are optimized out of the physical hot path.

Related: vehicle.start_move, vehicle.resume

### vehicle.resume

Purpose: Fires when a Vehicle that previously moved resumes real movement after stopping.

Syntax:
```
begin vehicle.resume event
    ...
end
```

Example (compiler-checked):
```
begin vehicle.resume event
    print(vehicle.id);
end
```

Notes: Uses an authoritative physical speed transition.

Related: vehicle.start_move, vehicle.speed_change

### vehicle.approach_destination

Purpose: Fires on the first real movement within the final route segment toward the destination.

Syntax:
```
begin vehicle.approach_destination event
    ...
end
```

Example (compiler-checked):
```
begin vehicle.approach_destination event
    print(vehicle.destination);
end
```

Notes: No arbitrary distance polling threshold is used.

Related: station.pass.<station>

### station.pass.<station>

Purpose: Fires when a Vehicle physically crosses the named Station control point.

Syntax:
```
begin station.pass.ST01 event
    ...
end
```

Example (compiler-checked):
```
begin station.pass.ST01 event
    print(vehicle.id);
end
```

Notes: Only Stations with non-empty handlers are watched. Repeat visits fire again per route occurrence.

Related: vehicle.approach_destination

### conveyor.exit

Purpose: Fires when the Conveyor job reaches an exit-ready handoff boundary.

Syntax:
```
begin conveyor.exit event
    ...
end
```

Example (compiler-checked):
```
begin conveyor.exit event
    print(load_id);
end
```

Notes: This is an implemented callback. With stop-distance/backpressure flow it is the point where downstream call_transport can be issued.

Related: conveyor.blocked, conveyor.released, conveyor.job_completed, call_transport

### conveyor.blocked

Purpose: Fires when the Conveyor job enters its actual blocked/backpressure state.

Syntax:
```
begin conveyor.blocked event
    ...
end
```

Example (compiler-checked):
```
begin conveyor.blocked event
    print(load_id);
end
```

Notes: This callback is emitted from the Conveyor runtime state transition; no synthetic polling timer is used.

Related: conveyor.exit, conveyor.released, conveyor.job_completed

### conveyor.released

Purpose: Fires after a blocked/exit-ready Conveyor Load is accepted by the downstream owner.

Syntax:
```
begin conveyor.released event
    ...
end
```

Example (compiler-checked):
```
begin conveyor.released event
    print(load_id);
end
```

Related: conveyor.blocked, conveyor.exit, call_transport

## Attributes and Expressions

#### Vehicle Attributes

### vehicle.id

Purpose: Dense Vehicle identifier for the current Vehicle actor.

Syntax:
```
vehicle.id
```

Example (compiler-checked):
```
print(vehicle.id);
```

Notes: Read-only physical identity.

Related: vehicle.station, vehicle.phase

### vehicle.station / from / destination

Purpose: Reads the current Station, job source and job destination of the Vehicle.

Syntax:
```
vehicle.station
vehicle.from
vehicle.destination
```

Example (compiler-checked):
```
print(vehicle.station, vehicle.destination);
```

Notes: Returns null when the corresponding Station is invalid/unset.

Related: vehicle.phase

### vehicle.phase / status

Purpose: Returns the current physical phase as a string: idle, retrieving, pickup, moving or setdown.

Syntax:
```
vehicle.phase
vehicle.status
```

Example:
```
if (vehicle.phase == "idle") { ... }
```

Related: vehicle.station

### vehicle.schedjobs

Purpose: Returns the current Vehicle's live script ScheduleJob handles as a list.

Syntax:
```
vehicle.schedjobs
```

Example (compiler-checked):
```
for (job in vehicle.schedjobs) { print(job.type); }
```

Notes: The list is scoped to one Vehicle; no Vehicle x Job fleet scan is required.

Related: vehicle.current_schedjob, ScheduleJob

### vehicle.current_schedjob

Purpose: Gets/sets the selected current ScheduleJob for the Vehicle.

Syntax:
```
vehicle.current_schedjob
```

Example (compiler-checked):
```
set(vehicle.current_schedjob, job);
```

Notes: An incomplete explicitly selected retrieve can reserve an Idle Vehicle until its endpoints are supplied.

Related: preempt, ScheduleJob

### Vehicle attribute aliases

Purpose: Documents implemented native aliases for Vehicle queries.

Syntax:
```
vehicle.location == vehicle.station
vehicle.schedulejobs == vehicle.schedjobs
vehicle.status == vehicle.phase
```

Example (compiler-checked):
```
print(vehicle.location, vehicle.schedulejobs.size, vehicle.status);
```

Notes: Aliases resolve to the same current physical/script state; they do not duplicate state.

Related: vehicle.station, vehicle.schedjobs, vehicle.phase

### Vehicle zone

Purpose: Sets or reads a logical Vehicle zone such as building, floor, or operating area.

Syntax:
```
set(vehicle.zone, "ZONE")
set_vehicle_zone(vehicle, "ZONE")
vehicle_zone(vehicle)
```

Example (compiler-checked):
```
set(vehicle.zone, "FAB_A_7F");
print(vehicle_zone(vehicle));
```

Notes: Zone is logical metadata. It does not automatically change routing, dispatch, Following, or Sensor behavior. Blank means UNASSIGNED.

Related: Path zone, current path zone, Simulation Setup Vehicle Zone

### Current Path zone

Purpose: Returns the zone of the Path the Vehicle currently occupies.

Syntax:
```
vehicle_path_zone(vehicle)
current_path_zone(vehicle)
```

Example (compiler-checked):
```
if (vehicle_path_zone(vehicle) == "FAB_A_7F") {
    print("vehicle is in A 7F");
}
```

Notes: The value is read-only through these accessors. Use set_path_zone(pathId, zone) or Workspace Path settings to edit Path zone. Off-map Vehicles return an empty string.

Related: Vehicle zone, Path zone

#### Load Attributes

### Load attributes

Purpose: Reads script-side material-flow state for a Load.

Syntax:
```
load.id
load.name
load.vehicle
load.location
load.destination
load.onboard
load.alive
load.state
```

Example (compiler-checked):
```
print(load.state, load.location);
```

Notes: state is derived as created, claimed, onboard or stored. Vehicle physical pose is not duplicated in Load state.

Related: claim, vehicle.pickup, vehicle.setdown

#### ScheduleJob Attributes

### ScheduleJob attributes

Purpose: Reads stable script ScheduleJob metadata.

Syntax:
```
job.id
job.type
job.vehicle
job.load
job.location
job.released_us
job.alive
job.current
```

Notes: Current transport lifecycle types include move, retrieve and deliver.

Related: dispatch, claim, cancel, preempt, job.selected, job.finished

#### Collection Attributes

### Queue / Table / ObjectList size

Purpose: Returns the number of stored elements in supported runtime collections.

Syntax:
```
queue.size
table.size
objectList.size
```

Example (compiler-checked):
```
print(queue.size);
```

Notes: Read-only collection size query.

Related: Queue, Table, ObjectList

### List.size

Purpose: Returns the number of values in a runtime List.

Syntax:
```
list.size
```

Example (compiler-checked):
```
print(vehicle.schedjobs.size);
```

Related: vehicle.schedjobs, Queue.size, Table.size, ObjectList.size

#### String Attributes

### length / substring

Purpose: Reads String length or returns a substring.

Syntax:
```
text.length
text.substring(start, length)
```

Example (compiler-checked):
```
print(name.substring(0, 4));
```

Related: String

#### Path / Routing

### Path zone

Purpose: Reads or changes the logical zone assigned to a directed Path ID.

Syntax:
```
path_zone(pathId)
set_path_zone(pathId, "ZONE")
```

Example (compiler-checked):
```
set_path_zone(12, "FAB_B_3F");
print(path_zone(12));
```

Notes: This changes logical runtime metadata only. It does not change route weight, direction, physical length, or automatically restrict route search. Workspace Selected Path Zone is the authoring source for Path.zone.

Related: Vehicle zone, route weight, Workspace Selected Path Zone

### Path type (rail type name)

Purpose: Reads the rail type attribute of a directed Path ID: its type name and whether the rail belongs to OHT or AGV.

Syntax:
```
path_type_name(pathId)
path_type(pathId)
vehicle_type_name(vehicle)
vehicle_path_type_name(vehicle)
```

Example (compiler-checked):
```
print(path_type(12), path_type_name(12));
print(vehicle_type_name(vehicle), vehicle_path_type_name(vehicle));
```

Notes: The type name is authored in Workspace (select rails and a Vehicle object, right-click Type Name...), by DXF layer AGV_PATH* (rail kind default), or by the model.module type_name field. A Vehicle spawns on the rails whose type name equals its own. Read-only at run time; it does not restrict routing.

Related: Path zone, model.module type_name

#### Expressions

### operators

Purpose: Arithmetic, comparison and boolean operators for GRS expressions.

Syntax:
```
+ - * /
== != < <= > >=
&& || !
```

Example:
```
if (vehicle.id >= 0 && !done) { ... }
```

Related: if, while

### vehicle / self

Purpose: Provides the current Vehicle actor surface and current actor custom-attribute surface.

Syntax:
```
vehicle.id
vehicle.station
vehicle.phase
self.<custom_attribute>
```

Example (compiler-checked):
```
set(self.priority, 3);
print(self.priority);
```

Notes: Custom modeling state is script-side and does not overwrite physical Vehicle state.

Related: set, configure, Vehicle Attributes

## Attribute Reference

#### Vehicle Attributes

### vehicle.id [OHT, AMR]

Purpose: Returns the dense runtime Vehicle/Robot ID.

Syntax:
```
vehicle.id
```

Example (compiler-checked):
```
print(vehicle.id);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR. Physical runtime identity; not a user-defined attribute.

### vehicle.station [OHT, AMR]

Purpose: Returns the current/last Station index.

Syntax:
```
vehicle.station
```

Example (compiler-checked):
```
print(vehicle.station);
```

Notes: Type: Number or null. Access: read-only. Modules: OHT, AMR. Alias vehicle.location resolves to the same value.

Related: vehicle.location

### vehicle.from [OHT, AMR]

Purpose: Returns the current Job source Station index.

Syntax:
```
vehicle.from
```

Example (compiler-checked):
```
print(vehicle.from);
```

Notes: Type: Number or null. Access: read-only. Modules: OHT, AMR.

Related: vehicle.fromstation

### vehicle.destination [OHT, AMR]

Purpose: Returns the current destination Station index.

Syntax:
```
vehicle.destination
```

Example (compiler-checked):
```
print(vehicle.destination);
```

Notes: Type: Number or null. Access: read-only. Modules: OHT, AMR.

Related: vehicle.destinationstation

### vehicle.phase [OHT, AMR]

Purpose: Returns the authoritative runtime phase/status text.

Syntax:
```
vehicle.phase
```

Example (compiler-checked):
```
print(vehicle.phase);
```

Notes: Type: String. Access: read-only. Modules: OHT, AMR. Alias vehicle.status resolves to the same value.

Related: vehicle.status

### vehicle.current_speed [OHT, AMR]

Purpose: Returns authoritative current linear speed.

Syntax:
```
vehicle.current_speed
```

Example (compiler-checked):
```
print(vehicle.current_speed);
```

Notes: Type: Number (mm/s). Access: read-only. Modules: OHT, AMR. OHT reads the Rail Vehicle motion speed; AMR reads the robot linear speed.

Related: vehicle.speed / vehicle.velocity

### vehicle.remaining_distance [OHT, AMR]

Purpose: Returns remaining distance on the current route.

Syntax:
```
vehicle.remaining_distance
```

Example (compiler-checked):
```
print(vehicle.remaining_distance);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT, AMR. Zero is valid at a destination or when no route is active.

Related: vehicle.route_remaining / vehicle.route_remaining_distance

### vehicle.x [OHT, AMR]

Purpose: Returns current world X position.

Syntax:
```
vehicle.x
```

Example (compiler-checked):
```
print(vehicle.x);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT, AMR.

Related: vehicle.x_mm

### vehicle.y [OHT, AMR]

Purpose: Returns current world Y position.

Syntax:
```
vehicle.y
```

Example (compiler-checked):
```
print(vehicle.y);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT, AMR.

Related: vehicle.y_mm

### vehicle.heading [OHT, AMR]

Purpose: Returns current heading in radians.

Syntax:
```
vehicle.heading
```

Example (compiler-checked):
```
print(vehicle.heading);
```

Notes: Type: Number (rad) or null. Access: read-only. Modules: OHT, AMR. OHT can return null only when a legacy snapshot has no authoritative heading.

Related: vehicle.heading_rad

### vehicle.rotating_in_place [OHT, AMR]

Purpose: Returns true while the runtime is rotating in place.

Syntax:
```
vehicle.rotating_in_place
```

Example (compiler-checked):
```
print(vehicle.rotating_in_place);
```

Notes: Type: Bool. Access: read-only. Modules: OHT, AMR.

### vehicle.current_path [OHT]

Purpose: Returns the directed Rail Path ID currently occupied by the OHT.

Syntax:
```
vehicle.current_path
```

Example (compiler-checked):
```
print(vehicle.current_path);
```

Notes: Type: Number or null. Access: read-only. Modules: OHT. AMR free-floor motion has no equivalent Rail Path ID.

Related: vehicle.path

### vehicle.has_assigned_job [OHT]

Purpose: Returns whether the physical OHT owns a real transport Job.

Syntax:
```
vehicle.has_assigned_job
```

Example (compiler-checked):
```
print(vehicle.has_assigned_job);
```

Notes: Type: Bool. Access: read-only. Modules: OHT. This is physical Job ownership, not merely a script custom attribute.

### vehicle.service_remaining_seconds [OHT]

Purpose: Returns remaining Pickup/Setdown service time.

Syntax:
```
vehicle.service_remaining_seconds
```

Example (compiler-checked):
```
print(vehicle.service_remaining_seconds);
```

Notes: Type: Number (s). Access: read-only. Modules: OHT. Returns zero outside Pickup/Setdown.

### vehicle.service_duration_seconds [OHT]

Purpose: Returns configured duration of the active Pickup/Setdown service phase.

Syntax:
```
vehicle.service_duration_seconds
```

Example (compiler-checked):
```
print(vehicle.service_duration_seconds);
```

Notes: Type: Number (s). Access: read-only. Modules: OHT. Returns zero outside Pickup/Setdown.

### vehicle.angular_speed [AMR]

Purpose: Returns current AMR angular speed.

Syntax:
```
vehicle.angular_speed
```

Example (compiler-checked):
```
print(vehicle.angular_speed);
```

Notes: Type: Number (rad/s). Access: read-only. Modules: AMR.

Related: vehicle.angular_speed_rad_s

### vehicle.z [AMR]

Purpose: Returns current AMR 2.5D elevation.

Syntax:
```
vehicle.z
```

Example (compiler-checked):
```
print(vehicle.z);
```

Notes: Type: Number (mm). Access: read-only. Modules: AMR.

Related: vehicle.z_mm

### vehicle.traffic_state [AMR]

Purpose: Returns AMR traffic state text (Cruise/Slow/Stop).

Syntax:
```
vehicle.traffic_state
```

Example (compiler-checked):
```
print(vehicle.traffic_state);
```

Notes: Type: String. Access: read-only. Modules: AMR.

Related: vehicle.traffic

### vehicle.schedjobs [OHT]

Purpose: Returns the alive ScheduleJobs associated with the OHT Vehicle.

Syntax:
```
vehicle.schedjobs
```

Example (compiler-checked):
```
print(vehicle.schedjobs.size);
```

Notes: Type: List<ScheduleJob>. Access: read-only. Modules: OHT. AMR automatic dispatch does not expose this OHT ScheduleJob list.

Related: vehicle.schedulejobs

### vehicle.current_schedjob [OHT]

Purpose: Gets or selects the current OHT ScheduleJob.

Syntax:
```
vehicle.current_schedjob
```

Example (compiler-checked):
```
set(vehicle.current_schedjob, job);
```

Notes: Type: ScheduleJob or null. Access: read/write. Modules: OHT. Only a live job owned by the same Vehicle can be selected.

Related: vehicle.currentschedjob

### vehicle.battery [AMR]

Purpose: Returns AMR battery percentage.

Syntax:
```
vehicle.battery
```

Example (compiler-checked):
```
print(vehicle.battery);
```

Notes: Type: Number. Access: read-only. Modules: AMR.

Related: vehicle.batterypercent

### vehicle.blocked_by [OHT, AMR]

Purpose: Returns the directly recorded leader/blocker Vehicle, or null when not currently blocked.

Syntax:
```
vehicle.blocked_by
```

Example (compiler-checked):
```
print(vehicle.blocked_by);
```

Notes: Type: Vehicle or null. Access: read-only. Modules: OHT, AMR. Only the Core-recorded direct blocker is returned. Dependency chains and root cause are not inferred.

### vehicle.blocked_since_seconds [OHT, AMR]

Purpose: Returns the simulation time this Vehicle began waiting on its current blocked_by, or null when not blocked.

Syntax:
```
vehicle.blocked_since_seconds
```

Example (compiler-checked):
```
print(vehicle.blocked_since_seconds);
```

Notes: Type: Number (s) or null. Access: read-only. Modules: OHT, AMR.

### vehicle.blocked_elapsed_seconds [OHT, AMR]

Purpose: Returns current simulation time minus blocked_since_seconds, or null when not blocked.

Syntax:
```
vehicle.blocked_elapsed_seconds
```

Example (compiler-checked):
```
print(vehicle.blocked_elapsed_seconds);
```

Notes: Type: Number (s) or null. Access: read-only. Modules: OHT, AMR. Computed on read from the existing blocked_since timestamp; no extra polling state is created.

### vehicle.waiting_for_station [AMR]

Purpose: Returns true while the AMR finished loading/unloading but is waiting for its destination Station slot to free.

Syntax:
```
vehicle.waiting_for_station
```

Example (compiler-checked):
```
print(vehicle.waiting_for_station);
```

Notes: Type: Bool. Access: read-only. Modules: AMR. Event-driven: re-evaluated only when the Station frees, not polled.

#### Load Attributes

### load.id [OHT]

Purpose: Returns the script Load ID.

Syntax:
```
load.id
```

Example (compiler-checked):
```
print(load.id);
```

Notes: Type: Number. Access: read-only. Modules: OHT.

### load.name [OHT]

Purpose: Returns the script Load name.

Syntax:
```
load.name
```

Example (compiler-checked):
```
print(load.name);
```

Notes: Type: String. Access: read-only. Modules: OHT.

### load.vehicle [OHT]

Purpose: Returns the claimed/onboard Vehicle handle.

Syntax:
```
load.vehicle
```

Example (compiler-checked):
```
print(load.vehicle);
```

Notes: Type: Vehicle or null. Access: read-only. Modules: OHT.

### load.location [OHT]

Purpose: Returns or supplies the off-Vehicle source/location Station.

Syntax:
```
load.location
```

Example (compiler-checked):
```
print(load.location);
```

Notes: Type: Number or null. Access: read/write. Modules: OHT. Writes participate in pending scripted transport endpoint binding.

Related: load.from / load.source aliases are accepted by transport binding

### load.destination [OHT]

Purpose: Returns or supplies the active delivery destination Station.

Syntax:
```
load.destination
```

Example (compiler-checked):
```
print(load.destination);
```

Notes: Type: Number or null. Access: read/write. Modules: OHT. Writes participate in pending scripted transport endpoint binding.

Related: load.to / load.target aliases are accepted by transport binding

### load.onboard [OHT]

Purpose: Returns true while the Load is physically onboard its carrier.

Syntax:
```
load.onboard
```

Example (compiler-checked):
```
print(load.onboard);
```

Notes: Type: Bool. Access: read-only. Modules: OHT.

### load.alive [OHT]

Purpose: Returns whether the script Load is live.

Syntax:
```
load.alive
```

Example (compiler-checked):
```
print(load.alive);
```

Notes: Type: Bool. Access: read-only. Modules: OHT.

### load.state [OHT]

Purpose: Returns created, claimed, onboard, or stored.

Syntax:
```
load.state
```

Example (compiler-checked):
```
print(load.state);
```

Notes: Type: String. Access: read-only. Modules: OHT. Derived from current script material ownership/location.

#### Buffer Cell Attributes

### buffer.id [OHT]

Purpose: Canonical Cell ID BUFFER_<instance>_R<row>_C<column>.

Syntax:
```
buffer.id
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").id);
```

Notes: Type: String. Access: read-only. Modules: OHT.

### buffer.name [OHT]

Purpose: Alias of the canonical Cell ID.

Syntax:
```
buffer.name
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").name);
```

Notes: Type: String. Access: read-only. Modules: OHT.

### buffer.type [OHT]

Purpose: Returns side_buffer_cell.

Syntax:
```
buffer.type
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").type);
```

Notes: Type: String. Access: read-only. Modules: OHT.

### buffer.enabled [OHT]

Purpose: True for an authored Cell registered into the active model session.

Syntax:
```
buffer.enabled
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").enabled);
```

Notes: Type: Bool. Access: read-only. Modules: OHT.

### buffer.group_id [OHT]

Purpose: Canonical Buffer group ID BUFFER_<EquipmentInstanceId>.

Syntax:
```
buffer.group_id
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").group_id);
```

Notes: Type: String. Access: read-only. Modules: OHT.

Related: buffer.group

### buffer.instance_id [OHT]

Purpose: Workspace Equipment instance ID that owns this Cell.

Syntax:
```
buffer.instance_id
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").instance_id);
```

Notes: Type: Number. Access: read-only. Modules: OHT.

### buffer.row [OHT]

Purpose: 1-based row index.

Syntax:
```
buffer.row
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").row);
```

Notes: Type: Number. Access: read-only. Modules: OHT.

### buffer.column [OHT]

Purpose: 1-based column index.

Syntax:
```
buffer.column
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").column);
```

Notes: Type: Number. Access: read-only. Modules: OHT.

### buffer.capacity [OHT]

Purpose: One FOUP per Cell.

Syntax:
```
buffer.capacity
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").capacity);
```

Notes: Type: Number. Access: read-only. Modules: OHT.

### buffer.occupied [OHT]

Purpose: True only after the physical Setdown dwell completes.

Syntax:
```
buffer.occupied
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").occupied);
```

Notes: Type: Bool. Access: read-only. Modules: OHT. A reservation alone is not occupancy.

### buffer.reserved [OHT]

Purpose: True while a store or retrieve transport owns this Cell.

Syntax:
```
buffer.reserved
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").reserved);
```

Notes: Type: Bool. Access: read-only. Modules: OHT.

### buffer.available [OHT]

Purpose: True only when not occupied and not reserved.

Syntax:
```
buffer.available
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").available);
```

Notes: Type: Bool. Access: read-only. Modules: OHT.

### buffer.load [OHT]

Purpose: Stored or reserved Load Entity.

Syntax:
```
buffer.load
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").load);
```

Notes: Type: Load or null. Access: read-only. Modules: OHT.

### buffer.load_id [OHT]

Purpose: Script Load ID for the stored/reserved Load.

Syntax:
```
buffer.load_id
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").load_id);
```

Notes: Type: Number or null. Access: read-only. Modules: OHT.

### buffer.logical_load_id [OHT]

Purpose: Cross-module logical Load ID when one exists.

Syntax:
```
buffer.logical_load_id
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").logical_load_id);
```

Notes: Type: Number or null. Access: read-only. Modules: OHT.

### buffer.station [OHT]

Purpose: Rail Station used as the Cell transfer point for the current stored/reserved Load.

Syntax:
```
buffer.station
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").station);
```

Notes: Type: Number or null. Access: read-only. Modules: OHT.

### buffer.state [OHT]

Purpose: empty, reserved_store, occupied, or reserved_retrieve.

Syntax:
```
buffer.state
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").state);
```

Notes: Type: String. Access: read-only. Modules: OHT.

### buffer.x [OHT]

Purpose: Authored world X of the Cell transfer/support point.

Syntax:
```
buffer.x
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").x);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT.

### buffer.y [OHT]

Purpose: Authored world Y of the Cell transfer/support point.

Syntax:
```
buffer.y
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").y);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT.

### buffer.z [OHT]

Purpose: Authored world Z of the Cell transfer/support point.

Syntax:
```
buffer.z
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").z);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT.

### buffer.width [OHT]

Purpose: Clear internal Cell width.

Syntax:
```
buffer.width
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").width);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT.

### buffer.depth [OHT]

Purpose: Clear internal Cell depth.

Syntax:
```
buffer.depth
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").depth);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT.

### buffer.height [OHT]

Purpose: Clear internal Cell height.

Syntax:
```
buffer.height
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").height);
```

Notes: Type: Number (mm). Access: read-only. Modules: OHT.

### buffer.occupied_since_seconds [OHT]

Purpose: Elapsed simulated time since the latest completed store.

Syntax:
```
buffer.occupied_since_seconds
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").occupied_since_seconds);
```

Notes: Type: Number (s) or null. Access: read-only. Modules: OHT. Computed on read; no polling timer.

### buffer.updated_us [OHT]

Purpose: Simulation timestamp of the latest reservation/occupancy transition.

Syntax:
```
buffer.updated_us
```

Example (compiler-checked):
```
print(buffer_cell("BUFFER_12_R1_C1").updated_us);
```

Notes: Type: Number. Access: read-only. Modules: OHT.

#### ScheduleJob Attributes

### job.id [OHT]

Purpose: Returns the stable ScheduleJob ID.

Syntax:
```
job.id
```

Example (compiler-checked):
```
print(job.id);
```

Notes: Type: Number. Access: read-only. Modules: OHT.

### job.type [OHT]

Purpose: Returns current move/retrieve/deliver job type.

Syntax:
```
job.type
```

Example (compiler-checked):
```
print(job.type);
```

Notes: Type: String. Access: read-only. Modules: OHT.

### job.vehicle [OHT]

Purpose: Returns the owning Vehicle.

Syntax:
```
job.vehicle
```

Example (compiler-checked):
```
print(job.vehicle);
```

Notes: Type: Vehicle or null. Access: read-only. Modules: OHT.

### job.load [OHT]

Purpose: Returns the associated Load for material jobs.

Syntax:
```
job.load
```

Example (compiler-checked):
```
print(job.load);
```

Notes: Type: Load or null. Access: read-only. Modules: OHT.

### job.location [OHT]

Purpose: Returns or changes the target Station of an uncommitted job.

Syntax:
```
job.location
```

Example (compiler-checked):
```
print(job.location);
```

Notes: Type: Number or null. Access: read/write before commit. Modules: OHT. Committed physical jobs reject location rewrites.

### job.released_us [OHT]

Purpose: Returns the script release time in microseconds.

Syntax:
```
job.released_us
```

Example (compiler-checked):
```
print(job.released_us);
```

Notes: Type: Number. Access: read-only. Modules: OHT.

### job.alive [OHT]

Purpose: Returns whether the ScheduleJob is live.

Syntax:
```
job.alive
```

Example (compiler-checked):
```
print(job.alive);
```

Notes: Type: Bool. Access: read-only. Modules: OHT.

### job.current [OHT]

Purpose: Returns whether the ScheduleJob is selected as current work.

Syntax:
```
job.current
```

Example (compiler-checked):
```
print(job.current);
```

Notes: Type: Bool. Access: read-only. Modules: OHT.

#### Collection Attributes

### queue.size [OHT, AMR]

Purpose: Returns the current number of Queue items.

Syntax:
```
queue.size
```

Example (compiler-checked):
```
print(queue.size);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR.

Related: queue.current

### queue.head [OHT, AMR]

Purpose: Returns the first item in the Queue, or null when empty.

Syntax:
```
queue.head
```

Example (compiler-checked):
```
print(queue.head);
```

Notes: Type: EntityRef or null. Access: read-only. Modules: OHT, AMR.

### queue.tail [OHT, AMR]

Purpose: Returns the last item in the Queue, or null when empty.

Syntax:
```
queue.tail
```

Example (compiler-checked):
```
print(queue.tail);
```

Notes: Type: EntityRef or null. Access: read-only. Modules: OHT, AMR.

### resource.capacity [OHT, AMR]

Purpose: Returns the configured Resource capacity.

Syntax:
```
resource.capacity
```

Example (compiler-checked):
```
print(resource.capacity);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR.

### resource.in_use [OHT, AMR]

Purpose: Returns the current number of acquired Resource units.

Syntax:
```
resource.in_use
```

Example (compiler-checked):
```
print(resource.in_use);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR.

### resource.available [OHT, AMR]

Purpose: Returns capacity minus in_use.

Syntax:
```
resource.available
```

Example (compiler-checked):
```
print(resource.available);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR. See resource.holder_count/waiter_count/holders/waiters/oldest_hold_seconds/oldest_wait_seconds for ownership. free() releases a unit held by the same process, else by the same actor (cross-event Load flow); any other free or a double free is rejected with [SIM_SCRIPT_RESOURCE_RELEASE_REJECT].

Related: resource.remaining_space

### resource.state [OHT, AMR]

Purpose: Returns "full" when in_use >= capacity, otherwise "available".

Syntax:
```
resource.state
```

Example (compiler-checked):
```
print(resource.state);
```

Notes: Type: String. Access: read-only. Modules: OHT, AMR.

### resource.holder_count [OHT]

Purpose: Returns the number of acquired Resource units tracked by the script runtime.

Syntax:
```
resource.holder_count
```

Example (compiler-checked):
```
print(resource.holder_count);
```

Notes: Type: Number. Access: read-only. Modules: OHT. Ownership is process-scoped; physical Equipment ownership is not implied.

### resource.waiter_count [OHT]

Purpose: Returns the number of processes waiting for Resource capacity.

Syntax:
```
resource.waiter_count
```

Example (compiler-checked):
```
print(resource.waiter_count);
```

Notes: Type: Number. Access: read-only. Modules: OHT. Waiters are registered only after a failed acquire and wake through the existing targeted Resource channel.

### resource.holders [OHT]

Purpose: Returns actors associated with current Resource claims.

Syntax:
```
resource.holders
```

Example (compiler-checked):
```
print(resource.holders.size);
```

Notes: Type: List<EntityRef>. Access: read-only. Modules: OHT. Processes without an Entity actor still count in holder_count but are omitted from this EntityRef list.

### resource.waiters [OHT]

Purpose: Returns actors associated with current Resource waits.

Syntax:
```
resource.waiters
```

Example (compiler-checked):
```
print(resource.waiters.size);
```

Notes: Type: List<EntityRef>. Access: read-only. Modules: OHT. Processes without an Entity actor still count in waiter_count but are omitted from this EntityRef list.

### resource.oldest_hold_seconds [OHT]

Purpose: Returns elapsed simulation time since the oldest current Resource acquisition.

Syntax:
```
resource.oldest_hold_seconds
```

Example (compiler-checked):
```
print(resource.oldest_hold_seconds);
```

Notes: Type: Number (s) or null. Access: read-only. Modules: OHT.

### resource.oldest_wait_seconds [OHT]

Purpose: Returns elapsed simulation time since the oldest current Resource wait began.

Syntax:
```
resource.oldest_wait_seconds
```

Example (compiler-checked):
```
print(resource.oldest_wait_seconds);
```

Notes: Type: Number (s) or null. Access: read-only. Modules: OHT.

### orderlist.size [OHT, AMR]

Purpose: Returns the current number of pending OrderList entries.

Syntax:
```
orderlist.size
```

Example (compiler-checked):
```
print(orderlist.size);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR.

Related: orderlist.current, orderlist.pending_count

### table.size [OHT, AMR]

Purpose: Returns the current number of Table cells.

Syntax:
```
table.size
```

Example (compiler-checked):
```
print(table.size);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR.

### objectList.size [OHT, AMR]

Purpose: Returns the current number of ObjectList items.

Syntax:
```
objectList.size
```

Example (compiler-checked):
```
print(objectList.size);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR.

### list.size [OHT, AMR]

Purpose: Returns the number of values in a runtime List.

Syntax:
```
list.size
```

Example (compiler-checked):
```
print(vehicle.schedjobs.size);
```

Notes: Type: Number. Access: read-only. Modules: OHT, AMR.

#### String Attributes

### text.substring [OHT, AMR]

Purpose: Returns a substring using zero-based start and length.

Syntax:
```
text.substring(start, length)
```

Example (compiler-checked):
```
print(name.substring(0, 4));
```

Notes: Type: String. Access: read-only. Modules: OHT, AMR.

## Runtime Function Index

#### Math

### Abs(value)

Purpose: Absolute value.

Syntax:
```
call Abs(value)
```

### Fabs(value)

Purpose: Floating-point absolute value.

Syntax:
```
call Fabs(value)
```

### Sqrt(value)

Purpose: Square root.

Syntax:
```
call Sqrt(value)
```

### Pow(base, exponent)

Purpose: Power function.

Syntax:
```
call Pow(base, exponent)
```

### Exp(value)

Purpose: Natural exponential.

Syntax:
```
call Exp(value)
```

### Log(value)

Purpose: Natural logarithm.

Syntax:
```
call Log(value)
```

### Log10(value)

Purpose: Base-10 logarithm.

Syntax:
```
call Log10(value)
```

### Sin(value)

Purpose: Sine.

Syntax:
```
call Sin(value)
```

### Cos(value)

Purpose: Cosine.

Syntax:
```
call Cos(value)
```

### Tan(value)

Purpose: Tangent.

Syntax:
```
call Tan(value)
```

#### Collections

### Array_Inc(list_name, index [, index ...], amount)

Purpose: Compatibility helper for incrementing a numeric indexed List element.

Syntax:
```
call Array_Inc(list_name, index [, index ...], amount)
```

Notes: Preferred GRS syntax is 'inc ListName(1) by amount'. Unwritten numeric cells begin at 0 after the List type is established.

### Array_Dec(list_name, index [, index ...], amount)

Purpose: Compatibility helper for decrementing a numeric indexed List element.

Syntax:
```
call Array_Dec(list_name, index [, index ...], amount)
```

Notes: Preferred GRS syntax is 'dec ListName(1) by amount'.

### List_Get(list, index)

Purpose: Reads a List value by index.

Syntax:
```
call List_Get(list, index)
```

### List_Insert(list, value)

Purpose: Inserts a value into a runtime List.

Syntax:
```
call List_Insert(list, value)
```

### List_Remove(list, value)

Purpose: Removes a value from a runtime List.

Syntax:
```
call List_Remove(list, value)
```

### List_Size(list)

Purpose: Returns runtime List size.

Syntax:
```
call List_Size(list)
```

### List_Snapshot(list)

Purpose: Returns a snapshot of a runtime List.

Syntax:
```
call List_Snapshot(list)
```

### Table_Clear(table)

Purpose: Clears a runtime table.

Syntax:
```
call Table_Clear(table)
```

### Table_Relative_Average(table, ...)

Purpose: Returns a relative table average.

Syntax:
```
call Table_Relative_Average(table, ...)
```

#### Text / Conversion

### Concat(...)

Purpose: Concatenates values as text.

Syntax:
```
call Concat(...)
```

### Field(text, delimiter, index)

Purpose: Reads a 1-based delimited text field.

Syntax:
```
call Field(text, delimiter, index)
```

### Normalize_Station(station)

Purpose: Normalizes a station identifier for model use.

Syntax:
```
call Normalize_Station(station)
```

### Trailing_Number(text)

Purpose: Reads a trailing numeric suffix.

Syntax:
```
call Trailing_Number(text)
```

### To_Number(value)

Purpose: Converts a value to Number.

Syntax:
```
call To_Number(value)
```

### To_String(value)

Purpose: Converts a value to String.

Syntax:
```
call To_String(value)
```

### Least_Counter_Index(values)

Purpose: Returns the least-used counter index.

Syntax:
```
call Least_Counter_Index(values)
```

### Weighted_Choice(weight1, value1, weight2, value2, ...)

Purpose: Selects one value from weight/value pairs.

Syntax:
```
call Weighted_Choice(weight1, value1, weight2, value2, ...)
```

Notes: Weights are read from even argument positions; negative weights are treated as zero.

#### File I/O

### File_Read_Lines(path)

Purpose: Reads model-root-relative text lines.

Syntax:
```
call File_Read_Lines(path)
```

Notes: Subject to the GRS file I/O policy.

### File_Write_Line(path, text)

Purpose: Writes a model-root-relative text line.

Syntax:
```
call File_Write_Line(path, text)
```

Notes: Subject to the GRS file I/O policy.

### File_Append_Line(path, text)

Purpose: Appends a model-root-relative text line.

Syntax:
```
call File_Append_Line(path, text)
```

Notes: Subject to the GRS file I/O policy.

#### Simulation

### Configure_Motion(...)

Purpose: Configures supported motion options.

Syntax:
```
call Configure_Motion(...)
```

### Disable_Native_Job_Source()

Purpose: Disables native Real/Random workload release for a GRS-owned workload.

Syntax:
```
call Disable_Native_Job_Source()
```

### oht.motion_off()

Purpose: Disables the OHT Pickup/Setdown transfer (Hoist/Slide) motion; travel is unchanged.

Syntax:
```
call oht.motion_off()
```

Notes: Call from model.init. The Core pickup/setdown stop time is kept, so only the transfer motion is skipped.

### Preload_Buffer_Cell(cell)

Purpose: Places a new FOUP into an empty Buffer Cell at the start of the run.

Syntax:
```
call Preload_Buffer_Cell(cell)
```

Notes: Call from model.init, e.g. preload_buffer_cell("BUFFER_2_R1_C1"). The Cell becomes occupied exactly as after a completed store, so `move from buffer` can take it later.

### Buffer_Move_Cell_Wait(source_cell, target_cell [, vehicle])

Purpose: Moves the FOUP in one Buffer Cell into another empty Buffer Cell and waits until it is set down (GRS sentence: `move from buffer A to buffer B`).

Syntax:
```
call Buffer_Move_Cell_Wait(source_cell, target_cell [, vehicle])
```

Notes: The source Cell is freed at Pickup and the target Cell becomes occupied at Setdown. Rejected (logged) when the source is empty/reserved or the target is occupied/reserved/unreachable.

### oht.color_fixed()

Purpose: Turns off the Vehicle-phase color change so the OHT keeps its original model color.

Syntax:
```
call oht.color_fixed()
```

Notes: Call from model.init. Only the display color changes; travel, pickup/setdown time and results are unchanged.

#### ASRS

### stk.motion_off()

Purpose: Disables STK Crane X/Z travel and Fork motion; Crane pickup/deposit hold time also becomes 0.

Syntax:
```
call stk.motion_off()
```

Notes: Call from model.init before the first outbound. Crane job steps complete immediately without separate Crane movement.

#### Simulation

### amr.motion_off()

Purpose: Disables the AMR transfer (load/unload) motion.

Syntax:
```
call amr.motion_off()
```

Notes: The AMR currently has no transfer motion, so this only records the setting for the Core engine.

### Every_Event(event_name, interval_seconds)

Purpose: Schedules a recurring event.

Syntax:
```
call Every_Event(event_name, interval_seconds)
```

Notes: Easy syntax 'every ... call ...' lowers to this callable.

### Spawn_Event(event_name, ...)

Purpose: Starts a user event execution.

Syntax:
```
call Spawn_Event(event_name, ...)
```

### Schedule_In(event_name, relative_seconds [, actor])

Purpose: Starts a user event relative_seconds from now.

Syntax:
```
call Schedule_In(event_name, relative_seconds [, actor])
```

Notes: Argument capture beyond the target actor is Not Implemented (same limit as spawn_event/clone_to_event).

### Schedule_At(event_name, absolute_simulation_seconds [, actor])

Purpose: Starts a user event at an absolute simulation time.

Syntax:
```
call Schedule_At(event_name, absolute_simulation_seconds [, actor])
```

### Clone_To_Event(event_name, ...)

Purpose: Clones the current execution actor into another event.

Syntax:
```
call Clone_To_Event(event_name, ...)
```

### Terminate_Load(load)

Purpose: Terminates a scripted Load.

Syntax:
```
call Terminate_Load(load)
```

### Vehicle_Dwell(seconds)

Purpose: Applies a Vehicle dwell.

Syntax:
```
call Vehicle_Dwell(seconds)
```

### Vehicle_Resume_Hold(vehicle)

Purpose: Places a Vehicle resume hold.

Syntax:
```
call Vehicle_Resume_Hold(vehicle)
```

### Vehicle_Resume_Release(vehicle)

Purpose: Releases a Vehicle resume hold.

Syntax:
```
call Vehicle_Resume_Release(vehicle)
```

### Set_Vehicle_Color(vehicle, color)

Purpose: Sets the scripted Vehicle presentation color.

Syntax:
```
call Set_Vehicle_Color(vehicle, color)
```

### Declare_Attribute_Type(name, type)

Purpose: Declares the expected type (Bool/Integer/Number/String/Time/Distance/EntityRef) for a custom Attribute name.

Syntax:
```
call Declare_Attribute_Type(name, type)
```

Notes: Once declared, set()/configure() writes of a mismatched Value kind are rejected (returns false) instead of silently coercing to 0/"". Integer/Number/Time/Distance all gate on the same underlying Number kind -- GRS Value has no narrower numeric type, so the distinction is documentation/unit intent. Does not retroactively validate values already written.

### Attribute_Declared_Type(name)

Purpose: Returns the declared type name for a custom Attribute, or null if undeclared.

Syntax:
```
call Attribute_Declared_Type(name)
```

#### Conveyor

### Conveyor_Running()

Purpose: Returns true while the current Conveyor module is started.

Syntax:
```
call Conveyor_Running()
```

### Conveyor_Speed()

Purpose: Returns the belt speed in mm/s.

Syntax:
```
call Conveyor_Speed()
```

### Conveyor_Length()

Purpose: Returns the total route length in mm.

Syntax:
```
call Conveyor_Length()
```

### Conveyor_Load_Count()

Purpose: Returns the current number of Loads on the Conveyor.

Syntax:
```
call Conveyor_Load_Count()
```

### Conveyor_Blocked()

Purpose: Returns true while any Load on the Conveyor is currently blocked.

Syntax:
```
call Conveyor_Blocked()
```

### Conveyor_Entry_Ready()

Purpose: Returns true while the Conveyor entry can currently accept a new Load.

Syntax:
```
call Conveyor_Entry_Ready()
```

Notes: This is the same gate canAcceptLoad() already enforces before admission.

### Conveyor_Entry()

Purpose: Returns the configured entry Station name.

Syntax:
```
call Conveyor_Entry()
```

### Conveyor_Exit()

Purpose: Returns the configured exit Station name.

Syntax:
```
call Conveyor_Exit()
```

#### Simulation

### Sim_Time()

Purpose: Returns current simulation time.

Syntax:
```
call Sim_Time()
```

#### Transport / Routing

### Request_Transport(from_station, to_station, ...)

Purpose: Requests a transport job.

Syntax:
```
call Request_Transport(from_station, to_station, ...)
```

#### OHT Buffer

### Buffer_Cell(cell_id)

Purpose: Returns one authored Buffer Cell Entity by ID.

Syntax:
```
call Buffer_Cell(cell_id)
```

Notes: Example: buffer_cell("BUFFER_12_R1_C1").occupied.

### Buffer_Cells(group_id)

Purpose: Returns Buffer Cell Entities in row-major order for a Buffer group.

Syntax:
```
call Buffer_Cells(group_id)
```

Notes: Group IDs are BUFFER_<EquipmentInstanceId>.

#### Transport / Routing

### Call_Transport(target_module, load_id, from_station, to_station)

Purpose: Hands the same logical Load to another declared module.

Syntax:
```
call Call_Transport(target_module, load_id, from_station, to_station)
```

### Reassign_Retrieve(...)

Purpose: Reassigns scripted retrieve work.

Syntax:
```
call Reassign_Retrieve(...)
```

### Path_Distance(from, to)

Purpose: Returns path distance.

Syntax:
```
call Path_Distance(from, to)
```

### Station_Distance(from, to)

Purpose: Returns station-to-station distance.

Syntax:
```
call Station_Distance(from, to)
```

### Station_Vehicle_List(station)

Purpose: Returns Vehicles associated with a station.

Syntax:
```
call Station_Vehicle_List(station)
```

### Path_Zone(path_id)

Purpose: Returns a Path logical zone.

Syntax:
```
call Path_Zone(path_id)
```

### Set_Path_Zone(path_id, zone)

Purpose: Sets a Path logical zone.

Syntax:
```
call Set_Path_Zone(path_id, zone)
```

### Vehicle_Zone(vehicle)

Purpose: Returns a Vehicle logical zone.

Syntax:
```
call Vehicle_Zone(vehicle)
```

### Set_Vehicle_Zone(vehicle, zone)

Purpose: Sets a Vehicle logical zone.

Syntax:
```
call Set_Vehicle_Zone(vehicle, zone)
```

### Vehicle_Path_Zone(vehicle)

Purpose: Returns the Vehicle's current Path zone.

Syntax:
```
call Vehicle_Path_Zone(vehicle)
```

### Current_Path_Zone(vehicle)

Purpose: Alias for the Vehicle's current Path zone.

Syntax:
```
call Current_Path_Zone(vehicle)
```

### Path_Type_Name(path_id)

Purpose: Returns a Path's rail type name (Workspace Type Name).

Syntax:
```
call Path_Type_Name(path_id)
```

### Path_Type(path_id)

Purpose: Returns a Path's rail vehicle type: OHT or AGV.

Syntax:
```
call Path_Type(path_id)
```

### Vehicle_Type_Name(vehicle)

Purpose: Returns the type name the Vehicle was spawned with (empty if none).

Syntax:
```
call Vehicle_Type_Name(vehicle)
```

### Vehicle_Path_Type_Name(vehicle)

Purpose: Returns the rail type name of the Vehicle's current Path.

Syntax:
```
call Vehicle_Path_Type_Name(vehicle)
```

### Current_Path_Type_Name(vehicle)

Purpose: Alias for the Vehicle's current Path type name.

Syntax:
```
call Current_Path_Type_Name(vehicle)
```

#### Resources

### Resource_Capacity(resource)

Purpose: Returns resource capacity.

Syntax:
```
call Resource_Capacity(resource)
```

### Resource_In_Use(resource)

Purpose: Returns current resource usage.

Syntax:
```
call Resource_In_Use(resource)
```

### Resource_Name(resource)

Purpose: Returns resource name.

Syntax:
```
call Resource_Name(resource)
```

#### Layout

### Station_Name(station)

Purpose: Returns the Station Control Point name for a Station index.

Syntax:
```
call Station_Name(station)
```

Notes: Returns "" for an out-of-range index.

### Station_Occupancy_Count(station)

Purpose: Returns the current reservation count for a Station.

Syntax:
```
call Station_Occupancy_Count(station)
```

Notes: Projects the existing reservation counter as-is; there is no separate multi-vehicle capacity model to report, so capacity/remaining_space are Not Implemented rather than fabricated.

### Station_Reserved(station)

Purpose: Returns true while any Vehicle currently reserves the Station.

Syntax:
```
call Station_Reserved(station)
```

Notes: This is the same boolean reservation gate dispatch already enforces (stationReserved()).

#### Core

### Use(resource_name)

Purpose: Acquires one unit of a Resource (alias of get/reserve).

Syntax:
```
call Use(resource_name)
```

### Get(resource_name)

Purpose: Acquires one unit of a Resource (alias of use/reserve).

Syntax:
```
call Get(resource_name)
```

### Reserve(resource_name)

Purpose: Acquires one unit of a Resource (alias of use/get).

Syntax:
```
call Reserve(resource_name)
```

#### Compiler Helpers

### Easy_Assign_Vehicle(vehicle)

Purpose: Assigns the easy-syntax Load to a Vehicle.

Syntax:
```
call Easy_Assign_Vehicle(vehicle)
```

Notes: Normally generated by easy syntax.

### Easy_Create_Load(type)

Purpose: Creates the easy-syntax Load.

Syntax:
```
call Easy_Create_Load(type)
```

Notes: Normally generated by easy syntax.

### Easy_Transport_Retrieve(station, ...)

Purpose: Runs easy-syntax retrieve transport.

Syntax:
```
call Easy_Transport_Retrieve(station, ...)
```

Notes: Normally generated by easy syntax.

### Easy_Transport_Deliver_Wait(station)

Purpose: Runs easy-syntax deliver-and-wait transport.

Syntax:
```
call Easy_Transport_Deliver_Wait(station)
```

Notes: Normally generated by easy syntax.

### Buffer_Move_To_Wait(station, buffer)

Purpose: Stores the current retrieve draft into a Buffer Cell after physical Setdown completes.

Syntax:
```
call Buffer_Move_To_Wait(station, buffer)
```

Notes: Generated by: move to <Station> buffer <BUFFER_ID>.

### Buffer_Move_From_Wait(buffer, station [, vehicle])

Purpose: Retrieves the stored Load from a Buffer Cell and waits for delivery completion.

Syntax:
```
call Buffer_Move_From_Wait(buffer, station [, vehicle])
```

Notes: Generated by: move from buffer <BUFFER_ID> to <Station> [using vehicle OHT_02].

#### Humanoid

### Humanoid_Create(name, place | name, x_m, y_m)

Purpose: Creates a Humanoid at a Station/defined place or x/y (m).

Syntax:
```
call Humanoid_Create(name, place | name, x_m, y_m)
```

Notes: Battery starts full.

### Humanoid_Define_Place(name, x_m, y_m [, work_height_mm])

Purpose: Defines a named work place for humanoid_walk_to/pick/place.

Syntax:
```
call Humanoid_Define_Place(name, x_m, y_m [, work_height_mm])
```

Notes: Defined places win over Station names. Default work height is 900 mm.

### Humanoid_Define_Obstacle(name, x1_m, y1_m, x2_m, y2_m [, level_id [, z_min_m [, z_max_m]]])

Purpose: Defines a rectangular obstacle Humanoids walk around (optionally limited to a height range).

Syntax:
```
call Humanoid_Define_Obstacle(name, x1_m, y1_m, x2_m, y2_m [, level_id [, z_min_m [, z_max_m]]])
```

Notes: Levels without obstacles keep straight-line x route_factor. A walk with no route is rejected. Already planned walks are not re-planned. Height range (default floor to ceiling): an obstacle blocks a Humanoid only if z_max > 0.1 m and z_min < its height, so a low curb is stepped over and an overhead beam is walked under. AMR positions at request time are treated as temporary obstacles on the walk.

### Humanoid_Remove_Obstacle(name)

Purpose: Removes an obstacle (true if it existed).

Syntax:
```
call Humanoid_Remove_Obstacle(name)
```

Notes: Affects walks requested afterwards.

### Humanoid_Define_Zone(name, x1_m, y1_m, x2_m, y2_m [, capacity [, level_id]])

Purpose: Defines a corridor/area that at most `capacity` (default 1) Humanoids may be walking through at once.

Syntax:
```
call Humanoid_Define_Zone(name, x1_m, y1_m, x2_m, y2_m [, capacity [, level_id]])
```

Notes: A Humanoid entering from outside waits at the entrance until the zone has room (first-requested first-served). Only walking time inside the zone is counted; standing Humanoids and other vehicle types do not occupy it. Zones on one level must not overlap.

### Humanoid_Route_Distance(robot, place)

Purpose: Planned walking distance in m (obstacle detour x route_factor) without moving; -1 if unknown or unroutable.

Syntax:
```
call Humanoid_Route_Distance(robot, place)
```

### Humanoid_Zone_Wait(robot)

Purpose: Total seconds the Humanoid has waited at zone entrances.

Syntax:
```
call Humanoid_Zone_Wait(robot)
```

### Humanoid_Set(robot, parameter, value)

Purpose: Overrides one spec value for one Humanoid.

Syntax:
```
call Humanoid_Set(robot, parameter, value)
```

Notes: walk_speed/carry_speed/cart_speed/accel/decel are m/s(^2); turn_speed deg/s; payload_one_arm/payload_two_arm/item_mass kg; *_seconds, robot_time_factor, route_factor, battery_capacity_wh, battery_percent, *_power_w, low_battery_percent, mass_kg.

### Humanoid_Spec([robot,] parameter)

Purpose: Returns a spec/body value (height_mm, shoulder_height_mm, max_reach_height_mm, forward_reach_mm, walk_speed, ...).

Syntax:
```
call Humanoid_Spec([robot,] parameter)
```

### Humanoid_Walk_To(robot, place)

Purpose: Turns and walks to a Station/defined place. Returns seconds.

Syntax:
```
call Humanoid_Walk_To(robot, place)
```

Notes: Straight-line distance x route_factor with trapezoidal speed; carry/cart speeds apply automatically. Fires humanoid.arrived.

### Humanoid_Walk(robot, meters)

Purpose: Walks straight ahead. Returns seconds.

Syntax:
```
call Humanoid_Walk(robot, meters)
```

### Humanoid_Turn(robot, degrees)

Purpose: Turns in place (+ counter-clockwise). Returns seconds.

Syntax:
```
call Humanoid_Turn(robot, degrees)
```

### Humanoid_Stairs(robot, steps)

Purpose: Climbs (+) or descends (-) stair steps. Returns seconds.

Syntax:
```
call Humanoid_Stairs(robot, steps)
```

Notes: Rejected while a cart is attached.

### Humanoid_Pose(robot, pose)

Purpose: Changes posture: stand, carry, reach_high, reach_mid, bend, crouch, kneel, sit. Returns seconds.

Syntax:
```
call Humanoid_Pose(robot, pose)
```

Notes: Joint-space synchronized move; the slowest joint (trapezoidal profile) sets the time.

### Humanoid_Pick(robot, item [, height_mm [, mass_kg]])

Purpose: Aligns, takes the posture for the height, reaches, grasps and lifts an item. Returns seconds.

Syntax:
```
call Humanoid_Pick(robot, item [, height_mm [, mass_kg]])
```

Notes: Items above payload_one_arm use both hands. Height outside the reach envelope is rejected. Fires humanoid.pick_complete.

### Humanoid_Place(robot [, item] [, height_mm])

Purpose: Puts down the held item (right hand first). Returns seconds.

Syntax:
```
call Humanoid_Place(robot [, item] [, height_mm])
```

Notes: Fires humanoid.place_complete.

### Humanoid_Transfer(robot, item, from_place, to_place [, from_height_mm, to_height_mm])

Purpose: Walk + pick + walk + place in one call. Returns seconds.

Syntax:
```
call Humanoid_Transfer(robot, item, from_place, to_place [, from_height_mm, to_height_mm])
```

### Humanoid_Handover(giver, receiver [, item])

Purpose: Hands an item to another Humanoid within arm reach. Returns seconds.

Syntax:
```
call Humanoid_Handover(giver, receiver [, item])
```

Notes: Both robots are busy until completion. Fires humanoid.handover_complete.

### Humanoid_Attach_Cart(robot, cart)

Purpose: Grips a cart handle; later walks use cart speed. Returns seconds.

Syntax:
```
call Humanoid_Attach_Cart(robot, cart)
```

### Humanoid_Detach_Cart(robot)

Purpose: Releases the cart. Returns seconds.

Syntax:
```
call Humanoid_Detach_Cart(robot)
```

### Humanoid_Open_Door(robot [, door])

Purpose: Opens a door/cover. Returns seconds.

Syntax:
```
call Humanoid_Open_Door(robot [, door])
```

Notes: Standard time x robot_time_factor.

### Humanoid_Close_Door(robot [, door])

Purpose: Closes a door/cover. Returns seconds.

Syntax:
```
call Humanoid_Close_Door(robot [, door])
```

Notes: Standard time x robot_time_factor.

### Humanoid_Press_Button(robot [, count])

Purpose: Presses a button/switch count times. Returns seconds.

Syntax:
```
call Humanoid_Press_Button(robot [, count])
```

### Humanoid_Turn_Valve(robot, turns)

Purpose: Turns a valve/knob. Returns seconds.

Syntax:
```
call Humanoid_Turn_Valve(robot, turns)
```

### Humanoid_Type(robot, text | character_count)

Purpose: Types on an HMI/keyboard. Returns seconds.

Syntax:
```
call Humanoid_Type(robot, text | character_count)
```

### Humanoid_Scan(robot [, target])

Purpose: Reads a barcode/RFID. Returns seconds.

Syntax:
```
call Humanoid_Scan(robot [, target])
```

### Humanoid_Inspect(robot [, seconds [, target]])

Purpose: Visual inspection. Returns seconds.

Syntax:
```
call Humanoid_Inspect(robot [, seconds [, target]])
```

Notes: Without seconds uses inspect_seconds x robot_time_factor.

### Humanoid_Fasten(robot [, count])

Purpose: Fastens bolts/screws. Returns seconds.

Syntax:
```
call Humanoid_Fasten(robot [, count])
```

### Humanoid_Tool_Change(robot [, tool])

Purpose: Changes a hand tool. Returns seconds.

Syntax:
```
call Humanoid_Tool_Change(robot [, tool])
```

### Humanoid_Work(robot, seconds [, label])

Purpose: Any other job for a fixed time (manual assembly, cleaning, ...). Returns seconds.

Syntax:
```
call Humanoid_Work(robot, seconds [, label])
```

### Humanoid_Wait(robot, seconds)

Purpose: Idles for a fixed time. Returns seconds.

Syntax:
```
call Humanoid_Wait(robot, seconds)
```

### Humanoid_Charge(robot [, target_percent])

Purpose: Charges the battery to target (default 100%). Returns seconds.

Syntax:
```
call Humanoid_Charge(robot [, target_percent])
```

Notes: Fires humanoid.charged.

### Humanoid_Joint(robot, joint_name, degrees)

Purpose: Moves one joint to an absolute angle. Returns seconds.

Syntax:
```
call Humanoid_Joint(robot, joint_name, degrees)
```

### Humanoid_Joints(robot, joint_name, degrees [, joint_name, degrees ...])

Purpose: Moves multiple joints simultaneously. Returns seconds.

Syntax:
```
call Humanoid_Joints(robot, joint_name, degrees [, joint_name, degrees ...])
```

Notes: The slowest joint determines the synchronized duration.

### Humanoid_Location(robot)

Purpose: Returns the current place name or null.

Syntax:
```
call Humanoid_Location(robot)
```

Notes: Committed place (the destination while walking).

### Humanoid_X(robot)

Purpose: Returns x (m).

Syntax:
```
call Humanoid_X(robot)
```

### Humanoid_Y(robot)

Purpose: Returns y (m).

Syntax:
```
call Humanoid_Y(robot)
```

### Humanoid_Z(robot)

Purpose: Returns z (m) at the Humanoid position.

Syntax:
```
call Humanoid_Z(robot)
```

### Humanoid_Level(robot)

Purpose: Returns the Level ID the Humanoid stands on.

Syntax:
```
call Humanoid_Level(robot)
```

### Humanoid_Holding(robot [, hand])

Purpose: Returns the held item (left/right/any) or null.

Syntax:
```
call Humanoid_Holding(robot [, hand])
```

### Humanoid_Free_Hands(robot)

Purpose: Returns the number of free hands (0..2).

Syntax:
```
call Humanoid_Free_Hands(robot)
```

### Humanoid_Battery(robot)

Purpose: Returns battery percent.

Syntax:
```
call Humanoid_Battery(robot)
```

Notes: Fires humanoid.battery_low when crossing low_battery_percent.

### Humanoid_Busy(robot)

Purpose: Returns true until the current action ends.

Syntax:
```
call Humanoid_Busy(robot)
```

### Humanoid_State(robot)

Purpose: Returns the current action name or idle.

Syntax:
```
call Humanoid_State(robot)
```

### Humanoid_Posture(robot)

Purpose: Returns the current posture name.

Syntax:
```
call Humanoid_Posture(robot)
```

### Humanoid_Distance(robot)

Purpose: Returns walked distance (m).

Syntax:
```
call Humanoid_Distance(robot)
```

### Humanoid_Utilization(robot)

Purpose: Returns busy time / elapsed time since creation (0..1).

Syntax:
```
call Humanoid_Utilization(robot)
```

### Humanoid_Actions(robot)

Purpose: Returns completed action count.

Syntax:
```
call Humanoid_Actions(robot)
```

### Humanoid_Last_Error(robot)

Purpose: Returns the last rejection reason or null.

Syntax:
```
call Humanoid_Last_Error(robot)
```

Notes: Rejected actions return 0 seconds and fire humanoid.rejected.

### Humanoid_Self()

Purpose: Inside a humanoid.* event returns the Humanoid name.

Syntax:
```
call Humanoid_Self()
```

### Humanoid_Event_Action()

Purpose: Inside a humanoid.* event returns the action name.

Syntax:
```
call Humanoid_Event_Action()
```

### Humanoid_Count()

Purpose: Returns the number of Humanoids in this module.

Syntax:
```
call Humanoid_Count()
```

### Humanoid_Joint_Deg(robot, joint_name)

Purpose: Returns the committed target angle of one Humanoid joint.

Syntax:
```
call Humanoid_Joint_Deg(robot, joint_name)
```

## Native OHT / ASRS Functions

### OHT_System_Initialize()

Purpose: Initializes the native OHT model session.

Syntax:
```
call OHT_System_Initialize()
```

Notes: Uses the existing OHT engine.

### ASRS_Stocker_Initialize()

Purpose: Initializes stocker inventory and cycle state.

Syntax:
```
call ASRS_Stocker_Initialize()
```

Notes: Call before shelf seeding and first outbound.

### ASRS_External_Handoff_Mode()

Purpose: Hands outbound FOUPs to downstream modules.

Syntax:
```
call ASRS_External_Handoff_Mode()
```

Notes: Set before the first outbound cycle.

### ASRS_Seed_Shelf_FOUP(foup_id)

Purpose: Seeds one FOUP in initial shelf inventory.

Syntax:
```
call ASRS_Seed_Shelf_FOUP(foup_id)
```

Notes: Requires initialized stocker.

### ASRS_Request_First_Outbound()

Purpose: Starts the first outbound cycle.

Syntax:
```
call ASRS_Request_First_Outbound()
```

Notes: Requires initialized stocker and occupied shelf inventory.

### ASRS_Current_FOUP()

Purpose: Returns the active outbound FOUP ID or null.

Syntax:
```
call ASRS_Current_FOUP()
```

### ASRS_Capacity()

Purpose: Returns the total Shelf slot capacity.

Syntax:
```
call ASRS_Capacity()
```

### ASRS_Occupied_Count()

Purpose: Returns the current number of occupied/reserved-outbound Shelf slots.

Syntax:
```
call ASRS_Occupied_Count()
```

### ASRS_Free_Count()

Purpose: Returns the current number of empty Shelf slots.

Syntax:
```
call ASRS_Free_Count()
```

### ASRS_Slot_Load(slot_index)

Purpose: Returns the FOUP ID stored at a Shelf slot index, or null if empty.

Syntax:
```
call ASRS_Slot_Load(slot_index)
```

### ASRS_Crane_Count()

Purpose: Returns the number of Cranes in the Stocker.

Syntax:
```
call ASRS_Crane_Count()
```

### ASRS_Crane_State(crane_index)

Purpose: Returns the Crane's current handoff state.

Syntax:
```
call ASRS_Crane_State(crane_index)
```

Notes: One of idle/move_to_pickup/picking/move_to_storage/storing/move_to_retrieve/retrieving/move_to_output/unloading.

### ASRS_Add_In_Lane(station, slot_count[, transfer_height_mm])

Purpose: Adds an inbound Port Lane: OHT sets down at the Station, then an N-slot conveyor feeds the Crane.

Syntax:
```
call ASRS_Add_In_Lane(station, slot_count[, transfer_height_mm])
```

Notes: Call after asrs_stocker_initialize and before asrs_request_first_outbound. Masks one Shelf cell as slot 0. Returns the lane index.

### ASRS_Add_Out_Lane(station, slot_count[, transfer_height_mm])

Purpose: Adds an outbound Port Lane: the Crane deposits ahead into an N-slot conveyor and OHT picks up at the Station.

Syntax:
```
call ASRS_Add_Out_Lane(station, slot_count[, transfer_height_mm])
```

Notes: Same call order as asrs_add_in_lane. Returns the lane index.

### ASRS_Add_Bidirectional_Lane(station, slot_count, direction[, transfer_height_mm])

Purpose: Adds a Port Lane whose direction ("in" or "out") can change while it is empty.

Syntax:
```
call ASRS_Add_Bidirectional_Lane(station, slot_count, direction[, transfer_height_mm])
```

Notes: Use asrs_set_lane_direction to switch. Returns the lane index.

### ASRS_Set_Lane_Direction(lane, direction)

Purpose: Switches a bidirectional Port Lane to "in" or "out".

Syntax:
```
call ASRS_Set_Lane_Direction(lane, direction)
```

Notes: Returns false if the lane is not bidirectional or still holds FOUPs.

### ASRS_Set_Lane_Slot_Move_Seconds(lane, seconds)

Purpose: Sets how long the conveyor takes to advance a FOUP by one slot.

Syntax:
```
call ASRS_Set_Lane_Slot_Move_Seconds(lane, seconds)
```

Notes: Call before asrs_request_first_outbound.

### ASRS_Lane_Count()

Purpose: Returns the number of Port Lanes.

Syntax:
```
call ASRS_Lane_Count()
```

### ASRS_Lane_Slot_Load(lane, slot)

Purpose: Returns the FOUP ID physically on a Lane slot, or null if empty or only reserved.

Syntax:
```
call ASRS_Lane_Slot_Load(lane, slot)
```

Notes: slot 0 is the Crane end; the last slot is the OHT end.

### ASRS_Set_Rack(bays, levels, cell_width_mm, cell_height_mm, cell_depth_mm)

Purpose: Sets the Rack size (default 8 x 6, 650 x 500 x 700 mm). Replaces the empty Stocker, so no Lane or seeded FOUP may exist yet.

Syntax:
```
call ASRS_Set_Rack(bays, levels, cell_width_mm, cell_height_mm, cell_depth_mm)
```

Notes: Call right after asrs_stocker_initialize. Example: asrs_set_rack(10, 6, 450, 400, 1000) is the default Place STK.

### ASRS_Add_In_Port(station, bay, level [, depth_mm])

Purpose: Uses one front-column Shelf cell as an In Port (a one-slot Lane): the OHT sets down straight into that cell and the Crane stores from it.

Syntax:
```
call ASRS_Add_In_Port(station, bay, level [, depth_mm])
```

Notes: Call after asrs_set_rack and before asrs_request_first_outbound. The OHT transfer height is the cell's FOUP centre height. Returns the lane index.

### ASRS_Add_Out_Port(station, bay, level [, depth_mm])

Purpose: Uses one front-column Shelf cell as an Out Port (a one-slot Lane): the Crane retrieves into that cell and the OHT picks up from it.

Syntax:
```
call ASRS_Add_Out_Port(station, bay, level [, depth_mm])
```

Notes: Same call order as asrs_add_in_port. Returns the lane index.

### ASRS_Set_Out_Buffer(cell_id)

Purpose: Adds a Side Buffer Cell as a destination for FOUPs leaving an Out Lane; each FOUP reserves the first free candidate and the Cell becomes occupied when the OHT Setdown completes.

Syntax:
```
call ASRS_Set_Out_Buffer(cell_id)
```

Notes: Call after asrs_stocker_initialize and before asrs_request_first_outbound, once per Cell. Lane mode only. A Load set down on an In Lane Station by any other OHT job is accepted by that Lane automatically.

## Reserved, Not Implemented and Removed

#### Reserved / Not Active

### vehicle.work_check / vehicle.park_check

Status: Reserved - not active

Purpose: Names are reserved in the canonical event namespace but are not physically wired yet.

Syntax:
```
begin vehicle.work_check event
    ...
end
begin vehicle.park_check event
    ...
end
```

Related: canonical events

### conveyor.enter

Status: Reserved - not active

Purpose: Reserved for a Load entering an integrated Workspace Conveyor.

Syntax:
```
begin conveyor.enter event
    ...
end
```

Related: Workspace Conveyor, Load, future Conveyor material runtime

### conveyor.transfer

Status: Reserved - not active

Purpose: Reserved for an authoritative Conveyor-to-Conveyor material transfer.

Syntax:
```
begin conveyor.transfer event
    ...
end
```

Notes: No dedicated conveyor.transfer callback is wired. Cross-module logical handoff currently uses conveyor.exit / conveyor.released with call_transport.

Related: Workspace Conveyor, transfer, future Conveyor material runtime

### conveyor.sensor.on

Status: Reserved - not active

Purpose: Reserved for a real Conveyor sensor ON transition.

Syntax:
```
begin conveyor.sensor.on event
    ...
end
```

Notes: Conveyor Job movement does not implement a physical sensor state; this event remains reserved.

Related: Workspace Conveyor, sensor, future Conveyor material runtime

### conveyor.sensor.off

Status: Reserved - not active

Purpose: Reserved for a real Conveyor sensor OFF transition.

Syntax:
```
begin conveyor.sensor.off event
    ...
end
```

Notes: Conveyor Job movement does not implement a physical sensor state; this event remains reserved.

Related: Workspace Conveyor, sensor, future Conveyor material runtime

#### Not Implemented

### catalog-only actions

Status: Not implemented

Purpose: These statement forms are not executable in the current Simulation Studio product. Use the implemented function forms instead.

Syntax:
```
terminate / remove / add / delete
open / read / write / close
schedule / choose (statement form)
```

Example (compiler-checked):
```
choose(list, "min", "released_us");
schedule_in("my.event", 5);
terminate_load(load);
file_read_lines("data.txt");
```

Related: choose, schedule_in, schedule_at, terminate_load, file_read_lines, Action Catalog

#### Removed Syntax

### travel / move_into

Status: Removed syntax

Purpose: Historical subsystem-specific movement verbs are intentionally removed from product GRS.

Syntax:
```
travel(...)  // removed
move_into(...)  // removed
```

Example (compiler-checked):
```
move_to("ST01");
```

Notes: Compiler emits GRS_SURFACE_REMOVED_ACTION and directs users to move_to().

Related: move_to
