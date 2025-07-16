import './StandardTheme.css';

function StandardTheme() {
    return (
        <div className="StandardTheme">
            <div className="header">
                <div className="mainHeader">
                    <p className="mainHeaderText">Ankommande tåg - Train arrivals</p>
                    <p className="currentTime">08:35</p>
                </div>
                <div className="grid titles">
                    <p className='tid'>Tid</p>
                    <p className='från'>Från</p>
                    <p className="nyTid" id='whiteColor'>Ny tid</p>
                    <p className='spår'>Spår</p>
                    <p className='anmärkning'>Anmärkning</p>
                    <div className="tågnr">Tågnummer</div>
                </div>
            </div>

            <div className="grid">
                <div className='tid'>08:02</div>
                <div className='från'>Stockholm C</div>
                <div className="nyTid">08:40</div>
                <div className='spår'>2b</div>
                <div className='anmärkning'>Försenad</div>
                <div className="tågnr">1234</div>
            </div>

            <div className="grid">
                <div className="tid">08:10</div>
                <div className="från">Bålsta Enköping</div>
                <div className="nyTid">09:00</div>
                <div className="spår">1a</div>
                <div className="anmärkning">Sen tågvänd</div>
                <div className="tågnr">163</div>
            </div>

            <div className="grid">
                <div className="tid">08:36</div>
                <div className="från">Uppsala C Stockholm C</div>
                <div className="nyTid"></div>
                <div className="spår">5a</div>
                <div className="anmärkning">SJ Regional</div>
                <div className="tågnr">1553</div>
            </div>

            <div className="grid">
                <div className="tid">09:20</div>
                <div className="från">Bålsta Enköping</div>
                <div className="nyTid"></div>
                <div className="spår">3</div>
                <div className="anmärkning">SJ Regional</div>
                <div className="tågnr">643</div>
            </div>

            <div className="grid">
                <div className="tid">09:54</div>
                <div className="från">Bålsta Enköping</div>
                <div className="nyTid"></div>
                <div className="spår">4b</div>
                <div className="anmärkning">SJ Regional</div>
                <div className="tågnr">222</div>
            </div>


        </div>
    )
}

export default StandardTheme