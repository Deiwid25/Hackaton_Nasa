# State Management Geo-Portal

## Getting Started

The State Management strategy for Geo-Portal blends the strengths of Context API and the Redux pattern to streamline complex state operations. This hybrid approach capitalizes on the simplicity and ease-of-use of the Context API, while borrowing Redux's robust structure to manage more intricate state scenarios.

## Required Hooks

For this, we leverage several React Hooks:

- **useContext**: This hook allows us to access the global state of the application. By wrapping the application in Context Providers, we ensure state values are accessible across the entire component tree, thus mitigating the need for prop drilling.

- **useState**: This hook is employed for managing simple, individual state elements. It's ideal for isolated values where tracking previous states isn't necessary and when the update logic is straightforward.

- **useReducer**: This hook is utilized for managing more complex state that involves multiple sub-values or where the next state depends on the previous one. With _useReducer_, we can handle intricate state transitions in a clear, predictable manner, mimicking the core principle of Redux but without introducing external dependencies.

This thoughtful combination of hooks enables our state management system to be both flexible and scalable, adept at handling a wide array of state scenarios with ease.

## Suggest State Divisions

---

![Imagen Geoportal y Estados de App](https://res.cloudinary.com/dfow7zkf6/image/upload/v1685985155/Geoportal/statesGeoportal_ybwluq.png)

After a thorough review of Geo-Portal's functionalities, we suggest the implementation of 8 distinct state divisions for efficient state management.

### 1. Map State

This division is responsible for managing various map properties, including:

- Zoom level.
- Map type.
- Visibility range of the map.
- Current location (based on user's search for a specific town within the - AMVA or through location activation).
- Layout of towns and basins (ciudades y cuencas).
- The _geoLocationService()_ is required for this state.

**Suggested Hooks**: _useContext_ and _useReducer_

### 2. Forecast State

This division manages the forecast updates, using states for:

Location.
Lapse of time.
Initially, this state appears to remain local, thus not requiring the Context API.

**Suggested Hooks**: _useState_ and custom hooks

### 3. Layers State

This division governs the activation of various layers through a complex state with properties such as:

- Radar Layer
- Rain Accumulation Layer
- Levels Layer
- Temperature and Humidity Layer
- Lightnings Layer
- Air Quality Layer
- Radiation Layer (Regular and UV Radiation)
- Sewerage Layer
- Satellite Layer

Due to the complex nature of this state, **Suggested Hooks** are _useReducer_ within _useContext_.

### 4. Animation State

This division manages the animation of Radar and other Satellite layers, updating:

- Play and Pause state.
- Move Forward state.
- Selected animated layer.

**Suggested Hooks**: Depending on the complexity during development, either _useState_ or _useReducer_ within _useContext_ can be selected.

### 5. Cameras State

This layer manages a simple state that toggles the display of cameras.

**Suggested Hooks**: _useState_

### 6. Form State

This state manages the form modal and its values, updating:

- Show Modal state.
- Submit Form.

**Suggested Hooks**: _useState_ and _useFormik_ from the Formik library. **Note**: useFormik can be optional.

## Additional Proposed States

### 7. Station State:

This could maintain the current station and a function to update it. When a user clicks on a station, this function will be invoked to update the current station.

**Suggested Hooks**: Depending on the complexity during development, either _useState_ or _useReducer_ within _useContext_ can be selected.

### 8. Plot State:

This state could hold the data for the plot and a function to update it. When the current station changes, this function will be invoked to update the plot data.

**Suggested Hooks**: Depending on the complexity during development, either _useState_ or _useReducer_ within _useContext_ can be selected.
