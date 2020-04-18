 
  function ProvinceFactory () {
    var province = [
        {
            "name": "آذربایجان شرقی",
        },
        {
            "name": "آذربایجان غربی",
        },
        {
            "name": "اردبیل",
        },
        {
            "name": "اصفهان",
        },
        {
            "name": "البرز",
        },
        {
            "name": "ایلام",
        },
        {
            "name": "بوشهر",
        },
        {
            "name": "تهران",
        },
        {
            "name": "چهارمحال و بختیاری",
        },
        {
            "name": "خراسان جنوبی",
        },
        {
            "name": "خراسان رضوی",
        },
        {
            "name": "خراسان شمالی",
        },
        {
            "name": "خوزستان",
        },
        {
            "name": "زنجان",
        },
        {
            "name": "سمنان",
        },
        {
            "name": "سیستان و بلوچستان",
        },
        {
            "name": "فارس",
        },
        {
            "name": "قزوین",
        },
        {
            "name": "قم",
        },
        {
            "name": "کردستان",
        },
        {
            "name": "کرمان",
        },
        {
            "name": "کرمانشاه",
        },
        {
            "name": "گلستان",
        },
        {
            "name": "گیلان",
        },
        {
            "name": "لرستان",
        },
        {
            "name": "مازندران",
        },
        {
            "name": "هرمزگان",
        },
        {
            "name": "مرکزی",
        },
        {
            "name": "همدان",
        },
        {
            "name": "یزد",
        },

    ];

    return {
        get: function () {
            return province;
        }
    }

}
 


module.exports = ngModule => {
     ngModule.factory('ProvinceFactory', ProvinceFactory);
};