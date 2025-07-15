import React from 'react';

function NavBarMeny({ theme, setTheme }) {

    const changeTheme = (event) => {
        setTheme(event.target.value);
    };

    return (
        <div class="ThemeSelector">
            <div style={{ minWidth: '120px' }}>
                <label htmlFor="ThemeSelector" style={{ display: 'flex', marginBottom: '0.5rem' }}>
                    Theme
                </label>
                <select
                    id="ThemeSelector"
                    value={theme}
                    onChange={changeTheme}
                    style={{ padding: '0.5rem' }}
                >
                    <option value="StandardTheme">StandardTheme</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
    );
}

export default NavBarMeny;
