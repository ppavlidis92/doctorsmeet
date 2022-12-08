var mongoose = require('mongoose');
var Schema = mongoose.Schema;


let familySchema = new Schema({
    member: {
        type: String,
        trim: true,
    },
    member_age: {
        type: Number,
        trim: true
    },
    health_state: {
        type: String,
        trim: true
    },
    member_age_death: {
        type: Number,
        trim: true
    },
    member_death_reason: {
        type: String,
        trim: true
    },

}, { _id: false })

let WhoWhereWhenSchema = new Schema({
    Who: {
        type: String,
        trim: true,
    },
    Where: {
        type: String,
        trim: true
    },
    When: {
        type: String,
        trim: true
    }
}, { _id: false })


let WhoWhenResultSchema = new Schema({
    Who: {
        type: String,
        trim: true,
    },
    When: {
        type: String,
        trim: true
    },
    Result: {
        type: String,
        trim: true
    }
}, { _id: false })



let RowsSchema = new Schema({
    reason: {
        type: String,
        trim: true
    }
}, { _id: false })



let patientSchema = new Schema({

    fname: {
        type: String,
        index: true,
        trim: true,
        required: [true, 'To όνομα είναι υποχρεωτικό']
    },
    lname: {
        type: String,
        index: true,
        trim: true,
        required: [true, 'To επίθετο είναι υποχρεωτικό']
    },

    gender: {
        type: String,     
        trim: true
    },
    email: {
        type: String,
        require: [true, 'To email είναι υποχρεωτικό'],
        trim: true
    },
    UserAmka: {
        type: Number,
        require: [true, 'Tο AMKA είναι υποχρεωτικό'],
        trim: true,
        // unique: [true,'Υπάρχει χρήστης με αυτό τον αριθμό AMKA']
    },
    doctor: {
        amka: { type: Number },
    },
    DateOfBirth: Date,
    start_date: Date,
    age: {
        type: Number
    },
    age_group: {
        type: String,
        trim: true
    },
    identification: {
        type: String,
        require: [true, 'Tα στοιχεία ταυτότητας είναι υποχρεωτικά'],
        trim: true,
        // unique: [true,'Υπάρχει χρήστης με αυτό τον αριθμό ταυτότητας']
    },
    AsfalistikoTameio: {
        type: String,
        require: [true, 'Tο ασφαλιστικό ταμείο είναι υποχρεωτικό'],
        trim: true
    },

    Address: {
        streetName: { type: String, require: true },
        streetNumber: { type: Number, require: true },
        streetZip: { type: Number, require: true }
    },
    mobile_number: {
        type: String,
        trim: true
    },
    home_number: {
        type: String,
        trim: true
    },
    familyTable: [familySchema],
    history: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },
    smoker: {
        type: Boolean,
        require: true,
    },
    alcohol: {
        type: Boolean,
        require: true,
    },
    army: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },
    annarotiki: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },
    therapia: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },
    eyesEarsDiscomfort: {
        type: Boolean,
        require: true,
    },
    illggous: {
        type: Boolean,
        require: true,
    },
    gastrenteriko: {
        type: Boolean,
        require: true,
    },
    anapnefstiko: {
        type: Boolean,
        require: true,
    },
    kukloforiako: {
        type: Boolean,
        require: true,
    },
    ouropoihtiko: {
        type: Boolean,
        require: true,
    },
    anaimia: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },
    alergia: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },
    egxeirish: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: [WhoWhereWhenSchema]
    },
    traumatismoi: {
        type: String,
        trim: true
    },
    osteosinthesi: {
        type: Boolean,
        require: true,
    },
    allesNosilies: [{
        type: String,
        trim: true
    }],
    SakxarodiDiabiti: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: [WhoWhenResultSchema]
    },
    gunaikologikaProblimata: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },
    egkuos: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },
    sullipseis: {
        type: String,
        trim: true
    },
    apovoles: {
        type: String,
        trim: true
    },
    checkup: {
        boolean: {
            type: Boolean,
            require: true,
        },
        Status: [WhoWhereWhenSchema],

    },
    metavoliVarous: {
        type: Boolean,
        require: true,
    },
    farmaka: {
        boolean: {
            type: Boolean,
            require: true,
        },
        Aitia: {
            type: String,
            trim: true
        },
        Eidos: {
            type: String,
            trim: true
        }
    },
    allo: {
        boolean: {
            type: Boolean,
            require: true,
        },
        text: {
            type: String,
            trim: true
        }
    },

    status: {
        type: String,
        enum: ['EXIST', 'DELETED']
    },
    completedByDoctor: {
        type: Boolean
    },
    ekthesiIatrou: {

        gnorizeteAstheni: {
            type: String
        },
        parakolouthisateAstheni: {
            type: String
        },
        upsos: {
            type: String
        },
        varos: {
            type: String
        },
        thorakas: {
            type: String
        },
        perimetosKoilias: {
            type: String
        },
        eispnoi: {
            type: String
        },
        ekpnoi: {
            type: String
        },

        anomaliesDiaplash: {
            type: String
        },
        sfikseis: {
            type: String
        },
        sfikseisRithmos: {
            type: String
        },
        sustolikiA: {
            type: String
        },
        diastolikiA: {
            type: String
        },
        sustolikiB: {
            type: String
        },
        diastolikiB: {
            type: String
        },
        akroasiKardias: {
            type: String
        },

        kardiakiOsi: {
            type: String
        },
        kardiakiOsiEanOxi: {
            type: String
        },
        kardiakiHxoi: {
            type: String
        },
        kardiakiHxoiOxi: {
            type: String
        },
        AkroashThoraka: {
            type: String
        },
        Dispnoia: {
            type: String
        },
        EpiskopisiKoilias: {
            type: String
        },
        Oules: {
            type: String
        },
        EmfanisiGlossas: {
            type: String
        },
        KatastashOulon: {
            type: String
        },
        flevikiKukloforia: {
            type: String
        },
        neurikoSusthma: {
            type: String
        },
        Antanaklastika: {
            type: String
        },
        Ourodoxos: {
            type: String
        },
        varosOuros: {
            type: String
        },
        leukoma: {
            type: String
        },
        SakxaroOyra: {
            type: String
        },
        diadikasiaOura: {
            type: String
        },
        blabhMuoskeletiko: {
            type: String
        },
        diogkoshThiroeidi: {
            type: String
        },
        dermatotherapeia: {
            type: String
        },
        proteinomenosGiaAsfaleia: {
            type: Boolean,

        },
        AuksimenoKundino: {
            type: Boolean,

        },
        Apporipsh: {
            type: Boolean,

        },
        peraiteroElegxos: {
            type: Boolean,

        },
        anablithei: {
            type: Boolean,

        },
        leptomeriesAKat: {
            type: String
        },
        DateOfSubmit: Date,
    }








})

//to call usersSchema
//we will call it by require 'Users'
// when we implement more dbs we will call it like so
// module.exports = DB_NAME.model('Users',usersSchema,'users')
//where 'users' the name of the collection

//module.exports.emailSchema =emailSchema
module.exports.patientSchema =patientSchema



