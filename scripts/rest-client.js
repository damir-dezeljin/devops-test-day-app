const axios = require('axios');

const weatherApiUri = 'http://localhost:3000';
const _tempMargin = 21;

const doWork = async resolve => {
    try {
        let requestUrl = `${weatherApiUri}/weather_reports?location=Ljubljana`;
        response = await axios.get(
            requestUrl, {
            headers: { 'accept': 'application/json' },
        });
        var records = response.data.map(item => {
            dt = Date.parse(item.day) + (item.hour * 3600 * 1000);
            let obj = {}
            obj['id'] = item.id
            obj['epochDt'] = Math.floor(dt / 10000);
            obj['temp'] = item.temperature;
            return obj;
        });
        let epochDt = Math.max.apply(Math, records.map((el) => { return el.epochDt }));
        let lastEl = records.filter(obj => obj.epochDt === epochDt)[0];
        lastTemp = lastEl.temp
        lastId = lastEl.id
        lastTemp = Math.round(lastTemp * 10) / 10;
        console.log(`id=${lastId} / epochDt=${epochDt} / temp=${lastTemp}`);

        if (lastTemp > _tempMargin) {
            console.log("NOTE: Temperature to be decreased ...");

            requestUrl = `${weatherApiUri}/weather_reports/${lastId}`;
            console.log(`Patching to '${requestUrl}' ...`);
            axios.patch(requestUrl, {
                'weather_report': {
                    'temperature': lastTemp - 1,
                    'description': 'whatever'
                }
            })
                .then((response) => {
                    console.log(`DONE - new temperature set to = ${response.data.temperature} ˚C` );
                });
        }
    } catch (error) {
        console.log(error);
    }
}

doWork();
