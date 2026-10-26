# GigaRoute Script (GRS) Help

Current reference entries: **135**.

## GRS Language

### Time duration

**Purpose:** Time represents an elapsed simulation duration, stored as signed integer microseconds.

**Syntax:**

~~~grs
<number> sec | <number> min | <number> hour
~~~

**Example:**

~~~grs
begin model.init event
    set pickupTime = 10 sec
    set cycleTime = 2 hour + 30 min
    set halfTime = cycleTime / 2
    print cycleTime to log
end
~~~

**Notes:** Time is different from Integer/Real. Time + Time and Time - Time yield Time; Time multiplied or divided by a number yields Time; Time / Time yields a ratio. Comparisons require two Time values. Logs render durations in seconds. Unit aliases sec/secs/second(s), min/mins/minute(s), hr/hrs/hour(s), day(s) are accepted. Plain numbers remain Integer/Real. Ordinary user-authored wait statements remain restricted by the current GRS syntax policy.

**Related:** Variable, set, print to log

## Getting Started

### GRS file

**Purpose:** Simulation Studio Model Logic source file.

**Syntax:**

~~~grs
*.grs
~~~

**Example:**

~~~grs
begin model.init event
    print "ready" to log
end
~~~

**Notes:** GRS uses UTF-8 text. 2026-10-20: GRS was reduced to a minimal surface ahead of a full redesign. Supported: init events, model.snap, the 12 Vehicle events, if / else, while / for each, set / inc / dec, attributes, + - * / %, print ... to log, and all Humanoid events/functions. Anything else is rejected at Compile with GRS_REMOVED_SYNTAX.

**Related:** Init events, Vehicle event syntax, if / else, while, print to log

## Events

### Model snap

**Purpose:** Runs after a completed Model session snapshot boundary. The event observes the model at the exact committed simulation time, without creating a UI render timer.

**Syntax:**

~~~grs
begin model.snap event
    ...
end
~~~

**Example:**

~~~grs
begin model.init event
    set snapCount = 0
end
begin model.snap event
    inc snapCount by 1
    print "model snap", snapCount to log
end
~~~

**Notes:** The first event runs at simulation time 0 after Init. Thereafter one event runs for each successful forward ModelExecutionSession.advanceTo() call, after all physics modules finish. Re-reading the immutable snapshot, pausing, or advancing to the same time does not fire it again. Each module executes its own defined model.snap handler, if present. This is not triggered by Qt paint/repaint and it is not a request to save the project file. 'begin model snap event' is accepted as an alias. Normal GRS restrictions on wait and functions still apply.

**Related:** model.init, Time duration, print to log

## Getting Started

### Init events

**Purpose:** Runs once at simulation time zero to initialize model values.

**Syntax:**

~~~grs
begin model.init event
    ...
end
begin OHT.init event
    ...
end
begin AMR.init event
    ...
end
begin Humanoid.init event
    ...
end
~~~

**Example:**

~~~grs
begin model.init event
    set count = 0
    print "model ready" to log
end
~~~

**Notes:** model.init runs once per model. OHT.init / AMR.init / Humanoid.init are the typed initializers used by Global Init.

**Related:** Global Init, set, print to log

### Global Init / default OHT AMR Humanoid

**Purpose:** Create the default OHT, AMR and Humanoid counts directly from one global initialization event.

**Syntax:**

~~~grs
begin model.init event
    vi_OHT = 10
    vi_Humanoid = 3
    vi_AMR = 3
end
~~~

**Example:**

~~~grs
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
~~~

**Notes:** New global-init script has exactly one model.init with three positive integer vi_* values and these three typed events. At Compile the already-placed drawing supplies one OHT rail Level and one AMR floor Level (each with two distinct Stations); scripted Job Source is used with no synthetic traffic. Existing C++ Core creates vi_OHT/vi_AMR vehicles. Three-dimensional default humanoids are created at a floor Station. The typed init events run once at simulation time zero and print to the Studio message log. Other legacy and previously declared auto-bound scripts retain their existing behavior. All five previous helper initializers are NOT required for this opt-in.

**Related:** model.init, OHT.init, AMR.init, Humanoid.init, print to log

## Events

### Vehicle event syntax

**Purpose:** Public Vehicle event syntax shared by OHT, AGV and AMR: vehicle. followed by the event name with underscores (pickup, setdown, speed_change, resume_to_drive, start_to_move, arrived_at_station, job_finished, job_selection, job_assigned, decelerate_to_destination, passing_station, destination_change). The old space form (begin Vehicle pickup event) was removed.

**Syntax:**

~~~grs
begin vehicle.<event_name> event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.job_assigned event
    print "job assigned" to log
end
~~~

**Notes:** The GRS compiler lowers these event declarations to the engine's existing internal callbacks. Existing project event keys still load for compatibility. The event actor Vehicle is available as this Vehicle. The same header works in OHT, AGV and AMR modules; steer change and for each ... in Vehicle are OHT only.

**Related:** Vehicle, Vehicle, OHT, AGV, AMR, GRS Events

### Vehicle pickup

**Purpose:** Arrives at the physical pickup boundary.

**Syntax:**

~~~grs
begin vehicle.pickup event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.pickup event
    print "Vehicle pickup" to log
end
~~~

**Notes:** The Load is loaded at the existing physical pickup boundary. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle setdown

**Purpose:** Arrives at the physical setdown boundary.

**Syntax:**

~~~grs
begin vehicle.setdown event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.setdown event
    print "Vehicle setdown" to log
end
~~~

**Notes:** The unloading completion occurs after the configured setdown dwell. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle speed change

**Purpose:** Physical Vehicle speed changes.

**Syntax:**

~~~grs
begin vehicle.speed_change event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.speed_change event
    print "Vehicle speed change" to log
end
~~~

**Notes:** Uses existing engine speed transitions, not polling. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle resume to drive

**Purpose:** A stopped Vehicle starts driving again.

**Syntax:**

~~~grs
begin vehicle.resume_to_drive event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.resume_to_drive event
    print "Vehicle resume to drive" to log
end
~~~

**Notes:** Uses a real resume transition. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle start to move

**Purpose:** The Vehicle starts actual travel.

**Syntax:**

~~~grs
begin vehicle.start_to_move event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.start_to_move event
    print "Vehicle start to move" to log
end
~~~

**Notes:** Ignores the internal near-zero wake probe. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle job finished

**Purpose:** A physical ScheduleJob reaches its completed handoff.

**Syntax:**

~~~grs
begin vehicle.job_finished event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.job_finished event
    print "Vehicle job finished" to log
end
~~~

**Notes:** Fires after setdown dwell. OHT: actor is the completed ScheduleJob (this Vehicle is its Vehicle). AMR / AGV: actor is the carrying Vehicle. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle job selection

**Purpose:** A live ScheduleJob becomes selected.

**Syntax:**

~~~grs
begin vehicle.job_selection event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.job_selection event
    print "Vehicle job selection" to log
