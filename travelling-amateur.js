var countries = {
    "GB": {
        "name": "United Kingdom of Great Britain and Northern Ireland",
        "region": 1,
        "cept": true,
        "power": 400,
        "bandplan": "https://www.ofcom.org.uk/__data/assets/pdf_file/0027/62991/amateur-terms.pdf",
        "society": "Radio Society of Great Britain (RSGB)",
        "regulator": "Ofcom",
        "notes": [
            "Private repeaters are forbidden, so if you can hear it, it should be open for you.",
        ],
        "links": {
            "visitor info": "https://rsgb.org/main/operating/licensing-novs-visitors/operating-for-visitors/",
        },
    },
    "UK": { "alias": "GB" },
    "PT": {
        "name": "Portugal",
        "region": 1,
        "cept": true,
        "prefix": "CT7 (Portugal), CT8 (Azores), CT9 (Madeira)",
        "power": 1500,
        "bandplan": "http://www.arrlx.pt/wp-content/uploads/2018/09/QNAF-Anexo6-1.pdf",
        "notes": [
            "No access to 2.3-2.4GHz without special authorization.",
            "Only 300W on 70cm/2m"
        ],
    },
    "ZM": {
        "name": "Zambia",
        "region": 1,
        "society": "RADIO SOCIETY OF ZAMBIA (RSZ)",
    },
    "ZW": {
        "name": "Zimbabwe",
        "region": 1,
        "society": "ZIMBABWE AMATEUR RADIO SOCIETY (ZARS)",
    },
    "MZ": {
        "name": "Mozambique",
        "region": 1,
    },
    "MG": {
        "name": "Madagascar",
        "region": 1,
    },
    "SE": {
        "name": "Sweden",
        "region": 1,
        "cept": true,
        "prefix": "SM or SA",
        "swearing": true,
        "encryption": true,
        "regulator": "Post och telestyrelsen (PTS)",
        "notes": [
            "license schedule: PTSFS 2015:4 (also appendix F (H?) in 'KonCEPT')",
            "encryption still requires plaintext beacon",
        ],
    },
    "US": {
        "name": "United states of America",
        "region": 2,
        "cept": true,
        "iarp": true,
        "prefix": "W#/XXXXX (depending on state). {ND,MN,SD,NE,IA,CO,KS,MO}=0, {ME,VT,NH,MA,RI,CT}=1, NY=2, {PA,MD}=3, {TN,KY,VA,NC,SC,GA,AL,FL}=4, {NM,TX,OK,AR,LA,MS}=5, CA=6, {WA,OR,ID,MT,WY,NV,UT,AZ}=7, AK=KL7/XXXXX, HI=KH/XXXXX",
        "regulator": "Federal Communications Commission (FCC)",
        "society": "American Amateur Radio League (ARRL)",
        "notes": [
            "Private repeaters are a thing, so don't assume that just because you can hear it, that you can join it.",
        ],
        "links": {
            "Foreign licenses operating in the US": "http://www.arrl.org/foreign-licenses-operating-in-u-s",
        },
    },
    "BR": {
        "name": "Brazil",
        "regulator": '<a href="https://www.anatel.gov.br">Agência Nacional de Telecomunicações (Anatel)</a>',
        "society": '<a href="http://labre.org.br">Liga de Amadores Brasileiros de Rádio Emissão (LABRE)</a>',
        "region": 2,
        "iarp": true,
        "prefix": "P##/XXXXX (depending on region). Rio de Janeiro=PY1",
        "links": {
            "Detailed bandplan": "https://sei.anatel.gov.br/sei/modulos/pesquisa/md_pesq_documento_consulta_externa.php?eEP-wqk1skrd8hSlk5Z3rN4EVg9uLJqrLYJw_9INcO5ZbUbc1JBxftaaUBDDO81i7FFyVaw-TSvaagGEDIeFrqiLxVWGbMd8yCp9oLXowFweGssBMBhyzSo8PEQJfICc",
        },
        "notes": [
            "70cm band is 430-440MHz",
            "CEPT deal in progress, but not yet signed as of 2019-02-01",
        ],
        "bandplan": "https://www.anatel.gov.br/legislacao/resolucoes/2018/1157-resolucao-697",
    },
    "CH": {
        "name": "Switzerland",
        "region": 1,
        "cept": true,
        "prefix": "HB9/XXXXX",
    },
    "CA": {
        "name": "Canada",
        "region": 2,
        "iarp": true,
        "cept": true,
        "links": {
            "General amateur radio info": "http://www.ic.gc.ca/eic/site/025.nsf/eng/home",
        },
        "prefix": "Ontario: XXXXX/VE3, Quebec: XXXXX/VE2, BC: XXXXX/VE7",
    },
    "AU": {
        "name": "Australia",
        "cept": true,
        "region": 3,
        "links": {
            "License document": "https://www.legislation.gov.au/Details/F2015L01114",
            "Guidance for visitors": "https://www.acma.gov.au/licences/overseas-amateur-visiting-australia-class-licence",
        },
        "bandplan": "http://www.wia.org.au/members/bandplans/data/documents/Australian%20Band%20Plans%20191004.pdf",
        "prefix": "VK/XXXXX",
    },
};

var region_notes = {
    1: "40M band is 7000-7200kHz only. 2M is 144-146Mhz only. 70cm is 430-440MHz only.",
    2: "40M band is 7000-7300kHz. 2M is 144-148MHz. 70cm is 420-450MHz",
    3: "40M band is 7000-7200kHz. 2M is 144-148MHz. 70cm is 430-450MHz.",
};

