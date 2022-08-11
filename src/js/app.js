import readXlsxFile from 'read-excel-file'

function addToDiv(item) {
    const body = document.getElementById('body');

    body.innerHTML += `
        <tr class="even:bg-gray-100 hover:bg-gray-200">
            <td class="px-2 py-1">${item.countryCode}${item.vatNumber}</td>
            <td class="px-2 py-1">${item.valid}</td>
            <td class="px-2 py-1">${item.name}</td>
            <td class="px-2 py-1">${item.address}</td>
        </tr>
    `;
}

function soap(btw, tags) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://ec.europa.eu/taxation_customs/vies/services/checkVatService', true);

    let cc = btw.substring(0, 2);
    let vat = btw.slice(2);
    let arr = {};

    // build SOAP request
    var sr =`
        <SOAP-ENV:Envelope xmlns:ns0='urn:ec.europa.eu:taxud:vies:services:checkVat:types' xmlns:ns1='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/'>
        <SOAP-ENV:Header/>
            <ns1:Body>
                <ns0:checkVat>
                    <ns0:countryCode>${cc}</ns0:countryCode>
                    <ns0:vatNumber>${vat}</ns0:vatNumber>
                </ns0:checkVat>
            </ns1:Body>
        </SOAP-ENV:Envelope>
    `;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                let xmlDoc = xmlhttp.responseXML;
                tags.map((tag, i) => {
                    let res = xmlDoc.getElementsByTagName(tag)[0];
                    return arr[tag] = res.innerHTML;
                });

                addToDiv(arr);
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
}

const readXls = async () => {    
    const input = document.getElementById('input');

    await input.addEventListener('change', () => {
        readXlsxFile(input.files[0]).then((rows) => {
            rows.map((row, i) => {
                soap(row[0], ["countryCode","vatNumber","requestDate","valid","name","address"]);
            });
        })
    });
}

readXls();






// soap("NL852892275B01", ["countryCode","vatNumber","requestDate","valid","name","address"]);