end
~~~

**Notes:** OHT: actor is the selected ScheduleJob; unchanged selection does not re-fire. AMR / AGV: actor is the Vehicle the Job was assigned to. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle decelerate to destination

**Purpose:** The Vehicle reaches the final prepared travel span.

**Syntax:**

~~~grs
begin vehicle.decelerate_to_destination event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.decelerate_to_destination event
    print "Vehicle decelerate to destination" to log
end
~~~

**Notes:** Fires on actual movement in the final span. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle arrived at station

**Purpose:** The Vehicle reaches its pickup or setdown Station.

**Syntax:**

~~~grs
begin vehicle.arrived_at_station event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.arrived_at_station event
    print "Vehicle arrived at station" to log
end
~~~

**Notes:** Fires once at the arrival boundary before the pickup/setdown event. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle job assigned

**Purpose:** An idle OHT begins its next Job or explicit travel.

**Syntax:**

~~~grs
begin vehicle.job_assigned event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.job_assigned event
    print "Vehicle job assigned" to log
end
~~~

**Notes:** 2026-10-17: fires on Idle-to-travel/Pickup transition; actor is the assigned Vehicle. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle passing station

**Purpose:** The OHT passes a Station on its route.

**Syntax:**

~~~grs
begin vehicle.passing_station event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.passing_station event
    print "Vehicle passing station" to log
end
~~~

**Notes:** 2026-10-17: fires for each physically crossed Station, excluding departure; no fleet-wide polling. The engine uses an internal callback key; write the Vehicle event header in new GRS models. wait is not allowed inside a passing station event (the vehicle is moving through the Station): compile error GRS_SEMA_WAIT_IN_PASSING_STATION_EVENT.

**Related:** Vehicle, print to log

### Vehicle destination change

**Purpose:** The OHT starts a new travel leg toward its destination.

**Syntax:**

~~~grs
begin vehicle.destination_change event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.destination_change event
    print "Vehicle destination change" to log
end
~~~

**Notes:** 2026-10-17: fires at travel-leg start (initial travel or post-pickup delivery), up to twice per Job. The engine uses an internal callback key; write the Vehicle event header in new GRS models.

**Related:** Vehicle, print to log

### Vehicle OHT / AGV / AMR differences

**Purpose:** The vehicle.<event_name> header is the only spelling: there are no separate Def_OHT / Def_AGV / Def_AMR headers. It works in OHT, AGV (AMR Core Fixed Path) and AMR modules with the same 12 event names.

**Syntax:**

~~~grs
begin vehicle.<event_name> event
    ...
end
~~~

**Example:**

~~~grs
begin vehicle.passing_station event
    print "passing ", vehicle.passing_station_name to log
end
~~~

**Notes:** Observation is enabled only for events you implement and never changes physics. This Vehicle is the actor Vehicle. passing station radius for AMR / AGV is max(250 mm, body radius); vehicle.passing_station_name reads the station just passed. wait is not allowed inside a passing station event (the vehicle is moving through the Station): compile error GRS_SEMA_WAIT_IN_PASSING_STATION_EVENT. for each ... in Vehicle is OHT only: an AMR / AGV module that uses it is rejected before the run.

**Related:** Vehicle, AMR, AGV, OHT, GRS Events

### Humanoid event syntax

**Purpose:** Humanoid uses the same 12 event names (begin humanoid.pickup event, ...). Job means humanoid_transfer; pickup/setdown fire when humanoid_pick/humanoid_place start.

**Syntax:**

~~~grs
begin humanoid.<event_name> event
    ...
end
~~~

**Example:**

~~~grs
begin humanoid.job_finished event
    print "done ", this Humanoid to log
end
~~~

**Notes:** this Humanoid is humanoid_self(); humanoid_event_place() reads the place just passed (within 400 mm) inside passing station. resume to drive occurs only in live walking. wait is not allowed inside a passing station event (the vehicle is moving through the Station): compile error GRS_SEMA_WAIT_IN_PASSING_STATION_EVENT.

**Related:** Humanoid, GRS Events

## Humanoid

### Humanoid walk events (two-file global init)

**Purpose:** Run starts OHT 10, AMR 3 and Humanoid 3 and drives Humanoid 1 and 2 back and forth through physical floor Stations.

**Syntax:**

~~~grs
model_init.grs + humanoid_logic.grs
~~~

**Example:**

~~~grs
begin Humanoid walk resume event
    wait for 0.5 sec
end
begin Humanoid walk start event
    print this humanoid, " walk start now" to log
end
begin Humanoid arrived at station event
    if (current station = humanoid_1)
        dispatch this humanoid to humanoid_2
    else if (current station = humanoid_2)
        dispatch this humanoid to humanoid_1
end
~~~

**Notes:** Opt-in requires two GRS files: model_init.grs with vi_OHT, vi_AMR, vi_Humanoid and OHT.init, AMR.init, Humanoid.init; and humanoid_logic.grs with walk resume/start/arrived at station events. All three Init callbacks must complete across all modules before any regular t=0 event or initial humanoid walk begins. A waiting/failed Init rejects Run before simulation time advances. In model_init.grs the authored spwan Humanoid(1 or 2) to humanoid_1 or humanoid_2 is accepted as compatibility syntax. These compile to native humanoid_create, humanoid_walk_to, humanoid.arrived and a suspended 0.5-second wait. Each physical arrival triggers the next leg, without every-event polling. Humanoid 3 remains idle until explicitly dispatched; Job flows removed from this project are not auto restored. Existing auto-bound and explicitly declared module behavior is unchanged.

**Related:** Humanoid.init, humanoid.arrived, humanoid_create, humanoid_walk_to, print to log

## Control Flow

### if / else if / else

**Purpose:** Executes conditional branches.

**Syntax:**

~~~grs
if <condition> then begin
    ...
end
else begin
    ...
end
~~~

**Example:**

~~~grs
if vehicle.id = 1 then begin
    print "first vehicle" to log
end
else begin
    print "other vehicle" to log
end
~~~

**Notes:** The AutoMod-style two-line form is also accepted: write if (condition) or else if (condition) and put begin on the next line. In conditions = is comparison.

**Related:** comparison operators, and, or, not

### while

**Purpose:** Repeats a block while its condition is true.

**Syntax:**

~~~grs
while <condition> do begin
    ...
end
~~~

**Example:**

~~~grs
set i = 0
while i < 5
begin
    inc i by 1
    print "i = ", i to log
end
~~~

**Notes:** The two-line form (while condition, then begin on the next line) is accepted.

**Related:** break, continue, inc

### for each

**Purpose:** Iterates a list snapshot.

**Syntax:**

~~~grs
for each <item> in <list> do begin
    ...
end
~~~

**Example:**

~~~grs
for each v in Vehicle
begin
    print v to log
end
~~~

**Notes:** for each v in Vehicle iterates all OHT vehicles (OHT only). The list is evaluated once when the loop begins.

