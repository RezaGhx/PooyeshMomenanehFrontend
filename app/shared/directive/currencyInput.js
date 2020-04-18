currencyInput.$inject = ["$filter", "$browser"];

function currencyInput($filter, $browser) {
    return {
        require: 'ngModel',
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            $element.addClass('numberInput');
            $element.parent().css("position", "relative");
            $element.parent()
                .append("<div class='text-price'></div>")
            var elementTextPrice = $element.parent().find(".text-price");



            var separators = {
                'thousands': $filter('number')(1000).substr(1, 1),
                'decimal': $filter('number')(1.1).substr(1, 1)
            }
            var decimalEntered = false;


            // Convert Price To Text By AmirHossein Abdollahzadeh

            const commanLang = {
                and: "و",
                toman: "تومان",
                rial: "ریال",
                thousand: "هزار",
                million: "میلیون",
                billion: "میلیارد",
                trillion: "تریلیون",
                zero: "صفر",
                yekan: ["صفر", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
                dahgan: ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
                dahyek: ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"],
                sadgan: ["", "یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"],
                invalid: "مقدار وارد شده نا معتبر است"
            }

            function textPriceHandler(text, element) {
                if (text) {
                    if (text == 0) {
                        element.css("opacity", "0");
                        element.css("visibility", "hidden");
                    }
                    else {

                        element.css(
                            {
                                bottom: "90%",
                                left: $element.position().left
                            }
                        );
                        element.css("opacity", 1);
                        element.css("visibility", "visible");
                        var number = Math.floor(parseInt(text) / 10);
                        var remain = parseInt(text) % 10;
                        if (element) {
                            element.empty();

                            if (text.length >= 16) {
                                element.append(commanLang.invalid);
                            }
                            else {
                                if (number > 0) {
                                    var toman = convertNumberToPersianString(number.toString());
                                    element.append(toman + " " + commanLang.toman);
                                }

                                if (remain > 0) {
                                    if (number > 0) {
                                        element.append(" " + commanLang.and + " ");
                                    }
                                    element.append(convertNumberToPersianString(remain.toString()) + " " + commanLang.rial);
                                }
                            }
                        }
                    }

                }
                else {
                    elementTextPrice.css("opacity", "0");
                    elementTextPrice.css("visibility", "hidden");
                }
            }

            function convertNumberToPersianString(number) {
                var base = ["", commanLang.thousand, commanLang.million, commanLang.billion, commanLang.trillion];
                var result = "";

                if (number == "0") {
                    return commanLang.zero;
                }
                else {
                    var remain = number.length % 3;
                    if (remain > 0) {
                        for (var i = 0; i < 3 - remain; i++) {
                            number = '0' + number;
                        }
                    }

                    var count = number.length / 3;
                    for (var i = 0; i < count; i++) {
                        var subNumber = parseInt(number.substring(i * 3, (i * 3) + 3));
                        if (subNumber != 0) {
                            result = result + convertThreeDigitNumberToPersianString(subNumber) + " " + base[count - 1 - i] + " " + commanLang.and + " ";
                        }
                    }
                    var removeLength = commanLang.and.length + 2;
                    result = result.substring(0, result.length - removeLength);
                }

                return result;
            }

            function convertThreeDigitNumberToPersianString(number) {

                var yekan = commanLang.yekan;
                var dahgan = commanLang.dahgan;
                var dahyek = commanLang.dahyek;
                var sadgan = commanLang.sadgan;

                var result = "";
                var digitSadgan, digitDahgan;

                digitDahgan = number % 100;
                digitSadgan = Math.floor(number / 100);

                if (digitSadgan != 0)
                    result = sadgan[digitSadgan] + " " + commanLang.and + " ";

                if ((digitDahgan >= 10) && (digitDahgan <= 19)) {
                    result = result + dahyek[digitDahgan - 10];
                } else {
                    var intOfDivide = Math.floor(digitDahgan / 10);
                    if (intOfDivide != 0)
                        result = result + dahgan[intOfDivide] + " " + commanLang.and + " ";

                    var remainOfDivide = digitDahgan % 10;
                    if (remainOfDivide != 0)
                        result = result + yekan[remainOfDivide] + " " + commanLang.and + " ";

                    var removeLength = commanLang.and.length + 2;
                    result = result.substring(0, result.length - removeLength);
                }
                return result;
            }


            var listener = function () {

                elementTextPrice.css("width", $element.css("width"));

                var value = $element.val().split(separators.thousands).join('').split(separators.decimal).join('.');

                textPriceHandler(value, elementTextPrice)

                if (decimalEntered) {
                    decimalEntered = false;
                    return;
                }
                if (value.indexOf('.') > 1 && value.slice(-1) == '0') { $element.val(value); return; }
                $element.val($filter('number')(value));
            }

            ngModelCtrl.$parsers.push(function (viewValue) {
                return viewValue.split(separators.thousands).join('').split(separators.decimal).join('.');
            })

            ngModelCtrl.$render = function () {
                $element.val($filter('number')(ngModelCtrl.$viewValue, false))
            }

            $element.bind('change', listener)
            $element.bind('focus', listener)

            $element.bind('blur', function (event) {
                elementTextPrice.css("display", "0");
                elementTextPrice.css("visibility", "hidden");
            })

            $element.bind('keydown keypress', function (event) {

                var key = event.which || event.keyCode || event.charCode;

                if (key == 9) {
                    elementTextPrice.css("opacity", "0");
                    elementTextPrice.css("visibility", "hidden");
                    return;
                }

                if (String.fromCharCode(key) == separators.decimal) decimalEntered = true;

                $browser.defer(listener)
            })

            $element.bind('paste cut', function () {
                $browser.defer(listener)
            })
        }
    }
}

module.exports = ngModule => {
    ngModule.directive('currencyInput', currencyInput);
};