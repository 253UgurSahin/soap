function soap() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://cors-anywhere.herokuapp.com/http://ec.europa.eu/taxation_customs/vies/services/checkVatService', true);

    // build SOAP request
    var sr =`
        <SOAP-ENV:Envelope xmlns:ns0='urn:ec.europa.eu:taxud:vies:services:checkVat:types' xmlns:ns1='http://schemas.xmlsoap.org/soap/envelope/' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:SOAP-ENV='http://schemas.xmlsoap.org/soap/envelope/'>
        <SOAP-ENV:Header/>
            <ns1:Body>
                <ns0:checkVat>
                    <ns0:countryCode>FR</ns0:countryCode>
                    <ns0:vatNumber>23</ns0:vatNumber>
                </ns0:checkVat>
            </ns1:Body>
        </SOAP-ENV:Envelope>
    `;

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                let xmlDoc = xmlhttp.responseXML;
                let x = xmlDoc.getElementsByTagName("valid")[0];
                // let y = x.childNodes[0];
                // let z = y.nodeValue;
                console.log(x.textContent);
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
}

soap();