**Related:** while, break, continue

### break

**Purpose:** Leaves the innermost while / for each loop.

**Syntax:**

~~~grs
break
~~~

**Example:**

~~~grs
while i < 10
begin
    inc i by 1
    if i = 5 then begin
        break
    end
end
~~~

**Notes:** Only valid inside a loop.

**Related:** while, for each, continue

### continue

**Purpose:** Skips to the next iteration of the innermost loop.

**Syntax:**

~~~grs
continue
~~~

**Example:**

~~~grs
while i < 10
begin
    inc i by 1
    if i % 2 = 0 then begin
        continue
    end
    print i to log
end
~~~

**Notes:** Only valid inside a loop.

**Related:** while, for each, break

## Core Actions

### print to log

**Purpose:** Writes text to the Studio message log.

**Syntax:**

~~~grs
print <value>, <value>, ... to log
~~~

**Example:**

~~~grs
print "vehicle ", vehicle.id, " arrived" to log
~~~

**Notes:** Arguments are rendered in order. print ... to message was removed; use to log.

**Related:** Model Logic log

### set

**Purpose:** Assigns a variable or a writable attribute.

**Syntax:**

~~~grs
set <name> = <value>
<name> = <value>
~~~

**Example:**

~~~grs
set count = 0
set Vehicle.my_counter = 3
~~~

**Notes:** Custom attributes on Vehicle are script-side values and never overwrite physical Vehicle state.

**Related:** inc, dec, attributes

### inc

**Purpose:** Increments a numeric variable or attribute.

**Syntax:**

~~~grs
inc <name> by <amount>
~~~

**Example:**

~~~grs
inc count by 1
~~~

**Notes:** Unwritten numeric values begin at 0.

**Related:** set, dec

### dec

**Purpose:** Decrements a numeric variable or attribute.

**Syntax:**

~~~grs
dec <name> by <amount>
~~~

**Example:**

~~~grs
dec count by 1
~~~

**Notes:** Unwritten numeric values begin at 0.

**Related:** set, inc

## Vehicle Attributes

### vehicle.id

**Purpose:** Dense Vehicle identifier for the current Vehicle actor.

**Syntax:**

~~~grs
vehicle.id
~~~

**Example:**

~~~grs
print(vehicle.id);
~~~

**Notes:** Read-only physical identity.

**Related:** vehicle.station, vehicle.phase

### vehicle.station / from / destination

**Purpose:** Reads the current Station, job source and job destination from the SimulationEngine snapshot.

**Syntax:**

~~~grs
vehicle.station
vehicle.from
vehicle.destination
~~~

**Example:**

~~~grs
print(vehicle.station, vehicle.destination);
~~~

**Notes:** Returns null when the corresponding Station is invalid/unset.

**Related:** vehicle.phase

### vehicle.phase / status

**Purpose:** Returns the current physical phase as a string: idle, retrieving, pickup, moving or setdown.

**Syntax:**

~~~grs
vehicle.phase
vehicle.status
~~~

**Example:**

~~~grs
if vehicle.phase = "idle" then begin
    print "idle vehicle ", vehicle.id to log
end
~~~

**Notes:** SimulationEngine remains the physical truth owner.

**Related:** vehicle.station

## Expressions

### operators

**Purpose:** Arithmetic, remainder, comparison and boolean operators.

**Syntax:**

~~~grs
+ - * / %
= <> != < <= > >=
and or not
~~~

**Example:**

~~~grs
set r = 7 % 3
if r = 1 and vehicle.id > 0 then begin
    print "remainder ", r to log
end
~~~

**Notes:** % is the remainder (modulo). Division or remainder by zero stops the current event with an error. In conditions = is comparison.

**Related:** if, while, set

### vehicle / self

**Purpose:** Provides the current Vehicle actor surface and current actor custom-attribute surface.

**Syntax:**

~~~grs
vehicle.id
vehicle.station
vehicle.phase
self.<custom_attribute>
~~~

**Example:**

~~~grs
set(self.priority, 3);
print(self.priority);
~~~

**Notes:** Custom modeling state is script-side and does not overwrite physical Vehicle state.

**Related:** set, configure, Vehicle Attributes

## Humanoid Functions

### humanoid.color_fixed()

**Purpose:** Turns off the pose color change so every Humanoid keeps its original model color.

**Syntax:**

~~~grs
call humanoid.color_fixed()
~~~

**Example:**

~~~grs
call humanoid.color_fixed()
~~~

**Notes:** Call from model.init. Only the display color changes; motion, timing and results are unchanged. Implementation spelling: humanoid.color_fixed().

**Related:** Humanoid

### Humanoid_Create(name, place | name, x_m, y_m)

**Purpose:** Creates a Humanoid at a Station/defined place or x/y (m).

**Syntax:**

~~~grs
call Humanoid_Create(name, place | name, x_m, y_m)
~~~

**Example:**

~~~grs
call Humanoid_Create(name, place | name, x_m, y_m)
~~~

**Notes:** Battery starts full. Spec: gigaroute/humanoid/humanoid_spec.hpp (175 cm adult male). Implementation spelling: humanoid_create().

**Related:** Humanoid

### Humanoid_Define_Place(name, work_height_mm | name, x_m, y_m [, work_height_mm])

**Purpose:** Defines a named work place for humanoid_walk_to/pick/place. Station form (name, work_height_mm) takes position/level from the Station of that name, so no coordinates are written in GRS.

**Syntax:**

~~~grs
call Humanoid_Define_Place(name, work_height_mm | name, x_m, y_m [, work_height_mm])
~~~

**Example:**

~~~grs
call Humanoid_Define_Place(name, work_height_mm | name, x_m, y_m [, work_height_mm])
~~~

**Notes:** Defined places win over Station names. Default work height is 900 mm. Implementation spelling: humanoid_define_place().

**Related:** Humanoid

### Humanoid_Define_Obstacle(name, x1_m, y1_m, x2_m, y2_m [, level_id [, z_min_m [, z_max_m]]])

**Purpose:** Defines a rectangular obstacle Humanoids walk around (optionally limited to a height range).

**Syntax:**

~~~grs
call Humanoid_Define_Obstacle(name, x1_m, y1_m, x2_m, y2_m [, level_id [, z_min_m [, z_max_m]]])
~~~

**Example:**

~~~grs
call Humanoid_Define_Obstacle(name, x1_m, y1_m, x2_m, y2_m [, level_id [, z_min_m [, z_max_m]]])
~~~

**Notes:** On a level with at least one obstacle, humanoid_walk_to/walk/transfer plan a detour (AMR grid A*, body half-width + 50 mm clearance) and use its length x route_factor. Levels without obstacles keep straight-line x route_factor. A walk with no route is rejected. Already planned walks are not re-planned. Height range (default floor to ceiling): an obstacle blocks a Humanoid only if z_max > 0.1 m and z_min < its height, so a low curb is stepped over and an overhead beam is walked under. AMR positions at request time are treated as temporary obstacles on the walk. Implementation spelling: humanoid_define_obstacle().