function setup() {
    let o1 = document.getElementById("license");
    let o2 = document.getElementById("visiting");

    let active1 = "";
    let active2 = "";
    let hashset = false;
    if (window.location.hash) {
        let re = /^#(..),(..)$/;
        let m = re.exec(window.location.hash);
        if (m) {
            hashset = true;
            active1 = m[1];
            active2 = m[2];
        }
    }

    let keys = [];
    for (var k in countries) {
        keys.push(k);
    }
    keys.sort();
    for (let n in keys) {
        let code = keys[n];
        let data = countries[code];
        c1 = document.createElement("option");
        c2 = document.createElement("option");
        c1.innerText = `${code} - ${data["name"]}`;
        c2.innerText = `${code} - ${data["name"]}`;
        c1.value = code;
        c2.value = code;
        c1.selected = active1 == code;
        c2.selected = active2 == code;
        o1.appendChild(c1);
        o2.appendChild(c2);
    }
    o1.removeChild(o1.children[0]);
    o2.removeChild(o2.children[0]);
    if (hashset) {
        change();
    }
}
function getCountry(id) {
    var sel = document.getElementById(id);
    let code = sel.options[sel.selectedIndex].value;
    let ret = countries[code];
    ret["code"] = code;
    return ret;
}
function addNote(o, note) {
    var n = document.createElement("li");
    n.className = "note";
    n.innerHTML = note;
    o.appendChild(n);
}
function change() {
    var lic = getCountry("license");
    var vis = getCountry("visiting");
    var content = document.getElementById("content");
    var notes = document.createElement("ul");

    // Clear all old entries.
    let child = content.lastElementChild;
    while (child) {
        content.removeChild(child);
        child = content.lastElementChild;
    }

    if (lic == vis) {
        addNote(notes, "Choose different countries for license and visiting");
        content.appendChild(notes);
        return;
    }
    window.location.hash = `${lic.code},${vis.code}`;

    // Right to roam.
    if (vis["cept"] == true && lic["cept"] == true) {
        addNote(notes, `Both your license and visiting country is in CEPT TR-61/01, so you should be able to operate without prior authorization if you have the most advanced license.`);
    } else if (vis["iarp"] == true && lic["iarp"] == true) {
        addNote(notes, `Both your license and visiting country is in IARP, so you should be able to operate without prior authorization if you have the most advanced license`);
    } else {
        addNote(notes, `You probably <b>CANNOT</b> operate in this country without prior authorization from its regulatory body`);
    }

    // Region info.
    if (lic.region == vis.region) {
        addNote(notes, `Same region (${lic.region}) as your license, so most of the bandplan should be similar.`);
    } else {
        addNote(notes, `Your license is region ${lic.region}, while you are visiting region ${vis.region}.`);
        addNote(notes, `Region ${vis.region} notes: ${region_notes[vis.region]}`);
    }

    let t = undefined;
    let tl = undefined;
    // Some known data types.
    t = vis["prefix"];
    if (t != undefined) {
        addNote(notes, `The prefix (or pattern of prefix) when operating is: ${t}`);
    }

    t = vis["bandplan"];
    if (t != undefined) {
        addNote(notes, `<a href="${t}">Band plan</a>`);
    }

    t = vis["power"];
    if (t != undefined) {
        addNote(notes, `The max TX power <i>in general</i> is ${t} watts, but check the band plan before transmitting.`);
    }

    t = vis["regulator"];
    if (t != undefined) {
        addNote(notes, `The regulating body is ${t}`);
    }

    t = vis["society"];
    if (t != undefined) {
        addNote(notes, `The amateur radio society is ${t}`);
    }

    t = vis["cept"];
    if (t != undefined) {
        addNote(notes, `The country is a member of CEPT TR-60/01`);
    }
    t = vis["iarp"];
    if (t != undefined) {
        addNote(notes, `The country is a member of IARP`);
    }

    t = vis["swearing"] == true;
    tl = lic["swearing"] == true;
    if (t != tl) {
        if (t) {
            addNote(notes, `In this country profanity is allowed over the air`);
        } else {
            addNote(notes, `In this country profanity is <b>NOT</b> allowed over the air`);
        }
    }

    t = vis["encryption"] == true;
    tl = lic["encryption"] == true;
    if (t != tl) {
        if (t) {
            addNote(notes, `In this country encryption is allowed, with plaintext beacon`);
        } else {
            addNote(notes, `In this country encryption is <b>NOT</b> allowed`);
        }
    }

    // General links.
    let ls = vis["links"];
    if (ls != undefined) {
        addNote(notes, "Links");
        let nl = document.createElement("li");
        let np = document.createElement("ul");
        nl.appendChild(np);
        for (const [label, link] of Object.entries(ls)) {
            addNote(np, `<a href="${link}">${label}</a>`);
        };
        notes.appendChild(np);
    }

    // General notes.
    let n2 = vis["notes"];
    if (n2 != undefined) {
        addNote(notes, "General notes");
        let nl = document.createElement("li");
        let np = document.createElement("ul");
        nl.appendChild(np);
        n2.forEach(function(n) {
            addNote(np, `${n}`);
        });
        notes.appendChild(np);
    }
    if (false) {
        addNote(notes, "-------------- RAW data ---------");
        addNote(notes, JSON.stringify(vis, null, 2));
    }
    content.appendChild(notes);
}
setup();
