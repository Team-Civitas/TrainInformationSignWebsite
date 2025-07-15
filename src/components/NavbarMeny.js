import React from 'react';

function NavBarMeny({ theme, setTheme }) {

    const changeTheme = (event) => {
        setTheme(event.target.value);
    };

    return (
        <div>
            <div style={{ minWidth: '120px', width: '100vw', marginLeft: '16px', marginRight: '16px'}}>
                <label htmlFor="ThemeSelector" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Theme
                </label>
                <select
                    id="ThemeSelector"
                    value={theme}
                    onChange={changeTheme}
                    style={{ width: '100vw', padding: '0.5rem' }}
                >
                    <option value="StandardTheme">StandardTheme</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
    );
}

export default NavBarMeny;
