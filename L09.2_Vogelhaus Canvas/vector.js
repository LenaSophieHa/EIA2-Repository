var a09_2_Vogelhaus;
(function (a09_2_Vogelhaus) {
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            let random1 = Math.floor(Math.random() * (1000 - 1) + 1);
            let random2 = Math.floor(Math.random() * (700 - 1) + 1);
            this.x = random1;
            this.y = random2;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = 1;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
    }
    a09_2_Vogelhaus.Vector = Vector;
    class VectorBird {
        x;
        y;
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        set(_x, _y) {
            let randomNum = Math.random() * (230 - 1) + 1;
            let randomNum2 = Math.random() * (1500 - 1) + 1;
            this.x = randomNum2;
            this.y = randomNum;
        }
        scale(_factor) {
            this.x = _factor;
            this.y = _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += -_addend.y;
        }
        random(_minLength, _maxLength) {
            let length = _minLength + Math.random() * (_maxLength - _minLength);
            let direction = 2;
            this.set(Math.cos(direction), Math.sin(direction));
            this.scale(length);
        }
    }
    a09_2_Vogelhaus.VectorBird = VectorBird;
})(a09_2_Vogelhaus || (a09_2_Vogelhaus = {}));
//# sourceMappingURL=Vector.js.map