**Related:** Humanoid

### Humanoid_Remove_Obstacle(name)

**Purpose:** Removes an obstacle (true if it existed).

**Syntax:**

~~~grs
call Humanoid_Remove_Obstacle(name)
~~~

**Example:**

~~~grs
call Humanoid_Remove_Obstacle(name)
~~~

**Notes:** Affects walks requested afterwards. Implementation spelling: humanoid_remove_obstacle().

**Related:** Humanoid

### Humanoid_Define_Zone(name, x1_m, y1_m, x2_m, y2_m [, capacity [, level_id]])

**Purpose:** Defines a corridor/area that at most `capacity` (default 1) Humanoids may be walking through at once.

**Syntax:**

~~~grs
call Humanoid_Define_Zone(name, x1_m, y1_m, x2_m, y2_m [, capacity [, level_id]])
~~~

**Example:**

~~~grs
call Humanoid_Define_Zone(name, x1_m, y1_m, x2_m, y2_m [, capacity [, level_id]])
~~~

**Notes:** A Humanoid entering from outside waits at the entrance until the zone has room (first-requested first-served). Only walking time inside the zone is counted; standing Humanoids and other vehicle types do not occupy it. Zones on one level must not overlap. Implementation spelling: humanoid_define_zone().

**Related:** Humanoid

### Humanoid_Route_Distance(robot, place)

**Purpose:** Planned walking distance in m (obstacle detour x route_factor) without moving; -1 if unknown or unroutable.

**Syntax:**

~~~grs
call Humanoid_Route_Distance(robot, place)
~~~

**Example:**

~~~grs
call Humanoid_Route_Distance(robot, place)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_route_distance().

**Related:** Humanoid

### Humanoid_Zone_Wait(robot)

**Purpose:** Total seconds the Humanoid has waited at zone entrances.

**Syntax:**

~~~grs
call Humanoid_Zone_Wait(robot)
~~~

**Example:**

~~~grs
call Humanoid_Zone_Wait(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_zone_wait().

**Related:** Humanoid

### Humanoid_Set(robot, parameter, value)

**Purpose:** Overrides one spec value for one Humanoid.

**Syntax:**

~~~grs
call Humanoid_Set(robot, parameter, value)
~~~

**Example:**

~~~grs
call Humanoid_Set(robot, parameter, value)
~~~

**Notes:** walk_speed/carry_speed/cart_speed/accel/decel are m/s(^2); turn_speed deg/s; payload_one_arm/payload_two_arm/item_mass kg; *_seconds, robot_time_factor, route_factor, battery_capacity_wh, battery_percent, *_power_w, low_battery_percent, mass_kg. Implementation spelling: humanoid_set().

**Related:** Humanoid

### Humanoid_Spec([robot,] parameter)

**Purpose:** Returns a spec/body value (height_mm, shoulder_height_mm, max_reach_height_mm, forward_reach_mm, walk_speed, ...).

**Syntax:**

~~~grs
call Humanoid_Spec([robot,] parameter)
~~~

**Example:**

~~~grs
call Humanoid_Spec([robot,] parameter)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_spec().

**Related:** Humanoid

### Humanoid_Walk_To(robot, place)

**Purpose:** Turns and walks to a Station/defined place. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Walk_To(robot, place)
~~~

**Example:**

~~~grs
call Humanoid_Walk_To(robot, place)
~~~

**Notes:** Straight-line distance x route_factor with trapezoidal speed; carry/cart speeds apply automatically. Fires humanoid.arrived. Implementation spelling: humanoid_walk_to().

**Related:** Humanoid

### Humanoid_Walk(robot, meters)

**Purpose:** Walks straight ahead. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Walk(robot, meters)
~~~

**Example:**

~~~grs
call Humanoid_Walk(robot, meters)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_walk().

**Related:** Humanoid

### Humanoid_Dispatch_Async(robot, place)

**Purpose:** Starts a walk to a Station/defined place without suspending the caller. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Dispatch_Async(robot, place)
~~~

**Example:**

~~~grs
call Humanoid_Dispatch_Async(robot, place)
~~~

**Notes:** Same physical walk as humanoid_walk_to, but the calling GRS process continues; the next leg is driven by humanoid.arrived. Implementation spelling: humanoid_dispatch_async().

**Related:** Humanoid

### Humanoid_Queue_Initial_Dispatch(robot, place)

**Purpose:** Registers an initial walk during Humanoid.init. Returns true.

**Syntax:**

~~~grs
call Humanoid_Queue_Initial_Dispatch(robot, place)
~~~

**Example:**

~~~grs
call Humanoid_Queue_Initial_Dispatch(robot, place)
~~~

**Notes:** Started at t=0 only after every OHT.init, AMR.init and Humanoid.init has completed (global Init barrier). Implementation spelling: humanoid_queue_initial_dispatch().

**Related:** Humanoid

### Humanoid_Turn(robot, degrees)

**Purpose:** Turns in place (+ counter-clockwise). Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Turn(robot, degrees)
~~~

**Example:**

~~~grs
call Humanoid_Turn(robot, degrees)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_turn().

**Related:** Humanoid

### Humanoid_Face(robot, place)

**Purpose:** Turns in place to face a place or Station (absolute heading, shortest turn). Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Face(robot, place)
~~~

**Example:**

~~~grs
call Humanoid_Face(robot, place)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_face().

**Related:** Humanoid

### Humanoid_Stairs(robot, steps)

**Purpose:** Climbs (+) or descends (-) stair steps. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Stairs(robot, steps)
~~~

**Example:**

~~~grs
call Humanoid_Stairs(robot, steps)
~~~

**Notes:** Rejected while a cart is attached. Implementation spelling: humanoid_stairs().

**Related:** Humanoid

### Humanoid_Pose(robot, pose)

**Purpose:** Changes posture: stand, carry, reach_high, reach_mid, bend, crouch, kneel, sit. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Pose(robot, pose)
~~~

**Example:**

~~~grs
call Humanoid_Pose(robot, pose)
~~~

**Notes:** Joint-space synchronized move; the slowest joint (trapezoidal profile) sets the time. Implementation spelling: humanoid_pose().

**Related:** Humanoid

### Humanoid_Pick(robot, item [, height_mm [, mass_kg]])

**Purpose:** Aligns, takes the posture for the height, reaches, grasps and lifts an item. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Pick(robot, item [, height_mm [, mass_kg]])
~~~

**Example:**

~~~grs
call Humanoid_Pick(robot, item [, height_mm [, mass_kg]])
~~~

**Notes:** Items above payload_one_arm use both hands. Height outside the reach envelope is rejected. Fires humanoid.pick_complete. Implementation spelling: humanoid_pick().

**Related:** Humanoid

### Humanoid_Place(robot [, item] [, height_mm])

**Purpose:** Puts down the held item (right hand first). Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Place(robot [, item] [, height_mm])
~~~

**Example:**

~~~grs
call Humanoid_Place(robot [, item] [, height_mm])
~~~

**Notes:** Fires humanoid.place_complete. Implementation spelling: humanoid_place().

**Related:** Humanoid

### Humanoid_Transfer(robot, item, from_place, to_place [, from_height_mm, to_height_mm])

**Purpose:** Walk + pick + walk + place in one call. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Transfer(robot, item, from_place, to_place [, from_height_mm, to_height_mm])
~~~

**Example:**

~~~grs
call Humanoid_Transfer(robot, item, from_place, to_place [, from_height_mm, to_height_mm])
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_transfer().

**Related:** Humanoid

### Humanoid_Handover(giver, receiver [, item])

**Purpose:** Hands an item to another Humanoid within arm reach. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Handover(giver, receiver [, item])
~~~

**Example:**

~~~grs
call Humanoid_Handover(giver, receiver [, item])
~~~

**Notes:** Both robots are busy until completion. Fires humanoid.handover_complete. Implementation spelling: humanoid_handover().

**Related:** Humanoid

### Humanoid_Attach_Cart(robot, cart)

**Purpose:** Grips a cart handle; later walks use cart speed. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Attach_Cart(robot, cart)
~~~

**Example:**

~~~grs
call Humanoid_Attach_Cart(robot, cart)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_attach_cart().

**Related:** Humanoid

### Humanoid_Detach_Cart(robot)

**Purpose:** Releases the cart. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Detach_Cart(robot)
~~~

**Example:**

~~~grs
call Humanoid_Detach_Cart(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_detach_cart().

**Related:** Humanoid

### Humanoid_Open_Door(robot [, door])

**Purpose:** Opens a door/cover. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Open_Door(robot [, door])
~~~

**Example:**

~~~grs
call Humanoid_Open_Door(robot [, door])
~~~

**Notes:** Standard time x robot_time_factor. Implementation spelling: humanoid_open_door().

**Related:** Humanoid

### Humanoid_Close_Door(robot [, door])

**Purpose:** Closes a door/cover. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Close_Door(robot [, door])
~~~

**Example:**

~~~grs
call Humanoid_Close_Door(robot [, door])
~~~

**Notes:** Standard time x robot_time_factor. Implementation spelling: humanoid_close_door().

**Related:** Humanoid

### Humanoid_Press_Button(robot [, count])

**Purpose:** Presses a button/switch count times. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Press_Button(robot [, count])
~~~

**Example:**

~~~grs
call Humanoid_Press_Button(robot [, count])
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_press_button().

**Related:** Humanoid

### Humanoid_Turn_Valve(robot, turns)

**Purpose:** Turns a valve/knob. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Turn_Valve(robot, turns)
~~~

**Example:**

~~~grs
call Humanoid_Turn_Valve(robot, turns)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_turn_valve().

**Related:** Humanoid

### Humanoid_Type(robot, text | character_count)

**Purpose:** Types on an HMI/keyboard. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Type(robot, text | character_count)
~~~

**Example:**

~~~grs
call Humanoid_Type(robot, text | character_count)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_type().

**Related:** Humanoid

### Humanoid_Scan(robot [, target])

**Purpose:** Reads a barcode/RFID. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Scan(robot [, target])
~~~

**Example:**

~~~grs
call Humanoid_Scan(robot [, target])
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_scan().

**Related:** Humanoid

### Humanoid_Inspect(robot [, seconds [, target]])

**Purpose:** Visual inspection. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Inspect(robot [, seconds [, target]])
~~~

**Example:**

~~~grs
call Humanoid_Inspect(robot [, seconds [, target]])
~~~

**Notes:** Without seconds uses inspect_seconds x robot_time_factor. Implementation spelling: humanoid_inspect().

**Related:** Humanoid

### Humanoid_Fasten(robot [, count])

**Purpose:** Fastens bolts/screws. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Fasten(robot [, count])
~~~

**Example:**

~~~grs
call Humanoid_Fasten(robot [, count])
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_fasten().

**Related:** Humanoid

### Humanoid_Tool_Change(robot [, tool])

**Purpose:** Changes a hand tool. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Tool_Change(robot [, tool])
~~~

**Example:**

~~~grs
call Humanoid_Tool_Change(robot [, tool])
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_tool_change().

**Related:** Humanoid

### Humanoid_Work(robot, seconds [, label])

**Purpose:** Any other job for a fixed time (manual assembly, cleaning, ...). Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Work(robot, seconds [, label])
~~~

**Example:**

~~~grs
call Humanoid_Work(robot, seconds [, label])
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_work().

**Related:** Humanoid

### Humanoid_Wait(robot, seconds)

**Purpose:** Idles for a fixed time. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Wait(robot, seconds)
~~~

**Example:**

~~~grs
call Humanoid_Wait(robot, seconds)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_wait().

**Related:** Humanoid

### Humanoid_Charge(robot [, target_percent])

**Purpose:** Charges the battery to target (default 100%). Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Charge(robot [, target_percent])
~~~

**Example:**

~~~grs
call Humanoid_Charge(robot [, target_percent])
~~~

**Notes:** Fires humanoid.charged. Implementation spelling: humanoid_charge().

**Related:** Humanoid

### Humanoid_Joint(robot, joint_name, degrees)

**Purpose:** Moves one joint to an absolute angle. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Joint(robot, joint_name, degrees)
~~~

**Example:**

~~~grs
call Humanoid_Joint(robot, joint_name, degrees)
~~~

**Notes:** Joint limits and motion speed follow humanoid_spec.hpp. Implementation spelling: humanoid_joint().

**Related:** Humanoid

### Humanoid_Joints(robot, joint_name, degrees [, joint_name, degrees ...])

**Purpose:** Moves multiple joints simultaneously. Returns seconds.

**Syntax:**

~~~grs
call Humanoid_Joints(robot, joint_name, degrees [, joint_name, degrees ...])
~~~

**Example:**

~~~grs
call Humanoid_Joints(robot, joint_name, degrees [, joint_name, degrees ...])
~~~

**Notes:** The slowest joint determines the synchronized duration. Implementation spelling: humanoid_joints().

**Related:** Humanoid

### Humanoid_Location(robot)

**Purpose:** Returns the current place name or null.

**Syntax:**

~~~grs
call Humanoid_Location(robot)
~~~

**Example:**

~~~grs
call Humanoid_Location(robot)
~~~

**Notes:** Committed place (the destination while walking). Implementation spelling: humanoid_location().

**Related:** Humanoid

### Humanoid_X(robot)

**Purpose:** Returns x (m).

**Syntax:**

~~~grs
call Humanoid_X(robot)
~~~

**Example:**

~~~grs
call Humanoid_X(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_x().

**Related:** Humanoid

### Humanoid_Y(robot)

**Purpose:** Returns y (m).

**Syntax:**

~~~grs
call Humanoid_Y(robot)
~~~

**Example:**

~~~grs
call Humanoid_Y(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_y().

**Related:** Humanoid

### Humanoid_Z(robot)

**Purpose:** Returns z (m) at the Humanoid position.

**Syntax:**

~~~grs
call Humanoid_Z(robot)
~~~

**Example:**

~~~grs
call Humanoid_Z(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_z().

**Related:** Humanoid

### Humanoid_Level(robot)

**Purpose:** Returns the Level ID the Humanoid stands on.

**Syntax:**

~~~grs
call Humanoid_Level(robot)
~~~

**Example:**

~~~grs
call Humanoid_Level(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_level().

**Related:** Humanoid

### Humanoid_Holding(robot [, hand])

**Purpose:** Returns the held item (left/right/any) or null.

**Syntax:**

~~~grs
call Humanoid_Holding(robot [, hand])
~~~

**Example:**

~~~grs
call Humanoid_Holding(robot [, hand])
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_holding().

**Related:** Humanoid

### Humanoid_Free_Hands(robot)

**Purpose:** Returns the number of free hands (0..2).

**Syntax:**

~~~grs
call Humanoid_Free_Hands(robot)
~~~

**Example:**

~~~grs
call Humanoid_Free_Hands(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_free_hands().

**Related:** Humanoid

### Humanoid_Battery(robot)

**Purpose:** Returns battery percent.

**Syntax:**

~~~grs
call Humanoid_Battery(robot)
~~~

**Example:**

~~~grs
call Humanoid_Battery(robot)
~~~

**Notes:** Fires humanoid.battery_low when crossing low_battery_percent. Implementation spelling: humanoid_battery().

**Related:** Humanoid

### Humanoid_Busy(robot)

**Purpose:** Returns true until the current action ends.

**Syntax:**

~~~grs
call Humanoid_Busy(robot)
~~~

**Example:**

~~~grs
call Humanoid_Busy(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_busy().

**Related:** Humanoid

### Humanoid_State(robot)

**Purpose:** Returns the current action name or idle.

**Syntax:**

~~~grs
call Humanoid_State(robot)
~~~

**Example:**

~~~grs
call Humanoid_State(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_state().

**Related:** Humanoid

### Humanoid_Posture(robot)

**Purpose:** Returns the current posture name.

**Syntax:**

~~~grs
call Humanoid_Posture(robot)
~~~

**Example:**

~~~grs
call Humanoid_Posture(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_posture().

**Related:** Humanoid

### Humanoid_Distance(robot)

**Purpose:** Returns walked distance (m).

**Syntax:**

~~~grs
call Humanoid_Distance(robot)
~~~

**Example:**

~~~grs
call Humanoid_Distance(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_distance().

**Related:** Humanoid

### Humanoid_Utilization(robot)

**Purpose:** Returns busy time / elapsed time since creation (0..1).

**Syntax:**

~~~grs
call Humanoid_Utilization(robot)
~~~

**Example:**

~~~grs
call Humanoid_Utilization(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_utilization().

**Related:** Humanoid

### Humanoid_Actions(robot)

**Purpose:** Returns completed action count.

**Syntax:**

~~~grs
call Humanoid_Actions(robot)
~~~

**Example:**

~~~grs
call Humanoid_Actions(robot)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_actions().

**Related:** Humanoid

### Humanoid_Last_Error(robot)

**Purpose:** Returns the last rejection reason or null.

**Syntax:**

~~~grs
call Humanoid_Last_Error(robot)
~~~

**Example:**

~~~grs
call Humanoid_Last_Error(robot)
~~~

**Notes:** Rejected actions return 0 seconds and fire humanoid.rejected. Implementation spelling: humanoid_last_error().

**Related:** Humanoid

### Humanoid_Self()

**Purpose:** Inside a humanoid.* event returns the Humanoid name.

**Syntax:**

~~~grs
call Humanoid_Self()
~~~

**Example:**

~~~grs
call Humanoid_Self()
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_self().

**Related:** Humanoid

### Humanoid_Event_Action()

**Purpose:** Inside a humanoid.* event returns the action name.

**Syntax:**

~~~grs
call Humanoid_Event_Action()
~~~

**Example:**

~~~grs
call Humanoid_Event_Action()
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_event_action().

**Related:** Humanoid

### Humanoid_Event_Place()

**Purpose:** Inside a Humanoid passing station event returns the place name that was just passed (lower case).

**Syntax:**

~~~grs
call Humanoid_Event_Place()
~~~

**Example:**

~~~grs
call Humanoid_Event_Place()
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_event_place().

**Related:** Humanoid

### Humanoid_Count()

**Purpose:** Returns the number of Humanoids in this module.

**Syntax:**

~~~grs
call Humanoid_Count()
~~~

**Example:**

~~~grs
call Humanoid_Count()
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_count().

**Related:** Humanoid

### Humanoid_Joint_Deg(robot, joint_name)

**Purpose:** Returns the committed target angle of one Humanoid joint.

**Syntax:**

~~~grs
call Humanoid_Joint_Deg(robot, joint_name)
~~~

**Example:**

~~~grs
call Humanoid_Joint_Deg(robot, joint_name)
~~~

**Notes:** Implemented runtime callable. Implementation spelling: humanoid_joint_deg().

**Related:** Humanoid

## Attribute Reference

### vehicle.id [OHT, AMR]

**Purpose:** Returns the dense runtime Vehicle/Robot ID.

**Syntax:**

~~~grs
vehicle.id
~~~

**Example:**

~~~grs
print(vehicle.id);
~~~

**Notes:** Type: Number. Access: read-only. Modules: OHT, AMR. Physical runtime identity; not a user-defined attribute.

**Related:** OHT, AMR

### vehicle.station [OHT, AMR]

**Purpose:** Returns the current/last Station index.

**Syntax:**

~~~grs
vehicle.station
~~~

**Example:**

~~~grs
print(vehicle.station);
~~~

**Notes:** Type: Number or null. Access: read-only. Modules: OHT, AMR. Alias vehicle.location resolves to the same value.

**Related:** vehicle.location

### vehicle.from [OHT, AMR]

**Purpose:** Returns the current Job source Station index.

**Syntax:**

~~~grs
vehicle.from
~~~

**Example:**

~~~grs
print(vehicle.from);
~~~

**Notes:** Type: Number or null. Access: read-only. Modules: OHT, AMR.

**Related:** vehicle.fromstation

### vehicle.destination [OHT, AMR]

**Purpose:** Returns the current destination Station index.

**Syntax:**

~~~grs
vehicle.destination
~~~

**Example:**

~~~grs
print(vehicle.destination);
~~~

**Notes:** Type: Number or null. Access: read-only. Modules: OHT, AMR.

**Related:** vehicle.destinationstation

### vehicle.phase [OHT, AMR]

**Purpose:** Returns the authoritative runtime phase/status text.

**Syntax:**

~~~grs
vehicle.phase
~~~

**Example:**

~~~grs
print(vehicle.phase);
~~~

**Notes:** Type: String. Access: read-only. Modules: OHT, AMR. Alias vehicle.status resolves to the same value.

**Related:** vehicle.status

### vehicle.current_speed [OHT, AMR]

**Purpose:** Returns authoritative current linear speed.

**Syntax:**

~~~grs
vehicle.current_speed
~~~

**Example:**

~~~grs
print(vehicle.current_speed);
~~~

**Notes:** Type: Number (mm/s). Access: read-only. Modules: OHT, AMR. OHT reads the Rail Vehicle motion speed; AMR reads the robot linear speed.

**Related:** vehicle.speed / vehicle.velocity

### vehicle.remaining_distance [OHT, AMR]

**Purpose:** Returns remaining distance on the current route.

**Syntax:**

~~~grs
vehicle.remaining_distance
~~~

**Example:**

~~~grs
print(vehicle.remaining_distance);
~~~

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT, AMR. Zero is valid at a destination or when no route is active.

**Related:** vehicle.route_remaining / vehicle.route_remaining_distance

### vehicle.x [OHT, AMR]

**Purpose:** Returns current world X position.

**Syntax:**

~~~grs
vehicle.x
~~~

**Example:**

~~~grs
print(vehicle.x);
~~~

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT, AMR.

**Related:** vehicle.x_mm

### vehicle.y [OHT, AMR]

**Purpose:** Returns current world Y position.

**Syntax:**

~~~grs
vehicle.y
~~~

**Example:**

~~~grs
print(vehicle.y);
~~~

**Notes:** Type: Number (mm). Access: read-only. Modules: OHT, AMR.

**Related:** vehicle.y_mm

### vehicle.heading [OHT, AMR]

**Purpose:** Returns current heading in radians.

**Syntax:**

~~~grs
vehicle.heading
~~~

**Example:**

~~~grs
print(vehicle.heading);
~~~

**Notes:** Type: Number (rad) or null. Access: read-only. Modules: OHT, AMR. OHT can return null only when a legacy snapshot has no authoritative heading.

**Related:** vehicle.heading_rad

### vehicle.rotating_in_place [OHT, AMR]

**Purpose:** Returns true while the runtime is rotating in place.

**Syntax:**

~~~grs
vehicle.rotating_in_place
~~~

**Example:**

~~~grs
print(vehicle.rotating_in_place);
~~~

**Notes:** Type: Bool. Access: read-only. Modules: OHT, AMR.

**Related:** OHT, AMR

### vehicle.current_path [OHT]

**Purpose:** Returns the directed Rail Path ID currently occupied by the OHT.

**Syntax:**

~~~grs
vehicle.current_path
~~~

**Example:**

~~~grs
print(vehicle.current_path);
~~~

**Notes:** Type: Number or null. Access: read-only. Modules: OHT. AMR free-floor motion has no equivalent Rail Path ID.

**Related:** vehicle.path

### vehicle.has_assigned_job [OHT]

**Purpose:** Returns whether the physical OHT owns a real transport Job.

**Syntax:**

~~~grs
vehicle.has_assigned_job
~~~

**Example:**

~~~grs
print(vehicle.has_assigned_job);
~~~

**Notes:** Type: Bool. Access: read-only. Modules: OHT. This is physical Job ownership, not merely a script custom attribute.

**Related:** OHT

### vehicle.service_remaining_seconds [OHT]

**Purpose:** Returns remaining Pickup/Setdown service time.

**Syntax:**

~~~grs
vehicle.service_remaining_seconds
~~~

**Example:**

~~~grs
print(vehicle.service_remaining_seconds);
~~~

**Notes:** Type: Number (s). Access: read-only. Modules: OHT. Returns zero outside Pickup/Setdown.

**Related:** OHT

### vehicle.service_duration_seconds [OHT]

**Purpose:** Returns configured duration of the active Pickup/Setdown service phase.

**Syntax:**

~~~grs
vehicle.service_duration_seconds
~~~

**Example:**

~~~grs
print(vehicle.service_duration_seconds);
~~~

**Notes:** Type: Number (s). Access: read-only. Modules: OHT. Returns zero outside Pickup/Setdown.

**Related:** OHT

### vehicle.angular_speed [AMR]

**Purpose:** Returns current AMR angular speed.

**Syntax:**

~~~grs
vehicle.angular_speed
~~~

**Example:**

~~~grs
print(vehicle.angular_speed);
~~~

**Notes:** Type: Number (rad/s). Access: read-only. Modules: AMR.

**Related:** vehicle.angular_speed_rad_s

### vehicle.z [AMR]

**Purpose:** Returns current AMR 2.5D elevation.

**Syntax:**

~~~grs
vehicle.z
~~~

**Example:**

~~~grs
print(vehicle.z);
~~~

**Notes:** Type: Number (mm). Access: read-only. Modules: AMR.

**Related:** vehicle.z_mm

### vehicle.traffic_state [AMR]

**Purpose:** Returns AMR traffic state text (Cruise/Slow/Stop).

**Syntax:**

~~~grs
vehicle.traffic_state
~~~

**Example:**

~~~grs
print(vehicle.traffic_state);
~~~

**Notes:** Type: String. Access: read-only. Modules: AMR.

**Related:** vehicle.traffic

### vehicle.schedjobs [OHT]

**Purpose:** Returns the alive ScheduleJobs associated with the OHT Vehicle.

**Syntax:**

~~~grs
vehicle.schedjobs
~~~

**Example:**

~~~grs
print(vehicle.schedjobs.size);
~~~

**Notes:** Type: List<ScheduleJob>. Access: read-only. Modules: OHT. AMR automatic dispatch does not expose this OHT ScheduleJob list.

**Related:** vehicle.schedulejobs

### vehicle.current_schedjob [OHT]

**Purpose:** Gets or selects the current OHT ScheduleJob.

**Syntax:**

~~~grs
vehicle.current_schedjob
~~~

**Example:**

~~~grs
set(vehicle.current_schedjob, job);
~~~

**Notes:** Type: ScheduleJob or null. Access: read/write. Modules: OHT. Only a live job owned by the same Vehicle can be selected.

**Related:** vehicle.currentschedjob

### vehicle.battery [AMR]

**Purpose:** Returns AMR battery percentage.

**Syntax:**

~~~grs
vehicle.battery
~~~

**Example:**

~~~grs
print(vehicle.battery);
~~~

**Notes:** Type: Number. Access: read-only. Modules: AMR. OHT does not expose a battery attribute through this Host.

**Related:** vehicle.batterypercent

### vehicle.blocked_by [OHT, AMR]

**Purpose:** Returns the directly recorded leader/blocker Vehicle, or null when not currently blocked.

**Syntax:**

~~~grs
vehicle.blocked_by
~~~

**Example:**

~~~grs
print(vehicle.blocked_by);
~~~

**Notes:** Type: Vehicle or null. Access: read-only. Modules: OHT, AMR. Only the Core-recorded direct blocker is returned. Dependency chains and root cause are not inferred.

**Related:** OHT, AMR

### vehicle.blocked_since_seconds [OHT, AMR]

**Purpose:** Returns the simulation time this Vehicle began waiting on its current blocked_by, or null when not blocked.

**Syntax:**

~~~grs
vehicle.blocked_since_seconds
~~~

**Example:**

~~~grs
print(vehicle.blocked_since_seconds);
~~~

**Notes:** Type: Number (s) or null. Access: read-only. Modules: OHT, AMR.

**Related:** OHT, AMR

### vehicle.blocked_elapsed_seconds [OHT, AMR]

**Purpose:** Returns current simulation time minus blocked_since_seconds, or null when not blocked.

**Syntax:**

~~~grs
vehicle.blocked_elapsed_seconds
~~~

**Example:**

~~~grs
print(vehicle.blocked_elapsed_seconds);
~~~

**Notes:** Type: Number (s) or null. Access: read-only. Modules: OHT, AMR. Computed on read from the existing blocked_since timestamp; no extra polling state is created.

**Related:** OHT, AMR

### vehicle.waiting_for_station [AMR]

**Purpose:** Returns true while the AMR finished loading/unloading but is waiting for its destination Station slot to free.

**Syntax:**

~~~grs
vehicle.waiting_for_station
~~~

**Example:**

~~~grs
print(vehicle.waiting_for_station);
~~~

**Notes:** Type: Bool. Access: read-only. Modules: AMR. Event-driven: re-evaluated only when the Station frees, not polled.

**Related:** AMR

### load.id [OHT]

**Purpose:** Returns the script Load ID.

**Syntax:**

~~~grs
load.id
~~~

**Example:**

~~~grs
print(load.id);
~~~

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** OHT

### load.name [OHT]

**Purpose:** Returns the script Load name.

**Syntax:**

~~~grs
load.name
~~~

**Example:**

~~~grs
print(load.name);
~~~

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** OHT

### load.vehicle [OHT]

**Purpose:** Returns the claimed/onboard Vehicle handle.

**Syntax:**

~~~grs
load.vehicle
~~~

**Example:**

~~~grs
print(load.vehicle);
~~~

**Notes:** Type: Vehicle or null. Access: read-only. Modules: OHT.

**Related:** OHT

### load.location [OHT]

**Purpose:** Returns or supplies the off-Vehicle source/location Station.

**Syntax:**

~~~grs
load.location
~~~

**Example:**

~~~grs
print(load.location);
~~~

**Notes:** Type: Number or null. Access: read/write. Modules: OHT. Writes participate in pending scripted transport endpoint binding.

**Related:** load.from / load.source aliases are accepted by transport binding

### load.destination [OHT]

**Purpose:** Returns or supplies the active delivery destination Station.

**Syntax:**

~~~grs
load.destination
~~~

**Example:**

~~~grs
print(load.destination);
~~~

**Notes:** Type: Number or null. Access: read/write. Modules: OHT. Writes participate in pending scripted transport endpoint binding.

**Related:** load.to / load.target aliases are accepted by transport binding

### load.onboard [OHT]

**Purpose:** Returns true while the Load is physically onboard its carrier.

**Syntax:**

~~~grs
load.onboard
~~~

**Example:**

~~~grs
print(load.onboard);
~~~

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** OHT

### load.alive [OHT]

**Purpose:** Returns whether the script Load is live.

**Syntax:**

~~~grs
load.alive
~~~

**Example:**

~~~grs
print(load.alive);
~~~

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** OHT

### load.state [OHT]

**Purpose:** Returns created, claimed, onboard, or stored.

**Syntax:**

~~~grs
load.state
~~~

**Example:**

~~~grs
print(load.state);
~~~

**Notes:** Type: String. Access: read-only. Modules: OHT. Derived from current script material ownership/location.

**Related:** OHT

### job.id [OHT]

**Purpose:** Returns the stable ScheduleJob ID.

**Syntax:**

~~~grs
job.id
~~~

**Example:**

~~~grs
print(job.id);
~~~

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** OHT

### job.type [OHT]

**Purpose:** Returns current move/retrieve/deliver job type.

**Syntax:**

~~~grs
job.type
~~~

**Example:**

~~~grs
print(job.type);
~~~

**Notes:** Type: String. Access: read-only. Modules: OHT.

**Related:** OHT

### job.vehicle [OHT]

**Purpose:** Returns the owning Vehicle.

**Syntax:**

~~~grs
job.vehicle
~~~

**Example:**

~~~grs
print(job.vehicle);
~~~

**Notes:** Type: Vehicle or null. Access: read-only. Modules: OHT.

**Related:** OHT

### job.load [OHT]

**Purpose:** Returns the associated Load for material jobs.

**Syntax:**

~~~grs
job.load
~~~

**Example:**

~~~grs
print(job.load);
~~~

**Notes:** Type: Load or null. Access: read-only. Modules: OHT.

**Related:** OHT

### job.location [OHT]

**Purpose:** Returns or changes the target Station of an uncommitted job.

**Syntax:**

~~~grs
job.location
~~~

**Example:**

~~~grs
print(job.location);
~~~

**Notes:** Type: Number or null. Access: read/write before commit. Modules: OHT. Committed physical jobs reject location rewrites.

**Related:** OHT

### job.released_us [OHT]

**Purpose:** Returns the script release time in microseconds.

**Syntax:**

~~~grs
job.released_us
~~~

**Example:**

~~~grs
print(job.released_us);
~~~

**Notes:** Type: Number. Access: read-only. Modules: OHT.

**Related:** OHT

### job.alive [OHT]

**Purpose:** Returns whether the ScheduleJob is live.

**Syntax:**

~~~grs
job.alive
~~~

**Example:**

~~~grs
print(job.alive);
~~~

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** OHT

### job.current [OHT]

**Purpose:** Returns whether the ScheduleJob is selected as current work.

**Syntax:**

~~~grs
job.current
~~~

**Example:**

~~~grs
print(job.current);
~~~

**Notes:** Type: Bool. Access: read-only. Modules: OHT.

**Related:** OHT

### job.physical_committed [OHT]

**Purpose:** Returns true once SimulationEngine already owns the physical route for this ScheduleJob.

**Syntax:**

~~~grs
job.physical_committed
~~~

**Example:**

~~~grs
print(job.physical_committed);
~~~

**Notes:** Type: Bool. Access: read-only. Modules: OHT. #30 P4: source/destination Station, assigned/pickup/setdown/completed timestamps, and cancel state/reason are Not Implemented as ScheduleJob Attributes -- the current ScheduleJob struct does not own that state, and this Issue does not fabricate a sidecar owner for it.

**Related:** OHT
