"use strict";
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls[$rt_meta] && cls[$rt_meta].item) {
        ++arrayDegree;
        cls = cls[$rt_meta].item;
    }
    let clsName = "";
    if (cls[$rt_meta].primitiveKind !== 0) {
        clsName = cls[$rt_meta].name;
    } else {
        clsName = cls[$rt_meta] ? cls[$rt_meta].name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_meta = Symbol("teavm_meta"),
$rt_cls = cls => {
    if (cls[$rt_meta].classObject === null) {
        cls[$rt_meta].classObject = jl_Class_createClass(cls);
    }
    return cls[$rt_meta].classObject;
},
$rt_objcls = () => jl_Object,
$rt_callWithReceiver = f => function() {
    return f.apply(null, [this].concat(Array.prototype.slice.call(arguments)));
},
$rt_newClassMetadata = source => {
    return Object.assign({ name : null, binaryName : null, parent : null, superinterfaces : [], modifiers : 0, primitiveKind : 0, itemType : null, arrayType : null, enclosingClass : null, declaringClass : null, simpleName : null, clinit : () => {
    }, constructor : null, enumConstants : () => null, resolvedEnumConstants : null, reflection : null, classObject : null, assignableCache : null, valueToObject : o => o, objectToValue : o => o }, source || {  });
},
$rt_createPrimitiveCls = (name, binaryName, kind, config) => {
    let cls = () => {
    };
    let meta = $rt_newClassMetadata({ name : name, binaryName : binaryName, modifiers : 1 | 1 << 4, primitiveKind : kind });
    cls[$rt_meta] = meta;
    if (typeof config === 'function') {
        config(meta);
    }
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z", 1, meta => {
    {
        meta.valueToObject = o => jl_Boolean_valueOf(o);
    }
    {
        meta.objectToValue = o => jl_Boolean_booleanValue(o);
    }
}),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B", 2, meta => {
}),
$rt_shortcls = $rt_createPrimitiveCls("short", "S", 3, meta => {
}),
$rt_charcls = $rt_createPrimitiveCls("char", "C", 4, meta => {
}),
$rt_intcls = $rt_createPrimitiveCls("int", "I", 5, meta => {
    {
        meta.valueToObject = o => jl_Integer_valueOf(o);
    }
    {
        meta.objectToValue = o => jl_Integer_intValue(o);
    }
}),
$rt_longcls = $rt_createPrimitiveCls("long", "J", 6, meta => {
    {
        meta.valueToObject = o => jl_Long_valueOf(o);
    }
    {
        meta.objectToValue = o => jl_Long_longValue(o);
    }
}),
$rt_doublecls = $rt_createPrimitiveCls("double", "D", 8, meta => {
    {
        meta.valueToObject = o => jl_Double_valueOf(o);
    }
    {
        meta.objectToValue = o => jl_Double_doubleValue(o);
    }
}),
$rt_voidcls = $rt_createPrimitiveCls("void", "V", 9),
$rt_numberConversionBuffer = new ArrayBuffer(16),
$rt_numberConversionDoubleArray = new Float64Array($rt_numberConversionBuffer),
$rt_numberConversionIntArray = new Int32Array($rt_numberConversionBuffer),
$rt_numberConversionLongArray = new BigInt64Array($rt_numberConversionBuffer),
$rt_doubleToRawLongBits = n => {
    $rt_numberConversionDoubleArray[0] = n;
    return $rt_numberConversionLongArray[0];
},
$rt_equalDoubles = (a, b) => {
    if (a !== a) {
        return b !== b;
    }
    $rt_numberConversionDoubleArray[0] = a;
    $rt_numberConversionDoubleArray[1] = b;
    return $rt_numberConversionIntArray[0] === $rt_numberConversionIntArray[2] && $rt_numberConversionIntArray[1] === $rt_numberConversionIntArray[3];
},
$rt_compare = (a, b) => a === b ? 0 : a < b ?  -1 : 1,
$rt_compare_less = (a, b) => a === b ? 0 : a > b ? 1 :  -1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32))),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
Long_toNumber = val => Number(val),
Long_hi = val => Number(BigInt.asIntN(64, val >> BigInt(32))) | 0,
Long_lo = val => Number(BigInt.asIntN(32, val)) | 0,
Long_eq = (a, b) => a === b,
Long_lt = (a, b) => a < b,
Long_le = (a, b) => a <= b,
Long_add = (a, b) => BigInt.asIntN(64, a + b),
Long_neg = a => BigInt.asIntN(64,  -a),
Long_sub = (a, b) => BigInt.asIntN(64, a - b),
Long_ucompare = (a, b) => {
    a = BigInt.asUintN(64, a);
    b = BigInt.asUintN(64, b);
    return a < b ?  -1 : a > b ? 1 : 0;
};
let Long_mul = (a, b) => BigInt.asIntN(64, a * b),
Long_div = (a, b) => BigInt.asIntN(64, a / b),
Long_udiv = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) / BigInt.asUintN(64, b)),
Long_rem = (a, b) => BigInt.asIntN(64, a % b),
Long_urem = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) % BigInt.asUintN(64, b)),
Long_and = (a, b) => BigInt.asIntN(64, a & b),
Long_or = (a, b) => BigInt.asIntN(64, a | b),
Long_shl = (a, b) => BigInt.asIntN(64, a << BigInt(b & 63)),
Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63)),
Long_shru = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) >> BigInt(b & 63)),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_wrapArray = (cls, data) => new ($rt_arraycls(cls))(data),
$rt_createLongArrayFromData = data => {
    let buffer = new BigInt64Array(data.length);
    buffer.set(data);
    return new $rt_longArrayCls(buffer);
},
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createCharArrayFromData = data => {
    let buffer = new Uint16Array(data.length);
    buffer.set(data);
    return new $rt_charArrayCls(buffer);
},
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createShortArrayFromData = data => {
    let buffer = new Int16Array(data.length);
    buffer.set(data);
    return new $rt_shortArrayCls(buffer);
},
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz)),
$rt_arraycls = cls => {
    let result = cls[$rt_meta].arrayType;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls[$rt_meta].binaryName;
        JavaArray[$rt_meta] = $rt_newClassMetadata({ name : name, binaryName : name, parent : $rt_objcls(), itemType : cls });
        result = JavaArray;
        cls[$rt_meta].arrayType = JavaArray;
    }
    return result;
};
function $rt_arrayLength(array) {
    return array.data.length;
}
let $rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    for (let i = offset;i < limit;i = i + 1024 | 0) {
        let next = Math.min(limit, i + 1024 | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
    }
    return result;
},
$rt_str = str => str === null ? null : jl_String__init_3(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor[$rt_meta] && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (from === to) {
        return true;
    }
    let map = from[$rt_meta].assignableCache;
    if (map === null) {
        map = new Map();
        from[$rt_meta].assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to[$rt_meta].itemType !== null) {
        let result = from[$rt_meta].itemType !== null && $rt_isAssignable(from[$rt_meta].itemType, to[$rt_meta].itemType);
        map.set(to, result);
        return result;
    }
    let parent = from[$rt_meta].parent;
    if (parent !== null && parent !== from) {
        if ($rt_isAssignable(parent, to)) {
            map.set(to, true);
            return true;
        }
    }
    let superinterfaces = from[$rt_meta].superinterfaces;
    for (let i = 0;i < superinterfaces.length;i = i + 1 | 0) {
        if ($rt_isAssignable(superinterfaces[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_1(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => $rt_objcls(),
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_createOutputFunction = outputFunction => {
    let buffer = "";
    return msg => {
        let index = 0;
        while (true) {
            let next = msg.indexOf('\n', index);
            if (next < 0) {
                break;
            }
            outputFunction(buffer + msg.substring(index, next));
            buffer = "";
            index = next + 1;
        }
        buffer += msg.substring(index);
    };
},
$rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.error(msg)) : () => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_allClasses = [],
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        $rt_allClasses.push(cls);
        let m = $rt_newClassMetadata();
        cls[$rt_meta] = m;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.parent = superclass !== 0 ? superclass : null;
        m.superinterfaces = data[i++];
        if (m.parent) {
            cls.prototype = Object.create(m.parent.prototype);
        } else {
            cls.prototype = {  };
        }
        cls.prototype.constructor = cls;
        m.modifiers = data[i++];
        m.primitiveKind = 0;
        let innerClassInfo = data[i++];
        if (innerClassInfo !== 0) {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        m.clinit = clinit !== 0 ? () => {
            m.clinit = () => {
            };
            clinit();
        } : () => {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
    }
};
function jl_Object() {
    this.$id$ = 0;
}
let jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return $rt_cls(jl_Object_getClassInfo($this));
},
jl_Object_getClassInfo = var$0 => {
    return var$0.constructor;
},
jl_Object_hashCode = var$0 => {
    return jl_Object_identity(var$0);
},
jl_Object_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, var$1), 64), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
};
function jur_AbstractCharClass$LazyCharClass() {
    let a = this; jl_Object.call(a);
    a.$posValue = null;
    a.$negValue = null;
}
let jur_AbstractCharClass$LazyCharClass__init_ = $this => {
    jl_Object__init_($this);
},
jur_AbstractCharClass$LazyCharClass_getValue = ($this, $negative) => {
    if (!$negative && $this.$posValue === null)
        $this.$posValue = $this.$computeValue();
    else if ($negative && $this.$negValue === null)
        $this.$negValue = ($this.$computeValue()).$setNegative(1);
    if ($negative)
        return $this.$negValue;
    return $this.$posValue;
},
jur_AbstractCharClass$LazyBlank = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyBlank__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyBlank__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyBlank();
    jur_AbstractCharClass$LazyBlank__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyBlank_computeValue = $this => {
    return ((jur_CharClass__init_()).$add(32)).$add(9);
},
jur_AbstractCharClass$LazyCntrl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyCntrl__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyCntrl__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyCntrl();
    jur_AbstractCharClass$LazyCntrl__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyCntrl_computeValue = $this => {
    return ((jur_CharClass__init_()).$add0(0, 31)).$add(127);
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Number = $rt_classWithoutFields(),
jl_Number__init_ = $this => {
    jl_Object__init_($this);
},
jl_Comparable = $rt_classWithoutFields(0);
function jl_Integer() {
    jl_Number.call(this);
    this.$value2 = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_ = ($this, $value) => {
    jl_Integer_$callClinit();
    jl_Number__init_($this);
    $this.$value2 = $value;
},
jl_Integer__init_0 = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_(var_1, var_0);
    return var_1;
},
jl_Integer_toString0 = ($i, $radix) => {
    jl_Integer_$callClinit();
    if (!($radix >= 2 && $radix <= 36))
        $radix = 10;
    return ((jl_AbstractStringBuilder__init_1(20)).$append1($i, $radix)).$toString();
},
jl_Integer_hashCode0 = $value => {
    jl_Integer_$callClinit();
    return $value;
},
jl_Integer_toHexString = $i => {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
},
jl_Integer_toString = $i => {
    jl_Integer_$callClinit();
    return jl_Integer_toString0($i, 10);
},
jl_Integer_parseInt = ($s, $radix) => {
    jl_Integer_$callClinit();
    if ($s !== null)
        return jl_Integer_parseIntImpl($s, 0, jl_String_length($s), $radix);
    $rt_throw(jl_NumberFormatException__init_0($rt_s(0)));
},
jl_Integer_parseIntImpl = ($s, $beginIndex, $endIndex, $radix) => {
    let $negative, var$6, $value, $maxValue, var$9, $digit, var$11, var$12, var$13, var$14;
    jl_Integer_$callClinit();
    if ($beginIndex == $endIndex)
        $rt_throw(jl_NumberFormatException__init_0($rt_s(1)));
    if ($radix >= 2 && $radix <= 36) {
        a: {
            $negative = 0;
            switch ($s.$charAt($beginIndex)) {
                case 43:
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                case 45:
                    $negative = 1;
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                default:
            }
            var$6 = $beginIndex;
        }
        $value = 0;
        $maxValue = 1 + (2147483647 / $radix | 0) | 0;
        if (var$6 == $endIndex)
            $rt_throw(jl_NumberFormatException__init_2());
        while (true) {
            if (var$6 >= $endIndex) {
                if ($negative)
                    $value =  -$value | 0;
                return $value;
            }
            var$9 = var$6 + 1 | 0;
            $digit = jl_Integer_decodeDigit($s.$charAt(var$6));
            if ($digit < 0) {
                var$11 = new jl_NumberFormatException;
                var$12 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                var$13 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$13, $rt_s(2)), var$12);
                jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$13));
                $rt_throw(var$11);
            }
            if ($digit >= $radix) {
                var$12 = new jl_NumberFormatException;
                var$13 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                var$14 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$14, $rt_s(3)), $radix), $rt_s(4)), var$13);
                jl_NumberFormatException__init_(var$12, jl_StringBuilder_toString(var$14));
                $rt_throw(var$12);
            }
            if ($value > $maxValue)
                break;
            $value = $rt_imul($radix, $value) + $digit | 0;
            if ($value < 0) {
                if (var$9 == $endIndex && $value == (-2147483648) && $negative)
                    return (-2147483648);
                var$11 = new jl_NumberFormatException;
                var$12 = jl_String_valueOf($s.$subSequence($beginIndex, $endIndex));
                var$13 = jl_StringBuilder__init_();
                jl_StringBuilder_append(jl_StringBuilder_append(var$13, $rt_s(5)), var$12);
                jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$13));
                $rt_throw(var$11);
            }
            var$6 = var$9;
        }
        $rt_throw(jl_NumberFormatException__init_0($rt_s(6)));
    }
    var$11 = new jl_NumberFormatException;
    var$12 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append(var$12, $rt_s(7)), $radix);
    jl_NumberFormatException__init_(var$11, jl_StringBuilder_toString(var$12));
    $rt_throw(var$11);
},
jl_Integer_valueOf = $i => {
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_0($i);
},
jl_Integer_ensureIntegerCache = () => {
    let $j;
    jl_Integer_$callClinit();
    a: {
        if (jl_Integer_integerCache === null) {
            jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
            $j = 0;
            while (true) {
                if ($j >= jl_Integer_integerCache.data.length)
                    break a;
                jl_Integer_integerCache.data[$j] = jl_Integer__init_0($j - 128 | 0);
                $j = $j + 1 | 0;
            }
        }
    }
},
jl_Integer_intValue = $this => {
    return $this.$value2;
},
jl_Integer_longValue = $this => {
    return Long_fromInt($this.$value2);
},
jl_Integer_doubleValue = $this => {
    return $this.$value2;
},
jl_Integer_toString1 = $this => {
    return jl_Integer_toString($this.$value2);
},
jl_Integer_hashCode = $this => {
    return jl_Integer_hashCode0($this.$value2);
},
jl_Integer_equals = ($this, $other) => {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Integer && $other.$value2 == $this.$value2 ? 1 : 0;
},
jl_Integer_decodeDigit = $c => {
    jl_Integer_$callClinit();
    if ($c >= 48 && $c <= 57)
        return $c - 48 | 0;
    if ($c >= 97 && $c <= 122)
        return ($c - 97 | 0) + 10 | 0;
    if ($c >= 65 && $c <= 90)
        return ($c - 65 | 0) + 10 | 0;
    return (-1);
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16 | 0;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 >>> 8 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 >>> 4 | 0;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 >>> 2 | 0;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 >>> 1 | 0)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_numberOfTrailingZeros = $i => {
    let $n, var$3, var$4;
    jl_Integer_$callClinit();
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i << 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    var$4 = var$3 << 8;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 8;
    var$3 = var$4 << 4;
    if (!var$3)
        var$3 = var$4;
    else
        $n = $n | 4;
    var$4 = var$3 << 2;
    if (!var$4)
        var$4 = var$3;
    else
        $n = $n | 2;
    if (var$4 << 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_rotateLeft = ($i, $distance) => {
    let var$3;
    jl_Integer_$callClinit();
    var$3 = $distance & 31;
    return $i << var$3 | ($i >>> (32 - var$3 | 0) | 0);
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
},
igiae_Scheduler$Cancellable = $rt_classWithoutFields(0),
otj_JSObject = $rt_classWithoutFields(0),
igiaj_JsPluginContext$IdFn = $rt_classWithoutFields(0),
igiaj_JsPluginContext$9 = $rt_classWithoutFields(),
igiaj_JsPluginContext$9__init_ = $this => {
    jl_Object__init_($this);
},
igiaj_JsPluginContext$9__init_0 = () => {
    let var_0 = new igiaj_JsPluginContext$9();
    igiaj_JsPluginContext$9__init_(var_0);
    return var_0;
},
igiaj_JsPluginContext$9_call = ($this, $id) => {
    return igiaj_JsPluginContext_typedKey$js_body$_2($rt_ustr($id));
},
igiaj_JsPluginContext$9_call$exported$0 = (var$1, var$2) => {
    var$2 = $rt_str(var$2);
    return var$1.$call(var$2);
},
jl_AbstractStringBuilder$Constants = $rt_classWithoutFields(),
jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null,
jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null,
jl_AbstractStringBuilder$Constants_floatAnalysisResult = null,
jl_AbstractStringBuilder$Constants_$callClinit = () => {
    jl_AbstractStringBuilder$Constants_$callClinit = $rt_eraseClinit(jl_AbstractStringBuilder$Constants);
    jl_AbstractStringBuilder$Constants__clinit_();
},
jl_AbstractStringBuilder$Constants__clinit_ = () => {
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(10000), Long_fromInt(100000000), Long_create(1874919424, 2328306)]);
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = otcit_DoubleAnalyzer$Result__init_();
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = otcit_FloatAnalyzer$Result__init_0();
};
function jur_AbstractSet() {
    let a = this; jl_Object.call(a);
    a.$next2 = null;
    a.$isSecondPassVisited = 0;
    a.$index3 = null;
    a.$type0 = 0;
}
let jur_AbstractSet_counter = 0,
jur_AbstractSet_$callClinit = () => {
    jur_AbstractSet_$callClinit = $rt_eraseClinit(jur_AbstractSet);
    jur_AbstractSet__clinit_();
},
jur_AbstractSet__init_ = $this => {
    let var$1;
    jur_AbstractSet_$callClinit();
    jl_Object__init_($this);
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    $this.$index3 = jl_Integer_toString(var$1);
},
jur_AbstractSet__init_0 = ($this, $n) => {
    let var$2;
    jur_AbstractSet_$callClinit();
    jl_Object__init_($this);
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    $this.$index3 = jl_Integer_toString(var$2);
    $this.$next2 = $n;
},
jur_AbstractSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $length;
    $length = $matchResult.$getRightBound();
    while (true) {
        if ($stringIndex > $length)
            return (-1);
        if ($this.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_AbstractSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($this.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_AbstractSet_setType = ($this, $type) => {
    $this.$type0 = $type;
},
jur_AbstractSet_getType = $this => {
    return $this.$type0;
},
jur_AbstractSet_getQualifiedName = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$index3;
    var$2 = $this.$getName();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(var$3, 60), var$1), 58), var$2), 62);
    return jl_StringBuilder_toString(var$3);
},
jur_AbstractSet_toString = $this => {
    return $this.$getQualifiedName();
},
jur_AbstractSet_getNext = $this => {
    return $this.$next2;
},
jur_AbstractSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_AbstractSet_first = ($this, $set) => {
    return 1;
},
jur_AbstractSet_processBackRefReplacement = $this => {
    return null;
},
jur_AbstractSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    if ($this.$next2 !== null) {
        if (!$this.$next2.$isSecondPassVisited) {
            $set = $this.$next2.$processBackRefReplacement();
            if ($set !== null) {
                $this.$next2.$isSecondPassVisited = 1;
                $this.$next2 = $set;
            }
            $this.$next2.$processSecondPass();
        } else if ($this.$next2 instanceof jur_SingleSet && $this.$next2.$fSet.$isBackReferenced)
            $this.$next2 = $this.$next2.$next2;
    }
},
jur_AbstractSet__clinit_ = () => {
    jur_AbstractSet_counter = 1;
};
function jur_JointSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$children = null;
    a.$fSet = null;
    a.$groupIndex = 0;
}
let jur_JointSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_JointSet__init_2 = () => {
    let var_0 = new jur_JointSet();
    jur_JointSet__init_(var_0);
    return var_0;
},
jur_JointSet__init_0 = ($this, $children, $fSet) => {
    jur_AbstractSet__init_($this);
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$getGroupIndex();
},
jur_JointSet__init_1 = (var_0, var_1) => {
    let var_2 = new jur_JointSet();
    jur_JointSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_JointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $e, $shift;
    if ($this.$children === null)
        return (-1);
    $start = $matchResult.$getStart($this.$groupIndex);
    $matchResult.$setStart($this.$groupIndex, $stringIndex);
    $size = $this.$children.$size();
    $i = 0;
    while (true) {
        if ($i >= $size) {
            $matchResult.$setStart($this.$groupIndex, $start);
            return (-1);
        }
        $e = $this.$children.$get($i);
        $shift = $e.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_JointSet_setNext = ($this, $next) => {
    $this.$fSet.$setNext($next);
},
jur_JointSet_getName = $this => {
    return $rt_s(8);
},
jur_JointSet_first = ($this, $set) => {
    let $i;
    a: {
        if ($this.$children !== null) {
            $i = $this.$children.$iterator();
            while (true) {
                if (!$i.$hasNext())
                    break a;
                if (!($i.$next()).$first($set))
                    continue;
                else
                    return 1;
            }
        }
    }
    return 0;
},
jur_JointSet_hasConsumed = ($this, $matchResult) => {
    let var$2, var$3;
    a: {
        if ($matchResult.$getEnd($this.$groupIndex) >= 0) {
            var$2 = $matchResult.$getStart($this.$groupIndex);
            var$3 = $this.$groupIndex;
            if (var$2 == $matchResult.$getEnd(var$3)) {
                var$2 = 0;
                break a;
            }
        }
        var$2 = 1;
    }
    return var$2;
},
jur_JointSet_processSecondPass = $this => {
    let $childrenSize, $i, $child, $set;
    $this.$isSecondPassVisited = 1;
    if ($this.$fSet !== null && !$this.$fSet.$isSecondPassVisited)
        $this.$fSet.$processSecondPass();
    a: {
        if ($this.$children !== null) {
            $childrenSize = $this.$children.$size();
            $i = 0;
            while (true) {
                if ($i >= $childrenSize)
                    break a;
                $child = $this.$children.$get($i);
                $set = $child.$processBackRefReplacement();
                if ($set === null)
                    $set = $child;
                else {
                    $child.$isSecondPassVisited = 1;
                    $this.$children.$remove($i);
                    $this.$children.$add1($i, $set);
                }
                if (!$set.$isSecondPassVisited)
                    $set.$processSecondPass();
                $i = $i + 1 | 0;
            }
        }
    }
    if ($this.$next2 !== null)
        jur_AbstractSet_processSecondPass($this);
};
function jur_SingleSet() {
    jur_JointSet.call(this);
    this.$kid = null;
}
let jur_SingleSet__init_ = ($this, $child, $fSet) => {
    jur_JointSet__init_($this);
    $this.$kid = $child;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$getGroupIndex();
},
jur_SingleSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_SingleSet();
    jur_SingleSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_SingleSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $shift;
    $start = $matchResult.$getStart($this.$groupIndex);
    $matchResult.$setStart($this.$groupIndex, $stringIndex);
    $shift = $this.$kid.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    $matchResult.$setStart($this.$groupIndex, $start);
    return (-1);
},
jur_SingleSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$find($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        $matchResult.$setStart($this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_findBack = ($this, $stringIndex, $lastIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$findBack($stringIndex, $lastIndex, $testString, $matchResult);
    if ($res >= 0)
        $matchResult.$setStart($this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_first = ($this, $set) => {
    return $this.$kid.$first($set);
},
jur_SingleSet_processBackRefReplacement = $this => {
    let $set;
    $set = jur_BackReferencedSingleSet__init_0($this);
    $this.$next2 = $set;
    return $set;
},
jur_SingleSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    if ($this.$fSet !== null && !$this.$fSet.$isSecondPassVisited)
        $this.$fSet.$processSecondPass();
    if ($this.$kid !== null && !$this.$kid.$isSecondPassVisited) {
        $set = $this.$kid.$processBackRefReplacement();
        if ($set !== null) {
            $this.$kid.$isSecondPassVisited = 1;
            $this.$kid = $set;
        }
        $this.$kid.$processSecondPass();
    }
},
igiaj_JsPluginContext$SubscribeFn = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$7() {
    jl_Object.call(this);
    this.$val$events0 = null;
}
let igiaj_JsPluginContext$7__init_ = ($this, var$1) => {
    $this.$val$events0 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$7__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$7();
    igiaj_JsPluginContext$7__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$7_call = ($this, $topic, $listener) => {
    let $cancellable;
    $cancellable = $this.$val$events0.$subscribe($topic, igiaj_JsPluginContext$7$1__init_0($this, $listener));
    return igiaj_JsPluginContext_disposerOf($cancellable);
},
igiaj_JsPluginContext$7_call$exported$0 = (var$1, var$2, var$3) => {
    var$2 = $rt_str(var$2);
    var$3 = otji_JS_functionAsObject(var$3, "call");
    return otji_JS_function(var$1.$call0(var$2, var$3), "dispose");
},
igiaj_JsPluginContext$ProvideFn = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$8() {
    jl_Object.call(this);
    this.$val$session = null;
}
let igiaj_JsPluginContext$8__init_ = ($this, var$1) => {
    $this.$val$session = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$8__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$8();
    igiaj_JsPluginContext$8__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$8_call = ($this, $key, $implementation) => {
    let $failure, $$je;
    a: {
        try {
            igiae_PluginSession_provide($this.$val$session, $rt_str(igiaj_JsPluginContext_capabilityId$js_body$_4($key)), otji_JSWrapper_wrap($implementation));
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof igiae_PluginException) {
                $failure = $$je;
                igiaj_JsErrors_raise$js_body$_4(igiaj_JsErrors_of($failure));
                break a;
            } else {
                throw $$e;
            }
        }
    }
},
igiaj_JsPluginContext$8_call$exported$0 = (var$1, var$2, var$3) => {
    var$1.$call1(var$2, var$3);
},
igiaj_JsPluginContext$IdsFn = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$5() {
    jl_Object.call(this);
    this.$val$services2 = null;
}
let igiaj_JsPluginContext$5__init_ = ($this, var$1) => {
    $this.$val$services2 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$5__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$5();
    igiaj_JsPluginContext$5__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$5_call = $this => {
    return igiaj_JsJson_fromStrings($this.$val$services2.$ids());
},
igiaj_JsPluginContext$5_call$exported$0 = var$1 => {
    return var$1.$call2();
},
igiaj_JsPluginContext$PublishFn = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$6() {
    jl_Object.call(this);
    this.$val$events = null;
}
let igiaj_JsPluginContext$6__init_ = ($this, var$1) => {
    $this.$val$events = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$6__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$6();
    igiaj_JsPluginContext$6__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$6_call = ($this, $topic, $payload) => {
    $this.$val$events.$publish($topic, otji_JSWrapper_wrap($payload));
},
igiaj_JsPluginContext$6_call$exported$0 = (var$1, var$2, var$3) => {
    var$2 = $rt_str(var$2);
    var$1.$call3(var$2, var$3);
},
igiaj_JsPluginContext$WatchFn = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$3() {
    jl_Object.call(this);
    this.$val$services0 = null;
}
let igiaj_JsPluginContext$3__init_ = ($this, var$1) => {
    $this.$val$services0 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$3__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$3();
    igiaj_JsPluginContext$3__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$3_call = ($this, $id, $listener) => {
    let $cancellable;
    $cancellable = $this.$val$services0.$watch($id, igiaj_JsPluginContext$3$1__init_0($this, $listener));
    return igiaj_JsPluginContext_disposerOf($cancellable);
},
igiaj_JsPluginContext$3_call$exported$0 = (var$1, var$2, var$3) => {
    var$2 = $rt_str(var$2);
    var$3 = otji_JS_functionAsObject(var$3, "call");
    return otji_JS_function(var$1.$call4(var$2, var$3), "dispose");
},
igiaj_JsPluginContext$RegisterFn = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$4() {
    jl_Object.call(this);
    this.$val$services3 = null;
}
let igiaj_JsPluginContext$4__init_ = ($this, var$1) => {
    $this.$val$services3 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$4__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$4();
    igiaj_JsPluginContext$4__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$4_call = ($this, $id, $service) => {
    let $cancellable, var$4, $failure, $$je;
    a: {
        try {
            $cancellable = $this.$val$services3.$register($id, otji_JSWrapper_wrap($service));
            var$4 = igiaj_JsPluginContext_disposerOf($cancellable);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof igiae_PluginException) {
                $failure = $$je;
                break a;
            } else {
                throw $$e;
            }
        }
        return var$4;
    }
    igiaj_JsErrors_raise$js_body$_4(igiaj_JsErrors_of($failure));
    return null;
},
igiaj_JsPluginContext$4_call$exported$0 = (var$1, var$2, var$3) => {
    var$2 = $rt_str(var$2);
    return otji_JS_function(var$1.$call5(var$2, var$3), "dispose");
},
jur_AbstractCharClass$LazyAlpha = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyAlpha__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyAlpha__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlpha();
    jur_AbstractCharClass$LazyAlpha__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlpha_computeValue = $this => {
    return ((jur_CharClass__init_()).$add0(97, 122)).$add0(65, 90);
};
function igiaj_JsPluginContext$1() {
    jl_Object.call(this);
    this.$val$services1 = null;
}
let igiaj_JsPluginContext$1__init_ = ($this, var$1) => {
    $this.$val$services1 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$1__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$1();
    igiaj_JsPluginContext$1__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$1_call = ($this, $id) => {
    return igiaj_JsPluginHost_orUndefined$js_body$_10(otji_JSWrapper_unwrap($this.$val$services1.$get0($id)));
},
igiaj_JsPluginContext$1_call$exported$0 = (var$1, var$2) => {
    var$2 = $rt_str(var$2);
    return var$1.$call(var$2);
},
igiaj_JsPluginContext$WantFn = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$2() {
    jl_Object.call(this);
    this.$val$services = null;
}
let igiaj_JsPluginContext$2__init_ = ($this, var$1) => {
    $this.$val$services = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$2__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$2();
    igiaj_JsPluginContext$2__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$2_call = ($this, $id, $options) => {
    let $timeoutMs, $pending;
    $timeoutMs = igiaj_JsPluginContext_timeoutOf($options);
    $pending = $timeoutMs === null ? $this.$val$services.$want($id) : $this.$val$services.$want0($id, $timeoutMs.$longValue());
    return igiaj_JsPluginHost_promise($pending);
},
igiaj_JsPluginContext$2_call$exported$0 = (var$1, var$2, var$3) => {
    var$2 = $rt_str(var$2);
    return var$1.$call6(var$2, var$3);
},
jur_BackReferencedSingleSet = $rt_classWithoutFields(jur_SingleSet),
jur_BackReferencedSingleSet__init_ = ($this, $node) => {
    jur_SingleSet__init_($this, $node.$kid, $node.$fSet);
},
jur_BackReferencedSingleSet__init_0 = var_0 => {
    let var_1 = new jur_BackReferencedSingleSet();
    jur_BackReferencedSingleSet__init_(var_1, var_0);
    return var_1;
},
jur_BackReferencedSingleSet_find = ($this, $startSearch, $testString, $matchResult) => {
    let $res, $lastIndex, $saveStart;
    $res = 0;
    $lastIndex = $matchResult.$getRightBound();
    a: {
        while (true) {
            if ($startSearch > $lastIndex) {
                $startSearch = $res;
                break a;
            }
            $saveStart = $matchResult.$getStart($this.$groupIndex);
            $matchResult.$setStart($this.$groupIndex, $startSearch);
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            $matchResult.$setStart($this.$groupIndex, $saveStart);
            $startSearch = $startSearch + 1 | 0;
        }
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $res, $saveStart;
    $res = 0;
    a: {
        while (true) {
            if ($startSearch < $stringIndex) {
                $startSearch = $res;
                break a;
            }
            $saveStart = $matchResult.$getStart($this.$groupIndex);
            $matchResult.$setStart($this.$groupIndex, $startSearch);
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            $matchResult.$setStart($this.$groupIndex, $saveStart);
            $startSearch = $startSearch + (-1) | 0;
        }
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_processBackRefReplacement = $this => {
    return null;
},
jur_AbstractCharClass$LazyWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyWord__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyWord__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyWord();
    jur_AbstractCharClass$LazyWord__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyWord_computeValue = $this => {
    return ((((jur_CharClass__init_()).$add0(97, 122)).$add0(65, 90)).$add0(48, 57)).$add(95);
},
jur_AbstractCharClass$LazyNonWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyWord),
jur_AbstractCharClass$LazyNonWord__init_ = $this => {
    jur_AbstractCharClass$LazyWord__init_($this);
},
jur_AbstractCharClass$LazyNonWord__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonWord();
    jur_AbstractCharClass$LazyNonWord__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonWord_computeValue = $this => {
    let $chCl;
    $chCl = (jur_AbstractCharClass$LazyWord_computeValue($this)).$setNegative(1);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function jur_LeafSet() {
    jur_AbstractSet.call(this);
    this.$charCount0 = 0;
}
let jur_LeafSet__init_0 = ($this, $next) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$charCount0 = 1;
    $this.$setType(1);
},
jur_LeafSet__init_ = $this => {
    jur_AbstractSet__init_($this);
    $this.$charCount0 = 1;
},
jur_LeafSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    if (($stringIndex + $this.$charCount() | 0) > $matchResult.$getRightBound()) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $shift = $this.$accepts($stringIndex, $testString);
    if ($shift < 0)
        return (-1);
    return $this.$next2.$matches($stringIndex + $shift | 0, $testString, $matchResult);
},
jur_LeafSet_charCount = $this => {
    return $this.$charCount0;
},
jur_LeafSet_hasConsumed = ($this, $mr) => {
    return 1;
};
function jur_CISequenceSet() {
    jur_LeafSet.call(this);
    this.$string0 = null;
}
let jur_CISequenceSet__init_ = ($this, $substring) => {
    jur_LeafSet__init_($this);
    $this.$string0 = $substring.$toString();
    $this.$charCount0 = $substring.$length();
},
jur_CISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_CISequenceSet();
    jur_CISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_CISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i, var$4, var$5, var$6;
    $i = 0;
    while (true) {
        if ($i >= jl_String_length($this.$string0))
            return jl_String_length($this.$string0);
        var$4 = jl_String_charAt($this.$string0, $i);
        var$5 = $strIndex + $i | 0;
        if (var$4 != $testString.$charAt(var$5)) {
            var$6 = $this.$string0;
            if (jur_Pattern_getSupplement(jl_String_charAt(var$6, $i)) != $testString.$charAt(var$5))
                break;
        }
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_CISequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string0;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(9)), var$1);
    return jl_StringBuilder_toString(var$2);
},
jl_CharSequence = $rt_classWithoutFields(0),
ju_Map = $rt_classWithoutFields(0),
ju_SequencedMap = $rt_classWithoutFields(0);
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message0 = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
let jl_Throwable__init_ = $this => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
},
jl_Throwable__init_2 = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_(var_0);
    return var_0;
},
jl_Throwable__init_0 = ($this, $message) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message0 = $message;
},
jl_Throwable__init_1 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message0;
},
jl_Throwable_getLocalizedMessage = $this => {
    return $this.$getMessage();
},
jl_Throwable_getCause = $this => {
    return $this.$cause === $this ? null : $this.$cause;
},
jl_Throwable_toString = $this => {
    let $message, var$2, var$3, var$4;
    $message = $this.$getLocalizedMessage();
    var$2 = jl_Class_getName(jl_Object_getClass($this));
    if ($message === null)
        var$3 = $rt_s(10);
    else {
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(4)), $message);
        var$3 = jl_StringBuilder_toString(var$3);
    }
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$4, var$2), var$3);
    return jl_StringBuilder_toString(var$4);
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_0 = $this => {
    jl_Throwable__init_($this);
},
jl_Exception__init_1 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_0(var_0);
    return var_0;
},
jl_Exception__init_ = ($this, $message) => {
    jl_Throwable__init_0($this, $message);
},
jl_Exception__init_2 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_0($this);
},
jl_RuntimeException__init_2 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_($this, $message);
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_IndexOutOfBoundsException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_0(var_0);
    return var_0;
},
jl_IndexOutOfBoundsException__init_2 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IndexOutOfBoundsException__init_1 = var_0 => {
    let var_1 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_2(var_1, var_0);
    return var_1;
},
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_0 = $this => {
    jl_IndexOutOfBoundsException__init_0($this);
},
jl_StringIndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
};
function ju_MissingResourceException() {
    let a = this; jl_RuntimeException.call(a);
    a.$className = null;
    a.$key0 = null;
}
let ju_MissingResourceException__init_ = ($this, $s, $className, $key) => {
    jl_RuntimeException__init_0($this, $s);
    $this.$className = $className;
    $this.$key0 = $key;
},
ju_MissingResourceException__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new ju_MissingResourceException();
    ju_MissingResourceException__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
igiaj_JsPluginHost = $rt_classWithoutFields(),
igiaj_JsPluginHost_from = $tree => {
    let $app, $api, $surfaces, $vocabulary, $wellKnownServices, $host;
    $app = igiaj_JsPluginHost_text($tree, $rt_s(11));
    $api = igiaj_JsPluginHost_intOr($tree, $rt_s(12), 2);
    $surfaces = igiaj_JsPluginHost_strings(igiaj_JsPluginHost_member($tree, $rt_s(13)));
    $vocabulary = igiaj_JsPluginHost_strings(igiaj_JsPluginHost_member($tree, $rt_s(14)));
    $wellKnownServices = igiaj_JsPluginHost_strings(igiaj_JsPluginHost_member($tree, $rt_s(15)));
    $host = igiae_PluginHost__init_0($app, $api, $surfaces, igiaj_JsScheduler__init_0());
    igiae_PluginHost_knownCapabilities($host, $vocabulary);
    igiae_PluginHost_wellKnownServices($host, $wellKnownServices);
    return igiaj_JsPluginHost_build($host);
},
igiaj_JsPluginHost_build = $host => {
    let var$2, var$3, var$4, $descriptor, $supports, $verifyActivation, $contextFor, $capability, $service, $provideService, $markBroken, $release, $entries, $entry, $recordDeclared, $ledger;
    var$2 = igiae_PluginHost_getApp($host);
    var$3 = igiae_PluginHost_getApi($host);
    var$4 = igiaj_JsJson_fromStrings(igiae_PluginHost_getSurfaces($host));
    $descriptor = igiaj_JsPluginHost_descriptorObject$js_body$_16($rt_ustr(var$2), var$3, var$4);
    $supports = igiaj_JsPluginHost$1__init_0($host);
    $verifyActivation = igiaj_JsPluginHost$2__init_0($host);
    $contextFor = igiaj_JsPluginHost$3__init_0($host, $descriptor);
    $capability = igiaj_JsPluginHost$4__init_0($host);
    $service = igiaj_JsPluginHost$5__init_0($host);
    $provideService = igiaj_JsPluginHost$6__init_0($host);
    $markBroken = igiaj_JsPluginHost$7__init_0($host);
    $release = igiaj_JsPluginHost$8__init_0($host);
    $entries = igiaj_JsPluginHost$9__init_0($host);
    $entry = igiaj_JsPluginHost$10__init_0($host);
    $recordDeclared = igiaj_JsPluginHost$11__init_0($host);
    $ledger = igiaj_JsPluginHost_ledgerObject$js_body$_17(otji_JS_function(otji_JSWrapper_unwrap($entries), "call"), otji_JS_function(otji_JSWrapper_unwrap($entry), "call"), otji_JS_function(otji_JSWrapper_unwrap($recordDeclared), "call"));
    return igiaj_JsPluginHost_assemble$js_body$_20($descriptor, $ledger, otji_JS_function(otji_JSWrapper_unwrap($supports), "call"), otji_JS_function(otji_JSWrapper_unwrap($contextFor), "call"), otji_JS_function(otji_JSWrapper_unwrap($verifyActivation), "call"), otji_JS_function(otji_JSWrapper_unwrap($capability), "call"), otji_JS_function(otji_JSWrapper_unwrap($service), "call"), otji_JS_function(otji_JSWrapper_unwrap($provideService), "call"), otji_JS_function(otji_JSWrapper_unwrap($markBroken), "call"), otji_JS_function(otji_JSWrapper_unwrap($release),
    "call"));
},
igiaj_JsPluginHost_promise = $pending => {
    let var$2;
    var$2 = igiaj_JsPluginHost$12__init_0($pending);
    return igiaj_JsPluginHost_guarded$js_body$_4(new Promise(otji_JS_function(otji_JSWrapper_unwrap(var$2), "onExecute")));
},
igiaj_JsPluginHost_factsOf = $manifestObj => {
    let $tree, $id, $api, $capabilities, $permissions;
    $tree = igiaj_JsJson_toTree($manifestObj);
    $id = igiaj_JsPluginHost_text($tree, $rt_s(16));
    $api = igiaj_JsPluginHost_intOr($tree, $rt_s(12), 0);
    $capabilities = igiaj_JsPluginHost_strings(igiaj_JsPluginHost_member($tree, $rt_s(17)));
    $permissions = igiaj_JsPluginHost_strings(igiaj_JsPluginHost_member($tree, $rt_s(18)));
    return igiae_ManifestFacts__init_0($id, $api, $capabilities, $permissions, otji_JSWrapper_wrap($manifestObj));
},
igiaj_JsPluginHost_errorOf = ($pluginId, $error) => {
    let $tree;
    $tree = igiaj_JsJson_toTree($error);
    return igiae_PluginException__init_0($pluginId, igiaj_JsPluginHost_text($tree, $rt_s(19)), igiaj_JsPluginHost_text($tree, $rt_s(20)));
},
igiaj_JsPluginHost_wrapBus = $bus => {
    return igiaj_JsPluginHost$13__init_0($bus);
},
igiaj_JsPluginHost_lower = $status => {
    igiae_PluginStatus_$callClinit();
    if ($status === igiae_PluginStatus_ACTIVE)
        return $rt_s(21);
    if ($status === igiae_PluginStatus_BROKEN)
        return $rt_s(22);
    if ($status !== igiae_PluginStatus_STOPPED)
        return $rt_s(23);
    return $rt_s(24);
},
igiaj_JsPluginHost_serviceEvent = $registered => {
    return !$registered ? $rt_s(25) : $rt_s(26);
},
igiaj_JsPluginHost_ledgerRow = $entry => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
    var$2 = igiae_LedgerEntry_getPluginId($entry);
    var$3 = igiaj_JsPluginHost_lower(igiae_LedgerEntry_getStatus($entry));
    var$4 = igiaj_JsJson_fromStrings(igiae_LedgerEntry_getCapabilitiesDeclared($entry));
    var$5 = igiaj_JsJson_fromStrings(igiae_LedgerEntry_getCapabilitiesProvided($entry));
    var$6 = igiaj_JsJson_fromStrings(igiae_LedgerEntry_getServicesProvided($entry));
    var$7 = igiaj_JsJson_fromStrings(igiae_LedgerEntry_getServicesConsumed($entry));
    var$8 = igiaj_JsJson_fromStrings(igiae_LedgerEntry_getTopics($entry));
    var$9 = igiaj_JsJson_fromStrings(igiae_LedgerEntry_getPermissions($entry));
    var$10 = igiae_LedgerEntry_getErrorDetail($entry);
    var$11 = igiae_LedgerEntry_getErrorFix($entry);
    return igiaj_JsPluginHost_ledgerRowObject$js_body$_19($rt_ustr(var$2), $rt_ustr(var$3), var$4, var$5, var$6, var$7, var$8, var$9, $rt_ustr(var$10), $rt_ustr(var$11));
},
igiaj_JsPluginHost_member = ($tree, $name) => {
    return !$rt_isInstance($tree, ju_Map) ? null : $tree.$get1($name);
},
igiaj_JsPluginHost_text = ($tree, $name) => {
    let $found;
    $found = igiaj_JsPluginHost_member($tree, $name);
    return $found !== null ? jl_String_valueOf($found) : null;
},
igiaj_JsPluginHost_intOr = ($tree, $name, $fallback) => {
    let $found;
    $found = igiaj_JsPluginHost_member($tree, $name);
    if ($found instanceof jl_Number)
        $fallback = $found.$intValue();
    return $fallback;
},
igiaj_JsPluginHost_strings = $value => {
    let $out, var$3, $item;
    a: {
        $out = ju_ArrayList__init_();
        if ($rt_isInstance($value, ju_List)) {
            var$3 = $value.$iterator();
            while (true) {
                if (!var$3.$hasNext())
                    break a;
                $item = var$3.$next();
                $out.$add2(jl_String_valueOf($item));
            }
        }
    }
    return $out;
},
igiaj_JsPluginHost_guarded$js_body$_4 = var$1 => {
    var$1.catch(function() {
    });
    return var$1;
},
igiaj_JsPluginHost_orUndefined$js_body$_10 = var$1 => {
    return var$1 === null ? undefined : var$1;
},
igiaj_JsPluginHost_descriptorObject$js_body$_16 = (var$1, var$2, var$3) => {
    return { app : var$1, api : var$2, surfaces : var$3 };
},
igiaj_JsPluginHost_ledgerObject$js_body$_17 = (var$1, var$2, var$3) => {
    return { entries : var$1, entry : var$2, recordDeclared : var$3 };
},
igiaj_JsPluginHost_capabilityRecord$js_body$_18 = (var$1, var$2) => {
    return { pluginId : var$1, implementation : var$2 };
},
igiaj_JsPluginHost_ledgerRowObject$js_body$_19 = (var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10) => {
    var row = { pluginId : var$1, status : var$2, capabilitiesDeclared : var$3, capabilitiesProvided : var$4, servicesProvided : var$5, servicesConsumed : var$6, topics : var$7, permissions : var$8 };
    if (var$9 !== null) {
        row.error = { detail : var$9, fix : var$10 };
    }
    return row;
},
igiaj_JsPluginHost_assemble$js_body$_20 = (var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10) => {
    return { descriptor : var$1, ledger : var$2, supports : var$3, contextFor : var$4, verifyActivation : var$5, capability : var$6, service : var$7, provideService : var$8, markBroken : var$9, release : var$10 };
},
igiae_Activation = $rt_classWithoutFields(),
igiae_Activation_order = (var$1, var$2, var$3) => {
    let var$4, var$5, var$6, var$7, var$8, var$9, var$10, $needed, var$12, $provider, $cycles, $settled, $cycle, $order, $progressed, $pending, $dependency;
    var$4 = ju_HashMap__init_();
    var$5 = var$1.$iterator();
    while (var$5.$hasNext()) {
        var$6 = var$5.$next();
        var$7 = (igiae_Activation_listOf(var$2, var$6)).$iterator();
        while (var$7.$hasNext()) {
            var$8 = var$7.$next();
            var$9 = var$4.$get1(var$8);
            if (var$9 === null) {
                var$9 = ju_ArrayList__init_();
                var$4.$put(var$8, var$9);
            }
            var$9.$add2(var$6);
        }
    }
    var$10 = ju_HashMap__init_();
    var$7 = var$1.$iterator();
    while (var$7.$hasNext()) {
        var$6 = var$7.$next();
        $needed = ju_LinkedHashSet__init_();
        var$12 = (igiae_Activation_listOf(var$3, var$6)).$iterator();
        while (var$12.$hasNext()) {
            var$8 = var$12.$next();
            var$5 = (igiae_Activation_listOf(var$4, var$8)).$iterator();
            while (var$5.$hasNext()) {
                $provider = var$5.$next();
                if (!jl_String_equals($provider, var$6))
                    $needed.$add2($provider);
            }
        }
        var$10.$put(var$6, $needed);
    }
    $cycles = igiae_Activation_findCycles(var$1, var$10);
    $settled = ju_HashSet__init_0();
    var$7 = $cycles.$iterator();
    while (var$7.$hasNext()) {
        $cycle = var$7.$next();
        $settled.$addAll($cycle);
    }
    $order = ju_ArrayList__init_();
    $progressed = 1;
    while ($progressed) {
        $progressed = 0;
        var$5 = var$1.$iterator();
        while (var$5.$hasNext()) {
            var$6 = var$5.$next();
            if ($settled.$contains(var$6))
                continue;
            $pending = 0;
            var$7 = (var$10.$get1(var$6)).$iterator();
            a: {
                while (var$7.$hasNext()) {
                    $dependency = var$7.$next();
                    if (!$settled.$contains($dependency)) {
                        $pending = 1;
                        break a;
                    }
                }
            }
            if ($pending)
                continue;
            $order.$add2(var$6);
            $settled.$add2(var$6);
            $progressed = 1;
        }
    }
    return igiae_ActivationPlan__init_0($order, $cycles);
},
igiae_Activation_listOf = ($source, $key) => {
    let $found;
    $found = $source === null ? null : $source.$get1($key);
    if ($found === null)
        $found = ju_ArrayList__init_();
    return $found;
},
igiae_Activation_findCycles = ($ids, $dependencies) => {
    let $state, var$4, $id;
    $state = igiae_Activation$Tarjan__init_0($dependencies);
    var$4 = $ids.$iterator();
    while (var$4.$hasNext()) {
        $id = var$4.$next();
        if (!(igiae_Activation$Tarjan_access$000($state)).$containsKey($id))
            igiae_Activation$Tarjan_visit($state, $id);
    }
    return igiae_Activation$Tarjan_access$100($state);
};
function jur_CIBackReferenceSet() {
    let a = this; jur_JointSet.call(a);
    a.$referencedGroup = 0;
    a.$consCounter1 = 0;
}
let jur_CIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_JointSet__init_($this);
    $this.$referencedGroup = $groupIndex;
    $this.$consCounter1 = $consCounter;
},
jur_CIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CIBackReferenceSet();
    jur_CIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7;
    $group = $this.$getString($matchResult);
    if ($group !== null && ($stringIndex + jl_String_length($group) | 0) <= $matchResult.$getRightBound()) {
        $i = 0;
        while (true) {
            if ($i >= jl_String_length($group)) {
                $matchResult.$setConsumed($this.$consCounter1, jl_String_length($group));
                return $this.$next2.$matches($stringIndex + jl_String_length($group) | 0, $testString, $matchResult);
            }
            var$6 = jl_String_charAt($group, $i);
            var$7 = $stringIndex + $i | 0;
            if (var$6 != $testString.$charAt(var$7) && jur_Pattern_getSupplement(jl_String_charAt($group, $i)) != $testString.$charAt(var$7))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jur_CIBackReferenceSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_CIBackReferenceSet_getString = ($this, $matchResult) => {
    let $res;
    $res = $matchResult.$getGroupNoCheck($this.$referencedGroup);
    return $res;
},
jur_CIBackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append(var$2, $rt_s(27)), var$1);
    return jl_StringBuilder_toString(var$2);
},
jur_CIBackReferenceSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter1) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter1, (-1));
    return $res;
};
function jur_UCIBackReferenceSet() {
    jur_CIBackReferenceSet.call(this);
    this.$groupIndex1 = 0;
}
let jur_UCIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_UCIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_UCIBackReferenceSet();
    jur_UCIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_UCIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7;
    $group = $this.$getString($matchResult);
    if ($group !== null && ($stringIndex + jl_String_length($group) | 0) <= $matchResult.$getRightBound()) {
        $i = 0;
        while (true) {
            if ($i >= jl_String_length($group)) {
                $matchResult.$setConsumed($this.$consCounter1, jl_String_length($group));
                return $this.$next2.$matches($stringIndex + jl_String_length($group) | 0, $testString, $matchResult);
            }
            var$6 = jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($group, $i)));
            var$7 = $stringIndex + $i | 0;
            var$7 = jl_Character_toUpperCase($testString.$charAt(var$7));
            if (var$6 != jl_Character_toLowerCase(var$7))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jur_UCIBackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex1;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append(var$2, $rt_s(28)), var$1);
    return jl_StringBuilder_toString(var$2);
};
function jur_AbstractCharClass$LazyCategory() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category1 = 0;
    a.$mayContainSupplCodepoints1 = 0;
    a.$containsAllSurrogates0 = 0;
}
let jur_AbstractCharClass$LazyCategory__init_0 = ($this, $cat, $mayContainSupplCodepoints) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategory__init_1 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$containsAllSurrogates0 = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_1(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategory_computeValue = $this => {
    let $chCl;
    $chCl = jur_UnicodeCategory__init_0($this.$category1);
    if ($this.$containsAllSurrogates0)
        $chCl.$lowHighSurrogates.$set(0, 2048);
    $chCl.$mayContainSupplCodepoints0 = $this.$mayContainSupplCodepoints1;
    return $chCl;
};
function jur_QuantifierSet() {
    jur_AbstractSet.call(this);
    this.$innerSet = null;
}
let jur_QuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$innerSet = $innerSet;
    $this.$setType($type);
},
jur_QuantifierSet_getInnerSet = $this => {
    return $this.$innerSet;
},
jur_QuantifierSet_first = ($this, $set) => {
    return !$this.$innerSet.$first($set) && !$this.$next2.$first($set) ? 0 : 1;
},
jur_QuantifierSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_QuantifierSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    if ($this.$next2 !== null && !$this.$next2.$isSecondPassVisited) {
        $set = $this.$next2.$processBackRefReplacement();
        if ($set !== null) {
            $this.$next2.$isSecondPassVisited = 1;
            $this.$next2 = $set;
        }
        $this.$next2.$processSecondPass();
    }
    if ($this.$innerSet !== null) {
        if (!$this.$innerSet.$isSecondPassVisited) {
            $set = $this.$innerSet.$processBackRefReplacement();
            if ($set !== null) {
                $this.$innerSet.$isSecondPassVisited = 1;
                $this.$innerSet = $set;
            }
            $this.$innerSet.$processSecondPass();
        } else if ($this.$innerSet instanceof jur_SingleSet && $this.$innerSet.$fSet.$isBackReferenced)
            $this.$innerSet = $this.$innerSet.$next2;
    }
},
jur_DotAllQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_DotAllQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_DotAllQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_DotAllQuantifierSet();
    jur_DotAllQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_DotAllQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$getRightBound();
    if ($strLength > $stringIndex)
        return $this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_DotAllQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$getRightBound();
    if ($this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult) >= 0)
        return $stringIndex;
    return (-1);
},
jur_DotAllQuantifierSet_getName = $this => {
    return $rt_s(29);
},
otji_JSWrapper$Helper = $rt_classWithoutFields(),
otji_JSWrapper$Helper_hashCodes = null,
otji_JSWrapper$Helper_wrappers = null,
otji_JSWrapper$Helper_stringWrappers = null,
otji_JSWrapper$Helper_numberWrappers = null,
otji_JSWrapper$Helper_undefinedWrapper = null,
otji_JSWrapper$Helper_stringFinalizationRegistry = null,
otji_JSWrapper$Helper_numberFinalizationRegistry = null,
otji_JSWrapper$Helper_$callClinit = () => {
    otji_JSWrapper$Helper_$callClinit = $rt_eraseClinit(otji_JSWrapper$Helper);
    otji_JSWrapper$Helper__clinit_();
},
otji_JSWrapper$Helper_lambda$static$1 = $token => {
    otji_JSWrapper$Helper_$callClinit();
    otji_JSWrapper$Helper_numberWrappers.delete($token);
},
otji_JSWrapper$Helper_lambda$static$0 = $token => {
    otji_JSWrapper$Helper_$callClinit();
    otji_JSWrapper$Helper_stringWrappers.delete($token);
},
otji_JSWrapper$Helper__clinit_ = () => {
    let var$1;
    otji_JSWrapper$Helper_hashCodes = new WeakMap();
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new WeakMap();
    otji_JSWrapper$Helper_wrappers = var$1;
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new Map();
    otji_JSWrapper$Helper_stringWrappers = var$1;
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new Map();
    otji_JSWrapper$Helper_numberWrappers = var$1;
    if (otji_JSWrapper$Helper_stringWrappers === null)
        var$1 = null;
    else {
        var$1 = otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_0();
        var$1 = new FinalizationRegistry(otji_JS_function(otji_JSWrapper_unwrap(var$1), "accept"));
    }
    otji_JSWrapper$Helper_stringFinalizationRegistry = var$1;
    if (otji_JSWrapper$Helper_numberWrappers === null)
        var$1 = null;
    else {
        var$1 = otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_0();
        var$1 = new FinalizationRegistry(otji_JS_function(otji_JSWrapper_unwrap(var$1), "accept"));
    }
    otji_JSWrapper$Helper_numberFinalizationRegistry = var$1;
},
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_118_0 = $rt_classWithoutFields(),
jl_String$_clinit_$lambda$_118_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jl_String$_clinit_$lambda$_118_0__init_0 = () => {
    let var_0 = new jl_String$_clinit_$lambda$_118_0();
    jl_String$_clinit_$lambda$_118_0__init_(var_0);
    return var_0;
};
function jur_FSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$isBackReferenced = 0;
    a.$groupIndex0 = 0;
}
let jur_FSet_posFSet = null,
jur_FSet_$callClinit = () => {
    jur_FSet_$callClinit = $rt_eraseClinit(jur_FSet);
    jur_FSet__clinit_();
},
jur_FSet__init_ = ($this, $groupIndex) => {
    jur_FSet_$callClinit();
    jur_AbstractSet__init_($this);
    $this.$groupIndex0 = $groupIndex;
},
jur_FSet__init_0 = var_0 => {
    let var_1 = new jur_FSet();
    jur_FSet__init_(var_1, var_0);
    return var_1;
},
jur_FSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $end, $shift;
    $end = $matchResult.$getEnd($this.$groupIndex0);
    $matchResult.$setEnd($this.$groupIndex0, $stringIndex);
    $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $matchResult.$setEnd($this.$groupIndex0, $end);
    return $shift;
},
jur_FSet_getGroupIndex = $this => {
    return $this.$groupIndex0;
},
jur_FSet_getName = $this => {
    return $rt_s(30);
},
jur_FSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_FSet__clinit_ = () => {
    jur_FSet_posFSet = jur_FSet$PossessiveFSet__init_0();
},
jur_BehindFSet = $rt_classWithoutFields(jur_FSet),
jur_BehindFSet__init_ = ($this, $groupIndex) => {
    jur_FSet__init_($this, $groupIndex);
},
jur_BehindFSet__init_0 = var_0 => {
    let var_1 = new jur_BehindFSet();
    jur_BehindFSet__init_(var_1, var_0);
    return var_1;
},
jur_BehindFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr, $rightBound;
    $gr = $this.$getGroupIndex();
    $rightBound = $matchResult.$getConsumed($gr);
    if ($rightBound != $stringIndex)
        $stringIndex = (-1);
    return $stringIndex;
},
jur_BehindFSet_getName = $this => {
    return $rt_s(31);
},
igiae_Diagnostics = $rt_classWithoutFields(),
igiae_Diagnostics_strict = null,
igiae_Diagnostics_sink = null,
igiae_Diagnostics_$callClinit = () => {
    igiae_Diagnostics_$callClinit = $rt_eraseClinit(igiae_Diagnostics);
    igiae_Diagnostics__clinit_();
},
igiae_Diagnostics_isStrict = () => {
    igiae_Diagnostics_$callClinit();
    if (igiae_Diagnostics_strict === null)
        igiae_Diagnostics_strict = jl_Boolean_valueOf(jl_String_equals($rt_s(32), jl_System_getenv($rt_s(33))));
    return igiae_Diagnostics_strict.$booleanValue();
},
igiae_Diagnostics_setStrict = $enabled => {
    igiae_Diagnostics_$callClinit();
    igiae_Diagnostics_strict = $enabled;
},
igiae_Diagnostics_setSink = $destination => {
    igiae_Diagnostics_$callClinit();
    igiae_Diagnostics_sink = $destination;
},
igiae_Diagnostics_ignoreUnknown = ($kind, $id, $source) => {
    igiae_Diagnostics_$callClinit();
    igiae_Diagnostics_report((((((((jl_StringBuilder__init_()).$append3($rt_s(34))).$append3($kind)).$append3($rt_s(35))).$append3($id)).$append3($rt_s(36))).$append3($source)).$toString());
},
igiae_Diagnostics_report = $message => {
    let $destination;
    igiae_Diagnostics_$callClinit();
    $destination = igiae_Diagnostics_sink;
    if ($destination !== null) {
        $destination.$accept($message);
        return;
    }
    if (igiae_Diagnostics_isStrict())
        (jl_System_err()).$println((((jl_StringBuilder__init_()).$append3($rt_s(37))).$append3($message)).$toString());
},
igiae_Diagnostics__clinit_ = () => {
    igiae_Diagnostics_strict = null;
    igiae_Diagnostics_sink = null;
},
igiaj_JsPluginHost$IdFn = $rt_classWithoutFields(0);
function jur_LowHighSurrogateRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$surrChars = null;
    a.$alt1 = 0;
}
let jur_LowHighSurrogateRangeSet__init_ = ($this, $surrChars) => {
    jur_JointSet__init_($this);
    $this.$surrChars = $surrChars.$getInstance();
    $this.$alt1 = $surrChars.$alt;
},
jur_LowHighSurrogateRangeSet__init_0 = var_0 => {
    let var_1 = new jur_LowHighSurrogateRangeSet();
    jur_LowHighSurrogateRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_LowHighSurrogateRangeSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_LowHighSurrogateRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $startStr, $strLength, var$6, var$7, $ch, $low, $high;
    $startStr = $matchResult.$getLeftBound();
    $strLength = $matchResult.$getRightBound();
    var$6 = $stringIndex + 1 | 0;
    var$7 = $rt_compare(var$6, $strLength);
    if (var$7 > 0) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $ch = $testString.$charAt($stringIndex);
    if (!$this.$surrChars.$contains0($ch))
        return (-1);
    if (jl_Character_isHighSurrogate($ch)) {
        if (var$7 < 0) {
            $low = $testString.$charAt(var$6);
            if (jl_Character_isLowSurrogate($low))
                return (-1);
        }
    } else if (jl_Character_isLowSurrogate($ch) && $stringIndex > $startStr) {
        $high = $testString.$charAt($stringIndex - 1 | 0);
        if (jl_Character_isHighSurrogate($high))
            return (-1);
    }
    return $this.$next2.$matches(var$6, $testString, $matchResult);
},
jur_LowHighSurrogateRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt1 ? $rt_s(38) : $rt_s(39);
    var$2 = $this.$surrChars.$toString();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(40)), var$1), var$2);
    return jl_StringBuilder_toString(var$3);
},
jur_GroupQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_GroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_GroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_GroupQuantifierSet();
    jur_GroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_GroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_GroupQuantifierSet_getName = $this => {
    return $rt_s(41);
},
jur_ReluctantGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_ReluctantGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_ReluctantGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_ReluctantGroupQuantifierSet();
    jur_ReluctantGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_ReluctantGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $res = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        return $res;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException);
function igiae_Scheduler$1$1() {
    jl_Object.call(this);
    this.$this$034 = null;
}
let igiae_Scheduler$1$1__init_ = ($this, $this$0) => {
    $this.$this$034 = $this$0;
    jl_Object__init_($this);
},
igiae_Scheduler$1$1__init_0 = var_0 => {
    let var_1 = new igiae_Scheduler$1$1();
    igiae_Scheduler$1$1__init_(var_1, var_0);
    return var_1;
},
igiae_Scheduler$1$1_cancel = $this => {
    return;
};
function ju_AbstractMap() {
    let a = this; jl_Object.call(a);
    a.$cachedKeySet = null;
    a.$cachedValues = null;
}
let ju_AbstractMap__init_ = $this => {
    jl_Object__init_($this);
},
ju_AbstractMap_put = ($this, $key, $value) => {
    $rt_throw(jl_UnsupportedOperationException__init_());
},
ju_AbstractMap_equals = ($this, $obj) => {
    let $other, $it, $entry, $$je;
    if ($this === $obj)
        return 1;
    if (!$rt_isInstance($obj, ju_Map))
        return 0;
    $other = $obj;
    if ($this.$size() != $other.$size())
        return 0;
    a: {
        try {
            $it = ($this.$entrySet()).$iterator();
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_ClassCastException) {
                break a;
            } else if ($$je instanceof jl_NullPointerException) {
                break a;
            } else {
                throw $$e;
            }
        }
        b: {
            c: {
                try {
                    while ($it.$hasNext()) {
                        $entry = $it.$next();
                        if (!$other.$containsKey($entry.$getKey()))
                            break b;
                        if (!ju_Objects_equals($entry.$getValue(), $other.$get1($entry.$getKey())))
                            break c;
                    }
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_ClassCastException) {
                        break a;
                    } else if ($$je instanceof jl_NullPointerException) {
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                return 1;
            }
            try {
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_ClassCastException) {
                    break a;
                } else if ($$je instanceof jl_NullPointerException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return 0;
        }
        try {
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_ClassCastException) {
                break a;
            } else if ($$je instanceof jl_NullPointerException) {
                break a;
            } else {
                throw $$e;
            }
        }
        return 0;
    }
    return 0;
},
ju_AbstractMap_hashCode = $this => {
    let $result, $iter, $entry;
    $result = 0;
    $iter = ($this.$entrySet()).$iterator();
    while ($iter.$hasNext()) {
        $entry = $iter.$next();
        $result = $result + $entry.$hashCode0() | 0;
    }
    return $result;
},
ju_AbstractMap_toString = $this => {
    let $sb, $iter, $e;
    $sb = jl_StringBuilder__init_();
    $sb.$append0(123);
    $iter = ($this.$entrySet()).$iterator();
    if ($iter.$hasNext()) {
        $e = $iter.$next();
        $sb.$append($e.$getKey() !== $this ? $e.$getKey() : $rt_s(42));
        $sb.$append0(61);
        $sb.$append($e.$getValue() !== $this ? $e.$getValue() : $rt_s(42));
    }
    while ($iter.$hasNext()) {
        $sb.$append3($rt_s(43));
        $e = $iter.$next();
        $sb.$append($e.$getKey() !== $this ? $e.$getKey() : $rt_s(42));
        $sb.$append0(61);
        $sb.$append($e.$getValue() !== $this ? $e.$getValue() : $rt_s(42));
    }
    $sb.$append0(125);
    return $sb.$toString();
},
jl_Cloneable = $rt_classWithoutFields(0);
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount = 0;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
let ju_HashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
},
ju_HashMap__init_1 = $this => {
    ju_HashMap__init_0($this, 16);
},
ju_HashMap__init_ = () => {
    let var_0 = new ju_HashMap();
    ju_HashMap__init_1(var_0);
    return var_0;
},
ju_HashMap__init_0 = ($this, $capacity) => {
    ju_HashMap__init_2($this, $capacity, 0.75);
},
ju_HashMap__init_3 = var_0 => {
    let var_1 = new ju_HashMap();
    ju_HashMap__init_0(var_1, var_0);
    return var_1;
},
ju_HashMap_calculateCapacity = $x => {
    let var$2, var$3;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    var$3 = var$2 | var$2 >> 1;
    var$3 = var$3 | var$3 >> 2;
    var$3 = var$3 | var$3 >> 4;
    var$3 = var$3 | var$3 >> 8;
    var$3 = var$3 | var$3 >> 16;
    return var$3 + 1 | 0;
},
ju_HashMap__init_2 = ($this, $capacity, $loadFactor) => {
    let var$3;
    ju_AbstractMap__init_($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount = 0;
        $this.$elementData = $this.$newElementArray(var$3);
        $this.$loadFactor = $loadFactor;
        ju_HashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
},
ju_HashMap__init_4 = (var_0, var_1) => {
    let var_2 = new ju_HashMap();
    ju_HashMap__init_2(var_2, var_0, var_1);
    return var_2;
},
ju_HashMap_computeThreshold = $this => {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor | 0;
},
ju_HashMap_containsKey = ($this, $key) => {
    let $m;
    $m = ju_HashMap_entryByKey($this, $key);
    return $m === null ? 0 : 1;
},
ju_HashMap_get = ($this, $key) => {
    let $m;
    $m = ju_HashMap_entryByKey($this, $key);
    if ($m === null)
        return null;
    return $m.$value0;
},
ju_HashMap_entryByKey = ($this, $key) => {
    let $m, $hash, $index;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = $key.$hashCode0();
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    }
    return $m;
},
ju_HashMap_findNonNullKeyEntry = ($this, $key, $index, $keyHash) => {
    let $m;
    $m = $this.$elementData.data[$index];
    while ($m !== null && !($m.$origKeyHash == $keyHash && ju_HashMap_areEqualKeys($key, $m.$key))) {
        $m = $m.$next3;
    }
    return $m;
},
ju_HashMap_findNullKeyEntry = $this => {
    let $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next3;
    }
    return $m;
},
ju_HashMap_isEmpty = $this => {
    return $this.$elementCount ? 0 : 1;
},
ju_HashMap_keySet = $this => {
    if ($this.$cachedKeySet === null)
        $this.$cachedKeySet = ju_HashMap$1__init_0($this);
    return $this.$cachedKeySet;
},
ju_HashMap_put = ($this, $key, $value) => {
    return ju_HashMap_putImpl($this, $key, $value);
},
ju_HashMap_putImpl = ($this, $key, $value) => {
    let $entry, var$4, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount = $this.$modCount + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, null, 0, 0);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    } else {
        $hash = $key.$hashCode0();
        $index = $hash & ($this.$elementData.data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount = $this.$modCount + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, $key, $index, $hash);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    }
    $result = $entry.$value0;
    $entry.$value0 = $value;
    return $result;
},
ju_HashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry;
    $entry = ju_HashMap$HashEntry__init_0($key, $hash);
    $entry.$next3 = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    return $entry;
},
ju_HashMap_rehash0 = ($this, $capacity) => {
    let $length, $newData, $i, $entry, var$6, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray($length);
    $i = 0;
    while ($i < $this.$elementData.data.length) {
        $entry = $this.$elementData.data[$i];
        $this.$elementData.data[$i] = null;
        while ($entry !== null) {
            var$6 = $newData.data;
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next3;
            $entry.$next3 = var$6[$index];
            var$6[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap_rehash = $this => {
    $this.$rehash0($this.$elementData.data.length);
},
ju_HashMap_remove = ($this, $key) => {
    let $entry;
    $entry = ju_HashMap_removeByKey($this, $key);
    if ($entry === null)
        return null;
    return $entry.$value0;
},
ju_HashMap_removeEntry = ($this, $entry) => {
    let $index, $m;
    $index = $entry.$origKeyHash & ($this.$elementData.data.length - 1 | 0);
    $m = $this.$elementData.data[$index];
    if ($m === $entry)
        $this.$elementData.data[$index] = $entry.$next3;
    else {
        while ($m.$next3 !== $entry) {
            $m = $m.$next3;
        }
        $m.$next3 = $entry.$next3;
    }
    $this.$modCount = $this.$modCount + 1 | 0;
    $this.$elementCount = $this.$elementCount - 1 | 0;
},
ju_HashMap_removeByKey = ($this, $key) => {
    let $index, $last, $entry, $entry_0, $hash;
    a: {
        $index = 0;
        $last = null;
        if ($key === null) {
            $entry = $this.$elementData.data[0];
            while ($entry !== null) {
                if ($entry.$key === null)
                    break a;
                $entry_0 = $entry.$next3;
                $last = $entry;
                $entry = $entry_0;
            }
        } else {
            $hash = $key.$hashCode0();
            $index = $hash & ($this.$elementData.data.length - 1 | 0);
            $entry = $this.$elementData.data[$index];
            while ($entry !== null && !($entry.$origKeyHash == $hash && ju_HashMap_areEqualKeys($key, $entry.$key))) {
                $entry_0 = $entry.$next3;
                $last = $entry;
                $entry = $entry_0;
            }
        }
    }
    if ($entry === null)
        return null;
    if ($last !== null)
        $last.$next3 = $entry.$next3;
    else
        $this.$elementData.data[$index] = $entry.$next3;
    $this.$modCount = $this.$modCount + 1 | 0;
    $this.$elementCount = $this.$elementCount - 1 | 0;
    return $entry;
},
ju_HashMap_size = $this => {
    return $this.$elementCount;
},
ju_HashMap_areEqualKeys = ($key1, $key2) => {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
};
function ju_LinkedHashMap() {
    let a = this; ju_HashMap.call(a);
    a.$accessOrder = 0;
    a.$head = null;
    a.$tail = null;
}
let ju_LinkedHashMap__init_0 = $this => {
    ju_HashMap__init_1($this);
    $this.$accessOrder = 0;
    $this.$head = null;
},
ju_LinkedHashMap__init_ = () => {
    let var_0 = new ju_LinkedHashMap();
    ju_LinkedHashMap__init_0(var_0);
    return var_0;
},
ju_LinkedHashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, $s);
},
ju_LinkedHashMap_getOrDefault = ($this, $key, $defaultValue) => {
    let $entry, $hash, $index;
    if ($key === null)
        $entry = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = $key.$hashCode0();
        $index = ($hash & 2147483647) % $this.$elementData.data.length | 0;
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    }
    if ($entry === null)
        return $defaultValue;
    if ($this.$accessOrder)
        ju_LinkedHashMap_linkEntry($this, $entry, 0);
    return $entry.$value0;
},
ju_LinkedHashMap_get = ($this, $key) => {
    return $this.$getOrDefault($key, null);
},
ju_LinkedHashMap_createHashedEntry = ($this, $key, $index, $hash, $first) => {
    let $entry;
    $entry = ju_LinkedHashMap$LinkedHashMapEntry__init_0($key, $hash);
    $entry.$next3 = $this.$elementData.data[$index];
    $this.$elementData.data[$index] = $entry;
    if (!$first) {
        if ($this.$tail === null)
            $this.$head = $entry;
        else
            $this.$tail.$chainForward = $entry;
        $entry.$chainBackward = $this.$tail;
        $this.$tail = $entry;
    } else {
        if ($this.$head === null)
            $this.$tail = $entry;
        else
            $this.$head.$chainBackward = $entry;
        $entry.$chainForward = $this.$head;
        $this.$head = $entry;
    }
    return $entry;
},
ju_LinkedHashMap_put = ($this, $key, $value) => {
    let $oldSize, $existing;
    $oldSize = $this.$size();
    $existing = $this.$putImpl0($key, $value, 0, $this.$accessOrder);
    if ($this.$size() != $oldSize && $this.$removeEldestEntry($this.$head))
        $this.$removeLinkedEntry($this.$head);
    return $existing;
},
ju_LinkedHashMap_putImpl = ($this, $key, $value, $first, $forceMotion) => {
    let $hash, var$6, $index, $entry, var$9, $existing;
    if (!$this.$elementCount) {
        $this.$head = null;
        $this.$tail = null;
    }
    $hash = ju_Objects_hashCode($key);
    var$6 = $hash & 2147483647;
    $index = var$6 % $this.$elementData.data.length | 0;
    $entry = $key === null ? ju_HashMap_findNullKeyEntry($this) : ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    if ($entry === null) {
        $this.$modCount = $this.$modCount + 1 | 0;
        var$9 = $this.$elementCount + 1 | 0;
        $this.$elementCount = var$9;
        if (var$9 > $this.$threshold) {
            $this.$rehash();
            $index = var$6 % $this.$elementData.data.length | 0;
        }
        $entry = ju_LinkedHashMap_createHashedEntry($this, $key, $index, $hash, $first);
    } else if ($forceMotion)
        ju_LinkedHashMap_linkEntry($this, $entry, $first);
    $existing = $entry.$value0;
    $entry.$value0 = $value;
    return $existing;
},
ju_LinkedHashMap_linkEntry = ($this, $entry, $first) => {
    let $n, $p;
    if (!$first) {
        $n = $entry.$chainForward;
        if ($n === null)
            return;
        $p = $entry.$chainBackward;
        if ($p === null)
            $this.$head = $n;
        else
            $p.$chainForward = $n;
        $n.$chainBackward = $p;
        if ($this.$tail !== null)
            $this.$tail.$chainForward = $entry;
        $entry.$chainBackward = $this.$tail;
        $entry.$chainForward = null;
        $this.$tail = $entry;
    } else {
        $p = $entry.$chainBackward;
        if ($p === null)
            return;
        $n = $entry.$chainForward;
        if ($n === null)
            $this.$tail = $p;
        else
            $n.$chainBackward = $p;
        $p.$chainForward = $n;
        if ($this.$head !== null)
            $this.$head.$chainBackward = $entry;
        $entry.$chainForward = $this.$head;
        $entry.$chainBackward = null;
        $this.$head = $entry;
    }
},
ju_LinkedHashMap_entrySet = $this => {
    return ju_LinkedHashMapEntrySet__init_0($this, 0);
},
ju_LinkedHashMap_keySet = $this => {
    return $this.$sequencedKeySet();
},
ju_LinkedHashMap_sequencedKeySet = $this => {
    if ($this.$cachedKeySet === null)
        $this.$cachedKeySet = ju_LinkedHashMapKeySet__init_0($this, 0);
    return $this.$cachedKeySet;
},
ju_LinkedHashMap_values = $this => {
    return $this.$sequencedValues();
},
ju_LinkedHashMap_sequencedValues = $this => {
    if ($this.$cachedValues === null)
        $this.$cachedValues = ju_LinkedHashMapValues__init_0($this, 0);
    return $this.$cachedValues;
},
ju_LinkedHashMap_remove = ($this, $key) => {
    let $m;
    $m = ju_HashMap_removeByKey($this, $key);
    if ($m === null)
        return null;
    ju_LinkedHashMap_unlinkEntry($this, $m);
    return $m.$value0;
},
ju_LinkedHashMap_removeLinkedEntry = ($this, $entry) => {
    ju_HashMap_removeEntry($this, $entry);
    ju_LinkedHashMap_unlinkEntry($this, $entry);
},
ju_LinkedHashMap_unlinkEntry = ($this, $entry) => {
    let $p, $n;
    $p = $entry.$chainBackward;
    $n = $entry.$chainForward;
    if ($p !== null) {
        $p.$chainForward = $n;
        if ($n === null)
            $this.$tail = $p;
        else
            $n.$chainBackward = $p;
    } else {
        $this.$head = $n;
        if ($n === null)
            $this.$tail = null;
        else
            $n.$chainBackward = null;
    }
},
ju_LinkedHashMap_removeEldestEntry = ($this, $eldest) => {
    return 0;
},
jur_PosPlusGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PosPlusGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
    jur_FSet_$callClinit();
    $innerSet.$setNext(jur_FSet_posFSet);
},
jur_PosPlusGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PosPlusGroupQuantifierSet();
    jur_PosPlusGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PosPlusGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex, var$5;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        return (-1);
    if ($nextIndex > $stringIndex) {
        while (true) {
            var$5 = $this.$innerSet.$matches($nextIndex, $testString, $matchResult);
            if (var$5 <= $nextIndex)
                break;
            $nextIndex = var$5;
        }
        $stringIndex = $nextIndex;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length1 = 0;
}
let jl_AbstractStringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append6 = ($this, $obj) => {
    return $this.$insert($this.$length1, $obj);
},
jl_AbstractStringBuilder_append2 = ($this, $string) => {
    return $this.$insert0($this.$length1, $string);
},
jl_AbstractStringBuilder_insert2 = ($this, $index, $string) => {
    let $i, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length1) {
        if ($string === null)
            $string = $rt_s(44);
        else if (jl_String_isEmpty($string))
            return $this;
        $this.$ensureCapacity($this.$length1 + jl_String_length($string) | 0);
        $i = $this.$length1 - 1 | 0;
        while ($i >= $index) {
            $this.$buffer.data[$i + jl_String_length($string) | 0] = $this.$buffer.data[$i];
            $i = $i + (-1) | 0;
        }
        $this.$length1 = $this.$length1 + jl_String_length($string) | 0;
        $i = 0;
        while ($i < jl_String_length($string)) {
            var$4 = $this.$buffer.data;
            var$5 = $index + 1 | 0;
            var$4[$index] = jl_String_charAt($string, $i);
            $i = $i + 1 | 0;
            $index = var$5;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append3 = ($this, $value) => {
    return $this.$append1($value, 10);
},
jl_AbstractStringBuilder_append7 = ($this, $value, $radix) => {
    return $this.$insert1($this.$length1, $value, $radix);
},
jl_AbstractStringBuilder_insert6 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if ($rt_ucmp(var$10, $value) > 0) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if ($rt_ucmp(var$10, $posLimit) > 0)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$11 = $target;
            else {
                var$5 = $this.$buffer.data;
                var$11 = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                var$6 = var$11 + 1 | 0;
                var$5[var$11] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                var$11 = var$6;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append5 = ($this, $value) => {
    return $this.$insert2($this.$length1, $value);
},
jl_AbstractStringBuilder_insert4 = ($this, $target, $value) => {
    return $this.$insert3($target, $value, 10);
},
jl_AbstractStringBuilder_insert5 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, var$7, $sz, $pos, $posLimit, var$11, var$12;
    $positive = 1;
    if (Long_lt($value, Long_ZERO)) {
        $positive = 0;
        $value = Long_neg($value);
    }
    a: {
        var$5 = Long_fromInt($radix);
        if (jl_Long_compareUnsigned($value, var$5) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$6 = $this.$buffer.data;
                var$7 = $target + 1 | 0;
                var$6[$target] = 45;
                $target = var$7;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit(Long_lo($value), $radix);
        } else {
            $sz = 1;
            $pos = Long_fromInt(1);
            $posLimit = jl_Long_divideUnsigned(Long_fromInt(-1), var$5);
            b: {
                while (true) {
                    var$11 = Long_mul($pos, var$5);
                    if (jl_Long_compareUnsigned(var$11, $value) > 0) {
                        var$11 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if (jl_Long_compareUnsigned(var$11, $posLimit) > 0)
                        break;
                    $pos = var$11;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                var$12 = $target;
            else {
                var$6 = $this.$buffer.data;
                var$12 = $target + 1 | 0;
                var$6[$target] = 45;
            }
            while (true) {
                if (Long_eq(var$11, Long_ZERO))
                    break a;
                var$6 = $this.$buffer.data;
                var$7 = var$12 + 1 | 0;
                var$6[var$12] = jl_Character_forDigit(Long_lo((jl_Long_divideUnsigned($value, var$11))), $radix);
                $value = jl_Long_remainderUnsigned($value, var$11);
                var$11 = jl_Long_divideUnsigned(var$11, var$5);
                var$12 = var$7;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append4 = ($this, $value) => {
    return $this.$insert4($this.$length1, $value);
},
jl_AbstractStringBuilder_insert1 = ($this, $target, $value) => {
    let var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, $leadingZeros, $leadingZero, var$16, $pos, $i, $intDigit, var$20;
    var$3 = $rt_compare_less($value, 0.0);
    if (!var$3) {
        if (1.0 / $value === Infinity) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
            var$4 = $this.$buffer.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 48;
            var$4 = $this.$buffer.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 46;
            $this.$buffer.data[var$5] = 48;
            return $this;
        }
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 45;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 48;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 46;
        $this.$buffer.data[var$3] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer.data;
        var$3 = $target + 1 | 0;
        var$4[$target] = 78;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 97;
        $this.$buffer.data[var$5] = 78;
        return $this;
    }
    if (jl_Double_isInfinite($value)) {
        if (var$3 > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            var$3 = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer.data;
            var$3 = $target + 1 | 0;
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 73;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 110;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 102;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 110;
        var$4 = $this.$buffer.data;
        var$3 = var$5 + 1 | 0;
        var$4[var$5] = 105;
        var$4 = $this.$buffer.data;
        var$5 = var$3 + 1 | 0;
        var$4[var$3] = 116;
        $this.$buffer.data[var$5] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_doubleAnalysisResult;
    otcit_DoubleAnalyzer_analyze($value, $number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 18;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    $leadingZeros = 0;
    $leadingZero = 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else {
            $intPart = 0;
            $leadingZeros = ( -$exp | 0) - 1 | 0;
            $leadingZero = 1;
            $sz = $sz + 1 | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if (!($exp > (-100) && $exp < 100))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$3 = $sz + ($digits + $leadingZeros | 0) | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + var$3 | 0);
    if (!$negative)
        var$16 = $target;
    else {
        var$4 = $this.$buffer.data;
        var$16 = $target + 1 | 0;
        var$4[$target] = 45;
    }
    $pos = Long_create(1569325056, 23283064);
    if ($leadingZero) {
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = 48;
        var$4 = $this.$buffer.data;
        var$16 = var$3 + 1 | 0;
        var$4[var$3] = 46;
        while (true) {
            var$3 = $leadingZeros + (-1) | 0;
            if ($leadingZeros <= 0)
                break;
            var$4 = $this.$buffer.data;
            var$5 = var$16 + 1 | 0;
            var$4[var$16] = 48;
            $leadingZeros = var$3;
            var$16 = var$5;
        }
    }
    $i = 0;
    while ($i < $digits) {
        if (Long_le($pos, Long_ZERO))
            $intDigit = 0;
        else {
            $intDigit = Long_lo(Long_div($mantissa, $pos));
            $mantissa = Long_rem($mantissa, $pos);
        }
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$16 = var$3;
        else {
            var$4 = $this.$buffer.data;
            var$16 = var$3 + 1 | 0;
            var$4[var$3] = 46;
        }
        $pos = Long_div($pos, Long_fromInt(10));
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer.data;
        var$3 = var$16 + 1 | 0;
        var$4[var$16] = 69;
        if ($exp >= 0)
            var$5 = var$3;
        else {
            $exp =  -$exp | 0;
            var$4 = $this.$buffer.data;
            var$5 = var$3 + 1 | 0;
            var$4[var$3] = 45;
        }
        if ($exp >= 100) {
            var$4 = $this.$buffer.data;
            var$3 = var$5 + 1 | 0;
            var$4[var$5] = (48 + ($exp / 100 | 0) | 0) & 65535;
            $exp = $exp % 100 | 0;
            var$4 = $this.$buffer.data;
            var$20 = var$3 + 1 | 0;
            var$4[var$3] = (48 + ($exp / 10 | 0) | 0) & 65535;
        } else if ($exp < 10)
            var$20 = var$5;
        else {
            var$4 = $this.$buffer.data;
            var$20 = var$5 + 1 | 0;
            var$4[var$5] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        $this.$buffer.data[var$20] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return $this;
},
jl_AbstractStringBuilder_trailingDecimalZeros = $n => {
    let $zeros, $result, $bit, $i;
    $zeros = Long_fromInt(1);
    $result = 0;
    $bit = 16;
    jl_AbstractStringBuilder$Constants_$callClinit();
    $i = jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data.length - 1 | 0;
    while ($i >= 0) {
        if (Long_eq(Long_rem($n, Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i])), Long_ZERO)) {
            $result = $result | $bit;
            $zeros = Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i]);
        }
        $bit = $bit >>> 1 | 0;
        $i = $i + (-1) | 0;
    }
    return $result;
},
jl_AbstractStringBuilder_append1 = ($this, $c) => {
    return $this.$insert5($this.$length1, $c);
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_insert3 = ($this, $index, $obj) => {
    return $this.$insert0($index, $obj === null ? $rt_s(44) : $obj.$toString());
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let $newLength;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf1($this.$buffer, $newLength);
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_1($this.$buffer, 0, $this.$length1);
},
jl_AbstractStringBuilder_length = $this => {
    return $this.$length1;
},
jl_AbstractStringBuilder_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$length1)
        return $this.$buffer.data[$index];
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_append0 = ($this, $chars, $offset, $len) => {
    return $this.$insert6($this.$length1, $chars, $offset, $len);
},
jl_AbstractStringBuilder_insert = ($this, $index, $chars, $offset, $len) => {
    let var$5, var$6, var$7, var$8, var$9;
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + $len | 0);
    var$5 = $len + $offset | 0;
    while ($offset < var$5) {
        var$6 = $chars.data;
        var$7 = $this.$buffer.data;
        var$8 = $index + 1 | 0;
        var$9 = $offset + 1 | 0;
        var$7[$index] = var$6[$offset];
        $index = var$8;
        $offset = var$9;
    }
    return $this;
},
jl_AbstractStringBuilder_append = ($this, $chars) => {
    return $this.$append4($chars, 0, $chars.data.length);
},
jl_AbstractStringBuilder_deleteCharAt = ($this, $i) => {
    let var$2, var$3, $i_0;
    if ($i >= 0 && $i < $this.$length1) {
        $this.$length1 = $this.$length1 - 1 | 0;
        while ($i < $this.$length1) {
            var$2 = $this.$buffer.data;
            var$3 = $this.$buffer.data;
            $i_0 = $i + 1 | 0;
            var$2[$i] = var$3[$i_0];
            $i = $i_0;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_delete = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6, var$7, var$8;
    if ($start >= 0) {
        var$3 = $rt_compare($start, $end);
        if (var$3 <= 0 && $start <= $this.$length1) {
            if (!var$3)
                return $this;
            if ($end > $this.$length1)
                $end = $this.$length1;
            $sz = $this.$length1 - $end | 0;
            $this.$length1 = $this.$length1 - ($end - $start | 0) | 0;
            $i = 0;
            while ($i < $sz) {
                var$6 = $this.$buffer.data;
                var$3 = $start + 1 | 0;
                var$7 = $this.$buffer.data;
                var$8 = $end + 1 | 0;
                var$6[$start] = var$7[$end];
                $i = $i + 1 | 0;
                $start = var$3;
                $end = var$8;
            }
            return $this;
        }
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let $sz, $i;
    $sz = $this.$length1 - $start | 0;
    $this.$ensureCapacity(($this.$length1 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length1 = $this.$length1 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuffer__init_ = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuffer__init_0 = () => {
    let var_0 = new jl_StringBuffer();
    jl_StringBuffer__init_(var_0);
    return var_0;
},
jl_StringBuffer_append1 = ($this, $c) => {
    jl_AbstractStringBuilder_append1($this, $c);
    return $this;
},
jl_StringBuffer_append2 = ($this, $chars, $offset, $len) => {
    jl_AbstractStringBuilder_append0($this, $chars, $offset, $len);
    return $this;
},
jl_StringBuffer_append0 = ($this, $chars) => {
    jl_AbstractStringBuilder_append($this, $chars);
    return $this;
},
jl_StringBuffer_insert = ($this, $index, $chars, $offset, $len) => {
    jl_AbstractStringBuilder_insert($this, $index, $chars, $offset, $len);
    return $this;
},
jl_StringBuffer_insert2 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert0($this, $index, $c);
    return $this;
},
jl_StringBuffer_insert1 = ($this, var$1, var$2, var$3, var$4) => {
    return $this.$insert7(var$1, var$2, var$3, var$4);
},
jl_StringBuffer_append = ($this, var$1, var$2, var$3) => {
    return $this.$append7(var$1, var$2, var$3);
},
jl_StringBuffer_charAt = ($this, var$1) => {
    return jl_AbstractStringBuilder_charAt($this, var$1);
},
jl_StringBuffer_length = $this => {
    return jl_AbstractStringBuilder_length($this);
},
jl_StringBuffer_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuffer_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuffer_insert0 = ($this, var$1, var$2) => {
    return $this.$insert8(var$1, var$2);
},
jur_SpecialToken = $rt_classWithoutFields(),
jur_SpecialToken__init_ = $this => {
    jl_Object__init_($this);
};
function jur_AbstractCharClass() {
    let a = this; jur_SpecialToken.call(a);
    a.$alt = 0;
    a.$altSurrogates = 0;
    a.$lowHighSurrogates = null;
    a.$charClassWithoutSurrogates = null;
    a.$charClassWithSurrogates = null;
    a.$mayContainSupplCodepoints0 = 0;
}
let jur_AbstractCharClass_charClasses = null,
jur_AbstractCharClass_$callClinit = () => {
    jur_AbstractCharClass_$callClinit = $rt_eraseClinit(jur_AbstractCharClass);
    jur_AbstractCharClass__clinit_();
},
jur_AbstractCharClass__init_ = $this => {
    jur_AbstractCharClass_$callClinit();
    jur_SpecialToken__init_($this);
    $this.$lowHighSurrogates = ju_BitSet__init_2(2048);
},
jur_AbstractCharClass_getBits = $this => {
    return null;
},
jur_AbstractCharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_AbstractCharClass_hasLowHighSurrogates = $this => {
    return !$this.$altSurrogates ? ($this.$lowHighSurrogates.$nextSetBit(0) >= 2048 ? 0 : 1) : $this.$lowHighSurrogates.$nextClearBit(0) >= 2048 ? 0 : 1;
},
jur_AbstractCharClass_mayContainSupplCodepoints = $this => {
    return $this.$mayContainSupplCodepoints0;
},
jur_AbstractCharClass_getInstance = $this => {
    return $this;
},
jur_AbstractCharClass_getSurrogates = $this => {
    let $lHS;
    if ($this.$charClassWithSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        $this.$charClassWithSurrogates = jur_AbstractCharClass$1__init_0($this, $lHS);
        $this.$charClassWithSurrogates.$setNegative($this.$altSurrogates);
    }
    return $this.$charClassWithSurrogates;
},
jur_AbstractCharClass_getWithoutSurrogates = $this => {
    let $lHS;
    if ($this.$charClassWithoutSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        $this.$charClassWithoutSurrogates = jur_AbstractCharClass$2__init_0($this, $lHS, $this);
        $this.$charClassWithoutSurrogates.$setNegative($this.$isNegative());
        $this.$charClassWithoutSurrogates.$mayContainSupplCodepoints0 = $this.$mayContainSupplCodepoints0;
    }
    return $this.$charClassWithoutSurrogates;
},
jur_AbstractCharClass_hasUCI = $this => {
    return 0;
},
jur_AbstractCharClass_setNegative = ($this, $value) => {
    if ($this.$alt ^ $value) {
        $this.$alt = $this.$alt ? 0 : 1;
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
    }
    if (!$this.$mayContainSupplCodepoints0)
        $this.$mayContainSupplCodepoints0 = 1;
    return $this;
},
jur_AbstractCharClass_isNegative = $this => {
    return $this.$alt;
},
jur_AbstractCharClass_intersects0 = ($cc, $ch) => {
    jur_AbstractCharClass_$callClinit();
    return $cc.$contains0($ch);
},
jur_AbstractCharClass_intersects = ($cc1, $cc2) => {
    jur_AbstractCharClass_$callClinit();
    if ($cc1.$getBits() !== null && $cc2.$getBits() !== null)
        return ($cc1.$getBits()).$intersects($cc2.$getBits());
    return 1;
},
jur_AbstractCharClass_getPredefinedClass = ($name, $negative) => {
    jur_AbstractCharClass_$callClinit();
    return (jur_AbstractCharClass$PredefinedCharacterClasses_getObject(jur_AbstractCharClass_charClasses, $name)).$getValue0($negative);
},
jur_AbstractCharClass__clinit_ = () => {
    jur_AbstractCharClass_charClasses = jur_AbstractCharClass$PredefinedCharacterClasses__init_0();
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$017 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_ = ($this, $this$0) => {
    $this.$this$017 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains = ($this, $ch) => {
    return jl_Character_isUnicodeIdentifierPart($ch);
},
jur_AbstractCharClass$PredefinedCharacterClasses = $rt_classWithoutFields(),
jur_AbstractCharClass$PredefinedCharacterClasses_space = null,
jur_AbstractCharClass$PredefinedCharacterClasses_digit = null,
jur_AbstractCharClass$PredefinedCharacterClasses_contents = null,
jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit = () => {
    jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit = $rt_eraseClinit(jur_AbstractCharClass$PredefinedCharacterClasses);
    jur_AbstractCharClass$PredefinedCharacterClasses__clinit_();
},
jur_AbstractCharClass$PredefinedCharacterClasses__init_ = $this => {
    jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit();
    jl_Object__init_($this);
},
jur_AbstractCharClass$PredefinedCharacterClasses__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$PredefinedCharacterClasses();
    jur_AbstractCharClass$PredefinedCharacterClasses__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$PredefinedCharacterClasses_getObject = ($this, $name) => {
    let $i, $row, var$4;
    $i = 0;
    while (true) {
        jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit();
        if ($i >= jur_AbstractCharClass$PredefinedCharacterClasses_contents.data.length)
            $rt_throw(ju_MissingResourceException__init_0($rt_s(10), $rt_s(10), $name));
        $row = jur_AbstractCharClass$PredefinedCharacterClasses_contents.data[$i];
        var$4 = $row.data;
        if (jl_String_equals($name, var$4[0]))
            break;
        $i = $i + 1 | 0;
    }
    return var$4[1];
},
jur_AbstractCharClass$PredefinedCharacterClasses__clinit_ = () => {
    let var$1, var$2, var$3, var$4;
    jur_AbstractCharClass$PredefinedCharacterClasses_space = jur_AbstractCharClass$LazySpace__init_0();
    jur_AbstractCharClass$PredefinedCharacterClasses_digit = jur_AbstractCharClass$LazyDigit__init_0();
    var$1 = $rt_createArray($rt_arraycls(jl_Object), 194);
    var$2 = var$1.data;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(45);
    var$4[1] = jur_AbstractCharClass$LazyLower__init_0();
    var$2[0] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(46);
    var$4[1] = jur_AbstractCharClass$LazyUpper__init_0();
    var$2[1] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(47);
    var$4[1] = jur_AbstractCharClass$LazyASCII__init_0();
    var$2[2] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(48);
    var$4[1] = jur_AbstractCharClass$LazyAlpha__init_0();
    var$2[3] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(49);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[4] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(50);
    var$4[1] = jur_AbstractCharClass$LazyAlnum__init_0();
    var$2[5] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(51);
    var$4[1] = jur_AbstractCharClass$LazyPunct__init_0();
    var$2[6] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(52);
    var$4[1] = jur_AbstractCharClass$LazyGraph__init_0();
    var$2[7] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(53);
    var$4[1] = jur_AbstractCharClass$LazyPrint__init_0();
    var$2[8] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(54);
    var$4[1] = jur_AbstractCharClass$LazyBlank__init_0();
    var$2[9] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(55);
    var$4[1] = jur_AbstractCharClass$LazyCntrl__init_0();
    var$2[10] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(56);
    var$4[1] = jur_AbstractCharClass$LazyXDigit__init_0();
    var$2[11] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(57);
    var$4[1] = jur_AbstractCharClass$LazyJavaLowerCase__init_0();
    var$2[12] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(58);
    var$4[1] = jur_AbstractCharClass$LazyJavaUpperCase__init_0();
    var$2[13] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(59);
    var$4[1] = jur_AbstractCharClass$LazyJavaWhitespace__init_0();
    var$2[14] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(60);
    var$4[1] = jur_AbstractCharClass$LazyJavaMirrored__init_0();
    var$2[15] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(61);
    var$4[1] = jur_AbstractCharClass$LazyJavaDefined__init_0();
    var$2[16] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(62);
    var$4[1] = jur_AbstractCharClass$LazyJavaDigit__init_0();
    var$2[17] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(63);
    var$4[1] = jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0();
    var$2[18] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(64);
    var$4[1] = jur_AbstractCharClass$LazyJavaISOControl__init_0();
    var$2[19] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(65);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0();
    var$2[20] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(66);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0();
    var$2[21] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(67);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetter__init_0();
    var$2[22] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(68);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0();
    var$2[23] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(69);
    var$4[1] = jur_AbstractCharClass$LazyJavaSpaceChar__init_0();
    var$2[24] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(70);
    var$4[1] = jur_AbstractCharClass$LazyJavaTitleCase__init_0();
    var$2[25] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(71);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0();
    var$2[26] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(72);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0();
    var$2[27] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(73);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[28] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(74);
    var$4[1] = jur_AbstractCharClass$LazyWord__init_0();
    var$2[29] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(75);
    var$4[1] = jur_AbstractCharClass$LazyNonWord__init_0();
    var$2[30] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(76);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[31] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(77);
    var$4[1] = jur_AbstractCharClass$LazyNonSpace__init_0();
    var$2[32] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(78);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[33] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(79);
    var$4[1] = jur_AbstractCharClass$LazyNonDigit__init_0();
    var$2[34] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(80);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 127);
    var$2[35] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(81);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(128, 255);
    var$2[36] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(82);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(256, 383);
    var$2[37] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(83);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(384, 591);
    var$2[38] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(84);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(592, 687);
    var$2[39] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(85);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(688, 767);
    var$2[40] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(86);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(768, 879);
    var$2[41] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(87);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(880, 1023);
    var$2[42] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(88);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1024, 1279);
    var$2[43] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(89);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1280, 1327);
    var$2[44] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(90);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1328, 1423);
    var$2[45] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(91);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1424, 1535);
    var$2[46] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(92);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1536, 1791);
    var$2[47] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(93);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1792, 1871);
    var$2[48] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(94);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1872, 1919);
    var$2[49] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(95);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1920, 1983);
    var$2[50] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(96);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2304, 2431);
    var$2[51] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(97);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2432, 2559);
    var$2[52] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(98);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2560, 2687);
    var$2[53] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(99);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2688, 2815);
    var$2[54] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(100);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2816, 2943);
    var$2[55] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(101);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2944, 3071);
    var$2[56] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(102);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3072, 3199);
    var$2[57] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(103);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3200, 3327);
    var$2[58] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(104);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3328, 3455);
    var$2[59] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(105);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3456, 3583);
    var$2[60] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(106);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3584, 3711);
    var$2[61] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(107);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3712, 3839);
    var$2[62] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(108);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3840, 4095);
    var$2[63] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(109);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4096, 4255);
    var$2[64] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(110);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4256, 4351);
    var$2[65] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(111);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4352, 4607);
    var$2[66] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(112);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4608, 4991);
    var$2[67] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(113);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4992, 5023);
    var$2[68] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(114);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5024, 5119);
    var$2[69] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(115);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5120, 5759);
    var$2[70] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(116);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5760, 5791);
    var$2[71] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(117);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5792, 5887);
    var$2[72] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(118);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5888, 5919);
    var$2[73] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(119);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5920, 5951);
    var$2[74] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(120);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5952, 5983);
    var$2[75] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(121);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5984, 6015);
    var$2[76] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(122);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6016, 6143);
    var$2[77] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(123);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6144, 6319);
    var$2[78] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(124);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6400, 6479);
    var$2[79] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(125);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6480, 6527);
    var$2[80] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(126);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6528, 6623);
    var$2[81] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(127);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6624, 6655);
    var$2[82] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(128);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6656, 6687);
    var$2[83] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(129);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7424, 7551);
    var$2[84] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(130);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7552, 7615);
    var$2[85] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(131);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7616, 7679);
    var$2[86] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(132);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7680, 7935);
    var$2[87] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(133);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7936, 8191);
    var$2[88] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(134);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8192, 8303);
    var$2[89] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(135);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8304, 8351);
    var$2[90] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(136);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8352, 8399);
    var$2[91] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(137);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8400, 8447);
    var$2[92] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(138);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8448, 8527);
    var$2[93] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(139);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8528, 8591);
    var$2[94] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(140);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8592, 8703);
    var$2[95] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(141);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8704, 8959);
    var$2[96] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(142);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8960, 9215);
    var$2[97] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(143);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9216, 9279);
    var$2[98] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(144);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9280, 9311);
    var$2[99] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(145);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9312, 9471);
    var$2[100] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(146);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9472, 9599);
    var$2[101] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(147);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9600, 9631);
    var$2[102] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(148);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9632, 9727);
    var$2[103] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(149);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9728, 9983);
    var$2[104] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(150);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9984, 10175);
    var$2[105] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(151);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10176, 10223);
    var$2[106] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(152);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10224, 10239);
    var$2[107] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(153);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10240, 10495);
    var$2[108] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(154);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10496, 10623);
    var$2[109] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(155);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10624, 10751);
    var$2[110] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(156);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10752, 11007);
    var$2[111] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(157);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11008, 11263);
    var$2[112] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(158);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11264, 11359);
    var$2[113] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(159);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11392, 11519);
    var$2[114] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(160);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11520, 11567);
    var$2[115] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(161);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11568, 11647);
    var$2[116] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(162);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11648, 11743);
    var$2[117] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(163);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11776, 11903);
    var$2[118] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(164);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11904, 12031);
    var$2[119] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(165);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12032, 12255);
    var$2[120] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(166);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12272, 12287);
    var$2[121] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(167);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12288, 12351);
    var$2[122] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(168);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12352, 12447);
    var$2[123] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(169);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12448, 12543);
    var$2[124] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(170);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12544, 12591);
    var$2[125] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(171);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12592, 12687);
    var$2[126] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(172);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12688, 12703);
    var$2[127] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(173);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12704, 12735);
    var$2[128] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(174);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12736, 12783);
    var$2[129] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(175);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12784, 12799);
    var$2[130] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(176);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12800, 13055);
    var$2[131] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(177);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13056, 13311);
    var$2[132] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(178);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13312, 19893);
    var$2[133] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(179);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19904, 19967);
    var$2[134] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(180);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19968, 40959);
    var$2[135] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(181);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(40960, 42127);
    var$2[136] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(182);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42128, 42191);
    var$2[137] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(183);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42752, 42783);
    var$2[138] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(184);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(43008, 43055);
    var$2[139] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(185);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(44032, 55203);
    var$2[140] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(186);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(55296, 56191);
    var$2[141] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(187);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56192, 56319);
    var$2[142] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(188);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56320, 57343);
    var$2[143] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(189);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(57344, 63743);
    var$2[144] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(190);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(63744, 64255);
    var$2[145] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(191);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64256, 64335);
    var$2[146] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(192);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64336, 65023);
    var$2[147] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(193);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65024, 65039);
    var$2[148] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(194);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65040, 65055);
    var$2[149] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(195);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65056, 65071);
    var$2[150] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(196);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65072, 65103);
    var$2[151] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(197);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65104, 65135);
    var$2[152] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(198);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65136, 65279);
    var$2[153] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(199);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65280, 65519);
    var$2[154] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(200);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 1114111);
    var$2[155] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(201);
    var$4[1] = jur_AbstractCharClass$LazySpecialsBlock__init_0();
    var$2[156] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(202);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(0, 1);
    var$2[157] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(203);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(62, 1);
    var$2[158] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(204);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(1, 1);
    var$2[159] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(205);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(2, 1);
    var$2[160] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(206);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(3, 0);
    var$2[161] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(207);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(4, 0);
    var$2[162] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(208);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(5, 1);
    var$2[163] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(209);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(448, 1);
    var$2[164] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(210);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(6, 1);
    var$2[165] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(211);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(7, 0);
    var$2[166] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(212);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(8, 1);
    var$2[167] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(213);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(3584, 1);
    var$2[168] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(214);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(9, 1);
    var$2[169] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(215);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(10, 1);
    var$2[170] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(216);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(11, 1);
    var$2[171] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(217);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(28672, 0);
    var$2[172] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(218);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(12, 0);
    var$2[173] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(219);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(13, 0);
    var$2[174] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(220);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(14, 0);
    var$2[175] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(221);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_2(983040, 1, 1);
    var$2[176] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(222);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(15, 0);
    var$2[177] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(223);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(16, 1);
    var$2[178] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(224);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(18, 1);
    var$2[179] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(225);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_2(19, 0, 1);
    var$2[180] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(226);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(1643118592, 1);
    var$2[181] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(227);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(20, 0);
    var$2[182] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(228);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(21, 0);
    var$2[183] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(229);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(22, 0);
    var$2[184] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(230);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(23, 0);
    var$2[185] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(231);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(24, 1);
    var$2[186] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(232);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(2113929216, 1);
    var$2[187] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(233);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(25, 1);
    var$2[188] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(234);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(26, 0);
    var$2[189] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(235);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(27, 0);
    var$2[190] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(236);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(28, 1);
    var$2[191] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(237);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(29, 0);
    var$2[192] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(238);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(30, 0);
    var$2[193] = var$3;
    jur_AbstractCharClass$PredefinedCharacterClasses_contents = var$1;
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection__init_ = $this => {
    jl_Object__init_($this);
},
ju_AbstractCollection_isEmpty = $this => {
    return $this.$size() ? 0 : 1;
},
ju_AbstractCollection_contains = ($this, $o) => {
    let $iter, $e;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $e = $iter.$next();
        if (ju_Objects_equals($e, $o))
            return 1;
    }
    return 0;
},
ju_AbstractCollection_toArray = ($this, $a) => {
    let var$2, $i, var$4, $iter;
    var$2 = $a.data;
    $i = $this.$size();
    var$4 = var$2.length;
    if (var$4 < $i)
        $a = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($a)), $i);
    else
        while ($i < var$4) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        var$2 = $a.data;
        var$4 = $i + 1 | 0;
        var$2[$i] = $iter.$next();
        $i = var$4;
    }
    return $a;
},
ju_AbstractCollection_remove = ($this, $o) => {
    let $iter, $e;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $e = $iter.$next();
        if (ju_Objects_equals($e, $o)) {
            $iter.$remove0();
            return 1;
        }
    }
    return 0;
},
ju_AbstractCollection_addAll = ($this, $c) => {
    let $changed, $iter;
    $changed = 0;
    $iter = $c.$iterator();
    while ($iter.$hasNext()) {
        if (!$this.$add2($iter.$next()))
            continue;
        $changed = 1;
    }
    return $changed;
},
ju_AbstractCollection_toString = $this => {
    let $sb, $iter, $e, var$4;
    $sb = jl_StringBuilder__init_();
    $sb.$append0(91);
    $iter = $this.$iterator();
    if ($iter.$hasNext()) {
        $e = $iter.$next();
        if ($e === $this)
            $e = $rt_s(239);
        $sb.$append($e);
    }
    while ($iter.$hasNext()) {
        $e = $iter.$next();
        var$4 = $sb.$append3($rt_s(43));
        if ($e === $this)
            $e = $rt_s(239);
        var$4.$append($e);
    }
    $sb.$append0(93);
    return $sb.$toString();
},
ju_SequencedCollection = $rt_classWithoutFields(0);
function ju_LinkedHashMapValues() {
    let a = this; ju_AbstractCollection.call(a);
    a.$base2 = null;
    a.$reversed = 0;
}
let ju_LinkedHashMapValues__init_ = ($this, $base, $reversed) => {
    ju_AbstractCollection__init_($this);
    $this.$base2 = $base;
    $this.$reversed = $reversed;
},
ju_LinkedHashMapValues__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapValues();
    ju_LinkedHashMapValues__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapValues_iterator = $this => {
    return ju_LinkedHashMapIterator$ValueIterator__init_0($this.$base2, $this.$reversed);
},
jur_AbstractCharClass$LazyDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyDigit__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyDigit();
    jur_AbstractCharClass$LazyDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyDigit_computeValue = $this => {
    return (jur_CharClass__init_()).$add0(48, 57);
},
jur_AbstractCharClass$LazyJavaLetter = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetter__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLetter__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetter();
    jur_AbstractCharClass$LazyJavaLetter__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetter_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaLetter$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
ji_Flushable = $rt_classWithoutFields(0);
function jur_DecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$readCharsForCodePoint = 0;
    a.$decomposedCharUTF160 = null;
    a.$decomposedChar0 = null;
    a.$decomposedCharLength0 = 0;
}
let jur_DecomposedCharSet__init_ = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_JointSet__init_($this);
    $this.$readCharsForCodePoint = 1;
    $this.$decomposedChar0 = $decomposedChar;
    $this.$decomposedCharLength0 = $decomposedCharLength;
},
jur_DecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_DecomposedCharSet();
    jur_DecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_DecomposedCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $decCodePoint, $readCodePoints, $rightBound, $curChar, var$8, $decCurCodePoint, var$10, var$11, var$12, var$13, var$14, var$15;
    $decCodePoint = $rt_createIntArray(4);
    $readCodePoints = 0;
    $rightBound = $matchResult.$getRightBound();
    if ($strIndex >= $rightBound)
        return (-1);
    $curChar = $this.$codePointAt($strIndex, $testString, $rightBound);
    var$8 = $strIndex + $this.$readCharsForCodePoint | 0;
    $decCurCodePoint = jur_Lexer_getDecomposition($curChar);
    if ($decCurCodePoint === null) {
        var$10 = $decCodePoint.data;
        var$11 = 1;
        var$10[$readCodePoints] = $curChar;
    } else {
        var$11 = $decCurCodePoint.data.length;
        jl_System_fastArraycopy($decCurCodePoint, 0, $decCodePoint, 0, var$11);
        var$11 = $readCodePoints + var$11 | 0;
    }
    a: {
        if (var$8 < $rightBound) {
            var$12 = $this.$codePointAt(var$8, $testString, $rightBound);
            while (var$11 < 4) {
                if (!jur_Lexer_hasDecompositionNonNullCanClass(var$12)) {
                    var$10 = $decCodePoint.data;
                    var$13 = var$11 + 1 | 0;
                    var$10[var$11] = var$12;
                } else {
                    var$10 = (jur_Lexer_getDecomposition(var$12)).data;
                    if (var$10.length != 2) {
                        var$14 = $decCodePoint.data;
                        var$13 = var$11 + 1 | 0;
                        var$14[var$11] = var$10[0];
                    } else {
                        var$14 = $decCodePoint.data;
                        var$12 = var$11 + 1 | 0;
                        var$14[var$11] = var$10[0];
                        var$13 = var$12 + 1 | 0;
                        var$14[var$12] = var$10[1];
                    }
                }
                var$8 = var$8 + $this.$readCharsForCodePoint | 0;
                if (var$8 >= $rightBound) {
                    var$11 = var$13;
                    break a;
                }
                var$12 = $this.$codePointAt(var$8, $testString, $rightBound);
                var$11 = var$13;
            }
        }
    }
    if (var$11 != $this.$decomposedCharLength0)
        return (-1);
    var$15 = 0;
    while (true) {
        if (var$15 >= var$11)
            return $this.$next2.$matches(var$8, $testString, $matchResult);
        if ($decCodePoint.data[var$15] != $this.$decomposedChar0.data[var$15])
            break;
        var$15 = var$15 + 1 | 0;
    }
    return (-1);
},
jur_DecomposedCharSet_getDecomposedChar = $this => {
    let $strBuff, $i;
    if ($this.$decomposedCharUTF160 === null) {
        $strBuff = jl_StringBuilder__init_();
        $i = 0;
        while ($i < $this.$decomposedCharLength0) {
            $strBuff.$append8(jl_Character_toChars($this.$decomposedChar0.data[$i]));
            $i = $i + 1 | 0;
        }
        $this.$decomposedCharUTF160 = $strBuff.$toString();
    }
    return $this.$decomposedCharUTF160;
},
jur_DecomposedCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jur_DecomposedCharSet_getDecomposedChar($this);
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(240)), var$1);
    return jl_StringBuilder_toString(var$2);
},
jur_DecomposedCharSet_codePointAt = ($this, $strIndex, $testString, $rightBound) => {
    let $curChar, var$5, $low, $curCodePointUTF16;
    $this.$readCharsForCodePoint = 1;
    if ($strIndex >= ($rightBound - 1 | 0))
        $curChar = $testString.$charAt($strIndex);
    else {
        var$5 = $strIndex + 1 | 0;
        $curChar = $testString.$charAt($strIndex);
        $low = $testString.$charAt(var$5);
        if (jl_Character_isSurrogatePair($curChar, $low)) {
            $curCodePointUTF16 = $rt_createCharArrayFromData([$curChar, $low]);
            $curChar = jl_Character_codePointAt($curCodePointUTF16, 0);
            $this.$readCharsForCodePoint = 2;
        }
    }
    return $curChar;
},
jur_DecomposedCharSet_first = ($this, $set) => {
    let var$2, var$3;
    a: {
        if ($set instanceof jur_DecomposedCharSet) {
            var$2 = $set;
            if (!jl_String_equals(jur_DecomposedCharSet_getDecomposedChar(var$2), jur_DecomposedCharSet_getDecomposedChar($this))) {
                var$3 = 0;
                break a;
            }
        }
        var$3 = 1;
    }
    return var$3;
},
jur_DecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_CIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_CIDecomposedCharSet__init_ = ($this, $decomp, $decomposedCharLength) => {
    jur_DecomposedCharSet__init_($this, $decomp, $decomposedCharLength);
},
jur_CIDecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CIDecomposedCharSet();
    jur_CIDecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AheadFSet = $rt_classWithoutFields(jur_FSet),
jur_AheadFSet__init_ = $this => {
    jur_FSet__init_($this, (-1));
},
jur_AheadFSet__init_0 = () => {
    let var_0 = new jur_AheadFSet();
    jur_AheadFSet__init_(var_0);
    return var_0;
},
jur_AheadFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_AheadFSet_getName = $this => {
    return $rt_s(241);
},
jur_NonCapJointSet = $rt_classWithoutFields(jur_JointSet),
jur_NonCapJointSet__init_ = ($this, $children, $fSet) => {
    jur_JointSet__init_0($this, $children, $fSet);
},
jur_NonCapJointSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_NonCapJointSet();
    jur_NonCapJointSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_NonCapJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $e, $shift;
    $start = $matchResult.$getConsumed($this.$groupIndex);
    $matchResult.$setConsumed($this.$groupIndex, $stringIndex);
    $size = $this.$children.$size();
    $i = 0;
    while (true) {
        if ($i >= $size) {
            $matchResult.$setConsumed($this.$groupIndex, $start);
            return (-1);
        }
        $e = $this.$children.$get($i);
        $shift = $e.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_NonCapJointSet_getName = $this => {
    return $rt_s(242);
},
jur_NonCapJointSet_hasConsumed = ($this, $matchResult) => {
    let $cons;
    $cons = $matchResult.$getConsumed($this.$groupIndex);
    return !$cons ? 0 : 1;
},
jur_AtomicJointSet = $rt_classWithoutFields(jur_NonCapJointSet),
jur_AtomicJointSet__init_ = ($this, $children, $fSet) => {
    jur_NonCapJointSet__init_($this, $children, $fSet);
},
jur_AtomicJointSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_AtomicJointSet();
    jur_AtomicJointSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AtomicJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $e, $shift;
    $start = $matchResult.$getConsumed($this.$groupIndex);
    $matchResult.$setConsumed($this.$groupIndex, $stringIndex);
    $size = $this.$children.$size();
    $i = 0;
    while ($i < $size) {
        $e = $this.$children.$get($i);
        $shift = $e.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            return $this.$next2.$matches($this.$fSet.$getIndex(), $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    $matchResult.$setConsumed($this.$groupIndex, $start);
    return (-1);
},
jur_AtomicJointSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_AtomicJointSet_getName = $this => {
    return $rt_s(242);
},
jur_PositiveLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookAhead__init_ = ($this, $children, $fSet) => {
    jur_AtomicJointSet__init_($this, $children, $fSet);
},
jur_PositiveLookAhead__init_0 = (var_0, var_1) => {
    let var_2 = new jur_PositiveLookAhead();
    jur_PositiveLookAhead__init_(var_2, var_0, var_1);
    return var_2;
},
jur_PositiveLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i, $e, $shift;
    $size = $this.$children.$size();
    $i = 0;
    while ($i < $size) {
        $e = $this.$children.$get($i);
        $shift = $e.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_PositiveLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PositiveLookAhead_getName = $this => {
    return $rt_s(243);
},
jur_NegativeLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookAhead__init_ = ($this, $children, $fSet) => {
    jur_AtomicJointSet__init_($this, $children, $fSet);
},
jur_NegativeLookAhead__init_0 = (var_0, var_1) => {
    let var_2 = new jur_NegativeLookAhead();
    jur_NegativeLookAhead__init_(var_2, var_0, var_1);
    return var_2;
},
jur_NegativeLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i, $e;
    $size = $this.$children.$size();
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        $e = $this.$children.$get($i);
        if ($e.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookAhead_getName = $this => {
    return $rt_s(244);
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = $array => {
    let $cls;
    $cls = jl_Class_getClassInfo(jl_Object_getClass($array));
    if ($cls[$rt_meta].itemType !== null)
        return $rt_arrayLength($array);
    $rt_throw(jl_IllegalArgumentException__init_());
},
jlr_Array_newInstance = ($componentType, $length) => {
    let $cls;
    if ($componentType === null)
        $rt_throw(jl_NullPointerException__init_2());
    if ($componentType === $rt_cls($rt_voidcls))
        $rt_throw(jl_IllegalArgumentException__init_());
    if ($length < 0)
        $rt_throw(jl_NegativeArraySizeException__init_0());
    $cls = jl_Class_getClassInfo($componentType);
    return otrr_ClassInfo_newArrayInstance($cls, $length);
};
function otcit_DoubleAnalyzer$Result() {
    let a = this; jl_Object.call(a);
    a.$mantissa = Long_ZERO;
    a.$exponent = 0;
    a.$sign = 0;
}
let otcit_DoubleAnalyzer$Result__init_0 = $this => {
    jl_Object__init_($this);
},
otcit_DoubleAnalyzer$Result__init_ = () => {
    let var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_0(var_0);
    return var_0;
};
function igiae_PluginException() {
    let a = this; jl_RuntimeException.call(a);
    a.$pluginId2 = null;
    a.$detail = null;
    a.$fix1 = null;
}
let igiae_PluginException__init_ = ($this, $pluginId, $detail, $fix) => {
    jl_RuntimeException__init_0($this, (((((((jl_StringBuilder__init_()).$append3($rt_s(245))).$append3($pluginId)).$append3($rt_s(246))).$append3($detail)).$append3($rt_s(247))).$append3($fix)).$toString());
    $this.$pluginId2 = $pluginId;
    $this.$detail = $detail;
    $this.$fix1 = $fix;
},
igiae_PluginException__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new igiae_PluginException();
    igiae_PluginException__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
igiae_PluginException_getPluginId = $this => {
    return $this.$pluginId2;
},
igiae_PluginException_getDetail = $this => {
    return $this.$detail;
},
igiae_PluginException_getFix = $this => {
    return $this.$fix1;
},
jur_AbstractCharClass$LazyJavaDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDigit__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDigit();
    jur_AbstractCharClass$LazyJavaDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDigit_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaDigit$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
otci_IntegerUtil = $rt_classWithoutFields(),
otci_IntegerUtil_toUnsignedLogRadixString = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0;
    if (!$value)
        return $rt_s(248);
    $radix = 1 << $radixLog2;
    $mask = $radix - 1 | 0;
    $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
    $chars = $rt_createCharArray($sz);
    $pos = $rt_imul($sz - 1 | 0, $radixLog2);
    $target = 0;
    while ($pos >= 0) {
        var$9 = $chars.data;
        $target_0 = $target + 1 | 0;
        var$9[$target] = jl_Character_forDigit(($value >>> $pos | 0) & $mask, $radix);
        $pos = $pos - $radixLog2 | 0;
        $target = $target_0;
    }
    return jl_String__init_($chars);
};
function jur_LeafQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$leaf = null;
}
let jur_LeafQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$leaf = $innerSet;
},
jur_LeafQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_LeafQuantifierSet();
    jur_LeafQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_LeafQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $i, var$5;
    $i = 0;
    a: {
        while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
            var$5 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$5 <= 0)
                break a;
            $stringIndex = $stringIndex + var$5 | 0;
            $i = $i + 1 | 0;
        }
    }
    while (true) {
        if ($i < 0)
            return (-1);
        var$5 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if (var$5 >= 0)
            break;
        $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
        $i = $i + (-1) | 0;
    }
    return var$5;
},
jur_LeafQuantifierSet_getName = $this => {
    return $rt_s(249);
},
jur_AltQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_AltQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_AltQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AltQuantifierSet();
    jur_AltQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    return $shift;
},
jur_AltQuantifierSet_setNext = ($this, $next) => {
    jur_AbstractSet_setNext($this, $next);
    $this.$innerSet.$setNext($next);
},
jur_PossessiveAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_PossessiveAltQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AltQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_PossessiveAltQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PossessiveAltQuantifierSet();
    jur_PossessiveAltQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PossessiveAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
        var$4 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$4 >= 1)
            $stringIndex = $stringIndex + var$4 | 0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
igiae_ServiceHub$Listener = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$3$1() {
    let a = this; jl_Object.call(a);
    a.$val$listener1 = null;
    a.$this$035 = null;
}
let igiaj_JsPluginContext$3$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$035 = $this$0;
    $this.$val$listener1 = var$2;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$3$1__init_0 = (var_0, var_1) => {
    let var_2 = new igiaj_JsPluginContext$3$1();
    igiaj_JsPluginContext$3$1__init_(var_2, var_0, var_1);
    return var_2;
},
igiaj_JsPluginContext$3$1_changed = ($this, $service, $registered) => {
    let var$3, var$4, var$5;
    var$3 = $this.$val$listener1;
    var$4 = igiaj_JsPluginHost_orUndefined$js_body$_10(otji_JSWrapper_unwrap($service));
    var$5 = igiaj_JsPluginHost_serviceEvent($registered);
    var$3.call(var$4, $rt_ustr(var$5));
},
otjc_JSObjects = $rt_classWithoutFields(),
igiaj_JsScheduler$Task = $rt_classWithoutFields(0),
otji_JS = $rt_classWithoutFields(),
otji_JS_function = (var$1, var$2) => {
    if (var$1 === null || var$1 === undefined) {
        return null;
    }
    let name = 'jso$functor$' + var$2;
    let result = var$1[name];
    if (typeof result !== 'function') {
        let fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        result = () => fn;
        var$1[name] = result;
    }
    return result();
},
otji_JS_functionAsObject = (var$1, var$2) => {
    if (typeof var$1 !== 'function') return var$1;
    let result = {  };
    result[var$2] = var$1;
    return result;
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$051 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_ = ($this, var$1) => {
    $this.$this$051 = var$1;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains = ($this, $ch) => {
    return jl_Character_isUnicodeIdentifierStart($ch);
},
otciu_UnicodeHelper = $rt_classWithoutFields(),
otciu_UnicodeHelper_decodeIntPairsDiff = $text => {
    let $flow, $sz, $data, $j, $lastKey, $lastValue, $i, var$9, var$10;
    $flow = otci_CharFlow__init_0(jl_String_toCharArray($text));
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    $j = 0;
    $lastKey = 0;
    $lastValue = 0;
    $i = 0;
    while ($i < $sz) {
        var$9 = $data.data;
        $lastKey = $lastKey + otci_Base46_decode($flow) | 0;
        $lastValue = $lastValue + otci_Base46_decode($flow) | 0;
        var$10 = $j + 1 | 0;
        var$9[$j] = $lastKey;
        $j = var$10 + 1 | 0;
        var$9[var$10] = $lastValue;
        $i = $i + 1 | 0;
    }
    return $data;
},
otciu_UnicodeHelper_decodeCaseMapping = $text => {
    let $flow, $sz, $data, $last, $i, var$7, var$8;
    $flow = otci_CharFlow__init_0(jl_String_toCharArray($text));
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    $last = 0;
    $i = 0;
    while ($i < $sz) {
        var$7 = $data.data;
        $last = $last + otci_Base46_decodeUnsigned($flow) | 0;
        var$8 = $i * 2 | 0;
        var$7[var$8] = $last;
        var$7[var$8 + 1 | 0] = otci_Base46_decode($flow);
        $i = $i + 1 | 0;
    }
    return $data;
},
otciu_UnicodeHelper_createCharMapping = $data => {
    let $result, $last, $lastValue, $i, var$6, var$7, $key, $value, var$10;
    $result = $rt_createIntArray(65536);
    $last = 0;
    $lastValue = 0;
    $i = 0;
    a: {
        while (true) {
            var$6 = $data.data;
            if ($i >= var$6.length)
                break a;
            var$7 = $result.data;
            $key = var$6[$i];
            $value = var$6[$i + 1 | 0];
            var$10 = var$7.length;
            if ($key < var$10)
                var$10 = $key;
            else if ($key == $last)
                break;
            ju_Arrays_fill0($result, $last, var$10, $lastValue);
            $i = $i + 2 | 0;
            $last = var$10;
            $lastValue = $value;
        }
    }
    return otciu_CharMapping__init_0($data, $result);
},
otciu_UnicodeHelper_decodeByte = $c => {
    if ($c > 92)
        return (($c - 32 | 0) - 2 | 0) << 24 >> 24;
    if ($c <= 34)
        return ($c - 32 | 0) << 24 >> 24;
    return (($c - 32 | 0) - 1 | 0) << 24 >> 24;
},
otciu_UnicodeHelper_extractRle = $encoded => {
    let $ranges, $buffer, $index, $rangeIndex, $codePoint, $i, $b, $count, $pos, $j, $digit, var$13, var$14, var$15, var$16, var$17, var$18, $chunk;
    $ranges = $rt_createArray(otciu_UnicodeHelper$Range, 16384);
    $buffer = $rt_createByteArray(16384);
    $index = 0;
    $rangeIndex = 0;
    $codePoint = 0;
    $i = 0;
    while ($i < jl_String_length($encoded)) {
        $b = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
        if ($b == 64) {
            $i = $i + 1 | 0;
            $b = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
            $count = 0;
            $pos = 1;
            $j = 0;
            while ($j < 3) {
                $i = $i + 1 | 0;
                $digit = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
                $count = $count | $rt_imul($pos, $digit);
                $pos = $pos * 64 | 0;
                $j = $j + 1 | 0;
            }
        } else if ($b < 32)
            $count = 1;
        else {
            $b = ($b - 32 | 0) << 24 >> 24;
            $i = $i + 1 | 0;
            $count = otciu_UnicodeHelper_decodeByte(jl_String_charAt($encoded, $i));
        }
        if (!$b && $count >= 128) {
            if ($index > 0) {
                var$13 = $ranges.data;
                var$14 = $rangeIndex + 1 | 0;
                var$13[$rangeIndex] = otciu_UnicodeHelper$Range__init_0($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf($buffer, $index));
                $rangeIndex = var$14;
            }
            $codePoint = $codePoint + ($index + $count | 0) | 0;
            $index = 0;
        } else
            while ($count > 0) {
                var$14 = $buffer.data.length;
                if ($index != var$14)
                    var$15 = $index;
                else {
                    var$13 = $ranges.data;
                    var$16 = $rangeIndex + 1 | 0;
                    var$17 = new otciu_UnicodeHelper$Range;
                    var$18 = $codePoint + $index | 0;
                    otciu_UnicodeHelper$Range__init_(var$17, $codePoint, var$18, ju_Arrays_copyOf($buffer, $index));
                    var$13[$rangeIndex] = var$17;
                    var$15 = 0;
                    $rangeIndex = var$16;
                    $codePoint = var$18;
                }
                $chunk = jl_Math_min($count, var$14 - var$15 | 0);
                $index = var$15 + $chunk | 0;
                ju_Arrays_fill1($buffer, var$15, $index, $b);
                $count = $count - $chunk | 0;
            }
        $i = $i + 1 | 0;
    }
    if ($index <= 0)
        var$14 = $rangeIndex;
    else {
        var$13 = $ranges.data;
        var$14 = $rangeIndex + 1 | 0;
        var$13[$rangeIndex] = otciu_UnicodeHelper$Range__init_0($codePoint, $codePoint + $index | 0, ju_Arrays_copyOf($buffer, $index));
    }
    return ju_Arrays_copyOf0($ranges, var$14);
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_equals = ($a, $b) => {
    if ($a === $b)
        return 1;
    return $a !== null ? $a.$equals($b) : $b !== null ? 0 : 1;
},
ju_Objects_hashCode = $o => {
    return $o !== null ? $o.$hashCode0() : 0;
},
ju_Objects_requireNonNull = $obj => {
    return ju_Objects_requireNonNull0($obj, $rt_s(10));
},
ju_Objects_requireNonNull0 = ($obj, $message) => {
    if ($obj !== null)
        return $obj;
    $rt_throw(jl_NullPointerException__init_($message));
},
ju_Objects_checkFromIndexSize = ($fromIndex, $size, $length) => {
    if ($fromIndex >= 0 && $size >= 0 && $size <= ($length - $fromIndex | 0))
        return $fromIndex;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jur_AbstractCharClass$LazyAlnum = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlpha),
jur_AbstractCharClass$LazyAlnum__init_ = $this => {
    jur_AbstractCharClass$LazyAlpha__init_($this);
},
jur_AbstractCharClass$LazyAlnum__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlnum();
    jur_AbstractCharClass$LazyAlnum__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlnum_computeValue = $this => {
    return (jur_AbstractCharClass$LazyAlpha_computeValue($this)).$add0(48, 57);
},
jur_AbstractCharClass$LazyGraph = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlnum),
jur_AbstractCharClass$LazyGraph__init_ = $this => {
    jur_AbstractCharClass$LazyAlnum__init_($this);
},
jur_AbstractCharClass$LazyGraph__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyGraph();
    jur_AbstractCharClass$LazyGraph__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyGraph_computeValue = $this => {
    return (((jur_AbstractCharClass$LazyAlnum_computeValue($this)).$add0(33, 64)).$add0(91, 96)).$add0(123, 126);
},
jur_AbstractCharClass$LazyPrint = $rt_classWithoutFields(jur_AbstractCharClass$LazyGraph),
jur_AbstractCharClass$LazyPrint__init_ = $this => {
    jur_AbstractCharClass$LazyGraph__init_($this);
},
jur_AbstractCharClass$LazyPrint__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyPrint();
    jur_AbstractCharClass$LazyPrint__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPrint_computeValue = $this => {
    return (jur_AbstractCharClass$LazyGraph_computeValue($this)).$add(32);
},
jur_AbstractCharClass$LazyJavaSpaceChar = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaSpaceChar__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaSpaceChar__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaSpaceChar();
    jur_AbstractCharClass$LazyJavaSpaceChar__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaSpaceChar_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaSpaceChar$1__init_0($this);
},
otjc_JSUndefined = $rt_classWithoutFields(),
jur_PositiveLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookBehind__init_ = ($this, $children, $fSet) => {
    jur_AtomicJointSet__init_($this, $children, $fSet);
},
jur_PositiveLookBehind__init_0 = (var_0, var_1) => {
    let var_2 = new jur_PositiveLookBehind();
    jur_PositiveLookBehind__init_(var_2, var_0, var_1);
    return var_2;
},
jur_PositiveLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $leftBound, $shift, $i, $e;
    $size = $this.$children.$size();
    $leftBound = !$matchResult.$hasTransparentBounds() ? $matchResult.$getLeftBound() : 0;
    a: {
        $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0) {
            $matchResult.$setConsumed($this.$groupIndex, $stringIndex);
            $i = 0;
            while (true) {
                if ($i >= $size)
                    break a;
                $e = $this.$children.$get($i);
                if ($e.$findBack($leftBound, $stringIndex, $testString, $matchResult) >= 0) {
                    $matchResult.$setConsumed($this.$groupIndex, (-1));
                    return $shift;
                }
                $i = $i + 1 | 0;
            }
        }
    }
    return (-1);
},
jur_PositiveLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PositiveLookBehind_getName = $this => {
    return $rt_s(250);
};
function jur_SequenceSet() {
    let a = this; jur_LeafSet.call(a);
    a.$string = null;
    a.$leftToRight = null;
    a.$rightToLeft = null;
}
let jur_SequenceSet__init_ = ($this, $substring) => {
    let $j;
    jur_LeafSet__init_($this);
    $this.$string = $substring.$toString();
    $this.$charCount0 = $substring.$length();
    $this.$leftToRight = jur_SequenceSet$IntHash__init_($this.$charCount0);
    $this.$rightToLeft = jur_SequenceSet$IntHash__init_($this.$charCount0);
    $j = 0;
    while ($j < ($this.$charCount0 - 1 | 0)) {
        $this.$leftToRight.$put0(jl_String_charAt($this.$string, $j), ($this.$charCount0 - $j | 0) - 1 | 0);
        $this.$rightToLeft.$put0(jl_String_charAt($this.$string, ($this.$charCount0 - $j | 0) - 1 | 0), ($this.$charCount0 - $j | 0) - 1 | 0);
        $j = $j + 1 | 0;
    }
},
jur_SequenceSet__init_0 = var_0 => {
    let var_1 = new jur_SequenceSet();
    jur_SequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_SequenceSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$startsWith($testString, $strIndex) ? (-1) : $this.$charCount0;
},
jur_SequenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $strLength, var$5;
    $strLength = $matchResult.$getRightBound();
    while (true) {
        if ($strIndex > $strLength)
            return (-1);
        var$5 = $this.$indexOf($testString, $strIndex, $strLength);
        if (var$5 < 0)
            return (-1);
        if ($this.$next2.$matches(var$5 + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $strIndex = var$5 + 1 | 0;
    }
    return var$5;
},
jur_SequenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let var$5;
    while (true) {
        if ($lastIndex < $strIndex)
            return (-1);
        var$5 = $this.$lastIndexOf($testString, $strIndex, $lastIndex);
        if (var$5 < 0)
            return (-1);
        if ($this.$next2.$matches(var$5 + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $lastIndex = var$5 + (-1) | 0;
    }
    return var$5;
},
jur_SequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(251)), var$1);
    return jl_StringBuilder_toString(var$2);
},
jur_SequenceSet_first = ($this, $set) => {
    let var$2, var$3, var$4, var$5, var$6;
    if ($set instanceof jur_CharSet)
        return $set.$getChar() != jl_String_charAt($this.$string, 0) ? 0 : 1;
    if ($set instanceof jur_RangeSet)
        return $set.$accepts(0, jl_String_substring($this.$string, 0, 1)) <= 0 ? 0 : 1;
    if (!($set instanceof jur_SupplRangeSet)) {
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        a: {
            if (jl_String_length($this.$string) > 1) {
                var$2 = $set;
                var$3 = var$2.$getCodePoint();
                var$4 = jl_String_charAt($this.$string, 0);
                var$2 = $this.$string;
                var$5 = jl_String_charAt(var$2, 1);
                if (var$3 == jl_Character_toCodePoint(var$4, var$5)) {
                    var$4 = 1;
                    break a;
                }
            }
            var$4 = 0;
        }
        return var$4;
    }
    b: {
        c: {
            var$2 = $set;
            if (!var$2.$contains0(jl_String_charAt($this.$string, 0))) {
                var$6 = $this.$string;
                if (jl_String_length(var$6) <= 1)
                    break c;
                var$6 = $this.$string;
                var$4 = jl_Character_toCodePoint(jl_String_charAt(var$6, 0), jl_String_charAt($this.$string, 1));
                if (!var$2.$contains0(var$4))
                    break c;
            }
            var$4 = 1;
            break b;
        }
        var$4 = 0;
    }
    return var$4;
},
jur_SequenceSet_indexOf = ($this, $str, $i, $to) => {
    let $last, $ch;
    $last = jl_String_charAt($this.$string, $this.$charCount0 - 1 | 0);
    while (true) {
        if ($i > ($to - $this.$charCount0 | 0))
            return (-1);
        $ch = $str.$charAt(($i + $this.$charCount0 | 0) - 1 | 0);
        if ($ch == $last && $this.$startsWith($str, $i))
            break;
        $i = $i + $this.$leftToRight.$get2($ch) | 0;
    }
    return $i;
},
jur_SequenceSet_lastIndexOf = ($this, $str, $to, $i) => {
    let $first, $size, $delta, $ch;
    $first = jl_String_charAt($this.$string, 0);
    $size = $str.$length();
    $delta = ($size - $i | 0) - $this.$charCount0 | 0;
    if ($delta <= 0)
        $i = $i + $delta | 0;
    while (true) {
        if ($i < $to)
            return (-1);
        $ch = $str.$charAt($i);
        if ($ch == $first && $this.$startsWith($str, $i))
            break;
        $i = $i - $this.$rightToLeft.$get2($ch) | 0;
    }
    return $i;
},
jur_SequenceSet_startsWith = ($this, $str, $from) => {
    let $i;
    $i = 0;
    while ($i < $this.$charCount0) {
        if ($str.$charAt($i + $from | 0) != jl_String_charAt($this.$string, $i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
},
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jl_ArrayStoreException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_ArrayStoreException__init_ = () => {
    let var_0 = new jl_ArrayStoreException();
    jl_ArrayStoreException__init_0(var_0);
    return var_0;
},
jur_AltGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_AltGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_AltGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AltGroupQuantifierSet();
    jur_AltGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_AltGroupQuantifierSet_setNext = ($this, $next) => {
    jur_AbstractSet_setNext($this, $next);
    $this.$innerSet.$setNext($next);
},
igiae_Scheduler = $rt_classWithoutFields(0),
igiae_Scheduler_NEVER = null,
igiae_Scheduler_$callClinit = () => {
    igiae_Scheduler_$callClinit = $rt_eraseClinit(igiae_Scheduler);
    igiae_Scheduler__clinit_();
},
igiae_Scheduler__clinit_ = () => {
    igiae_Scheduler_NEVER = igiae_Scheduler$1__init_0();
},
jur_MatchResult = $rt_classWithoutFields(0);
function jur_MatchResultImpl() {
    let a = this; jl_Object.call(a);
    a.$groupBounds = null;
    a.$consumers = null;
    a.$compQuantCounters = null;
    a.$string3 = null;
    a.$groupCount0 = 0;
    a.$valid = 0;
    a.$leftBound0 = 0;
    a.$rightBound0 = 0;
    a.$startIndex = 0;
    a.$transparentBounds = 0;
    a.$anchoringBounds = 0;
    a.$hitEnd = 0;
    a.$requireEnd = 0;
    a.$previousMatch = 0;
    a.$mode1 = 0;
    a.$namedGroups1 = null;
}
let jur_MatchResultImpl__init_ = ($this, $string, $leftBound, $rightBound, $groupCount, $compQuantCount, $consumersCount, $namedGroups) => {
    let var$8;
    jl_Object__init_($this);
    $this.$previousMatch = (-1);
    var$8 = $groupCount + 1 | 0;
    $this.$groupCount0 = var$8;
    $this.$groupBounds = $rt_createIntArray(var$8 * 2 | 0);
    $this.$namedGroups1 = $namedGroups;
    $this.$consumers = $rt_createIntArray($consumersCount);
    ju_Arrays_fill($this.$consumers, (-1));
    if ($compQuantCount > 0)
        $this.$compQuantCounters = $rt_createIntArray($compQuantCount);
    ju_Arrays_fill($this.$groupBounds, (-1));
    $this.$reset($string, $leftBound, $rightBound);
},
jur_MatchResultImpl__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5, var_6) => {
    let var_7 = new jur_MatchResultImpl();
    jur_MatchResultImpl__init_(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
},
jur_MatchResultImpl_setConsumed = ($this, $counter, $value) => {
    $this.$consumers.data[$counter] = $value;
},
jur_MatchResultImpl_getConsumed = ($this, $counter) => {
    return $this.$consumers.data[$counter];
},
jur_MatchResultImpl_end = $this => {
    return $this.$end(0);
},
jur_MatchResultImpl_end0 = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_setStart = ($this, $group, $offset) => {
    $this.$groupBounds.data[$group * 2 | 0] = $offset;
},
jur_MatchResultImpl_setEnd = ($this, $group, $offset) => {
    $this.$groupBounds.data[($group * 2 | 0) + 1 | 0] = $offset;
},
jur_MatchResultImpl_getStart = ($this, $group) => {
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_getEnd = ($this, $group) => {
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_getGroupNoCheck = ($this, $group) => {
    let $st, $end;
    $st = $this.$getStart($group);
    $end = $this.$getEnd($group);
    if (($end | $st | ($end - $st | 0)) >= 0 && $end <= $this.$string3.$length())
        return ($this.$string3.$subSequence($st, $end)).$toString();
    return null;
},
jur_MatchResultImpl_start = $this => {
    return $this.$start(0);
},
jur_MatchResultImpl_start0 = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_finalizeMatch = $this => {
    if ($this.$groupBounds.data[0] == (-1)) {
        $this.$groupBounds.data[0] = $this.$startIndex;
        $this.$groupBounds.data[1] = $this.$startIndex;
    }
    $this.$previousMatch = $this.$end0();
},
jur_MatchResultImpl_getEnterCounter = ($this, $setCounter) => {
    return $this.$compQuantCounters.data[$setCounter];
},
jur_MatchResultImpl_setEnterCounter = ($this, $setCounter, $value) => {
    $this.$compQuantCounters.data[$setCounter] = $value;
},
jur_MatchResultImpl_checkGroup = ($this, $group) => {
    if (!$this.$valid)
        $rt_throw(jl_IllegalStateException__init_());
    if ($group >= 0 && $group < $this.$groupCount0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_String_valueOf0($group)));
},
jur_MatchResultImpl_setValid = $this => {
    $this.$valid = 1;
},
jur_MatchResultImpl_isValid = $this => {
    return $this.$valid;
},
jur_MatchResultImpl_reset0 = ($this, $newSequence, $leftBound, $rightBound) => {
    $this.$valid = 0;
    $this.$mode1 = 2;
    ju_Arrays_fill($this.$groupBounds, (-1));
    ju_Arrays_fill($this.$consumers, (-1));
    if ($newSequence !== null)
        $this.$string3 = $newSequence;
    if ($leftBound >= 0)
        jur_MatchResultImpl_setBounds($this, $leftBound, $rightBound);
    $this.$startIndex = $this.$leftBound0;
},
jur_MatchResultImpl_reset = $this => {
    $this.$reset(null, (-1), (-1));
},
jur_MatchResultImpl_setBounds = ($this, $leftBound, $rightBound) => {
    $this.$leftBound0 = $leftBound;
    $this.$rightBound0 = $rightBound;
},
jur_MatchResultImpl_setStartIndex = ($this, $startIndex) => {
    $this.$startIndex = $startIndex;
    if ($this.$previousMatch >= 0)
        $startIndex = $this.$previousMatch;
    $this.$previousMatch = $startIndex;
},
jur_MatchResultImpl_getLeftBound = $this => {
    return $this.$leftBound0;
},
jur_MatchResultImpl_getRightBound = $this => {
    return $this.$rightBound0;
},
jur_MatchResultImpl_setMode = ($this, $mode) => {
    $this.$mode1 = $mode;
},
jur_MatchResultImpl_mode = $this => {
    return $this.$mode1;
},
jur_MatchResultImpl_useAnchoringBounds = ($this, $value) => {
    $this.$anchoringBounds = $value;
},
jur_MatchResultImpl_hasAnchoringBounds = $this => {
    return $this.$anchoringBounds;
},
jur_MatchResultImpl_hasTransparentBounds = $this => {
    return $this.$transparentBounds;
},
jur_MatchResultImpl_getPreviousMatchEnd = $this => {
    return $this.$previousMatch;
};
function jur_UCIRangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars1 = null;
    a.$alt3 = 0;
}
let jur_UCIRangeSet__init_ = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars1 = $cc.$getInstance();
    $this.$alt3 = $cc.$alt;
},
jur_UCIRangeSet__init_0 = var_0 => {
    let var_1 = new jur_UCIRangeSet();
    jur_UCIRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_UCIRangeSet_accepts = ($this, $strIndex, $testString) => {
    let var$3, var$4;
    var$3 = $this.$chars1;
    var$4 = jl_Character_toUpperCase($testString.$charAt($strIndex));
    return !var$3.$contains0(jl_Character_toLowerCase(var$4)) ? (-1) : 1;
},
jur_UCIRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt3 ? $rt_s(38) : $rt_s(39);
    var$2 = $this.$chars1.$toString();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(252)), var$1), var$2);
    return jl_StringBuilder_toString(var$3);
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$015 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_ = ($this, $this$0) => {
    $this.$this$015 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1();
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains = ($this, $ch) => {
    return jl_Character_isJavaIdentifierPart($ch);
},
jl_AutoCloseable = $rt_classWithoutFields(0),
ji_Closeable = $rt_classWithoutFields(0),
ji_OutputStream = $rt_classWithoutFields(),
ji_OutputStream__init_ = $this => {
    jl_Object__init_($this);
};
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out = null;
}
let ji_FilterOutputStream__init_ = ($this, $out) => {
    ji_OutputStream__init_($this);
    $this.$out = $out;
},
ji_FilterOutputStream__init_0 = var_0 => {
    let var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_(var_1, var_0);
    return var_1;
};
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$sb = null;
    a.$buffer0 = null;
    a.$charset = null;
}
let ji_PrintStream__init_ = ($this, $out, $autoFlush, $charset) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer0 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    $this.$charset = $charset;
},
ji_PrintStream__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new ji_PrintStream();
    ji_PrintStream__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JsConsolePrintStream__init_ = $this => {
    ji_PrintStream__init_($this, null, 0, null);
},
otcic_JsConsolePrintStream_println = ($this, $s) => {
    $this.$print($s);
    $this.$print($rt_s(253));
},
otp_Platform = $rt_classWithoutFields(),
jnc_Charset = $rt_classWithoutFields();
function jl_Boolean() {
    jl_Object.call(this);
    this.$value3 = 0;
}
let jl_Boolean_TRUE = null,
jl_Boolean_FALSE = null,
jl_Boolean_TYPE = null,
jl_Boolean_$callClinit = () => {
    jl_Boolean_$callClinit = $rt_eraseClinit(jl_Boolean);
    jl_Boolean__clinit_();
},
jl_Boolean__init_0 = ($this, $value) => {
    jl_Boolean_$callClinit();
    jl_Object__init_($this);
    $this.$value3 = $value;
},
jl_Boolean__init_ = var_0 => {
    let var_1 = new jl_Boolean();
    jl_Boolean__init_0(var_1, var_0);
    return var_1;
},
jl_Boolean_booleanValue = $this => {
    return $this.$value3;
},
jl_Boolean_valueOf = $value => {
    jl_Boolean_$callClinit();
    return !$value ? jl_Boolean_FALSE : jl_Boolean_TRUE;
},
jl_Boolean_toString0 = $value => {
    jl_Boolean_$callClinit();
    return !$value ? $rt_s(254) : $rt_s(255);
},
jl_Boolean_toString = $this => {
    return jl_Boolean_toString0($this.$value3);
},
jl_Boolean_hashCode = $this => {
    return jl_Boolean_hashCode0($this.$value3);
},
jl_Boolean_hashCode0 = $value => {
    jl_Boolean_$callClinit();
    return !$value ? 1237 : 1231;
},
jl_Boolean_equals = ($this, $obj) => {
    if ($this === $obj)
        return 1;
    return $obj instanceof jl_Boolean && $obj.$value3 == $this.$value3 ? 1 : 0;
},
jl_Boolean__clinit_ = () => {
    jl_Boolean_TRUE = jl_Boolean__init_(1);
    jl_Boolean_FALSE = jl_Boolean__init_(0);
    jl_Boolean_TYPE = $rt_cls($rt_booleancls);
},
ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException),
ju_NoSuchElementException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
ju_NoSuchElementException__init_ = () => {
    let var_0 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_0(var_0);
    return var_0;
},
igiae_ServiceHub$Registry = $rt_classWithoutFields(0),
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_GenericDeclaration = $rt_classWithoutFields(0),
jur_NegativeLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookBehind__init_ = ($this, $children, $fSet) => {
    jur_AtomicJointSet__init_($this, $children, $fSet);
},
jur_NegativeLookBehind__init_0 = (var_0, var_1) => {
    let var_2 = new jur_NegativeLookBehind();
    jur_NegativeLookBehind__init_(var_2, var_0, var_1);
    return var_2;
},
jur_NegativeLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i, $e, $shift;
    $size = $this.$children.$size();
    $matchResult.$setConsumed($this.$groupIndex, $stringIndex);
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        $e = $this.$children.$get($i);
        $shift = $e.$findBack(0, $stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookBehind_getName = $this => {
    return $rt_s(256);
},
jur_BackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet),
jur_BackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_BackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_BackReferenceSet();
    jur_BackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_BackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $shift;
    $group = $this.$getString($matchResult);
    if ($group !== null && ($stringIndex + jl_String_length($group) | 0) <= $matchResult.$getRightBound()) {
        $shift = !jl_String_startsWith0($testString.$toString(), $group, $stringIndex) ? (-1) : jl_String_length($group);
        if ($shift < 0)
            return (-1);
        $matchResult.$setConsumed($this.$consCounter1, $shift);
        return $this.$next2.$matches($stringIndex + $shift | 0, $testString, $matchResult);
    }
    return (-1);
},
jur_BackReferenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $group, $strLength, $testStr, var$7;
    $group = $this.$getString($matchResult);
    $strLength = $matchResult.$getLeftBound();
    if ($group !== null && ($strIndex + jl_String_length($group) | 0) <= $strLength) {
        $testStr = $testString.$toString();
        while (true) {
            if ($strIndex > $strLength)
                return (-1);
            var$7 = jl_String_indexOf0($testStr, $group, $strIndex);
            if (var$7 < 0)
                return (-1);
            if ($this.$next2.$matches(var$7 + jl_String_length($group) | 0, $testString, $matchResult) >= 0)
                break;
            $strIndex = var$7 + 1 | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_BackReferenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $group, $testStr, var$7;
    $group = $this.$getString($matchResult);
    if ($group === null)
        return (-1);
    $testStr = $testString.$toString();
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$7 = jl_String_lastIndexOf1($testStr, $group, $lastIndex);
            if (var$7 < 0)
                break a;
            if (var$7 < $strIndex)
                break a;
            if ($this.$next2.$matches(var$7 + jl_String_length($group) | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$7 + (-1) | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_BackReferenceSet_first = ($this, $set) => {
    return 1;
},
jur_BackReferenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$groupIndex;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append1(jl_StringBuilder_append(var$2, $rt_s(257)), var$1);
    return jl_StringBuilder_toString(var$2);
};
function jur_DotQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$lt = null;
}
let jur_DotQuantifierSet__init_ = ($this, $innerSet, $next, $type, $lt) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$lt = $lt;
},
jur_DotQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_DotQuantifierSet();
    jur_DotQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_DotQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startSearch;
    $strLength = $matchResult.$getRightBound();
    $startSearch = jur_DotQuantifierSet_findLineTerminator($this, $stringIndex, $strLength, $testString);
    if ($startSearch >= 0)
        $strLength = $startSearch;
    if ($strLength > $stringIndex)
        return $this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_DotQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $res, $nextSearch, var$7, $leftBound;
    $strLength = $matchResult.$getRightBound();
    $res = $this.$next2.$find($stringIndex, $testString, $matchResult);
    if ($res < 0)
        return (-1);
    $nextSearch = jur_DotQuantifierSet_findLineTerminator($this, $res, $strLength, $testString);
    if ($nextSearch >= 0)
        $strLength = $nextSearch;
    var$7 = $this.$next2.$findBack($res, $strLength, $testString, $matchResult);
    var$7 = jl_Math_max($res, var$7);
    $leftBound = var$7 > 0 ? jur_DotQuantifierSet_findBackLineTerminator($this, $stringIndex, var$7 - 1 | 0, $testString) : var$7 ? (-1) : 0;
    if ($leftBound >= $stringIndex)
        $stringIndex = $leftBound >= var$7 ? $leftBound : $leftBound + 1 | 0;
    return $stringIndex;
},
jur_DotQuantifierSet_findLineTerminator = ($this, $i, $to, $testString) => {
    while (true) {
        if ($i >= $to)
            return (-1);
        if ($this.$lt.$isLineTerminator($testString.$charAt($i)))
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jur_DotQuantifierSet_findBackLineTerminator = ($this, $from, $i, $testString) => {
    while (true) {
        if ($i < $from)
            return (-1);
        if ($this.$lt.$isLineTerminator($testString.$charAt($i)))
            break;
        $i = $i + (-1) | 0;
    }
    return $i;
},
jur_DotQuantifierSet_getName = $this => {
    return $rt_s(258);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function igiaj_JsPluginHost$10() {
    jl_Object.call(this);
    this.$val$host4 = null;
}
let igiaj_JsPluginHost$10__init_ = ($this, var$1) => {
    $this.$val$host4 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$10__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$10();
    igiaj_JsPluginHost$10__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$10_call = ($this, $pluginId) => {
    let $found;
    $found = igiae_PluginLedger_entry(igiae_PluginHost_getLedger($this.$val$host4), $pluginId);
    return igiaj_JsPluginHost_orUndefined$js_body$_10($found !== null ? igiaj_JsPluginHost_ledgerRow($found) : null);
},
igiaj_JsPluginHost$10_call$exported$0 = (var$1, var$2) => {
    var$2 = $rt_str(var$2);
    return var$1.$call(var$2);
},
igiaj_JsPluginHost$RecordDeclaredFn = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$11() {
    jl_Object.call(this);
    this.$val$host9 = null;
}
let igiaj_JsPluginHost$11__init_ = ($this, var$1) => {
    $this.$val$host9 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$11__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$11();
    igiaj_JsPluginHost$11__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$11_call = ($this, $manifest) => {
    let $facts;
    $facts = igiaj_JsPluginHost_factsOf($manifest);
    igiae_PluginLedger_recordDeclared(igiae_PluginHost_getLedger($this.$val$host9), igiae_ManifestFacts_getId($facts), igiae_ManifestFacts_getCapabilities($facts), igiae_ManifestFacts_getPermissions($facts));
},
igiaj_JsPluginHost$11_call$exported$0 = (var$1, var$2) => {
    var$1.$call7(var$2);
},
otjc_JSPromise$Executor = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$12() {
    jl_Object.call(this);
    this.$val$pending = null;
}
let igiaj_JsPluginHost$12__init_ = ($this, var$1) => {
    $this.$val$pending = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$12__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$12();
    igiaj_JsPluginHost$12__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$12_onExecute = ($this, $resolve, $reject) => {
    igiae_Pending_then($this.$val$pending, igiaj_JsPluginHost$12$1__init_0($this, $resolve, $reject));
},
igiaj_JsPluginHost$12_onExecute$exported$0 = (var$1, var$2, var$3) => {
    var$2 = otji_JS_functionAsObject(var$2, "accept");
    var$3 = otji_JS_functionAsObject(var$3, "accept");
    var$1.$onExecute(var$2, var$3);
},
jur_UnifiedQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_UnifiedQuantifierSet__init_ = ($this, $quant) => {
    jur_LeafQuantifierSet__init_($this, $quant.$getInnerSet(), $quant.$getNext(), $quant.$getType());
    $this.$innerSet.$setNext($this);
},
jur_UnifiedQuantifierSet__init_0 = var_0 => {
    let var_1 = new jur_UnifiedQuantifierSet();
    jur_UnifiedQuantifierSet__init_(var_1, var_0);
    return var_1;
},
jur_UnifiedQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
        var$4 = $this.$leaf;
        if (var$4.$accepts($stringIndex, $testString) <= 0)
            break;
        $stringIndex = $stringIndex + $this.$leaf.$charCount() | 0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_UnifiedQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $startSearch, $newSearch, $newSearch_0;
    $startSearch = $this.$next2.$find($stringIndex, $testString, $matchResult);
    if ($startSearch < 0)
        return (-1);
    $newSearch = $startSearch - $this.$leaf.$charCount() | 0;
    while ($newSearch >= $stringIndex && $this.$leaf.$accepts($newSearch, $testString) > 0) {
        $newSearch_0 = $newSearch - $this.$leaf.$charCount() | 0;
        $startSearch = $newSearch;
        $newSearch = $newSearch_0;
    }
    return $startSearch;
},
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$flags1 = 0;
    a.$classInfo = null;
    a.$name = null;
}
let jl_Class__init_0 = ($this, $classInfo) => {
    jl_Object__init_($this);
    $this.$classInfo = $classInfo;
},
jl_Class__init_ = var_0 => {
    let var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
},
jl_Class_createClass = $classInfo => {
    return jl_Class__init_($classInfo);
},
jl_Class_getClassInfo = $this => {
    return $this.$classInfo;
},
jl_Class_isInstance = ($this, $obj) => {
    return $obj !== null && jl_Class_isAssignableFrom($this, jl_Object_getClass($obj)) ? 1 : 0;
},
jl_Class_isAssignableFrom = ($this, $obj) => {
    return $rt_isAssignable($obj.$classInfo, $this.$classInfo);
},
jl_Class_getName = $this => {
    let $metadataName, $result, $itemType, $itemName, var$5;
    if (!($this.$flags1 & 1)) {
        $this.$flags1 = $this.$flags1 | 1;
        $metadataName = $this.$classInfo[$rt_meta].name;
        $result = $metadataName === null ? null : $rt_str($metadataName);
        if ($result === null) {
            $itemType = $this.$classInfo[$rt_meta].itemType;
            if ($itemType !== null) {
                $itemName = jl_Class_getName($rt_cls($itemType));
                if ($itemName !== null) {
                    if ($itemType[$rt_meta].itemType !== null) {
                        var$5 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append0(var$5, 91), $itemName);
                        $result = jl_StringBuilder_toString(var$5);
                    } else {
                        var$5 = jl_StringBuilder__init_();
                        jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append(var$5, $rt_s(259)), $itemName), 59);
                        $result = jl_StringBuilder_toString(var$5);
                    }
                }
            }
        }
        $this.$name = $result;
    }
    return $this.$name;
},
jl_Class_isPrimitive = $this => {
    return !$this.$classInfo[$rt_meta].primitiveKind ? 0 : 1;
},
jl_Class_getComponentType = $this => {
    let $itemTypeInfo;
    $itemTypeInfo = $this.$classInfo[$rt_meta].itemType;
    return $itemTypeInfo === null ? null : $rt_cls($itemTypeInfo);
};
function ju_BitSet() {
    let a = this; jl_Object.call(a);
    a.$data0 = null;
    a.$length0 = 0;
}
let ju_BitSet__init_0 = $this => {
    jl_Object__init_($this);
    $this.$data0 = $rt_createIntArray(2);
},
ju_BitSet__init_1 = () => {
    let var_0 = new ju_BitSet();
    ju_BitSet__init_0(var_0);
    return var_0;
},
ju_BitSet__init_ = ($this, $nbits) => {
    jl_Object__init_($this);
    if ($nbits < 0)
        $rt_throw(jl_NegativeArraySizeException__init_0());
    $this.$data0 = $rt_createIntArray((($nbits + 32 | 0) - 1 | 0) / 32 | 0);
},
ju_BitSet__init_2 = var_0 => {
    let var_1 = new ju_BitSet();
    ju_BitSet__init_(var_1, var_0);
    return var_1;
},
ju_BitSet_set = ($this, $bitIndex) => {
    let $index, var$3;
    if ($bitIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $index = $bitIndex / 32 | 0;
    if ($bitIndex >= $this.$length0) {
        ju_BitSet_ensureCapacity($this, $index + 1 | 0);
        $this.$length0 = $bitIndex + 1 | 0;
    }
    var$3 = $this.$data0.data;
    var$3[$index] = var$3[$index] | 1 << ($bitIndex % 32 | 0);
},
ju_BitSet_set0 = ($this, $fromIndex, $toIndex) => {
    let var$3, $fromDataIndex, $toDataIndex, var$6, $i;
    if ($fromIndex >= 0) {
        var$3 = $rt_compare($fromIndex, $toIndex);
        if (var$3 <= 0) {
            if (!var$3)
                return;
            $fromDataIndex = $fromIndex / 32 | 0;
            $toDataIndex = $toIndex / 32 | 0;
            if ($toIndex > $this.$length0) {
                ju_BitSet_ensureCapacity($this, $toDataIndex + 1 | 0);
                $this.$length0 = $toIndex;
            }
            if ($fromDataIndex == $toDataIndex) {
                var$6 = $this.$data0.data;
                var$6[$fromDataIndex] = var$6[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex) & ju_BitSet_trailingOneBits($this, $toIndex);
            } else {
                var$6 = $this.$data0.data;
                var$6[$fromDataIndex] = var$6[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex);
                $i = $fromDataIndex + 1 | 0;
                while ($i < $toDataIndex) {
                    $this.$data0.data[$i] = (-1);
                    $i = $i + 1 | 0;
                }
                if ($toIndex & 31) {
                    var$6 = $this.$data0.data;
                    var$6[$toDataIndex] = var$6[$toDataIndex] | ju_BitSet_trailingOneBits($this, $toIndex);
                }
            }
            return;
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
ju_BitSet_trailingZeroBits = ($this, $num) => {
    let var$2;
    var$2 = $num % 32 | 0;
    return (-1) << var$2;
},
ju_BitSet_trailingOneBits = ($this, $num) => {
    let var$2;
    var$2 = $num % 32 | 0;
    return !var$2 ? 0 : (-1) >>> (32 - var$2 | 0) | 0;
},
ju_BitSet_clear0 = ($this, $bitIndex) => {
    let $index, var$3;
    if ($bitIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $index = $bitIndex / 32 | 0;
    if ($index < $this.$data0.data.length) {
        var$3 = $this.$data0.data;
        var$3[$index] = var$3[$index] & jl_Integer_rotateLeft((-2), $bitIndex % 32 | 0);
        if ($bitIndex == ($this.$length0 - 1 | 0))
            ju_BitSet_recalculateLength($this);
    }
},
ju_BitSet_clear = ($this, $fromIndex, $toIndex) => {
    let var$3, $fromDataIndex, $toDataIndex, var$6, $i;
    if ($fromIndex >= 0 && $fromIndex <= $toIndex) {
        if ($fromIndex >= $this.$length0)
            return;
        var$3 = jl_Math_min($this.$length0, $toIndex);
        if ($fromIndex == var$3)
            return;
        $fromDataIndex = $fromIndex / 32 | 0;
        $toDataIndex = var$3 / 32 | 0;
        if ($fromDataIndex == $toDataIndex) {
            var$6 = $this.$data0.data;
            var$6[$fromDataIndex] = var$6[$fromDataIndex] & (ju_BitSet_trailingOneBits($this, $fromIndex) | ju_BitSet_trailingZeroBits($this, var$3));
        } else {
            var$6 = $this.$data0.data;
            var$6[$fromDataIndex] = var$6[$fromDataIndex] & ju_BitSet_trailingOneBits($this, $fromIndex);
            $i = $fromDataIndex + 1 | 0;
            while ($i < $toDataIndex) {
                $this.$data0.data[$i] = 0;
                $i = $i + 1 | 0;
            }
            if (var$3 & 31) {
                var$6 = $this.$data0.data;
                var$6[$toDataIndex] = var$6[$toDataIndex] & ju_BitSet_trailingZeroBits($this, var$3);
            }
        }
        ju_BitSet_recalculateLength($this);
        return;
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
ju_BitSet_get = ($this, $bitIndex) => {
    let $index;
    if ($bitIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    $index = $bitIndex / 32 | 0;
    return $index < $this.$data0.data.length && $this.$data0.data[$index] & 1 << ($bitIndex % 32 | 0) ? 1 : 0;
},
ju_BitSet_nextSetBit = ($this, $fromIndex) => {
    let $index, $val, var$4, $top, $i;
    if ($fromIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    if ($fromIndex >= $this.$length0)
        return (-1);
    $index = $fromIndex / 32 | 0;
    $val = $this.$data0.data[$index];
    var$4 = $val >>> ($fromIndex % 32 | 0) | 0;
    if (var$4)
        return jl_Integer_numberOfTrailingZeros(var$4) + $fromIndex | 0;
    $top = ($this.$length0 + 31 | 0) / 32 | 0;
    $i = $index + 1 | 0;
    while ($i < $top) {
        if ($this.$data0.data[$i])
            return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros($this.$data0.data[$i]) | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
ju_BitSet_nextClearBit = ($this, $fromIndex) => {
    let $index, $val, var$4, $top, $i;
    if ($fromIndex < 0)
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    if ($fromIndex >= $this.$length0)
        return $fromIndex;
    $index = $fromIndex / 32 | 0;
    $val = $this.$data0.data[$index] ^ (-1);
    var$4 = $val >>> ($fromIndex % 32 | 0) | 0;
    if (var$4)
        return jl_Integer_numberOfTrailingZeros(var$4) + $fromIndex | 0;
    $top = ($this.$length0 + 31 | 0) / 32 | 0;
    $i = $index + 1 | 0;
    while ($i < $top) {
        if ($this.$data0.data[$i] != (-1))
            return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros($this.$data0.data[$i] ^ (-1)) | 0;
        $i = $i + 1 | 0;
    }
    return $this.$length0;
},
ju_BitSet_ensureCapacity = ($this, $capacity) => {
    let $newArrayLength;
    if ($this.$data0.data.length >= $capacity)
        return;
    $newArrayLength = jl_Math_max(($capacity * 3 | 0) / 2 | 0, ($this.$data0.data.length * 2 | 0) + 1 | 0);
    $this.$data0 = ju_Arrays_copyOf2($this.$data0, $newArrayLength);
},
ju_BitSet_recalculateLength = $this => {
    let $top, $i, $sz;
    $top = ($this.$length0 + 31 | 0) / 32 | 0;
    $this.$length0 = $top * 32 | 0;
    $i = $top - 1 | 0;
    a: {
        while (true) {
            if ($i < 0)
                break a;
            $sz = jl_Integer_numberOfLeadingZeros($this.$data0.data[$i]);
            if ($sz < 32)
                break;
            $i = $i + (-1) | 0;
            $this.$length0 = $this.$length0 - 32 | 0;
        }
        $this.$length0 = $this.$length0 - $sz | 0;
    }
},
ju_BitSet_intersects = ($this, $set) => {
    let $sz, $i;
    $sz = jl_Math_min($this.$data0.data.length, $set.$data0.data.length);
    $i = 0;
    while ($i < $sz) {
        if ($this.$data0.data[$i] & $set.$data0.data[$i])
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
},
ju_BitSet_and = ($this, $set) => {
    let $i, $i_0, var$4;
    $i = jl_Math_min($this.$data0.data.length, $set.$data0.data.length);
    $i_0 = 0;
    while ($i_0 < $i) {
        var$4 = $this.$data0.data;
        var$4[$i_0] = var$4[$i_0] & $set.$data0.data[$i_0];
        $i_0 = $i_0 + 1 | 0;
    }
    while ($i < $this.$data0.data.length) {
        $this.$data0.data[$i] = 0;
        $i = $i + 1 | 0;
    }
    $this.$length0 = jl_Math_min($this.$length0, $set.$length0);
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_andNot = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_min($this.$data0.data.length, $set.$data0.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data0.data;
        var$4[$i] = var$4[$i] & ($set.$data0.data[$i] ^ (-1));
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_or = ($this, $set) => {
    let $sz, $i, var$4;
    $this.$length0 = jl_Math_max($this.$length0, $set.$length0);
    ju_BitSet_ensureCapacity($this, ($this.$length0 + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data0.data.length, $set.$data0.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data0.data;
        var$4[$i] = var$4[$i] | $set.$data0.data[$i];
        $i = $i + 1 | 0;
    }
},
ju_BitSet_xor = ($this, $set) => {
    let $sz, $i, var$4;
    $this.$length0 = jl_Math_max($this.$length0, $set.$length0);
    ju_BitSet_ensureCapacity($this, ($this.$length0 + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data0.data.length, $set.$data0.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data0.data;
        var$4[$i] = var$4[$i] ^ $set.$data0.data[$i];
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_isEmpty = $this => {
    return $this.$length0 ? 0 : 1;
},
igiae_EventBus = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$13() {
    jl_Object.call(this);
    this.$val$bus = null;
}
let igiaj_JsPluginHost$13__init_ = ($this, var$1) => {
    $this.$val$bus = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$13__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$13();
    igiaj_JsPluginHost$13__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$13_publish = ($this, $topic, $payload) => {
    let var$3, var$4;
    var$3 = $this.$val$bus;
    var$4 = otji_JSWrapper_unwrap($payload);
    var$3.publish($rt_ustr($topic), var$4);
},
igiaj_JsPluginHost$13_subscribe = ($this, $topic, $listener) => {
    let var$3, var$4, $disposer;
    var$3 = $this.$val$bus;
    var$4 = igiaj_JsPluginHost$13$1__init_0($this, $listener);
    $disposer = otji_JS_functionAsObject(var$3.subscribe($rt_ustr($topic), otji_JS_function(otji_JSWrapper_unwrap(var$4), "received")), "dispose");
    return igiaj_JsPluginHost$13$2__init_0($this, $disposer);
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$022 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_ = ($this, $this$0) => {
    $this.$this$022 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1();
    jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains = ($this, $ch) => {
    return jl_Character_isJavaIdentifierStart($ch);
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf1 = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createCharArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createByteArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf2 = ($array, $length) => {
    let var$3, $result, $sz, $i;
    var$3 = $array.data;
    $result = $rt_createIntArray($length);
    $sz = jl_Math_min($length, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf0 = ($original, $newLength) => {
    let var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($original)), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill0 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
ju_Arrays_fill = ($a, $val) => {
    ju_Arrays_fill0($a, 0, $a.data.length, $val);
},
ju_Arrays_fill4 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
ju_Arrays_fill2 = ($a, $val) => {
    ju_Arrays_fill4($a, 0, $a.data.length, $val);
},
ju_Arrays_fill1 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
ju_Arrays_fill3 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    while ($fromIndex < $toIndex) {
        var$5 = $a.data;
        var$6 = $fromIndex + 1 | 0;
        var$5[$fromIndex] = $val;
        $fromIndex = var$6;
    }
},
ju_Arrays_binarySearch = ($a, $key) => {
    return ju_Arrays_binarySearch0($a, 0, $a.data.length, $key);
},
ju_Arrays_binarySearch0 = ($a, $fromIndex, $toIndex, $key) => {
    let $u, var$6, $i, $e, var$9;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_());
    $u = $toIndex - 1 | 0;
    while (true) {
        if ($fromIndex > $u)
            return ( -$fromIndex | 0) - 1 | 0;
        var$6 = $a.data;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $e = var$6[$i];
        var$9 = $rt_compare($e, $key);
        if (!var$9)
            break;
        if (var$9 <= 0)
            $fromIndex = $i + 1 | 0;
        else
            $u = $i - 1 | 0;
    }
    return $i;
},
ju_Arrays_asList = $a => {
    ju_Objects_requireNonNull($a);
    return ju_Arrays$ArrayAsList__init_0($a);
};
function jur_CharSet() {
    jur_LeafSet.call(this);
    this.$ch0 = 0;
}
let jur_CharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch0 = $ch;
},
jur_CharSet__init_ = var_0 => {
    let var_1 = new jur_CharSet();
    jur_CharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CharSet_charCount = $this => {
    return 1;
},
jur_CharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch0 != $testString.$charAt($strIndex) ? (-1) : 1;
},
jur_CharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$getRightBound();
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$6 = jl_String_indexOf($testStr, $this.$ch0, $strIndex);
        if (var$6 < 0)
            return (-1);
        var$7 = $this.$next2;
        $strIndex = var$6 + 1 | 0;
        if (var$7.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$6;
},
jur_CharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, var$6;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$6 = jl_String_lastIndexOf($testStr, $this.$ch0, $lastIndex);
            if (var$6 < 0)
                break a;
            if (var$6 < $strIndex)
                break a;
            if ($this.$next2.$matches(var$6 + 1 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$6 + (-1) | 0;
        }
        return var$6;
    }
    return (-1);
},
jur_CharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch0;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(var$2, var$1);
    return jl_StringBuilder_toString(var$2);
},
jur_CharSet_getChar = $this => {
    return $this.$ch0;
},
jur_CharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return $set.$getChar() != $this.$ch0 ? 0 : 1;
    if (!($set instanceof jur_RangeSet)) {
        if ($set instanceof jur_SupplRangeSet)
            return $set.$contains0($this.$ch0);
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return 0;
    }
    return $set.$accepts(0, jl_Character_toString($this.$ch0)) <= 0 ? 0 : 1;
};
function jur_CharClass$3() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt = 0;
    a.$val$cc = null;
    a.$this$05 = null;
}
let jur_CharClass$3__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$05 = $this$0;
    $this.$val$curAlt = var$2;
    $this.$val$cc = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$3__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$3();
    jur_CharClass$3__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$3_contains = ($this, $ch) => {
    return !($this.$val$curAlt ^ $this.$this$05.$bits.$get3($ch)) && !($this.$val$curAlt ^ $this.$this$05.$inverted ^ $this.$val$cc.$contains0($ch)) ? 0 : 1;
};
function jur_CharClass$4() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt9 = 0;
    a.$val$nb4 = null;
    a.$val$cc2 = null;
    a.$this$048 = null;
}
let jur_CharClass$4__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$048 = $this$0;
    $this.$val$curAlt9 = var$2;
    $this.$val$nb4 = var$3;
    $this.$val$cc2 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$4__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$4();
    jur_CharClass$4__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$4_contains = ($this, $ch) => {
    return $this.$val$curAlt9 ^ (!$this.$val$nb4.$contains0($ch) && !$this.$val$cc2.$contains0($ch) ? 0 : 1) ? 0 : 1;
};
function jur_CharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$cc3 = null;
    a.$this$016 = null;
}
let jur_CharClass$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$016 = $this$0;
    $this.$val$cc3 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$1__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$1();
    jur_CharClass$1__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$1_contains = ($this, $ch) => {
    return $this.$val$cc3.$contains0($ch);
};
function jur_CharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt0 = 0;
    a.$val$cc1 = null;
    a.$this$04 = null;
}
let jur_CharClass$2__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$04 = $this$0;
    $this.$val$curAlt0 = var$2;
    $this.$val$cc1 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$2__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$2();
    jur_CharClass$2__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$2_contains = ($this, $ch) => {
    return !($this.$val$curAlt0 ^ $this.$this$04.$bits.$get3($ch)) && !($this.$val$curAlt0 ^ $this.$this$04.$inverted ^ $this.$val$cc1.$contains0($ch)) ? 1 : 0;
};
function jur_CharClass$7() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz7 = null;
    a.$this$050 = null;
}
let jur_CharClass$7__init_ = ($this, $this$0, var$2) => {
    $this.$this$050 = $this$0;
    $this.$val$clazz7 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$7__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$7();
    jur_CharClass$7__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$7_contains = ($this, $ch) => {
    return $this.$val$clazz7.$contains0($ch);
};
function jur_CharClass$8() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz1 = null;
    a.$val$curAlt2 = 0;
    a.$this$09 = null;
}
let jur_CharClass$8__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$09 = $this$0;
    $this.$val$clazz1 = var$2;
    $this.$val$curAlt2 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$8__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$8();
    jur_CharClass$8__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$8_contains = ($this, $ch) => {
    return !$this.$val$clazz1.$contains0($ch) && !($this.$val$curAlt2 ^ $this.$this$09.$bits.$get3($ch)) ? 1 : 0;
};
function igiae_CapabilityRecord() {
    let a = this; jl_Object.call(a);
    a.$pluginId0 = null;
    a.$implementation = null;
}
let igiae_CapabilityRecord__init_ = ($this, $pluginId, $implementation) => {
    jl_Object__init_($this);
    $this.$pluginId0 = $pluginId;
    $this.$implementation = $implementation;
},
igiae_CapabilityRecord__init_0 = (var_0, var_1) => {
    let var_2 = new igiae_CapabilityRecord();
    igiae_CapabilityRecord__init_(var_2, var_0, var_1);
    return var_2;
},
igiae_CapabilityRecord_getPluginId = $this => {
    return $this.$pluginId0;
},
igiae_CapabilityRecord_getImplementation = $this => {
    return $this.$implementation;
};
function jur_CharClass$5() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt7 = 0;
    a.$val$nb3 = null;
    a.$val$cc0 = null;
    a.$this$026 = null;
}
let jur_CharClass$5__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$026 = $this$0;
    $this.$val$curAlt7 = var$2;
    $this.$val$nb3 = var$3;
    $this.$val$cc0 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$5__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$5();
    jur_CharClass$5__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$5_contains = ($this, $ch) => {
    return $this.$val$curAlt7 ^ (!$this.$val$nb3.$contains0($ch) && !$this.$val$cc0.$contains0($ch) ? 0 : 1);
};
function jur_CharClass$6() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz6 = null;
    a.$this$030 = null;
}
let jur_CharClass$6__init_ = ($this, $this$0, var$2) => {
    $this.$this$030 = $this$0;
    $this.$val$clazz6 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$6__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$6();
    jur_CharClass$6__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$6_contains = ($this, $ch) => {
    return $this.$val$clazz6.$contains0($ch) ? 0 : 1;
},
igiaj_JsJson = $rt_classWithoutFields(),
igiaj_JsJson_toTree = $items => {
    let $out, $index, $kind, $names, $name;
    if ($items !== null && !(igiaj_JsJson_isNullish$js_body$_5($items) ? 1 : 0)) {
        if (Array.isArray($items) ? 1 : 0) {
            $out = ju_ArrayList__init_();
            $index = 0;
            while ($index < $items.length) {
                $out.$add2(igiaj_JsJson_toTree(otji_JSWrapper_maybeUnwrap($items[$index])));
                $index = $index + 1 | 0;
            }
            return $out;
        }
        $kind = $rt_str(typeof $items);
        if (jl_String_equals($rt_s(260), $kind))
            return otjc_JSString_stringValue$static($items);
        if (jl_String_equals($rt_s(261), $kind))
            return jl_Double_valueOf(otjc_JSNumber_doubleValue$static($items));
        if (jl_String_equals($rt_s(262), $kind))
            return jl_Boolean_valueOf(otjc_JSBoolean_booleanValue$static($items));
        $out = ju_LinkedHashMap__init_();
        $names = Object.keys($items);
        $index = 0;
        while ($index < $names.length) {
            $name = otjc_JSString_stringValue$static(otji_JSWrapper_maybeUnwrap($names[$index]));
            $out.$put($name, igiaj_JsJson_toTree($items[$rt_ustr($name)]));
            $index = $index + 1 | 0;
        }
        return $out;
    }
    return null;
},
igiaj_JsJson_fromTree = $tree => {
    let $out, $entries, var$4, $entry, $items, $index;
    if ($tree === null)
        return null;
    if ($rt_isInstance($tree, ju_Map)) {
        $out = igiaj_JsJson_emptyObject$js_body$_10();
        $entries = $tree;
        var$4 = ($entries.$entrySet()).$iterator();
        while (var$4.$hasNext()) {
            $entry = var$4.$next();
            $out[$rt_ustr(jl_String_valueOf($entry.$getKey()))] = igiaj_JsJson_fromTree($entry.$getValue());
        }
        return $out;
    }
    if ($rt_isInstance($tree, ju_List)) {
        $items = $tree;
        $out = new Array();
        $index = 0;
        while ($index < $items.$size()) {
            $out[$index] = igiaj_JsJson_fromTree($items.$get($index));
            $index = $index + 1 | 0;
        }
        return $out;
    }
    if ($tree instanceof jl_Boolean)
        return !!$tree.$booleanValue();
    if ($tree instanceof jl_Integer)
        return $tree.$intValue();
    if (!($tree instanceof jl_Double))
        return $rt_ustr(jl_String_valueOf($tree));
    return $tree.$doubleValue();
},
igiaj_JsJson_fromStrings = $values => {
    let $out, $index, var$4;
    $out = new Array();
    $index = 0;
    while ($index < $values.$size()) {
        var$4 = $rt_ustr($values.$get($index));
        $out[$index] = var$4;
        $index = $index + 1 | 0;
    }
    return $out;
},
igiaj_JsJson_fromStringLists = $values => {
    let $out, $index, var$4;
    $out = new Array();
    $index = 0;
    while ($index < $values.$size()) {
        var$4 = igiaj_JsJson_fromStrings($values.$get($index));
        $out[$index] = var$4;
        $index = $index + 1 | 0;
    }
    return $out;
},
igiaj_JsJson_isNullish$js_body$_5 = var$1 => {
    return var$1 === null || var$1 === undefined;
},
igiaj_JsJson_emptyObject$js_body$_10 = () => {
    return {  };
},
ju_Iterator = $rt_classWithoutFields(0),
ju_ListIterator = $rt_classWithoutFields(0),
ju_Collections$5 = $rt_classWithoutFields(),
ju_Collections$5__init_ = $this => {
    jl_Object__init_($this);
},
ju_Collections$5__init_0 = () => {
    let var_0 = new ju_Collections$5();
    ju_Collections$5__init_(var_0);
    return var_0;
},
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount0 = 0;
}
let ju_AbstractList__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_AbstractList_add = ($this, $e) => {
    $this.$add1($this.$size(), $e);
    return 1;
},
ju_AbstractList_iterator = $this => {
    return ju_AbstractList$1__init_0($this);
},
ju_AbstractList_add0 = ($this, $index, $element) => {
    $rt_throw(jl_UnsupportedOperationException__init_());
},
ju_AbstractList_remove = ($this, $index) => {
    $rt_throw(jl_UnsupportedOperationException__init_());
},
ju_AbstractList_indexOf = ($this, $o) => {
    let $sz, $i;
    $sz = $this.$size();
    $i = 0;
    while (true) {
        if ($i >= $sz)
            return (-1);
        if (ju_Objects_equals($o, $this.$get($i)))
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
ju_AbstractList_hashCode = $this => {
    let $hashCode, $iter, $elem;
    $hashCode = 1;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $elem = $iter.$next();
        $hashCode = (31 * $hashCode | 0) + ju_Objects_hashCode($elem) | 0;
    }
    return $hashCode;
},
ju_AbstractList_equals = ($this, $other) => {
    let $list, $i;
    if (!$rt_isInstance($other, ju_List))
        return 0;
    $list = $other;
    if ($this.$size() != $list.$size())
        return 0;
    $i = 0;
    while ($i < $list.$size()) {
        if (!ju_Objects_equals($this.$get($i), $list.$get($i)))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
},
ju_RandomAccess = $rt_classWithoutFields(0),
ju_TemplateCollections$AbstractImmutableList = $rt_classWithoutFields(ju_AbstractList),
ju_TemplateCollections$AbstractImmutableList__init_ = $this => {
    ju_AbstractList__init_($this);
},
ju_Collections$3 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableList),
ju_Collections$3__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableList__init_($this);
},
ju_Collections$3__init_0 = () => {
    let var_0 = new ju_Collections$3();
    ju_Collections$3__init_(var_0);
    return var_0;
};
function jur_DotSet() {
    jur_JointSet.call(this);
    this.$lt0 = null;
}
let jur_DotSet__init_ = ($this, $lt) => {
    jur_JointSet__init_($this);
    $this.$lt0 = $lt;
},
jur_DotSet__init_0 = var_0 => {
    let var_1 = new jur_DotSet();
    jur_DotSet__init_(var_1, var_0);
    return var_1;
},
jur_DotSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $high, var$7, $low;
    $strLength = $matchResult.$getRightBound();
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $high = $testString.$charAt($stringIndex);
    if (jl_Character_isHighSurrogate($high)) {
        var$7 = $stringIndex + 2 | 0;
        if (var$7 <= $strLength) {
            $low = $testString.$charAt(var$5);
            if (jl_Character_isSurrogatePair($high, $low))
                return $this.$lt0.$isLineTerminator(jl_Character_toCodePoint($high, $low)) ? (-1) : $this.$next2.$matches(var$7, $testString, $matchResult);
        }
    }
    return $this.$lt0.$isLineTerminator($high) ? (-1) : $this.$next2.$matches(var$5, $testString, $matchResult);
},
jur_DotSet_getName = $this => {
    return $rt_s(263);
},
jur_DotSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DotSet_getType = $this => {
    return (-2147483602);
},
jur_DotSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_CharClass$9() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz = null;
    a.$val$curAlt8 = 0;
    a.$this$012 = null;
}
let jur_CharClass$9__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$012 = $this$0;
    $this.$val$clazz = var$2;
    $this.$val$curAlt8 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$9__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$9();
    jur_CharClass$9__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$9_contains = ($this, $ch) => {
    return !$this.$val$clazz.$contains0($ch) && !($this.$val$curAlt8 ^ $this.$this$012.$bits.$get3($ch)) ? 0 : 1;
},
igiaj_JsPluginContext$10 = $rt_classWithoutFields(),
igiaj_JsPluginContext$10__init_ = $this => {
    jl_Object__init_($this);
},
igiaj_JsPluginContext$10__init_0 = () => {
    let var_0 = new igiaj_JsPluginContext$10();
    igiaj_JsPluginContext$10__init_(var_0);
    return var_0;
},
igiaj_JsPluginContext$10_call = ($this, $id) => {
    return igiaj_JsPluginContext_typedKey$js_body$_2($rt_ustr($id));
},
igiaj_JsPluginContext$10_call$exported$0 = (var$1, var$2) => {
    var$2 = $rt_str(var$2);
    return var$1.$call(var$2);
},
ju_Collections$4 = $rt_classWithoutFields(),
ju_Collections$4__init_ = $this => {
    jl_Object__init_($this);
},
ju_Collections$4__init_0 = () => {
    let var_0 = new ju_Collections$4();
    ju_Collections$4__init_(var_0);
    return var_0;
},
igiaj_JsPluginContext$11 = $rt_classWithoutFields(),
igiaj_JsPluginContext$11__init_ = $this => {
    jl_Object__init_($this);
},
igiaj_JsPluginContext$11__init_0 = () => {
    let var_0 = new igiaj_JsPluginContext$11();
    igiaj_JsPluginContext$11__init_(var_0);
    return var_0;
},
igiaj_JsPluginContext$11_call = ($this, $id) => {
    return igiaj_JsPluginContext_typedKey$js_body$_2($rt_ustr($id));
},
igiaj_JsPluginContext$11_call$exported$0 = (var$1, var$2) => {
    var$2 = $rt_str(var$2);
    return var$1.$call(var$2);
},
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_digitMapping = null,
jl_Character_upperCaseMapping = null,
jl_Character_lowerCaseMapping = null,
jl_Character_classMapping = null,
jl_Character_characterCache = null,
jl_Character_$$metadata$$0 = null,
jl_Character_$$metadata$$1 = null,
jl_Character_$$metadata$$3 = null,
jl_Character_$$metadata$$4 = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_toString = $c => {
    let var$2, var$3;
    jl_Character_$callClinit();
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = $c;
    jl_String__init_0(var$2, var$3);
    return var$2;
},
jl_Character_isValidCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return $codePoint >= 0 && $codePoint <= 1114111 ? 1 : 0;
},
jl_Character_isBmpCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return $codePoint > 0 && $codePoint <= 65535 ? 1 : 0;
},
jl_Character_isSupplementaryCodePoint = $codePoint => {
    jl_Character_$callClinit();
    return $codePoint >= 65536 && $codePoint <= 1114111 ? 1 : 0;
},
jl_Character_isHighSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 55296 ? 0 : 1;
},
jl_Character_isLowSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 56320 ? 0 : 1;
},
jl_Character_isSurrogate = $ch => {
    jl_Character_$callClinit();
    return !jl_Character_isHighSurrogate($ch) && !jl_Character_isLowSurrogate($ch) ? 0 : 1;
},
jl_Character_isSurrogatePair = ($high, $low) => {
    jl_Character_$callClinit();
    return jl_Character_isHighSurrogate($high) && jl_Character_isLowSurrogate($low) ? 1 : 0;
},
jl_Character_toCodePoint = ($high, $low) => {
    jl_Character_$callClinit();
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
},
jl_Character_codePointAt = ($a, $index) => {
    jl_Character_$callClinit();
    return jl_Character_codePointAt0($a, $index, $a.data.length);
},
jl_Character_codePointAt0 = ($a, $index, $limit) => {
    let var$4, var$5;
    jl_Character_$callClinit();
    if ($index < $limit && $index >= 0) {
        var$4 = $a.data;
        if ($limit <= var$4.length) {
            if ($index < ($limit - 1 | 0) && jl_Character_isHighSurrogate(var$4[$index])) {
                var$5 = $index + 1 | 0;
                if (jl_Character_isLowSurrogate(var$4[var$5]))
                    return jl_Character_toCodePoint(var$4[$index], var$4[var$5]);
            }
            return var$4[$index];
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_Character_highSurrogate = $codePoint => {
    let var$2;
    jl_Character_$callClinit();
    var$2 = $codePoint - 65536 | 0;
    return (55296 | var$2 >> 10 & 1023) & 65535;
},
jl_Character_lowSurrogate = $codePoint => {
    jl_Character_$callClinit();
    return (56320 | $codePoint & 1023) & 65535;
},
jl_Character_toLowerCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toLowerCase0($ch) & 65535;
},
jl_Character_toLowerCase0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_mapChar(jl_Character_getLowerCaseMapping(), $ch);
},
jl_Character_getLowerCaseMapping = () => {
    let var$1;
    jl_Character_$callClinit();
    if (jl_Character_lowerCaseMapping === null) {
        var$1 = otciu_UnicodeHelper_decodeCaseMapping(((jl_Character_acquireLowerCaseMapping()).value !== null ? $rt_str((jl_Character_acquireLowerCaseMapping()).value) : null));
        jl_Character_lowerCaseMapping = otciu_UnicodeHelper_createCharMapping(var$1);
    }
    return jl_Character_lowerCaseMapping;
},
jl_Character_acquireLowerCaseMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$0 === null)
        jl_Character_$$metadata$$0 = jl_Character_acquireLowerCaseMapping$$create();
    return jl_Character_$$metadata$$0;
},
jl_Character_toUpperCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toUpperCase0($ch) & 65535;
},
jl_Character_toUpperCase0 = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_mapChar(jl_Character_getUpperCaseMapping(), $codePoint);
},
jl_Character_getUpperCaseMapping = () => {
    let var$1;
    jl_Character_$callClinit();
    if (jl_Character_upperCaseMapping === null) {
        var$1 = otciu_UnicodeHelper_decodeCaseMapping(((jl_Character_acquireUpperCaseMapping()).value !== null ? $rt_str((jl_Character_acquireUpperCaseMapping()).value) : null));
        jl_Character_upperCaseMapping = otciu_UnicodeHelper_createCharMapping(var$1);
    }
    return jl_Character_upperCaseMapping;
},
jl_Character_acquireUpperCaseMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$1 === null)
        jl_Character_$$metadata$$1 = jl_Character_acquireUpperCaseMapping$$create();
    return jl_Character_$$metadata$$1;
},
jl_Character_mapChar = ($table, $codePoint) => {
    let $binSearchTable, $index, var$5, var$6;
    jl_Character_$callClinit();
    if ($codePoint < $table.$fastTable.data.length)
        return $codePoint + $table.$fastTable.data[$codePoint] | 0;
    $binSearchTable = $table.$binarySearchTable0;
    $index = jl_Character_binarySearchTable($binSearchTable, $codePoint);
    if ($index >= 0) {
        var$5 = $binSearchTable.data;
        var$6 = $index * 2 | 0;
        if (var$6 < var$5.length)
            return $codePoint + var$5[var$6 + 1 | 0] | 0;
    }
    return 0;
};
let jl_Character_binarySearchTable = ($data, $key) => {
    let var$3, $l, $u, $i, $e, var$8;
    jl_Character_$callClinit();
    var$3 = $data.data;
    $l = 0;
    $u = (var$3.length / 2 | 0) - 1 | 0;
    while (true) {
        $i = ($l + $u | 0) / 2 | 0;
        $e = var$3[$i * 2 | 0];
        var$8 = $rt_compare($e, $key);
        if (!var$8)
            break;
        if (var$8 <= 0) {
            $l = $i + 1 | 0;
            if ($l > $u)
                return $i;
        } else {
            $u = $i - 1 | 0;
            if ($u < $l)
                return $u;
        }
    }
    return $i;
},
jl_Character_digit = ($ch, $radix) => {
    jl_Character_$callClinit();
    return jl_Character_digit0($ch, $radix);
},
jl_Character_digit0 = ($codePoint, $radix) => {
    let $d;
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36) {
        $d = jl_Character_getNumericValue($codePoint);
        if ($d >= $radix)
            $d = (-1);
        return $d;
    }
    return (-1);
},
jl_Character_getNumericValue = $codePoint => {
    let $digitMapping, var$3, $l, $u, $idx, var$7, $val, var$9;
    jl_Character_$callClinit();
    $digitMapping = jl_Character_getDigitMapping();
    var$3 = $digitMapping.data;
    $l = 0;
    $u = (var$3.length / 2 | 0) - 1 | 0;
    while ($u >= $l) {
        $idx = ($l + $u | 0) / 2 | 0;
        var$7 = $idx * 2 | 0;
        $val = var$3[var$7];
        var$9 = $rt_compare($codePoint, $val);
        if (var$9 > 0)
            $l = $idx + 1 | 0;
        else {
            if (var$9 >= 0)
                return var$3[var$7 + 1 | 0];
            $u = $idx - 1 | 0;
        }
    }
    return (-1);
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character_isDigit = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 9 ? 0 : 1;
},
jl_Character_getDigitMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_digitMapping === null)
        jl_Character_digitMapping = otciu_UnicodeHelper_decodeIntPairsDiff(((jl_Character_obtainDigitMapping()).value !== null ? $rt_str((jl_Character_obtainDigitMapping()).value) : null));
    return jl_Character_digitMapping;
},
jl_Character_obtainDigitMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$3 === null)
        jl_Character_$$metadata$$3 = jl_Character_obtainDigitMapping$$create();
    return jl_Character_$$metadata$$3;
},
jl_Character_getClasses = () => {
    jl_Character_$callClinit();
    if (jl_Character_classMapping === null)
        jl_Character_classMapping = otciu_UnicodeHelper_extractRle(((jl_Character_obtainClasses()).value !== null ? $rt_str((jl_Character_obtainClasses()).value) : null));
    return jl_Character_classMapping;
},
jl_Character_obtainClasses = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$4 === null)
        jl_Character_$$metadata$$4 = jl_Character_obtainClasses$$create();
    return jl_Character_$$metadata$$4;
},
jl_Character_toChars = $codePoint => {
    let var$2, var$3;
    jl_Character_$callClinit();
    if (!jl_Character_isValidCodePoint($codePoint))
        $rt_throw(jl_IllegalArgumentException__init_());
    if ($codePoint < 65536) {
        var$2 = $rt_createCharArray(1);
        var$2.data[0] = $codePoint & 65535;
        return var$2;
    }
    var$2 = $rt_createCharArray(2);
    var$3 = var$2.data;
    var$3[0] = jl_Character_highSurrogate($codePoint);
    var$3[1] = jl_Character_lowSurrogate($codePoint);
    return var$2;
},
jl_Character_isISOControl = $codePoint => {
    let var$2;
    jl_Character_$callClinit();
    a: {
        b: {
            if (!($codePoint >= 0 && $codePoint <= 31)) {
                if ($codePoint < 127)
                    break b;
                if ($codePoint > 159)
                    break b;
            }
            var$2 = 1;
            break a;
        }
        var$2 = 0;
    }
    return var$2;
},
jl_Character_getType0 = $c => {
    jl_Character_$callClinit();
    return jl_Character_getType($c);
},
jl_Character_getType = $codePoint => {
    let $classes, var$3, $l, $u, $i, $range;
    jl_Character_$callClinit();
    if (jl_Character_isBmpCodePoint($codePoint) && jl_Character_isSurrogate($codePoint & 65535))
        return 19;
    $classes = jl_Character_getClasses();
    var$3 = $classes.data;
    $l = 0;
    $u = var$3.length - 1 | 0;
    while ($l <= $u) {
        $i = ($l + $u | 0) / 2 | 0;
        $range = var$3[$i];
        if ($codePoint >= $range.$end1)
            $l = $i + 1 | 0;
        else {
            if ($codePoint >= $range.$start2)
                return $range.$data1.data[$codePoint - $range.$start2 | 0];
            $u = $i - 1 | 0;
        }
    }
    return 0;
},
jl_Character_isLowerCase = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 2 ? 0 : 1;
},
jl_Character_isUpperCase = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 1 ? 0 : 1;
},
jl_Character_isTitleCase = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_getType($codePoint) != 3 ? 0 : 1;
},
jl_Character_isDefined = $codePoint => {
    jl_Character_$callClinit();
    return !jl_Character_getType($codePoint) ? 0 : 1;
},
jl_Character_isLetter0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_isLetter($ch);
},
jl_Character_isLetter = $codePoint => {
    jl_Character_$callClinit();
    switch (jl_Character_getType($codePoint)) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            return 0;
    }
    return 1;
},
jl_Character_isLetterOrDigit0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_isLetterOrDigit($ch);
},
jl_Character_isLetterOrDigit = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 9:
                break;
            case 6:
            case 7:
            case 8:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return 0;
},
jl_Character_isJavaIdentifierStart = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 10:
            case 23:
            case 26:
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 24:
            case 25:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return jl_Character_isIdentifierIgnorable($codePoint);
},
jl_Character_isJavaIdentifierPart = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
            case 10:
            case 23:
            case 26:
                break;
            case 7:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 24:
            case 25:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return jl_Character_isIdentifierIgnorable($codePoint);
},
jl_Character_isUnicodeIdentifierStart = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 10:
                break;
            case 6:
            case 7:
            case 8:
            case 9:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return jl_Character_isIdentifierIgnorable($codePoint);
},
jl_Character_isUnicodeIdentifierPart = $codePoint => {
    jl_Character_$callClinit();
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
            case 10:
            case 23:
                break;
            case 7:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return jl_Character_isIdentifierIgnorable($codePoint);
},
jl_Character_isIdentifierIgnorable = $codePoint => {
    jl_Character_$callClinit();
    a: {
        if (!($codePoint >= 0 && $codePoint <= 8) && !($codePoint >= 14 && $codePoint <= 27)) {
            if ($codePoint < 127)
                break a;
            if ($codePoint > 159)
                break a;
        }
        return 1;
    }
    return jl_Character_getType($codePoint) != 16 ? 0 : 1;
},
jl_Character_isSpaceChar = $codePoint => {
    jl_Character_$callClinit();
    switch (jl_Character_getType($codePoint)) {
        case 12:
        case 13:
        case 14:
            break;
        default:
            return 0;
    }
    return 1;
},
jl_Character_isWhitespace0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_isWhitespace($ch);
},
jl_Character_isWhitespace = $codePoint => {
    jl_Character_$callClinit();
    switch ($codePoint) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 28:
        case 29:
        case 30:
        case 31:
            break;
        case 160:
        case 8199:
        case 8239:
            return 0;
        default:
            return jl_Character_isSpaceChar($codePoint);
    }
    return 1;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
jl_Character_acquireLowerCaseMapping$$create = () => {
    return {"value" : "NY  H#F#U 4%F#O #F#/ d%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a1# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #<+#%# #%# #%# \'.3#%# #%# #{1#%# #w1%%# %J\'#k1#o1#%# #w1#!3# #23#*3#%# \'23#:3# #>3#%# #%# #%# #N3#%# #N3# %%# #N3#%# #J3%%# #%# #R3#%# \'%# /)#%# #)#%# #)#%# #%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# %)#%# #%# #8)#L%#%# #%# #%# #"
    + "%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a+# #%# #%# #%# #%# #%# #%# #%# #%# #%# /B45#%# #,/#645# %%# #P1#!\'#*\'#%# #%# #%# #%# #%# <-%# #%# \'%# 1&++ %_## #Z#)k%%g%% #F#W hA# 1%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# +]%# %%# #?#%# %a+\'N\'AF#b &#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #^#%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# %*%p kB#oq-&# _?gejg#A1 a$#%# -mo%&# {-%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3,4/# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3C1 1C1 1C1 1C1 1C1 3C/ 1C1 QC1 1C1 1C1 1C%8\'%G# 7i\')G# 7C%D)\' 7C%u)%?# 7X+%P+%G# L-q*/# \'Pw/#8m/# -6## |bA G%# kC.#U !r*%&# &#%# #,05#qX\'#H.5# %%# #%# #%# #e25#D05#q25#m25# #%# %%# 1865%%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# "
    + "#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 1%# #%# )%# (a=%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# G%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# y%%# #%# #%# #%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 5%# #%# #4Fd#%# #%# #%# #%# #%# )%# #<{p# %%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #P}p#}}p#m}p#D}p#P}p# #@yp#D{p#Lyp#Br#%# #%# #%"
    + "# #%# #%# #%# #%# #%# #,%#L}p#LJd#%# #%# #$$r#%# #%# #%# #%# #%# #%# #%# #%# #P6r#}!rI )%# :GL#) i,5F#U TUg#r {%g#r >\'c#p Lnk%F# .\'F#S HB#F#b o@5F#b F#2#W 4Z;%# /%# #%# %%# \'%# M%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# u.#N#f "};
},
jl_Character_acquireUpperCaseMapping$$create = () => {
    return {"value" : "L[  ,%H#U :#>b# vH#O #H#/:+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #,5# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'#(;#N1# %\'# #\'# %\'# \'\'# +\'# %6)# \'\'#*/#N6r# %_+# %\'# #\'# #\'# %\'# )\'# %\'# \'\'# #\'# %\'# \'\'# #J%# +\'#+# #\'#+# #\'#+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#L\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'#+# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# %665% #\'# )\'# #\'# #\'# #\'# #\'#o25#c25#k25#03#}1# #y1% #m1# #q1#{}p# \'y1#k}p# #$3#!$r#:{p#N}p# #,3#43#N}p#*05#B}p# %43# #B05#<3# %@3# #{!r# ){!r#F.5# %P3# #J}p#P3# \'B{p#P3#$\'#L3%,\'# +T3# 5Jyp#>yp# Z\'_\'# x\'# #\'# \'\'\' #_+\' !#a##]#\' #H#CD##H#3m%#i%% #e%#P%# \'(%#D%#C# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#i\'#P\'#=#(+# #4)# %\'# %\'# .#H#bP\'A #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 3\'# #\'# #\'# #\'# #\'# #\'# "
    + "#\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'#`# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'% &#,%n mB#ko%x %ko%\' RAC1 >$#yu+#uu+#Pu+#Hu+%Lu+#0u+#io+#>@d# #\'- (+2Fd# \'oX\'# AJJd# N%\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #"
    + "\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# +X%# +\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#A1 1A1 1A1 1A1 1A1 3A# #A# #A# #A% /A1 16\'%g\')B)%V+%s)%N+)A1 1A1 1A1 1A% #E# 5<m-# )E# 9A% =A% \'=# ;E# R/8## ddA )\'# @E0#U Nr,%&# #\'# \'D4"
    + "5#845# #\'# #\'# #\'# -\'# %\'# 5\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# #\'# )\'- /qq-&# i]=\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# G\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# y%\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 5\'# #\'# %\'# #\'# #\'# #\'# #\'# )\'# )\'# #\'#*%# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 7\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# )\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# U\'# REJ#% -Dr# Yiejg# e*5H#U eUi#r {%i#r <\'e#t {nm%:# V%H#^ >B#H#b o@5H#b <#4#P# eV;\'# /\'# #\'# %\'# \'\'# M\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# Z0#P#f "};
},
jl_Character_obtainDigitMapping$$create = () => {
    return {"value" : "6G*% %%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%_H#T#%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%{CG%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%6)G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%!i#G"
    + "%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%*;G%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%:/G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%{/G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%R@dG%%%%%%%%%%%%%%%%%%R[G%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%!#G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%cCG%%%%%%%%%%%%%%%%%%o*IG%%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%c:#T#%%%%%%%%%%%%%%%%%%w&%G%%%%%"
    + "%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%_fG%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%_%G%%%%%%%%%%%%%%%%%%>-G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%w=G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%>AG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%B\'G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%oYG%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%g5G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%F%G%%%%%%%%%%%%%%%%%%Z?G%%%%%%%%%%%%%%%%%%ow?G%%%%%%%%%%%%%%%%%%s4%G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%"
    + "%%%%s+G%%%%%%%%%%%%%%%%%%:OG%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%N&OG%%%%%%%%%%%%%%%%%%VZ%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%!8%G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%sKG%%%%%%%%%%%%%%%%%%k5G%%%%%%%%%%%%%%%%%%.lG%%%%%%%%%%%%%%%%%%wN)G%%%%%%%%%%%%%%%%%%"};
},
jl_Character_obtainClasses$$create = () => {
    return {"value" : "PA-Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:PB-9[%=9<=&>:1=<=:L#<#Y#<,&?L$9B8:B(C9:C)!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!C$B##!#B##B$C#B%#B##B$C$B##B##!#!#B##!C#!#B##B$#!#B#C#&!C$F%!$#!$#!$#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!C#!$#!#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C(B##B#C#!#B%#!#!#!#!CgF#C;E3]%E-]/E&](%<%]2b\'Q! !#!#%<!#A#%C$9!A%]#!9B$ ! B##B2 B*CD!C#B$C$!#!#!#!#!#!#!#!#!#!#!#!C&!#:!#B#C#BTCQ!#!#!#!"
    + "#!#!#!#!#!#!#!#!#!#!#!#!#!#=G&H#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!# BG E#Y\'CJ95E#^#; GN5\'9G#9G#9G$A\'F<A%F%Y#A,Q\'Z$Y#;Y#^#G,91Y$FA%F+G6J+Y%F#\'b&D! 9&G(1=G\'E#G#=G%F#J+F$^#&Y/ 1&\'F?G<A#b&:! G,&A/J+FBG*E#=Y$%A#\'[#F7G%%G*%G$%G&A#Y0 F:G$A#9 F,A&F9<F(Q#A&G*FJ%G91GA)FW\')\'&I$G)I%\'I#&G(F+G#Y#J+9%F0\'I#\'F)A#F#A#F7 F( &A$F%A#\'&I$G%A#I#A#I#\'&A))A%F# F$G#A#J+F#[#L\'=;&9\'& G#) F\'A%F#A#F7 F( F# F"
    + "# F#A#\' I$G#A%G#A#G$A$\'A(F% &A(J+G#F$\'9A+G#) F* F$ F7 F( F# F&A#\'&I$G& G#) I#\'A#&A0F#G#A#J+9;A(&G\' \'I# F)A#F#A#F7 F( F# F&A#\'&)\')G%A#I#A#I#\'A&G%)A%F# F$G#A#J+=&L\'A+\'& F\'A$F$ F%A$F# & F#A$F#A$F$A$F-A%I#\'I#A$I$ I$\'A#&A\')A/J+L$^\';=A&\'I$\'F) F$ F8 F1A#\'&G$I% G$ G%A(G# F$ F#A#F#G#A#J+A(9L(=&\'I#9F) F$ F8 F+ F&A#\'&)\'I& \'I# I#G#A(I#A&F$ F#G#A#J+ F#)A-G#I#F* F$ FJG#&I$G% I$ I$\'&=A%F$)L(F$G#A#J+L*=F\' \'I# F3A$F9 F* &A#F(A$\'A%I$G$ \' I)A\'J+A#I#9A-FQ\'F#G(A%;F\'%G)9J+Y#AFF# & F& F9 & F+\'F#G*&A#F& % G( J+A#F%AA&^$Y0=9^$G#^\'J"
    + "+L+=\'=\'=\'6767I#F) FEA%G/)G&9G#F&G, GE ^)\'^\' ^#Y&^%Y#AFFLI#G%)G\')G#I#G#&J+Y\'F\'I#G#F%G$&I$F#I(F$G%F.\'I#G#I\'\'&)J+I$\'^#BG !A&!A#CL9%C$b&*&  F%A#F( & F%A#FJ F%A#FB F%A#F( & F%A#F0 FZ F%A#FeA#G$Y*L5A$F1^+A\'b!7! A#C\'A#5b&M* =9F2-F;67A$FmY$K$F)A(F3G$)A*F4G#)Y#A*F3G#A-F. F$ G#A-FUG#)G(I)\'I#G,Y$%Y$;&\'A#J+A\'L+A\'Y\'5Y%G$1\'J+A\'FD%FWA\'F&G#FC\'&A&FhA+F@ G$I%G#I$A%I#\'I\'G$A%=A$Y#J+F?A#F&A,FMA%F;A\'J+,A$^CF8G#I#\'A#Y#FV)\')G( \')\'I#G)I\'G+A#\'J+A\'J+A\'Y(%Y\'A#G/(GSA0G%)FP\')G&)\'I&\'I#F) Y#J+Y(^+G*^*Y$G#)F?)G%I#G#)G$F#J+FM\')G#I$\')G$I#A)Y"
    + "%FEI)G)I#G#A$Y&J+A$F$J+F?E\'Y#C*!#A&BLA#B$Y)A)G$9G.)G(F%\'F\'\'F#)G#&A&CMEaC.%CCEFGb!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*B)C\'A#B\'A#C)B)C)B)C\'A#B\'A#C) ! ! ! !C)B)C/A#C)D)C)D)C)D)C& C#B%$<#]$C$ C#B%$]$C%A#C#B% ]$C)B&]$A#C$ C#B%$]# M,Q&U\'Y#>?6_#?6>Y)./Q&-Y*>?Y%X#Y$:67Y,:98Y+-Q& Q+,%A#L\'Z$67%L+Z$67E2[FA,G."
    + "H%\'H$G-A0^#!^%!^##B$C#B$#=!^#:B&^\'!=!=!=B%=#B%#F%#^#C#B#Z&!C%=:^##=L1KD!#K%,^#A%Z&^&Z#^%:^#:^#:^(:^@Z#^#:=:^@b:-% ^)6767^5Z#^(67b=2! :^?Z:^IZ\'^jA7^,A6L^^pL7b=X# :^*:^WZ)b=P! :b=Y$ 67676767676767L?^MZ&67Z@6767676767Z1b= % b:$# 6767676767676767676767Za6767ZA67b:#% ^QZ6^#Z\'^HA#b=+# BQCQ!#B$C#!#!#!#B%#!C#!C\'E#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#^\'!#!#G$!#A&Y%,Y#CG #A&#A#FYA(%9A/\'F8A*F( F( F( F( F( F( F( F( GAY#>?>?Y$>?9>?Y*5Y#59>?Y#>?67676767Y&%Y"
    + "+U#Y%596Y.^#Y$676767675A#Y#67A=^; b=:! A-b=7$ A;^1-Y$=%&+6767676767^#6767676756W#=K*G%I#5E&^#K$%&9^# b&7! A#G#]#E#&5b&;! 9E$&A&FL b&?!  ^#L%^+FA^GA*=F1^@ L+^?L)=L0^AL+^HL0b= & b& H!^bb&  %b&6)!%b&X2 A$^XA*FIE\'Y#b&-% %Y$F1J+F#A5!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#&\'H$9G+9%!#!#!#!#!#!#!#!#!#!#!#!#!#!#E#G#FhK+G#Y\'A)]8E*]#!#!#!#!#!#!#!C$!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#%C)!#!#B##!#!#!#!#%]#!#!#&!#!C$!#!#!#!#!#!#!#!#!#!#B&#B&#!#!#!#!#!#!#!#B%#!#B##!#!#!#!#!#!#!#B#A%!A/E%!#&"
    + "E##F(\'F$\'F%\'F8I#G#)^%\'A$L\'^#;=A\'FUY%A)I#FSI1G#A)Y#J+A\'G3F\'Y$&9F#\'J+F=G)Y#F8G,I#A,9F>A$G$)FP\'I#G%I#G#I$Y. %J+A%Y#F&\'%F*J+F& FJG\'I#G#I#G#A*F$\'F)\')A#J+A#Y%F1%F\'^$&)\')FS\'&G$F#G#F&G#&\'&A9F#%Y#F,)G#I#Y#&E#)\'A+F\'A#F\'A#F\'A*F( F( CL<E%C*%]#B#A#b#1! FDI#\'I#\'I#9)\'A#J+A\'b&EO#A-F8A%FRA%b4 A b3 E!b&O& A#b&K! AGC(A-C&A&&\'F+:F. F& & F# F# b&M! ]2^1b&L& 76^1Fb^#FW^)AAF-;^$G1Y(679A\'G19U#X#6767676767676767Y#67Y%X$Y$ Y%5676767Y$:5Z$ 9;Y#A%F& b&(# A#1 Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:67967Y#F+%FNE#F@A$F\'A#F\'A#F\'A#F$A$[#:<=[# "
    + "=Z%^#A+Q$^#A#F- F; F4 F# F0A#F/ACb&]! A&Y$A%LNA$^*KVL%^2L#^$ ^.A$=AP^N\'b ## F>A$FRA0\'L<A%FAL%A*F5+F)+A&FGG&A&F? 9FEA%F)9K&AKBICIFpA#J+A\'BEA%CEA%FIA)FUA,9B, B0 B( B# C, C0 C( C#A$FUA-b&X% A*F7A+F)A9E\' EK E/AbF\'A#& FM F#A$&A#F8 9L)F8^#L(F@A)L*AQF4 F#A&L&F7L\'A$9F;A&9F;AGFYA%L#F#L1A#LO&G$ G#A&G%F% F$ F>A#G$A%\'L*A(Y*A(F>L#9F>L$AAF)=F=G#A%L&Y(A*FWA$Y(F7A#L)F4A&L)F3A(Y%A-L(b 1! FkAXBTA.CTA(L\'FEG%A)J+A\'J+F%%&B7A$G&5%C7A)Z#b 1$ L@ FK G#5A#F#A1F$%F# ]#G&9^)F7 G1F>L+&A)F7G,L%Y&A7F3G%Y%AGF6L(A5F8A*)\')FVG0Y(A%L5J+\'F#G#&"
    + "A*G$)FNI$G%I#G#Y#1Y%\'A+1A#F:A(J+A\'G$FEG&)G) J+Y%&I#&A)FD\'Y#&A*G#)FQI$G*I#F%Y%G%9)\'J+&9&Y$ L5A,F3 F:I$G$I#\')G#Y\'\'F#\'A`F( & F% F0 F+9A\'FP\'I$G)A&J+A\'G#I# F)A#F#A#F7 F( F# F& G#&I#\'I%A#I#A#I$A#&A\')A&F&I#A#G(A$G&A,F+ &A#& FG &I$G\' )A#) I% I#\')\'&\'&Y# Y#A)G#A>FVI$G)I#G$)\'F%Y&J+Y# 9\'F$A?FQI$G\')\'I%G#)G#F#9&A)J+b G# FPI$G%A#I%G#)G#Y8F%G#ACFQI$G)I#\')G#Y$&A,J+A\'Y.A4FL\')\'I#G\')\'&9A\'J+A\'J5A=F<A#\')\'I#G%)G&A%J+L#Y$=F(b Z# FMI$G*)G#9b E! BACAJ+L*A-F)A#&A#F) F# F9I\' I#A#G#)\'&)&)\'Y$A*J+AhF)A#FHI$G%A#G#I%\'&9&)A<&G+FIG\')&G%Y)\'A)"
    + "&G\'I#G$FOG.)G#Y$&Y&A.FkA(Y+&b 6! \')G$)\')b 9! FB9A/J+A\'F* FF)G( G\')\'&Y&A+J+L4A$Y#F?A#G7 )G()G#)G#AkF( F# FGG\'A$\' G# G(&\'A)J+A\'F\' F# FAI& G# I#\')\'&A(J+A\'FJ%F#A%J+b W$ F4G#I#Y#A(G#&)F. FCI#G&A$I#\')\'Y.J+\'b 6! &A0L6^)[%^2A.9b&;/ b G! b+Q! Y&K,b&%$ A-b+X% b *E b&B! Y#A.b&Q1 Q1\'F\'G0A+b&<` A&b&(* b ZK!F?G-I$G$J+b \'< b&Z) A(F@ J+A%Y#Fq J+A\'F?A#G&9A+FQG(Y&^%E%9=A+J+ L( F6A&F4b Q\' E$FIE#Y$J+A\'F9\'F%\'A#J+b 7# BACAL8Y%A&B:A#C:AMFmA%\'&IXA(G%E.AbE#9%\'A,I#E#K$A*b&<T!AEFCb @! b&T! A.b&3/ A/FTb >Y!E% E( E# b&J% A*&A>F$A#&A/F&"
    + "A(b&-\' b %E b&L! A&F.A$F*A(F+A#=G#9Q%b =_ b=Q$ J+^$A$b=U\' A\'^8 ^$A)Z$^1Z/A#GOA#G8A*b=U! A^b=W$ A+^HG#^^I#G$^$I\'Q)G)^#G(^?G%b=5# G$=A+I$^)G#^#)^AI#A`L5A-L5A-b=8! A*L:b (# B;C;B;C( C3B;C;! B#A#!A#B#A#B% B)C% # C( C,B;C;B# B%A#B) B( C;B# B% B& !A$B( C;B;C;B;C;B;C;B;C;B;C;B;C> B::C::C\'B::C::C\'B::C::C\'B::C::C\'B::C::C\'!#A#JSb= ) GX^%GS^)\'^/\'^#Y&A0G& G0b 1! Z>b D0 C+&CV!C(!#!C#!C$!C7!#!#!#!C$!#!#!#!#!#!#!#F#A/C(AWETG( G2A#G( G# G&A&E`AB\'b Q! FNA$G(E(A#J+A%&=b  & F?\'A2FMG%J+A&;b 1( F<%G%J+b 7$ F?G#&J+A%9b  $ F@ F$\'"
    + "F#\'F(G#F&\'A)&%b A$ F( F% F# F0 b&&$ A#L*G(AJBCCCG(%A%J+A%Y#b 2- L]=L$;L%AnLN=L0b #$ F% F< F# &A#& F+ F% & &A\'&A%& & & F$ F# &A#& & & & & F# &A#F% F( F% F% & F+ F2A&F$ F& F2AUZ#b /% ^MA%b=E! A-^0A#^0 ^0 ^FA+L.b=C# AX^>A.^MA%^*A(^#A/^\'b ;# b=]$ ]&b=;, A#^2A$^.A$b==$ A%^-A%^=A%^YA)^+A\'^IA)^?A#^-A%^#A/Z*AHb=9& A)^/A#^.A$^i =A$^3 ^.A$^-A&b=4#  b==! J+=b &1 b&  %b&  %b&A<#AAb&@%! b&/;!A#b&RU!A0b&O* b CG b&?) b C8 b&,.!A&b&K%#b   %b   %b \'O!b& R#b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   "
    + "%b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b !0 1A?b1A! b  # b\'Q$ b   %b   %b   %b 1Y$b3  %b3  %b3  %b3`a$A#b3  %b3  %b3  %b3`a$"};
},
ju_Set = $rt_classWithoutFields(0),
ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection),
ju_AbstractSet__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_AbstractSet_equals = ($this, $obj) => {
    let $other, $iter;
    if ($this === $obj)
        return 1;
    if (!$rt_isInstance($obj, ju_Set))
        return 0;
    $other = $obj;
    if ($this.$size() != $other.$size())
        return 0;
    $iter = $other.$iterator();
    while ($iter.$hasNext()) {
        if ($this.$contains($iter.$next()))
            continue;
        else
            return 0;
    }
    return 1;
},
ju_AbstractSet_hashCode = $this => {
    let $result, $iter, $e;
    $result = 0;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $e = $iter.$next();
        if ($e !== null)
            $result = $result + $e.$hashCode0() | 0;
    }
    return $result;
},
ju_TemplateCollections$AbstractImmutableSet = $rt_classWithoutFields(ju_AbstractSet),
ju_TemplateCollections$AbstractImmutableSet__init_ = $this => {
    ju_AbstractSet__init_($this);
},
ju_Collections$1 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableSet),
ju_Collections$1__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableSet__init_($this);
},
ju_Collections$1__init_0 = () => {
    let var_0 = new ju_Collections$1();
    ju_Collections$1__init_(var_0);
    return var_0;
};
function igiaj_JsPluginContext$12() {
    jl_Object.call(this);
    this.$val$registry0 = null;
}
let igiaj_JsPluginContext$12__init_ = ($this, var$1) => {
    $this.$val$registry0 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$12__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$12();
    igiaj_JsPluginContext$12__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$12_call = $this => {
    return igiaj_JsPluginContext_homesOf$js_body$_3($this.$val$registry0);
},
igiaj_JsPluginContext$12_call$exported$0 = var$1 => {
    return var$1.$call2();
};
function igiae_ServiceHub$Waiter() {
    let a = this; jl_Object.call(a);
    a.$pluginId1 = null;
    a.$settled0 = null;
    a.$timer = null;
}
let igiae_ServiceHub$Waiter__init_ = ($this, $pluginId, $settled) => {
    jl_Object__init_($this);
    $this.$pluginId1 = $pluginId;
    $this.$settled0 = $settled;
},
igiae_ServiceHub$Waiter__init_0 = (var_0, var_1) => {
    let var_2 = new igiae_ServiceHub$Waiter();
    igiae_ServiceHub$Waiter__init_(var_2, var_0, var_1);
    return var_2;
},
igiae_ServiceHub$Waiter_access$600 = $x0 => {
    return $x0.$timer;
},
igiae_ServiceHub$Waiter_access$700 = $x0 => {
    return $x0.$settled0;
},
igiae_ServiceHub$Waiter_access$900 = $x0 => {
    return $x0.$pluginId1;
},
igiae_ServiceHub$Waiter_access$602 = ($x0, $x1) => {
    $x0.$timer = $x1;
    return $x1;
},
ju_TemplateCollections$AbstractImmutableMap = $rt_classWithoutFields(ju_AbstractMap),
ju_TemplateCollections$AbstractImmutableMap__init_ = $this => {
    ju_AbstractMap__init_($this);
},
ju_TemplateCollections$AbstractImmutableMap_put = ($this, $key, $value) => {
    $rt_throw(jl_UnsupportedOperationException__init_());
},
ju_Collections$2 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableMap),
ju_Collections$2__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableMap__init_($this);
},
ju_Collections$2__init_0 = () => {
    let var_0 = new ju_Collections$2();
    ju_Collections$2__init_(var_0);
    return var_0;
};
function jur_CICharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$ch3 = 0;
    a.$supplement = 0;
}
let jur_CICharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch3 = $ch;
    $this.$supplement = jur_Pattern_getSupplement($ch);
},
jur_CICharSet__init_ = var_0 => {
    let var_1 = new jur_CICharSet();
    jur_CICharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CICharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch3 != $testString.$charAt($strIndex) && $this.$supplement != $testString.$charAt($strIndex) ? (-1) : 1;
},
jur_CICharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch3;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(264)), var$1);
    return jl_StringBuilder_toString(var$2);
};
function jur_SupplCharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$high0 = 0;
    a.$low0 = 0;
    a.$ch1 = 0;
}
let jur_SupplCharSet__init_ = ($this, $ch) => {
    let $chUTF16, var$3;
    jur_LeafSet__init_($this);
    $this.$charCount0 = 2;
    $this.$ch1 = $ch;
    $chUTF16 = jl_Character_toChars($ch);
    var$3 = $chUTF16.data;
    $this.$high0 = var$3[0];
    $this.$low0 = var$3[1];
},
jur_SupplCharSet__init_0 = var_0 => {
    let var_1 = new jur_SupplCharSet();
    jur_SupplCharSet__init_(var_1, var_0);
    return var_1;
},
jur_SupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let var$3, $high, $low;
    var$3 = $strIndex + 1 | 0;
    $high = $testString.$charAt($strIndex);
    $low = $testString.$charAt(var$3);
    return $this.$high0 == $high && $this.$low0 == $low ? 2 : (-1);
},
jur_SupplCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6, $ch;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$getRightBound();
    while ($strIndex < $strLength) {
        var$6 = jl_String_indexOf($testStr, $this.$high0, $strIndex);
        if (var$6 < 0)
            return (-1);
        $strIndex = var$6 + 1 | 0;
        if ($strIndex >= $strLength)
            continue;
        $ch = jl_String_charAt($testStr, $strIndex);
        if ($this.$low0 == $ch && $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult) >= 0)
            return $strIndex + (-1) | 0;
        $strIndex = $strIndex + 1 | 0;
    }
    return (-1);
},
jur_SupplCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, var$6, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$6 = jl_String_lastIndexOf($testStr, $this.$low0, $lastIndex);
            var$7 = var$6 + (-1) | 0;
            if (var$7 < 0)
                break a;
            if (var$7 < $strIndex)
                break a;
            if ($this.$high0 == jl_String_charAt($testStr, var$7) && $this.$next2.$matches(var$7 + 2 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$7 + (-1) | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_SupplCharSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$high0;
    var$2 = $this.$low0;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append0(var$3, var$1), var$2);
    return jl_StringBuilder_toString(var$3);
},
jur_SupplCharSet_getCodePoint = $this => {
    return $this.$ch1;
},
jur_SupplCharSet_first = ($this, $set) => {
    if ($set instanceof jur_SupplCharSet)
        return $set.$getCodePoint() != $this.$ch1 ? 0 : 1;
    if ($set instanceof jur_SupplRangeSet)
        return $set.$contains0($this.$ch1);
    if ($set instanceof jur_CharSet)
        return 0;
    if (!($set instanceof jur_RangeSet))
        return 1;
    return 0;
},
igiaj_JsRuntime$Disposer = $rt_classWithoutFields(0);
function igiaj_JsPluginContext$13() {
    jl_Object.call(this);
    this.$val$cancellable = null;
}
let igiaj_JsPluginContext$13__init_ = ($this, var$1) => {
    $this.$val$cancellable = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$13__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginContext$13();
    igiaj_JsPluginContext$13__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginContext$13_dispose = $this => {
    $this.$val$cancellable.$cancel();
},
igiaj_JsPluginContext$13_dispose$exported$0 = var$1 => {
    var$1.$dispose();
},
otrr_ReflectionInfo = $rt_classWithoutFields(),
otjc_JSNumber = $rt_classWithoutFields(),
otjc_JSNumber_doubleValue$static = $this => {
    return $this;
};
function jur_AbstractCharClass$LazyCategoryScope() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category0 = 0;
    a.$mayContainSupplCodepoints2 = 0;
    a.$containsAllSurrogates = 0;
}
let jur_AbstractCharClass$LazyCategoryScope__init_1 = ($this, $cat, $mayContainSupplCodepoints) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$mayContainSupplCodepoints2 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_1(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategoryScope__init_0 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$containsAllSurrogates = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints2 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategoryScope_computeValue = $this => {
    let $chCl;
    $chCl = jur_UnicodeCategoryScope__init_0($this.$category0);
    if ($this.$containsAllSurrogates)
        $chCl.$lowHighSurrogates.$set(0, 2048);
    $chCl.$mayContainSupplCodepoints0 = $this.$mayContainSupplCodepoints2;
    return $chCl;
};
function ju_Collections$9() {
    ju_AbstractList.call(this);
    this.$val$list = null;
}
let ju_Collections$9__init_ = ($this, var$1) => {
    $this.$val$list = var$1;
    ju_AbstractList__init_($this);
},
ju_Collections$9__init_0 = var_0 => {
    let var_1 = new ju_Collections$9();
    ju_Collections$9__init_(var_1, var_0);
    return var_1;
},
ju_Collections$9_get = ($this, $index) => {
    return $this.$val$list.$get($index);
},
ju_Collections$9_size = $this => {
    return $this.$val$list.$size();
};
function igiae_ServiceHub$5() {
    let a = this; jl_Object.call(a);
    a.$val$done = null;
    a.$val$dispose0 = null;
    a.$val$pluginId2 = null;
    a.$val$self = null;
    a.$this$03 = null;
}
let igiae_ServiceHub$5__init_ = ($this, $this$0, var$2, var$3, var$4, var$5) => {
    $this.$this$03 = $this$0;
    $this.$val$done = var$2;
    $this.$val$dispose0 = var$3;
    $this.$val$pluginId2 = var$4;
    $this.$val$self = var$5;
    jl_Object__init_($this);
},
igiae_ServiceHub$5__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new igiae_ServiceHub$5();
    igiae_ServiceHub$5__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
igiae_ServiceHub$5_cancel = $this => {
    let $owned;
    if ($this.$val$done.data[0])
        return;
    $this.$val$done.data[0] = 1;
    $this.$val$dispose0.$cancel();
    $owned = (igiae_ServiceHub_access$1200($this.$this$03)).$get1($this.$val$pluginId2);
    if ($owned === null)
        return;
    $owned.$remove1($this.$val$self.data[0]);
    if ($owned.$isEmpty())
        (igiae_ServiceHub_access$1200($this.$this$03)).$remove2($this.$val$pluginId2);
},
jl_Runnable = $rt_classWithoutFields(0);
function igiae_ServiceHub$3() {
    let a = this; jl_Object.call(a);
    a.$val$id = null;
    a.$val$waiter = null;
    a.$val$pluginId5 = null;
    a.$val$millis = Long_ZERO;
    a.$this$013 = null;
}
let igiae_ServiceHub$3__init_ = ($this, $this$0, var$2, var$3, var$4, var$5) => {
    $this.$this$013 = $this$0;
    $this.$val$id = var$2;
    $this.$val$waiter = var$3;
    $this.$val$pluginId5 = var$4;
    $this.$val$millis = var$5;
    jl_Object__init_($this);
},
igiae_ServiceHub$3__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new igiae_ServiceHub$3();
    igiae_ServiceHub$3__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
igiae_ServiceHub$3_run = $this => {
    let $pending;
    $pending = (igiae_ServiceHub_access$1100($this.$this$013)).$get1($this.$val$id);
    if ($pending !== null)
        $pending.$remove1($this.$val$waiter);
    igiae_Pending_reject(igiae_ServiceHub$Waiter_access$700($this.$val$waiter), igiae_PluginException__init_0($this.$val$pluginId5, ((((((jl_StringBuilder__init_()).$append3($rt_s(265))).$append9($this.$val$millis)).$append3($rt_s(266))).$append3($this.$val$id)).$append3($rt_s(267))).$toString(), ((((jl_StringBuilder__init_()).$append3($rt_s(268))).$append3($this.$val$id)).$append3($rt_s(269))).$toString()));
};
function igiae_ServiceHub$4() {
    let a = this; jl_Object.call(a);
    a.$val$installed = null;
    a.$val$listener = null;
    a.$this$049 = null;
}
let igiae_ServiceHub$4__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$049 = $this$0;
    $this.$val$installed = var$2;
    $this.$val$listener = var$3;
    jl_Object__init_($this);
},
igiae_ServiceHub$4__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new igiae_ServiceHub$4();
    igiae_ServiceHub$4__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
igiae_ServiceHub$4_cancel = $this => {
    $this.$val$installed.$remove1($this.$val$listener);
},
ju_SequencedSet = $rt_classWithoutFields(0),
jur_AbstractLineTerminator = $rt_classWithoutFields(),
jur_AbstractLineTerminator_unixLT = null,
jur_AbstractLineTerminator_unicodeLT = null,
jur_AbstractLineTerminator__init_ = $this => {
    jl_Object__init_($this);
},
jur_AbstractLineTerminator_getInstance = $flag => {
    if (!($flag & 1)) {
        if (jur_AbstractLineTerminator_unicodeLT !== null)
            return jur_AbstractLineTerminator_unicodeLT;
        jur_AbstractLineTerminator_unicodeLT = jur_AbstractLineTerminator$2__init_0();
        return jur_AbstractLineTerminator_unicodeLT;
    }
    if (jur_AbstractLineTerminator_unixLT !== null)
        return jur_AbstractLineTerminator_unixLT;
    jur_AbstractLineTerminator_unixLT = jur_AbstractLineTerminator$1__init_0();
    return jur_AbstractLineTerminator_unixLT;
};
function igiaj_JsPluginHost$13$2() {
    let a = this; jl_Object.call(a);
    a.$val$disposer = null;
    a.$this$031 = null;
}
let igiaj_JsPluginHost$13$2__init_ = ($this, $this$0, var$2) => {
    $this.$this$031 = $this$0;
    $this.$val$disposer = var$2;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$13$2__init_0 = (var_0, var_1) => {
    let var_2 = new igiaj_JsPluginHost$13$2();
    igiaj_JsPluginHost$13$2__init_(var_2, var_0, var_1);
    return var_2;
},
igiaj_JsPluginHost$13$2_cancel = $this => {
    $this.$val$disposer.dispose();
};
function jur_AbstractCharClass$LazyJavaTitleCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$023 = null;
}
let jur_AbstractCharClass$LazyJavaTitleCase$1__init_ = ($this, $this$0) => {
    $this.$this$023 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaTitleCase$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaTitleCase$1();
    jur_AbstractCharClass$LazyJavaTitleCase$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaTitleCase$1_contains = ($this, $ch) => {
    return jl_Character_isTitleCase($ch);
},
igiaj_JsRuntime$Listener = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$13$1() {
    let a = this; jl_Object.call(a);
    a.$val$listener2 = null;
    a.$this$027 = null;
}
let igiaj_JsPluginHost$13$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$027 = $this$0;
    $this.$val$listener2 = var$2;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$13$1__init_0 = (var_0, var_1) => {
    let var_2 = new igiaj_JsPluginHost$13$1();
    igiaj_JsPluginHost$13$1__init_(var_2, var_0, var_1);
    return var_2;
},
igiaj_JsPluginHost$13$1_received = ($this, $payload) => {
    $this.$val$listener2.$received(otji_JSWrapper_wrap($payload));
},
igiaj_JsPluginHost$13$1_received$exported$0 = (var$1, var$2) => {
    var$1.$received0(var$2);
},
ju_Collections$_clinit_$lambda$_59_0 = $rt_classWithoutFields(),
ju_Collections$_clinit_$lambda$_59_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
ju_Collections$_clinit_$lambda$_59_0__init_0 = () => {
    let var_0 = new ju_Collections$_clinit_$lambda$_59_0();
    ju_Collections$_clinit_$lambda$_59_0__init_(var_0);
    return var_0;
};
function jur_AbstractCharClass$LazyJavaMirrored$1() {
    jur_AbstractCharClass.call(this);
    this.$this$033 = null;
}
let jur_AbstractCharClass$LazyJavaMirrored$1__init_ = ($this, $this$0) => {
    $this.$this$033 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaMirrored$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaMirrored$1();
    jur_AbstractCharClass$LazyJavaMirrored$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaMirrored$1_contains = ($this, $ch) => {
    return 0;
};
function ju_LinkedHashMapIterator() {
    let a = this; jl_Object.call(a);
    a.$base = null;
    a.$reversed2 = 0;
    a.$expectedModCount = 0;
    a.$futureEntry0 = null;
    a.$currentEntry = null;
}
let ju_LinkedHashMapIterator__init_ = ($this, $base, $reversed) => {
    jl_Object__init_($this);
    $this.$base = $base;
    $this.$reversed2 = $reversed;
    $this.$expectedModCount = $base.$modCount;
    $this.$futureEntry0 = !$reversed ? $base.$head : $base.$tail;
},
ju_LinkedHashMapIterator__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapIterator();
    ju_LinkedHashMapIterator__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapIterator_hasNext = $this => {
    return $this.$futureEntry0 === null ? 0 : 1;
},
ju_LinkedHashMapIterator_checkConcurrentMod = $this => {
    if ($this.$expectedModCount == $this.$base.$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
},
ju_LinkedHashMapIterator_makeNext = $this => {
    ju_LinkedHashMapIterator_checkConcurrentMod($this);
    if (!$this.$hasNext())
        $rt_throw(ju_NoSuchElementException__init_());
    $this.$currentEntry = $this.$futureEntry0;
    $this.$futureEntry0 = !$this.$reversed2 ? $this.$futureEntry0.$chainForward : $this.$futureEntry0.$chainBackward;
},
ju_LinkedHashMapIterator_remove = $this => {
    if ($this.$currentEntry === null)
        $rt_throw(jl_IllegalStateException__init_());
    ju_LinkedHashMapIterator_checkConcurrentMod($this);
    $this.$base.$removeLinkedEntry($this.$currentEntry);
    $this.$currentEntry = null;
    $this.$expectedModCount = $this.$expectedModCount + 1 | 0;
};
function jur_AbstractCharClass$LazyJavaISOControl$1() {
    jur_AbstractCharClass.call(this);
    this.$this$053 = null;
}
let jur_AbstractCharClass$LazyJavaISOControl$1__init_ = ($this, $this$0) => {
    $this.$this$053 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaISOControl$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaISOControl$1();
    jur_AbstractCharClass$LazyJavaISOControl$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaISOControl$1_contains = ($this, $ch) => {
    return jl_Character_isISOControl($ch);
};
function jur_UEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter3 = 0;
}
let jur_UEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter3 = $counter;
},
jur_UEOLSet__init_0 = var_0 => {
    let var_1 = new jur_UEOLSet();
    jur_UEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_UEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound;
    $rightBound = !$matchResult.$hasAnchoringBounds() ? $testString.$length() : $matchResult.$getRightBound();
    if ($strIndex >= $rightBound) {
        $matchResult.$setConsumed($this.$consCounter3, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    if (($rightBound - $strIndex | 0) == 1 && $testString.$charAt($strIndex) == 10) {
        $matchResult.$setConsumed($this.$consCounter3, 1);
        return $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult);
    }
    return (-1);
},
jur_UEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter3) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter3, (-1));
    return $res;
},
jur_UEOLSet_getName = $this => {
    return $rt_s(270);
};
function jur_UCICharSet() {
    jur_LeafSet.call(this);
    this.$ch2 = 0;
}
let jur_UCICharSet__init_ = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch2 = jl_Character_toLowerCase(jl_Character_toUpperCase($ch));
},
jur_UCICharSet__init_0 = var_0 => {
    let var_1 = new jur_UCICharSet();
    jur_UCICharSet__init_(var_1, var_0);
    return var_1;
},
jur_UCICharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch2 != jl_Character_toLowerCase(jl_Character_toUpperCase($testString.$charAt($strIndex))) ? (-1) : 1;
},
jur_UCICharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$ch2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(var$2, $rt_s(271)), var$1);
    return jl_StringBuilder_toString(var$2);
};
function jur_AtomicFSet() {
    jur_FSet.call(this);
    this.$index4 = 0;
}
let jur_AtomicFSet__init_ = ($this, $groupIndex) => {
    jur_FSet__init_($this, $groupIndex);
},
jur_AtomicFSet__init_0 = var_0 => {
    let var_1 = new jur_AtomicFSet();
    jur_AtomicFSet__init_(var_1, var_0);
    return var_1;
},
jur_AtomicFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$getGroupIndex();
    $matchResult.$setConsumed($gr, $stringIndex - $matchResult.$getConsumed($gr) | 0);
    $this.$index4 = $stringIndex;
    return $stringIndex;
},
jur_AtomicFSet_getIndex = $this => {
    return $this.$index4;
},
jur_AtomicFSet_getName = $this => {
    return $rt_s(272);
},
jur_AtomicFSet_hasConsumed = ($this, $mr) => {
    return 0;
};
function jur_LowSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$low = 0;
}
let jur_LowSurrogateCharSet__init_0 = ($this, $low) => {
    jur_JointSet__init_($this);
    $this.$low = $low;
},
jur_LowSurrogateCharSet__init_ = var_0 => {
    let var_1 = new jur_LowSurrogateCharSet();
    jur_LowSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
},
jur_LowSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_LowSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $low, $high;
    var$4 = $stringIndex + 1 | 0;
    if (var$4 > $matchResult.$getRightBound()) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $low = $testString.$charAt($stringIndex);
    if ($stringIndex > $matchResult.$getLeftBound()) {
        $high = $testString.$charAt($stringIndex - 1 | 0);
        if (jl_Character_isHighSurrogate($high))
            return (-1);
    }
    if ($this.$low != $low)
        return (-1);
    return $this.$next2.$matches(var$4, $testString, $matchResult);
},
jur_LowSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $startStr, $strLength, var$7, var$8;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $startStr = $matchResult.$getLeftBound();
    $strLength = $matchResult.$getRightBound();
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$7 = jl_String_indexOf($testStr, $this.$low, $strIndex);
        if (var$7 < 0)
            return (-1);
        if (var$7 > $startStr && jl_Character_isHighSurrogate(jl_String_charAt($testStr, var$7 - 1 | 0))) {
            $strIndex = var$7 + 1 | 0;
            continue;
        }
        var$8 = $this.$next2;
        $strIndex = var$7 + 1 | 0;
        if (var$8.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$7;
},
jur_LowSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $startStr, $testStr, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $startStr = $matchResult.$getLeftBound();
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$7 = jl_String_lastIndexOf($testStr, $this.$low, $lastIndex);
            if (var$7 < 0)
                break a;
            if (var$7 < $strIndex)
                break a;
            if (var$7 > $startStr && jl_Character_isHighSurrogate(jl_String_charAt($testStr, var$7 - 1 | 0))) {
                $lastIndex = var$7 + (-2) | 0;
                continue;
            }
            if ($this.$next2.$matches(var$7 + 1 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$7 + (-1) | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_LowSurrogateCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$low;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(var$2, var$1);
    return jl_StringBuilder_toString(var$2);
},
jur_LowSurrogateCharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_HighSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_LowSurrogateCharSet))
        return 1;
    return $set.$low != $this.$low ? 0 : 1;
},
jur_LowSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_CompositeGroupQuantifierSet() {
    let a = this; jur_GroupQuantifierSet.call(a);
    a.$quantifier0 = null;
    a.$setCounter = 0;
}
let jur_CompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier0 = $quant;
    $this.$setCounter = $setCounter;
},
jur_CompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_CompositeGroupQuantifierSet();
    jur_CompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_CompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, var$5, var$6, $nextIndex;
    $enterCounter = $matchResult.$getEnterCounter($this.$setCounter);
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($enterCounter >= $this.$quantifier0.$max0())
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    var$5 = $this.$setCounter;
    var$6 = $enterCounter + 1 | 0;
    $matchResult.$setEnterCounter(var$5, var$6);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0) {
        $matchResult.$setEnterCounter($this.$setCounter, 0);
        return $nextIndex;
    }
    var$5 = $this.$setCounter;
    var$6 = var$6 + (-1) | 0;
    $matchResult.$setEnterCounter(var$5, var$6);
    if (var$6 >= $this.$quantifier0.$min0())
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $matchResult.$setEnterCounter($this.$setCounter, 0);
    return (-1);
},
jur_CompositeGroupQuantifierSet_getName = $this => {
    return $this.$quantifier0.$toString();
},
jur_RelCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_RelCompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_CompositeGroupQuantifierSet__init_($this, $quant, $innerSet, $next, $type, $setCounter);
},
jur_RelCompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_RelCompositeGroupQuantifierSet();
    jur_RelCompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_RelCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, $nextIndex;
    $enterCounter = $matchResult.$getEnterCounter($this.$setCounter);
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($enterCounter >= $this.$quantifier0.$max0()) {
        $matchResult.$setEnterCounter($this.$setCounter, 0);
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    }
    if ($enterCounter < $this.$quantifier0.$min0()) {
        $matchResult.$setEnterCounter($this.$setCounter, $enterCounter + 1 | 0);
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    } else {
        $nextIndex = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ($nextIndex >= 0) {
            $matchResult.$setEnterCounter($this.$setCounter, 0);
            return $nextIndex;
        }
        $matchResult.$setEnterCounter($this.$setCounter, $enterCounter + 1 | 0);
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    }
    return $nextIndex;
};
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size0 = 0;
}
let ju_ArrayList__init_3 = $this => {
    ju_ArrayList__init_1($this, 10);
},
ju_ArrayList__init_ = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_3(var_0);
    return var_0;
},
ju_ArrayList__init_1 = ($this, $initialCapacity) => {
    ju_AbstractList__init_($this);
    if ($initialCapacity >= 0) {
        $this.$array = $rt_createArray(jl_Object, $initialCapacity);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_());
},
ju_ArrayList__init_4 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_1(var_1, var_0);
    return var_1;
},
ju_ArrayList__init_2 = ($this, $c) => {
    let $iter, $i;
    ju_ArrayList__init_1($this, $c.$size());
    $iter = $c.$iterator();
    $i = 0;
    while ($i < $this.$array.data.length) {
        $this.$array.data[$i] = $iter.$next();
        $i = $i + 1 | 0;
    }
    $this.$size0 = $this.$array.data.length;
},
ju_ArrayList__init_0 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_2(var_1, var_0);
    return var_1;
},
ju_ArrayList_ensureCapacity = ($this, $minCapacity) => {
    let $newLength;
    if ($this.$array.data.length < $minCapacity) {
        $newLength = $this.$array.data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($this.$array.data.length * 2 | 0, 5));
        $this.$array = ju_Arrays_copyOf0($this.$array, $newLength);
    }
},
ju_ArrayList_get = ($this, $index) => {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array.data[$index];
},
ju_ArrayList_size = $this => {
    return $this.$size0;
},
ju_ArrayList_set = ($this, $index, $element) => {
    let $old;
    ju_ArrayList_checkIndex($this, $index);
    $old = $this.$array.data[$index];
    $this.$array.data[$index] = $element;
    return $old;
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3;
    $this.$ensureCapacity($this.$size0 + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size0;
    $this.$size0 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return 1;
},
ju_ArrayList_add0 = ($this, $index, $element) => {
    let $i;
    ju_ArrayList_checkIndexForAdd($this, $index);
    $this.$ensureCapacity($this.$size0 + 1 | 0);
    $i = $this.$size0;
    while ($i > $index) {
        $this.$array.data[$i] = $this.$array.data[$i - 1 | 0];
        $i = $i + (-1) | 0;
    }
    $this.$array.data[$index] = $element;
    $this.$size0 = $this.$size0 + 1 | 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
},
ju_ArrayList_remove = ($this, $i) => {
    let $old, var$3, var$4, $i_0;
    ju_ArrayList_checkIndex($this, $i);
    $old = $this.$array.data[$i];
    $this.$size0 = $this.$size0 - 1 | 0;
    while ($i < $this.$size0) {
        var$3 = $this.$array.data;
        var$4 = $this.$array.data;
        $i_0 = $i + 1 | 0;
        var$3[$i] = var$4[$i_0];
        $i = $i_0;
    }
    $this.$array.data[$this.$size0] = null;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return $old;
},
ju_ArrayList_remove0 = ($this, $o) => {
    let $index;
    $index = $this.$indexOf2($o);
    if ($index < 0)
        return 0;
    $this.$remove($index);
    return 1;
},
ju_ArrayList_clear = $this => {
    ju_Arrays_fill3($this.$array, 0, $this.$size0, null);
    $this.$size0 = 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    if ($index >= 0 && $index < $this.$size0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
ju_ArrayList_checkIndexForAdd = ($this, $index) => {
    if ($index >= 0 && $index <= $this.$size0)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
ju_ArrayList_toString = $this => {
    let $length, $buffer, $i;
    if (!$this.$size0)
        return $rt_s(273);
    $length = $this.$size0 - 1 | 0;
    $buffer = jl_StringBuilder__init_0($this.$size0 * 16 | 0);
    $buffer.$append0(91);
    $i = 0;
    while ($i < $length) {
        ($buffer.$append($this.$array.data[$i] === $this ? $rt_s(239) : $this.$array.data[$i])).$append3($rt_s(43));
        $i = $i + 1 | 0;
    }
    $buffer.$append($this.$array.data[$length] === $this ? $rt_s(239) : $this.$array.data[$length]);
    return ($buffer.$append0(93)).$toString();
},
ju_ArrayList_hashCode = $this => {
    let $result, $i;
    $result = 1;
    $i = 0;
    while ($i < $this.$size0) {
        $result = (31 * $result | 0) + ju_Objects_hashCode($this.$array.data[$i]) | 0;
        $i = $i + 1 | 0;
    }
    return $result;
};
function igiaj_JsScheduler$1() {
    let a = this; jl_Object.call(a);
    a.$val$task = null;
    a.$this$039 = null;
}
let igiaj_JsScheduler$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$039 = $this$0;
    $this.$val$task = var$2;
    jl_Object__init_($this);
},
igiaj_JsScheduler$1__init_0 = (var_0, var_1) => {
    let var_2 = new igiaj_JsScheduler$1();
    igiaj_JsScheduler$1__init_(var_2, var_0, var_1);
    return var_2;
},
igiaj_JsScheduler$1_run = $this => {
    $this.$val$task.$run();
},
igiaj_JsScheduler$1_run$exported$0 = var$1 => {
    var$1.$run();
};
function igiaj_JsScheduler$2() {
    let a = this; jl_Object.call(a);
    a.$val$handle = 0;
    a.$this$029 = null;
}
let igiaj_JsScheduler$2__init_ = ($this, $this$0, var$2) => {
    $this.$this$029 = $this$0;
    $this.$val$handle = var$2;
    jl_Object__init_($this);
},
igiaj_JsScheduler$2__init_0 = (var_0, var_1) => {
    let var_2 = new igiaj_JsScheduler$2();
    igiaj_JsScheduler$2__init_(var_2, var_0, var_1);
    return var_2;
},
igiaj_JsScheduler$2_cancel = $this => {
    clearTimeout($this.$val$handle);
},
ju_LinkedHashMapIterator$EntryIterator = $rt_classWithoutFields(ju_LinkedHashMapIterator),
ju_LinkedHashMapIterator$EntryIterator__init_ = ($this, $map, $reversed) => {
    ju_LinkedHashMapIterator__init_($this, $map, $reversed);
},
ju_LinkedHashMapIterator$EntryIterator__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapIterator$EntryIterator();
    ju_LinkedHashMapIterator$EntryIterator__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapIterator$EntryIterator_next = $this => {
    ju_LinkedHashMapIterator_makeNext($this);
    return $this.$currentEntry;
},
ju_LinkedHashMapIterator$EntryIterator_next0 = $this => {
    return $this.$next0();
};
function jur_CompositeQuantifierSet() {
    jur_LeafQuantifierSet.call(this);
    this.$quantifier = null;
}
let jur_CompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier = $quant;
},
jur_CompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CompositeQuantifierSet();
    jur_CompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $min, $max, $i, $shift;
    $min = $this.$quantifier.$min0();
    $max = $this.$quantifier.$max0();
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while ($i < $max) {
                    if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound())
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break a;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            while (true) {
                if ($i < $min)
                    return (-1);
                $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
                if ($shift >= 0)
                    break;
                $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
                $i = $i + (-1) | 0;
            }
            return $shift;
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound()) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_CompositeQuantifierSet_getName = $this => {
    return $this.$quantifier.$toString();
};
function jur_SupplRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$chars = null;
    a.$alt0 = 0;
}
let jur_SupplRangeSet__init_ = ($this, $cc) => {
    jur_JointSet__init_($this);
    $this.$chars = $cc.$getInstance();
    $this.$alt0 = $cc.$alt;
},
jur_SupplRangeSet__init_0 = var_0 => {
    let var_1 = new jur_SupplRangeSet();
    jur_SupplRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_SupplRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $high, $offset, var$8, $low;
    $strLength = $matchResult.$getRightBound();
    if ($stringIndex < $strLength) {
        var$5 = $stringIndex + 1 | 0;
        $high = $testString.$charAt($stringIndex);
        if ($this.$contains0($high)) {
            $offset = $this.$next2.$matches(var$5, $testString, $matchResult);
            if ($offset > 0)
                return $offset;
        }
        if (var$5 < $strLength) {
            var$8 = var$5 + 1 | 0;
            $low = $testString.$charAt(var$5);
            if (jl_Character_isSurrogatePair($high, $low) && $this.$contains0(jl_Character_toCodePoint($high, $low)))
                return $this.$next2.$matches(var$8, $testString, $matchResult);
        }
    }
    return (-1);
},
jur_SupplRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt0 ? $rt_s(38) : $rt_s(39);
    var$2 = $this.$chars.$toString();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(40)), var$1), var$2);
    return jl_StringBuilder_toString(var$3);
},
jur_SupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains0($ch);
},
jur_SupplRangeSet_first = ($this, $set) => {
    if ($set instanceof jur_SupplCharSet)
        return jur_AbstractCharClass_intersects0($this.$chars, $set.$getCodePoint());
    if ($set instanceof jur_CharSet)
        return jur_AbstractCharClass_intersects0($this.$chars, $set.$getChar());
    if ($set instanceof jur_SupplRangeSet)
        return jur_AbstractCharClass_intersects($this.$chars, $set.$chars);
    if (!($set instanceof jur_RangeSet))
        return 1;
    return jur_AbstractCharClass_intersects($this.$chars, $set.$getChars());
},
jur_SupplRangeSet_getChars = $this => {
    return $this.$chars;
},
jur_SupplRangeSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_SupplRangeSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_RelAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_RelAltGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AltGroupQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_RelAltGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_RelAltGroupQuantifierSet();
    jur_RelAltGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_RelAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    return $nextIndex;
};
function jl_String() {
    jl_Object.call(this);
    this.$hashCode4 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_2 = $this => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $this.$nativeString = "";
},
jl_String__init_6 = () => {
    let var_0 = new jl_String();
    jl_String__init_2(var_0);
    return var_0;
},
jl_String__init_0 = ($this, $characters) => {
    let var$2;
    jl_String_$callClinit();
    var$2 = $characters.data;
    jl_Object__init_($this);
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, var$2.length);
},
jl_String__init_ = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
},
jl_String__init_4 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_3 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_4(var_1, var_0);
    return var_1;
},
jl_String__init_5 = (var$0, var$1, $offset, $count) => {
    let var$4;
    jl_String_$callClinit();
    var$4 = var$1.data;
    jl_Object__init_(var$0);
    ju_Objects_checkFromIndexSize($offset, $count, var$4.length);
    var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
},
jl_String__init_1 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_5(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_startsWith0 = ($this, $prefix, $toffset) => {
    let $i, var$4, var$5;
    if (($toffset + jl_String_length($prefix) | 0) > jl_String_length($this))
        return 0;
    $i = 0;
    while ($i < jl_String_length($prefix)) {
        var$4 = jl_String_charAt($prefix, $i);
        var$5 = $toffset + 1 | 0;
        if (var$4 != jl_String_charAt($this, $toffset))
            return 0;
        $i = $i + 1 | 0;
        $toffset = var$5;
    }
    return 1;
},
jl_String_startsWith = ($this, $prefix) => {
    if ($this === $prefix)
        return 1;
    return jl_String_startsWith0($this, $prefix, 0);
},
jl_String_indexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$nativeString.length)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$nativeString.length - 1 | 0))
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $hi && $this.$nativeString.charCodeAt(($i + 1 | 0)) == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_indexOf1 = ($this, $ch) => {
    return jl_String_indexOf($this, $ch, 0);
},
jl_String_lastIndexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo, var$7;
    $i = jl_Math_min($fromIndex, jl_String_length($this) - 1 | 0);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i < 0)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + (-1) | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i < 1)
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $lo) {
            var$7 = $i - 1 | 0;
            if ($this.$nativeString.charCodeAt(var$7) == $hi)
                break;
        }
        $i = $i + (-1) | 0;
    }
    return var$7;
},
jl_String_lastIndexOf0 = ($this, $ch) => {
    return jl_String_lastIndexOf($this, $ch, jl_String_length($this) - 1 | 0);
},
jl_String_indexOf0 = ($this, $str, $fromIndex) => {
    let $i, $toIndex, $j;
    $i = jl_Math_max(0, $fromIndex);
    $toIndex = jl_String_length($this) - jl_String_length($str) | 0;
    a: while (true) {
        if ($i > $toIndex)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= jl_String_length($str))
                break a;
            if (jl_String_charAt($this, $i + $j | 0) != jl_String_charAt($str, $j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_lastIndexOf1 = ($this, $str, $fromIndex) => {
    let $i, $j;
    $i = jl_Math_min($fromIndex, jl_String_length($this) - jl_String_length($str) | 0);
    a: while (true) {
        if ($i < 0)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= jl_String_length($str))
                break a;
            if (jl_String_charAt($this, $i + $j | 0) != jl_String_charAt($str, $j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + (-1) | 0;
    }
    return $i;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (!var$4)
        return jl_String_EMPTY;
    if (!$beginIndex && $endIndex == $length)
        return $this;
    if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
        return jl_String__init_3($this.$nativeString.substring($beginIndex, $endIndex));
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_substring0 = ($this, $beginIndex) => {
    return jl_String_substring($this, $beginIndex, jl_String_length($this));
},
jl_String_subSequence = ($this, $beginIndex, $endIndex) => {
    return jl_String_substring($this, $beginIndex, $endIndex);
},
jl_String_contains = ($this, $s) => {
    let $sz, $i, $j;
    $sz = jl_String_length($this) - $s.$length() | 0;
    $i = 0;
    while ($i <= $sz) {
        $j = 0;
        while (true) {
            if ($j >= $s.$length())
                return 1;
            if (jl_String_charAt($this, $i + $j | 0) != $s.$charAt($j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return 0;
},
jl_String_toString = $this => {
    return $this;
},
jl_String_toCharArray = $this => {
    let $array, $i, var$3;
    $array = $rt_createCharArray($this.$nativeString.length);
    $i = 0;
    while (true) {
        var$3 = $array.data;
        if ($i >= var$3.length)
            break;
        var$3[$i] = jl_String_charAt($this, $i);
        $i = $i + 1 | 0;
    }
    return $array;
},
jl_String_valueOf = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(44) : $obj.$toString();
},
jl_String_valueOf0 = $i => {
    jl_String_$callClinit();
    return ((jl_StringBuilder__init_()).$append2($i)).$toString();
},
jl_String_valueOf1 = $l => {
    jl_String_$callClinit();
    return ((jl_StringBuilder__init_()).$append9($l)).$toString();
},
jl_String_valueOf2 = $d => {
    jl_String_$callClinit();
    return ((jl_StringBuilder__init_()).$append10($d)).$toString();
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    return $this.$nativeString !== $str.$nativeString ? 0 : 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode4) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode4 = (31 * $this.$hashCode4 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode4;
},
jl_String_split = ($this, $regex) => {
    return jur_Pattern_split(jur_Pattern_compile($regex), jl_String_toString($this));
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_6();
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_118_0__init_0();
};
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
let ju_HashSet__init_1 = $this => {
    ju_HashSet__init_($this, ju_HashMap__init_());
},
ju_HashSet__init_0 = () => {
    let var_0 = new ju_HashSet();
    ju_HashSet__init_1(var_0);
    return var_0;
},
ju_HashSet__init_ = ($this, $backingMap) => {
    ju_AbstractSet__init_($this);
    $this.$backingMap = $backingMap;
},
ju_HashSet__init_2 = var_0 => {
    let var_1 = new ju_HashSet();
    ju_HashSet__init_(var_1, var_0);
    return var_1;
},
ju_HashSet_add = ($this, $object) => {
    return $this.$backingMap.$put($object, $this) !== null ? 0 : 1;
},
ju_HashSet_contains = ($this, $object) => {
    return $this.$backingMap.$containsKey($object);
},
ju_HashSet_isEmpty = $this => {
    return $this.$backingMap.$isEmpty();
},
ju_HashSet_iterator = $this => {
    return ($this.$backingMap.$keySet()).$iterator();
},
ju_HashSet_remove = ($this, $object) => {
    return $this.$backingMap.$remove2($object) === null ? 0 : 1;
},
ju_HashSet_size = $this => {
    return $this.$backingMap.$size();
},
ju_LinkedHashSet = $rt_classWithoutFields(ju_HashSet),
ju_LinkedHashSet__init_0 = $this => {
    ju_HashSet__init_($this, ju_LinkedHashMap__init_());
},
ju_LinkedHashSet__init_ = () => {
    let var_0 = new ju_LinkedHashSet();
    ju_LinkedHashSet__init_0(var_0);
    return var_0;
};
function igiae_JsonSchema() {
    let a = this; jl_Object.call(a);
    a.$type = null;
    a.$schemaDraft = null;
    a.$schemaId = null;
    a.$title = null;
    a.$description = null;
    a.$properties = null;
    a.$required = null;
    a.$items = null;
    a.$additionalProperties = null;
    a.$pattern2 = null;
    a.$minimum = null;
    a.$enumValues = null;
    a.$fix0 = null;
}
let igiae_JsonSchema__init_0 = ($this, $type) => {
    jl_Object__init_($this);
    $this.$type = $type;
},
igiae_JsonSchema__init_ = var_0 => {
    let var_1 = new igiae_JsonSchema();
    igiae_JsonSchema__init_0(var_1, var_0);
    return var_1;
},
igiae_JsonSchema_ofType = $type => {
    return igiae_JsonSchema__init_($type);
},
igiae_JsonSchema_getType = $this => {
    return $this.$type;
},
igiae_JsonSchema_setTitle = ($this, $value) => {
    $this.$title = $value;
},
igiae_JsonSchema_setDescription = ($this, $value) => {
    $this.$description = $value;
},
igiae_JsonSchema_getProperties = $this => {
    return $this.$properties;
},
igiae_JsonSchema_setProperties = ($this, $value) => {
    $this.$properties = $value;
},
igiae_JsonSchema_getRequired = $this => {
    return $this.$required;
},
igiae_JsonSchema_setRequired = ($this, $value) => {
    $this.$required = $value;
},
igiae_JsonSchema_getItems = $this => {
    return $this.$items;
},
igiae_JsonSchema_setItems = ($this, $value) => {
    $this.$items = $value;
},
igiae_JsonSchema_getAdditionalProperties = $this => {
    return $this.$additionalProperties;
},
igiae_JsonSchema_setAdditionalProperties = ($this, $value) => {
    $this.$additionalProperties = $value;
},
igiae_JsonSchema_getPattern = $this => {
    return $this.$pattern2;
},
igiae_JsonSchema_setPattern = ($this, $value) => {
    $this.$pattern2 = $value;
},
igiae_JsonSchema_getMinimum = $this => {
    return $this.$minimum;
},
igiae_JsonSchema_setMinimum = ($this, $value) => {
    $this.$minimum = $value;
},
igiae_JsonSchema_getEnumValues = $this => {
    return $this.$enumValues;
},
igiae_JsonSchema_setEnumValues = ($this, $value) => {
    $this.$enumValues = $value;
},
igiae_JsonSchema_getFix = $this => {
    return $this.$fix0;
},
igiae_JsonSchema_setFix = ($this, $value) => {
    $this.$fix0 = $value;
},
igiae_JsonSchema_setSchemaDraft = ($this, $value) => {
    $this.$schemaDraft = $value;
},
igiae_JsonSchema_setSchemaId = ($this, $value) => {
    $this.$schemaId = $value;
},
igiae_JsonSchema_toTree = $this => {
    let $out, $nested, var$3, $property;
    $out = ju_LinkedHashMap__init_();
    igiae_JsonSchema_put($out, $rt_s(274), $this.$schemaDraft);
    igiae_JsonSchema_put($out, $rt_s(275), $this.$schemaId);
    igiae_JsonSchema_put($out, $rt_s(276), $this.$title);
    igiae_JsonSchema_put($out, $rt_s(277), $this.$description);
    igiae_JsonSchema_put($out, $rt_s(278), $this.$type);
    if ($this.$properties !== null) {
        $nested = ju_LinkedHashMap__init_();
        var$3 = ($this.$properties.$entrySet()).$iterator();
        while (var$3.$hasNext()) {
            $property = var$3.$next();
            $nested.$put($property.$getKey(), igiae_JsonSchema_toTree($property.$getValue()));
        }
        $out.$put($rt_s(279), $nested);
    }
    igiae_JsonSchema_put($out, $rt_s(280), $this.$required);
    if ($this.$items !== null)
        $out.$put($rt_s(281), igiae_JsonSchema_toTree($this.$items));
    if ($this.$additionalProperties !== null)
        $out.$put($rt_s(282), igiae_JsonSchema_toTree($this.$additionalProperties));
    igiae_JsonSchema_put($out, $rt_s(283), $this.$pattern2);
    igiae_JsonSchema_put($out, $rt_s(284), $this.$minimum);
    igiae_JsonSchema_put($out, $rt_s(285), $this.$enumValues);
    igiae_JsonSchema_put($out, $rt_s(20), $this.$fix0);
    return $out;
},
igiae_JsonSchema_put = ($out, $key, $value) => {
    if ($value !== null)
        $out.$put($key, $value);
},
jur_FSet$PossessiveFSet = $rt_classWithoutFields(jur_AbstractSet),
jur_FSet$PossessiveFSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_FSet$PossessiveFSet__init_0 = () => {
    let var_0 = new jur_FSet$PossessiveFSet();
    jur_FSet$PossessiveFSet__init_(var_0);
    return var_0;
},
jur_FSet$PossessiveFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_FSet$PossessiveFSet_getName = $this => {
    return $rt_s(286);
},
jur_FSet$PossessiveFSet_hasConsumed = ($this, $mr) => {
    return 0;
},
igiae_Pending$Settlement = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$12$1() {
    let a = this; jl_Object.call(a);
    a.$val$resolve = null;
    a.$val$reject = null;
    a.$this$041 = null;
}
let igiaj_JsPluginHost$12$1__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$041 = $this$0;
    $this.$val$resolve = var$2;
    $this.$val$reject = var$3;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$12$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new igiaj_JsPluginHost$12$1();
    igiaj_JsPluginHost$12$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
igiaj_JsPluginHost$12$1_value = ($this, $value) => {
    let var$2, var$3;
    var$2 = $this.$val$resolve;
    var$3 = otji_JSWrapper_unwrap($value);
    var$2.accept(var$3);
},
igiaj_JsPluginHost$12$1_failure = ($this, $reason) => {
    let var$2, var$3;
    var$2 = $this.$val$reject;
    var$3 = igiaj_JsErrors_of($reason);
    var$2.accept(var$3);
},
jur_PosCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_PosCompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_CompositeGroupQuantifierSet__init_($this, $quant, $innerSet, $next, $type, $setCounter);
    jur_FSet_$callClinit();
    $innerSet.$setNext(jur_FSet_posFSet);
},
jur_PosCompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_PosCompositeGroupQuantifierSet();
    jur_PosCompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_PosCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $counter, $max, $nextIndex;
    $counter = 0;
    $max = $this.$quantifier0.$max0();
    a: {
        while (true) {
            $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
            if ($nextIndex <= $stringIndex)
                break a;
            if ($counter >= $max)
                break;
            $counter = $counter + 1 | 0;
            $stringIndex = $nextIndex;
        }
    }
    if ($nextIndex < 0 && $counter < $this.$quantifier0.$min0())
        return (-1);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
};
function jur_MultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter = 0;
}
let jur_MultiLineEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter = $counter;
},
jur_MultiLineEOLSet__init_0 = var_0 => {
    let var_1 = new jur_MultiLineEOLSet();
    jur_MultiLineEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_MultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $strDif, $ch1, $ch2;
    $strDif = !$matchResult.$hasAnchoringBounds() ? $testString.$length() - $strIndex | 0 : $matchResult.$getRightBound() - $strIndex | 0;
    if (!$strDif) {
        $matchResult.$setConsumed($this.$consCounter, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    if ($strDif < 2) {
        $ch1 = $testString.$charAt($strIndex);
        $ch2 = 97;
    } else {
        $ch1 = $testString.$charAt($strIndex);
        $ch2 = $testString.$charAt($strIndex + 1 | 0);
    }
    switch ($ch1) {
        case 10:
        case 133:
        case 8232:
        case 8233:
            $matchResult.$setConsumed($this.$consCounter, 0);
            return $this.$next2.$matches($strIndex, $testString, $matchResult);
        case 13:
            if ($ch2 != 10) {
                $matchResult.$setConsumed($this.$consCounter, 0);
                return $this.$next2.$matches($strIndex, $testString, $matchResult);
            }
            $matchResult.$setConsumed($this.$consCounter, 0);
            return $this.$next2.$matches($strIndex, $testString, $matchResult);
        default:
    }
    return (-1);
},
jur_MultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter, (-1));
    return $res;
},
jur_MultiLineEOLSet_getName = $this => {
    return $rt_s(287);
},
ju_Queue = $rt_classWithoutFields(0),
ju_Deque = $rt_classWithoutFields(0);
function ju_ArrayDeque() {
    let a = this; ju_AbstractCollection.call(a);
    a.$version = 0;
    a.$array0 = null;
    a.$head0 = 0;
    a.$tail0 = 0;
}
let ju_ArrayDeque__init_0 = $this => {
    ju_ArrayDeque__init_($this, 8);
},
ju_ArrayDeque__init_1 = () => {
    let var_0 = new ju_ArrayDeque();
    ju_ArrayDeque__init_0(var_0);
    return var_0;
},
ju_ArrayDeque__init_ = ($this, $numElements) => {
    ju_AbstractCollection__init_($this);
    $this.$array0 = $rt_createArray(jl_Object, $numElements + 1 | 0);
},
ju_ArrayDeque__init_2 = var_0 => {
    let var_1 = new ju_ArrayDeque();
    ju_ArrayDeque__init_(var_1, var_0);
    return var_1;
},
ju_ArrayDeque_addFirst = ($this, $e) => {
    ju_Objects_requireNonNull($e);
    ju_ArrayDeque_ensureCapacity($this, $this.$size() + 1 | 0);
    $this.$head0 = ju_ArrayDeque_modDec($this.$head0, $this.$array0.data.length);
    $this.$array0.data[$this.$head0] = $e;
    $this.$version = $this.$version + 1 | 0;
},
ju_ArrayDeque_removeFirst = $this => {
    let $value;
    $value = $this.$pollFirst();
    if ($value !== null)
        return $value;
    $rt_throw(ju_NoSuchElementException__init_());
},
ju_ArrayDeque_pollFirst = $this => {
    let $result;
    if ($this.$head0 == $this.$tail0)
        return null;
    $result = $this.$array0.data[$this.$head0];
    $this.$array0.data[$this.$head0] = null;
    $this.$head0 = ju_ArrayDeque_modInc($this.$head0, $this.$array0.data.length);
    $this.$version = $this.$version + 1 | 0;
    return $result;
},
ju_ArrayDeque_push = ($this, $e) => {
    $this.$addFirst($e);
},
ju_ArrayDeque_pop = $this => {
    return $this.$removeFirst();
},
ju_ArrayDeque_size = $this => {
    return $this.$tail0 >= $this.$head0 ? $this.$tail0 - $this.$head0 | 0 : ($this.$array0.data.length - $this.$head0 | 0) + $this.$tail0 | 0;
},
ju_ArrayDeque_modInc = ($i, $mod) => {
    let var$3;
    var$3 = $i + 1 | 0;
    if (var$3 == $mod)
        var$3 = 0;
    return var$3;
},
ju_ArrayDeque_modDec = ($i, $mod) => {
    let var$3;
    var$3 = $i + (-1) | 0;
    if (var$3 == (-1))
        var$3 = $mod - 1 | 0;
    return var$3;
},
ju_ArrayDeque_ensureCapacity = ($this, $capacity) => {
    let $newArraySize, $newArray, $j, $i, var$6, var$7, var$8;
    if ($capacity < $this.$array0.data.length)
        return;
    $newArraySize = jl_Math_max($this.$array0.data.length * 2 | 0, (($capacity * 3 | 0) / 2 | 0) + 1 | 0);
    if ($newArraySize < 1)
        $newArraySize = 2147483647;
    $newArray = $rt_createArray(jl_Object, $newArraySize);
    $j = 0;
    if ($this.$head0 <= $this.$tail0) {
        $i = $this.$head0;
        while ($i < $this.$tail0) {
            var$6 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$6[$j] = $this.$array0.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
    } else {
        $i = $this.$head0;
        while ($i < $this.$array0.data.length) {
            var$8 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$8[$j] = $this.$array0.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
        $i = 0;
        while ($i < $this.$tail0) {
            var$6 = $newArray.data;
            var$7 = $j + 1 | 0;
            var$6[$j] = $this.$array0.data[$i];
            $i = $i + 1 | 0;
            $j = var$7;
        }
    }
    $this.$head0 = 0;
    $this.$tail0 = $j;
    $this.$array0 = $newArray;
};
function jur_AbstractCharClass$LazyJavaDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$021 = null;
}
let jur_AbstractCharClass$LazyJavaDigit$1__init_ = ($this, $this$0) => {
    $this.$this$021 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaDigit$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaDigit$1();
    jur_AbstractCharClass$LazyJavaDigit$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaDigit$1_contains = ($this, $ch) => {
    return jl_Character_isDigit($ch);
};
function igiae_ServiceHub$Entry() {
    let a = this; jl_Object.call(a);
    a.$pluginId3 = null;
    a.$service0 = null;
}
let igiae_ServiceHub$Entry__init_0 = ($this, $pluginId, $service) => {
    jl_Object__init_($this);
    $this.$pluginId3 = $pluginId;
    $this.$service0 = $service;
},
igiae_ServiceHub$Entry__init_ = (var_0, var_1) => {
    let var_2 = new igiae_ServiceHub$Entry();
    igiae_ServiceHub$Entry__init_0(var_2, var_0, var_1);
    return var_2;
},
igiae_ServiceHub$Entry_access$200 = $x0 => {
    return $x0.$service0;
},
igiae_ServiceHub$Entry_access$800 = $x0 => {
    return $x0.$pluginId3;
};
function ju_HashMap$AbstractMapIterator() {
    let a = this; jl_Object.call(a);
    a.$position = 0;
    a.$expectedModCount0 = 0;
    a.$futureEntry = null;
    a.$currentEntry0 = null;
    a.$prevEntry = null;
    a.$associatedMap = null;
}
let ju_HashMap$AbstractMapIterator__init_ = ($this, $hm) => {
    jl_Object__init_($this);
    $this.$associatedMap = $hm;
    $this.$expectedModCount0 = $hm.$modCount;
    $this.$futureEntry = null;
},
ju_HashMap$AbstractMapIterator__init_0 = var_0 => {
    let var_1 = new ju_HashMap$AbstractMapIterator();
    ju_HashMap$AbstractMapIterator__init_(var_1, var_0);
    return var_1;
},
ju_HashMap$AbstractMapIterator_hasNext = $this => {
    if ($this.$futureEntry !== null)
        return 1;
    while ($this.$position < $this.$associatedMap.$elementData.data.length) {
        if ($this.$associatedMap.$elementData.data[$this.$position] !== null)
            return 1;
        $this.$position = $this.$position + 1 | 0;
    }
    return 0;
},
ju_HashMap$AbstractMapIterator_checkConcurrentMod = $this => {
    if ($this.$expectedModCount0 == $this.$associatedMap.$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
},
ju_HashMap$AbstractMapIterator_makeNext = $this => {
    let var$1, var$2;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    if (!$this.$hasNext())
        $rt_throw(ju_NoSuchElementException__init_());
    if ($this.$futureEntry === null) {
        var$1 = $this.$associatedMap.$elementData.data;
        var$2 = $this.$position;
        $this.$position = var$2 + 1 | 0;
        $this.$currentEntry0 = var$1[var$2];
        $this.$futureEntry = $this.$currentEntry0.$next3;
        $this.$prevEntry = null;
    } else {
        if ($this.$currentEntry0 !== null)
            $this.$prevEntry = $this.$currentEntry0;
        $this.$currentEntry0 = $this.$futureEntry;
        $this.$futureEntry = $this.$futureEntry.$next3;
    }
},
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException),
jl_NullPointerException__init_1 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_NullPointerException__init_ = var_0 => {
    let var_1 = new jl_NullPointerException();
    jl_NullPointerException__init_1(var_1, var_0);
    return var_1;
},
jl_NullPointerException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_NullPointerException__init_2 = () => {
    let var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_0(var_0);
    return var_0;
};
function jur_AbstractCharClass$LazyJavaSpaceChar$1() {
    jur_AbstractCharClass.call(this);
    this.$this$044 = null;
}
let jur_AbstractCharClass$LazyJavaSpaceChar$1__init_ = ($this, $this$0) => {
    $this.$this$044 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaSpaceChar$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaSpaceChar$1();
    jur_AbstractCharClass$LazyJavaSpaceChar$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaSpaceChar$1_contains = ($this, $ch) => {
    return jl_Character_isSpaceChar($ch);
};
function ju_LinkedHashMapEntrySet() {
    let a = this; ju_AbstractSet.call(a);
    a.$base1 = null;
    a.$reversed0 = 0;
}
let ju_LinkedHashMapEntrySet__init_ = ($this, $base, $reversed) => {
    ju_AbstractSet__init_($this);
    $this.$base1 = $base;
    $this.$reversed0 = $reversed;
},
ju_LinkedHashMapEntrySet__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapEntrySet();
    ju_LinkedHashMapEntrySet__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapEntrySet_size = $this => {
    return $this.$base1.$elementCount;
},
ju_LinkedHashMapEntrySet_iterator = $this => {
    return ju_LinkedHashMapIterator$EntryIterator__init_0($this.$base1, $this.$reversed0);
},
jl_Math = $rt_classWithoutFields(),
jl_Math_floor = var$1 => {
    return Math.floor(var$1);
},
jl_Math_min = (var$1, $b) => {
    if (var$1 < $b)
        $b = var$1;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
otji_JSWrapper$Helper$FinalizationRegistryConsumer = $rt_classWithoutFields(0),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalArgumentException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalArgumentException__init_ = () => {
    let var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_0(var_0);
    return var_0;
},
jl_IllegalArgumentException__init_1 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalArgumentException__init_2 = var_0 => {
    let var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_1(var_1, var_0);
    return var_1;
};
function jur_PatternSyntaxException() {
    let a = this; jl_IllegalArgumentException.call(a);
    a.$desc = null;
    a.$pattern1 = null;
    a.$index2 = 0;
}
let jur_PatternSyntaxException__init_0 = ($this, $description, $pattern, $index) => {
    jl_IllegalArgumentException__init_0($this);
    $this.$index2 = (-1);
    $this.$desc = $description;
    $this.$pattern1 = $pattern;
    $this.$index2 = $index;
},
jur_PatternSyntaxException__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jur_PatternSyntaxException();
    jur_PatternSyntaxException__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PatternSyntaxException_getMessage = $this => {
    let $filler, $temp, var$3, var$4, var$5, var$6;
    $filler = $rt_s(10);
    if ($this.$index2 >= 1) {
        $temp = $rt_createCharArray($this.$index2);
        ju_Arrays_fill2($temp, 32);
        $filler = jl_String__init_($temp);
    }
    var$3 = $this.$desc;
    if ($this.$pattern1 !== null && jl_String_length($this.$pattern1)) {
        var$4 = $this.$index2;
        var$5 = $this.$pattern1;
        var$6 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append1(var$6, var$4), $rt_s(43)), var$5), $rt_s(43)), $filler);
        var$5 = jl_StringBuilder_toString(var$6);
    } else
        var$5 = $rt_s(10);
    var$6 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$6, var$3), var$5);
    return jl_StringBuilder_toString(var$6);
},
jur_AbstractCharClass$LazyJavaDefined = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDefined__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaDefined__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDefined();
    jur_AbstractCharClass$LazyJavaDefined__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDefined_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaDefined$1__init_0($this);
    $chCl.$lowHighSurrogates.$set(0, 2048);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function jur_Pattern() {
    let a = this; jl_Object.call(a);
    a.$lexemes = null;
    a.$flags = 0;
    a.$backRefs = null;
    a.$needsBackRefReplacement = 0;
    a.$globalGroupIndex = 0;
    a.$compCount0 = 0;
    a.$consCount0 = 0;
    a.$start1 = null;
    a.$namedGroups0 = null;
}
let jur_Pattern_matcher = ($this, $input) => {
    return jur_Matcher__init_0($this, $input);
},
jur_Pattern_split0 = ($this, $inputSeq, $limit) => {
    let $res, $mat, $index, $curPos, var$7, var$8;
    $res = ju_ArrayList__init_();
    $mat = jur_Pattern_matcher($this, $inputSeq);
    $index = 0;
    $curPos = 0;
    if (!$inputSeq.$length()) {
        var$7 = $rt_createArray(jl_String, 1);
        var$7.data[0] = $rt_s(10);
        return var$7;
    }
    while (jur_Matcher_find0($mat)) {
        var$8 = $index + 1 | 0;
        if (var$8 >= $limit && $limit > 0)
            break;
        $res.$add2(($inputSeq.$subSequence($curPos, jur_Matcher_start($mat))).$toString());
        $curPos = jur_Matcher_end0($mat);
        $index = var$8;
    }
    a: {
        $res.$add2(($inputSeq.$subSequence($curPos, $inputSeq.$length())).$toString());
        var$8 = $index + 1 | 0;
        if (!$limit)
            while (true) {
                var$8 = var$8 + (-1) | 0;
                if (var$8 < 0)
                    break;
                if (jl_String_length(jl_String_toString($res.$get(var$8))))
                    break a;
                $res.$remove(var$8);
            }
    }
    if (var$8 < 0)
        var$8 = 0;
    return $res.$toArray($rt_createArray(jl_String, var$8));
},
jur_Pattern_split = ($this, $input) => {
    return jur_Pattern_split0($this, $input, 0);
},
jur_Pattern_pattern = $this => {
    return $this.$lexemes.$toString();
},
jur_Pattern_compile0 = ($pattern, $flags) => {
    if ($pattern === null)
        $rt_throw(jl_NullPointerException__init_($rt_s(288)));
    if ($flags && ($flags | 255) != 255)
        $rt_throw(jl_IllegalArgumentException__init_2($rt_s(10)));
    jur_AbstractSet_$callClinit();
    jur_AbstractSet_counter = 1;
    return jur_Pattern_compileImpl(jur_Pattern__init_0(), $pattern, $flags);
},
jur_Pattern_compileImpl = ($this, $pattern, $flags) => {
    $this.$lexemes = jur_Lexer__init_0($pattern, $flags);
    $this.$flags = $flags;
    $this.$start1 = jur_Pattern_processExpression($this, (-1), $this.$flags, null);
    if ($this.$lexemes.$isEmpty()) {
        jur_Pattern_finalizeCompile($this);
        return $this;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
},
jur_Pattern_processAlternations = ($this, $last) => {
    let $auxRange, var$3, $rangeSet;
    $auxRange = jur_CharClass__init_4(jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
    while (!$this.$lexemes.$isEmpty()) {
        var$3 = $this.$lexemes;
        if (!var$3.$isLetter0())
            break;
        var$3 = $this.$lexemes;
        if (var$3.$lookAhead() && $this.$lexemes.$lookAhead() != (-536870788)) {
            var$3 = $this.$lexemes;
            if (var$3.$lookAhead() != (-536870871))
                break;
        }
        $auxRange.$add($this.$lexemes.$next1());
        if ($this.$lexemes.$peek() != (-536870788))
            continue;
        $this.$lexemes.$next1();
    }
    $rangeSet = jur_Pattern_processRangeSet($this, $auxRange);
    $rangeSet.$setNext($last);
    return $rangeSet;
},
jur_Pattern_processExpression = ($this, $ch, $newFlags, $last) => {
    let $children, $saveFlags, $saveChangedFlags, $fSet, var$8, $child;
    $children = ju_ArrayList__init_();
    $saveFlags = $this.$flags;
    $saveChangedFlags = 0;
    if ($newFlags != $this.$flags)
        $this.$flags = $newFlags;
    a: {
        switch ($ch) {
            case -1073741784:
                $fSet = new jur_NonCapFSet;
                var$8 = $this.$consCount0 + 1 | 0;
                $this.$consCount0 = var$8;
                jur_NonCapFSet__init_($fSet, var$8);
                break a;
            case -536870872:
            case -268435416:
                break;
            case -134217688:
            case -67108824:
                $fSet = new jur_BehindFSet;
                var$8 = $this.$consCount0 + 1 | 0;
                $this.$consCount0 = var$8;
                jur_BehindFSet__init_($fSet, var$8);
                break a;
            case -33554392:
                $fSet = new jur_AtomicFSet;
                var$8 = $this.$consCount0 + 1 | 0;
                $this.$consCount0 = var$8;
                jur_AtomicFSet__init_($fSet, var$8);
                break a;
            default:
                $this.$globalGroupIndex = $this.$globalGroupIndex + 1 | 0;
                if ($last === null) {
                    $fSet = jur_FinalSet__init_0();
                    $saveChangedFlags = 1;
                } else {
                    $fSet = jur_FSet__init_0($this.$globalGroupIndex);
                    if ($ch == (-2130706392)) {
                        if ($this.$namedGroups0 === null)
                            $this.$namedGroups0 = ju_LinkedHashMap__init_();
                        $this.$namedGroups0.$put($this.$lexemes.$groupName, jl_Integer_valueOf($this.$globalGroupIndex));
                    }
                }
                if ($this.$globalGroupIndex <= (-1))
                    break a;
                if ($this.$globalGroupIndex >= 10)
                    break a;
                $this.$backRefs.data[$this.$globalGroupIndex] = $fSet;
                break a;
        }
        $fSet = jur_AheadFSet__init_0();
    }
    while (true) {
        if ($this.$lexemes.$isLetter0() && $this.$lexemes.$lookAhead() == (-536870788))
            $child = jur_Pattern_processAlternations($this, $fSet);
        else if ($this.$lexemes.$peek() == (-536870788)) {
            $child = jur_EmptySet__init_($fSet);
            $this.$lexemes.$next1();
        } else {
            $child = jur_Pattern_processSubExpression($this, $fSet);
            if ($this.$lexemes.$peek() == (-536870788))
                $this.$lexemes.$next1();
        }
        if ($child !== null)
            $children.$add2($child);
        if ($this.$lexemes.$isEmpty())
            break;
        if ($this.$lexemes.$peek() == (-536870871))
            break;
    }
    if ($this.$lexemes.$back() == (-536870788))
        $children.$add2(jur_EmptySet__init_($fSet));
    if ($this.$flags != $saveFlags && !$saveChangedFlags) {
        $this.$flags = $saveFlags;
        $this.$lexemes.$restoreFlags($this.$flags);
    }
    switch ($ch) {
        case -1073741784:
            break;
        case -536870872:
            return jur_PositiveLookAhead__init_0($children, $fSet);
        case -268435416:
            return jur_NegativeLookAhead__init_0($children, $fSet);
        case -134217688:
            return jur_PositiveLookBehind__init_0($children, $fSet);
        case -67108824:
            return jur_NegativeLookBehind__init_0($children, $fSet);
        case -33554392:
            return jur_AtomicJointSet__init_0($children, $fSet);
        default:
            switch ($children.$size()) {
                case 0:
                    break;
                case 1:
                    return jur_SingleSet__init_0($children.$get(0), $fSet);
                default:
                    return jur_JointSet__init_1($children, $fSet);
            }
            return jur_EmptySet__init_($fSet);
    }
    return jur_NonCapJointSet__init_0($children, $fSet);
},
jur_Pattern_processSequence = $this => {
    let $substring, var$2, $ch;
    $substring = jl_StringBuffer__init_0();
    while (!$this.$lexemes.$isEmpty()) {
        var$2 = $this.$lexemes;
        if (!var$2.$isLetter0())
            break;
        var$2 = $this.$lexemes;
        if (var$2.$isHighSurrogate0())
            break;
        var$2 = $this.$lexemes;
        if (var$2.$isLowSurrogate0())
            break;
        var$2 = $this.$lexemes;
        if (!(!var$2.$isNextSpecial() && !$this.$lexemes.$lookAhead())) {
            var$2 = $this.$lexemes;
            if (!(!var$2.$isNextSpecial() && jur_Lexer_isLetter($this.$lexemes.$lookAhead()))) {
                var$2 = $this.$lexemes;
                if (var$2.$lookAhead() != (-536870871)) {
                    var$2 = $this.$lexemes;
                    if ((var$2.$lookAhead() & (-2147418113)) != (-2147483608)) {
                        var$2 = $this.$lexemes;
                        if (var$2.$lookAhead() != (-536870788)) {
                            var$2 = $this.$lexemes;
                            if (var$2.$lookAhead() != (-536870876))
                                break;
                        }
                    }
                }
            }
        }
        $ch = $this.$lexemes.$next1();
        if (!jl_Character_isSupplementaryCodePoint($ch))
            $substring.$append11($ch & 65535);
        else
            $substring.$append12(jl_Character_toChars($ch));
    }
    if (!jur_Pattern_hasFlag($this, 2))
        return jur_SequenceSet__init_0($substring);
    if (jur_Pattern_hasFlag($this, 64))
        return jur_UCISequenceSet__init_0($substring);
    return jur_CISequenceSet__init_0($substring);
},
jur_Pattern_processDecomposedChar = $this => {
    let $codePoints, $readCodePoints, $curSymb, $curSymbIndex, var$5, $codePointsHangul, var$7, var$8, var$9, var$10;
    $codePoints = $rt_createIntArray(4);
    $readCodePoints = 0;
    $curSymb = (-1);
    $curSymbIndex = (-1);
    if (!$this.$lexemes.$isEmpty() && $this.$lexemes.$isLetter0()) {
        var$5 = $codePoints.data;
        $curSymb = $this.$lexemes.$next1();
        var$5[$readCodePoints] = $curSymb;
        $curSymbIndex = $curSymb - 4352 | 0;
    }
    if ($curSymbIndex >= 0 && $curSymbIndex < 19) {
        $codePointsHangul = $rt_createCharArray(3);
        var$5 = $codePointsHangul.data;
        var$5[$readCodePoints] = $curSymb & 65535;
        var$7 = $this.$lexemes.$peek();
        var$8 = var$7 - 4449 | 0;
        if (var$8 >= 0 && var$8 < 21) {
            var$5[1] = var$7 & 65535;
            $this.$lexemes.$next1();
            var$9 = $this.$lexemes.$peek();
            var$7 = var$9 - 4519 | 0;
            if (var$7 >= 0 && var$7 < 28) {
                var$5[2] = var$9 & 65535;
                $this.$lexemes.$next1();
                return jur_HangulDecomposedCharSet__init_0($codePointsHangul, 3);
            }
            return jur_HangulDecomposedCharSet__init_0($codePointsHangul, 2);
        }
        if (!jur_Pattern_hasFlag($this, 2))
            return jur_CharSet__init_(var$5[0]);
        if (jur_Pattern_hasFlag($this, 64))
            return jur_UCICharSet__init_0(var$5[0]);
        return jur_CICharSet__init_(var$5[0]);
    }
    var$10 = 1;
    while (var$10 < 4 && !$this.$lexemes.$isEmpty() && $this.$lexemes.$isLetter0()) {
        var$5 = $codePoints.data;
        var$9 = var$10 + 1 | 0;
        var$5[var$10] = $this.$lexemes.$next1();
        var$10 = var$9;
    }
    if (var$10 == 1) {
        var$5 = $codePoints.data;
        if (!jur_Lexer_hasSingleCodepointDecomposition(var$5[0]))
            return jur_Pattern_processCharSet($this, var$5[0]);
    }
    if (!jur_Pattern_hasFlag($this, 2))
        return jur_DecomposedCharSet__init_0($codePoints, var$10);
    if (jur_Pattern_hasFlag($this, 64))
        return jur_UCIDecomposedCharSet__init_0($codePoints, var$10);
    return jur_CIDecomposedCharSet__init_0($codePoints, var$10);
},
jur_Pattern_processSubExpression = ($this, $last) => {
    let $cur, $term, var$4, $next;
    if ($this.$lexemes.$isLetter0() && !$this.$lexemes.$isNextSpecial() && jur_Lexer_isLetter($this.$lexemes.$lookAhead())) {
        if (!jur_Pattern_hasFlag($this, 128)) {
            if (!$this.$lexemes.$isHighSurrogate0() && !$this.$lexemes.$isLowSurrogate0())
                $cur = jur_Pattern_processSequence($this);
            else {
                $term = jur_Pattern_processTerminal($this, $last);
                $cur = jur_Pattern_processQuantifier($this, $last, $term);
            }
        } else {
            $cur = jur_Pattern_processDecomposedChar($this);
            if (!$this.$lexemes.$isEmpty()) {
                var$4 = $this.$lexemes;
                if (!(var$4.$peek() == (-536870871) && !($last instanceof jur_FinalSet))) {
                    var$4 = $this.$lexemes;
                    if (var$4.$peek() != (-536870788) && !$this.$lexemes.$isLetter0())
                        $cur = jur_Pattern_processQuantifier($this, $last, $cur);
                }
            }
        }
    } else if ($this.$lexemes.$peek() != (-536870871)) {
        $term = jur_Pattern_processTerminal($this, $last);
        $cur = jur_Pattern_processQuantifier($this, $last, $term);
    } else {
        if ($last instanceof jur_FinalSet)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
        $cur = jur_EmptySet__init_($last);
    }
    a: {
        if (!$this.$lexemes.$isEmpty()) {
            var$4 = $this.$lexemes;
            if (!(var$4.$peek() == (-536870871) && !($last instanceof jur_FinalSet))) {
                var$4 = $this.$lexemes;
                if (var$4.$peek() != (-536870788)) {
                    $next = jur_Pattern_processSubExpression($this, $last);
                    if ($cur instanceof jur_LeafQuantifierSet && !($cur instanceof jur_CompositeQuantifierSet) && !($cur instanceof jur_GroupQuantifierSet) && !($cur instanceof jur_AltQuantifierSet)) {
                        var$4 = $cur;
                        if (!$next.$first(var$4.$getInnerSet()))
                            $cur = jur_UnifiedQuantifierSet__init_0(var$4);
                    }
                    if (($next.$getType() & 65535) != 43)
                        $cur.$setNext($next);
                    else
                        $cur.$setNext($next.$getInnerSet());
                    break a;
                }
            }
        }
        if ($cur === null)
            return null;
        $cur.$setNext($last);
    }
    if (($cur.$getType() & 65535) != 43)
        return $cur;
    return $cur.$getInnerSet();
},
jur_Pattern_processQuantifier = ($this, $last, $term) => {
    let $quant, var$4, var$5, var$6, $q, var$8, $leaf;
    $quant = $this.$lexemes.$peek();
    if ($term !== null && !($term instanceof jur_LeafSet)) {
        switch ($quant) {
            case -2147483606:
                $this.$lexemes.$next1();
                return jur_PossessiveGroupQuantifierSet__init_0($term, $last, $quant);
            case -2147483605:
                $this.$lexemes.$next1();
                return jur_PosPlusGroupQuantifierSet__init_0($term, $last, (-2147483606));
            case -2147483585:
                $this.$lexemes.$next1();
                return jur_PosAltGroupQuantifierSet__init_0($term, $last, (-536870849));
            case -2147483525:
                var$4 = new jur_PosCompositeGroupQuantifierSet;
                var$5 = $this.$lexemes.$nextSpecial();
                var$6 = $this.$compCount0 + 1 | 0;
                $this.$compCount0 = var$6;
                jur_PosCompositeGroupQuantifierSet__init_(var$4, var$5, $term, $last, (-536870849), var$6);
                return var$4;
            case -1073741782:
            case -1073741781:
                $this.$lexemes.$next1();
                $q = jur_ReluctantGroupQuantifierSet__init_0($term, $last, $quant);
                $term.$setNext($q);
                return $q;
            case -1073741761:
                $this.$lexemes.$next1();
                $q = jur_RelAltGroupQuantifierSet__init_0($term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -1073741701:
                $q = new jur_RelCompositeGroupQuantifierSet;
                var$4 = $this.$lexemes;
                var$4 = var$4.$nextSpecial();
                var$8 = $this.$compCount0 + 1 | 0;
                $this.$compCount0 = var$8;
                jur_RelCompositeGroupQuantifierSet__init_($q, var$4, $term, $last, (-536870849), var$8);
                $term.$setNext($q);
                return $q;
            case -536870870:
            case -536870869:
                $this.$lexemes.$next1();
                $q = $term.$getType() != (-2147483602) ? jur_GroupQuantifierSet__init_0($term, $last, $quant) : jur_Pattern_hasFlag($this, 32) ? jur_DotAllQuantifierSet__init_0($term, $last, $quant) : jur_DotQuantifierSet__init_0($term, $last, $quant, jur_AbstractLineTerminator_getInstance($this.$flags));
                $term.$setNext($q);
                return $q;
            case -536870849:
                $this.$lexemes.$next1();
                $q = jur_AltGroupQuantifierSet__init_0($term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -536870789:
                $q = new jur_CompositeGroupQuantifierSet;
                var$4 = $this.$lexemes;
                var$4 = var$4.$nextSpecial();
                var$6 = $this.$compCount0 + 1 | 0;
                $this.$compCount0 = var$6;
                jur_CompositeGroupQuantifierSet__init_($q, var$4, $term, $last, (-536870849), var$6);
                $term.$setNext($q);
                return $q;
            default:
        }
        return $term;
    }
    $leaf = null;
    if ($term !== null)
        $leaf = $term;
    switch ($quant) {
        case -2147483606:
        case -2147483605:
            $this.$lexemes.$next1();
            $q = jur_PossessiveQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$setNext($q);
            return $q;
        case -2147483585:
            $this.$lexemes.$next1();
            return jur_PossessiveAltQuantifierSet__init_0($leaf, $last, (-2147483585));
        case -2147483525:
            return jur_PossessiveCompositeQuantifierSet__init_0($this.$lexemes.$nextSpecial(), $leaf, $last, (-2147483525));
        case -1073741782:
        case -1073741781:
            $this.$lexemes.$next1();
            $q = jur_ReluctantQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$setNext($q);
            return $q;
        case -1073741761:
            $this.$lexemes.$next1();
            return jur_ReluctantAltQuantifierSet__init_0($leaf, $last, (-1073741761));
        case -1073741701:
            return jur_ReluctantCompositeQuantifierSet__init_0($this.$lexemes.$nextSpecial(), $leaf, $last, (-1073741701));
        case -536870870:
        case -536870869:
            $this.$lexemes.$next1();
            $q = jur_LeafQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$setNext($q);
            return $q;
        case -536870849:
            $this.$lexemes.$next1();
            return jur_AltQuantifierSet__init_0($leaf, $last, (-536870849));
        case -536870789:
            return jur_CompositeQuantifierSet__init_0($this.$lexemes.$nextSpecial(), $leaf, $last, (-536870789));
        default:
    }
    return $term;
},
jur_Pattern_processTerminal = ($this, $last) => {
    let $term, $ch, $newFlags, var$5, $negative, $cc, $number, var$9, var$10, var$11;
    $term = null;
    while (true) {
        a: {
            $ch = $this.$lexemes.$peek();
            if (($ch & (-2147418113)) == (-2147483608)) {
                $this.$lexemes.$next1();
                $newFlags = ($ch & 16711680) >> 16;
                $ch = $ch & (-16711681);
                if ($ch == (-16777176))
                    $this.$flags = $newFlags;
                else {
                    if ($ch != (-1073741784))
                        $newFlags = $this.$flags;
                    $term = jur_Pattern_processExpression($this, $ch, $newFlags, $last);
                    if ($this.$lexemes.$peek() != (-536870871))
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
                    $this.$lexemes.$next1();
                }
            } else {
                b: {
                    c: {
                        switch ($ch) {
                            case -2147483599:
                            case -2147483598:
                            case -2147483597:
                            case -2147483596:
                            case -2147483595:
                            case -2147483594:
                            case -2147483593:
                            case -2147483592:
                            case -2147483591:
                                break c;
                            case -2147483583:
                                break;
                            case -2147483582:
                                $this.$lexemes.$next1();
                                $term = jur_WordBoundary__init_(0);
                                break a;
                            case -2147483577:
                                $this.$lexemes.$next1();
                                $term = jur_PreviousMatch__init_0();
                                break a;
                            case -2147483558:
                                $this.$lexemes.$next1();
                                $term = new jur_EOLSet;
                                var$5 = $this.$consCount0 + 1 | 0;
                                $this.$consCount0 = var$5;
                                jur_EOLSet__init_($term, var$5);
                                break a;
                            case -2147483550:
                                $this.$lexemes.$next1();
                                $term = jur_WordBoundary__init_(1);
                                break a;
                            case -2147483526:
                                $this.$lexemes.$next1();
                                $term = jur_EOISet__init_0();
                                break a;
                            case -536870876:
                                $this.$lexemes.$next1();
                                $this.$consCount0 = $this.$consCount0 + 1 | 0;
                                if (jur_Pattern_hasFlag($this, 8)) {
                                    if (jur_Pattern_hasFlag($this, 1)) {
                                        $term = jur_UMultiLineEOLSet__init_0($this.$consCount0);
                                        break a;
                                    }
                                    $term = jur_MultiLineEOLSet__init_0($this.$consCount0);
                                    break a;
                                }
                                if (jur_Pattern_hasFlag($this, 1)) {
                                    $term = jur_UEOLSet__init_0($this.$consCount0);
                                    break a;
                                }
                                $term = jur_EOLSet__init_0($this.$consCount0);
                                break a;
                            case -536870866:
                                $this.$lexemes.$next1();
                                if (jur_Pattern_hasFlag($this, 32)) {
                                    $term = jur_DotAllSet__init_0();
                                    break a;
                                }
                                $term = jur_DotSet__init_0(jur_AbstractLineTerminator_getInstance($this.$flags));
                                break a;
                            case -536870821:
                                $this.$lexemes.$next1();
                                $negative = 0;
                                if ($this.$lexemes.$peek() == (-536870818)) {
                                    $negative = 1;
                                    $this.$lexemes.$next1();
                                }
                                $term = jur_Pattern_processRange($this, $negative, $last);
                                if ($this.$lexemes.$peek() != (-536870819))
                                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
                                $this.$lexemes.$setMode(1);
                                $this.$lexemes.$next1();
                                break a;
                            case -536870818:
                                $this.$lexemes.$next1();
                                $this.$consCount0 = $this.$consCount0 + 1 | 0;
                                if (!jur_Pattern_hasFlag($this, 8)) {
                                    $term = jur_SOLSet__init_0();
                                    break a;
                                }
                                $term = jur_MultiLineSOLSet__init_0(jur_AbstractLineTerminator_getInstance($this.$flags));
                                break a;
                            case 0:
                                $cc = $this.$lexemes.$peekSpecial();
                                if ($cc !== null)
                                    $term = jur_Pattern_processRangeSet($this, $cc);
                                else {
                                    if ($this.$lexemes.$isEmpty()) {
                                        $term = jur_EmptySet__init_($last);
                                        break a;
                                    }
                                    $term = jur_CharSet__init_($ch & 65535);
                                }
                                $this.$lexemes.$next1();
                                break a;
                            default:
                                break b;
                        }
                        $this.$lexemes.$next1();
                        $term = jur_SOLSet__init_0();
                        break a;
                    }
                    $number = ($ch & 2147483647) - 48 | 0;
                    if ($this.$globalGroupIndex < $number)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
                    $this.$lexemes.$next1();
                    $this.$consCount0 = $this.$consCount0 + 1 | 0;
                    $term = !jur_Pattern_hasFlag($this, 2) ? jur_BackReferenceSet__init_0($number, $this.$consCount0) : jur_Pattern_hasFlag($this, 64) ? jur_UCIBackReferenceSet__init_0($number, $this.$consCount0) : jur_CIBackReferenceSet__init_0($number, $this.$consCount0);
                    $this.$backRefs.data[$number].$isBackReferenced = 1;
                    $this.$needsBackRefReplacement = 1;
                    break a;
                }
                if ($ch >= 0 && !$this.$lexemes.$isSpecial()) {
                    $term = jur_Pattern_processCharSet($this, $ch);
                    $this.$lexemes.$next1();
                } else if ($ch == (-536870788))
                    $term = jur_EmptySet__init_($last);
                else {
                    if ($ch != (-536870871)) {
                        var$9 = new jur_PatternSyntaxException;
                        var$10 = !$this.$lexemes.$isSpecial() ? jl_Character_toString($ch & 65535) : ($this.$lexemes.$peekSpecial()).$toString();
                        var$11 = $this.$lexemes;
                        jur_PatternSyntaxException__init_0(var$9, var$10, var$11.$toString(), $this.$lexemes.$getIndex());
                        $rt_throw(var$9);
                    }
                    if ($last instanceof jur_FinalSet)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$lexemes.$toString(), $this.$lexemes.$getIndex()));
                    $term = jur_EmptySet__init_($last);
                }
            }
        }
        if ($ch != (-16777176))
            break;
    }
    return $term;
},
jur_Pattern_processRange = ($this, $negative, $last) => {
    let $res, $rangeSet;
    $res = jur_Pattern_processRangeExpression($this, $negative);
    $rangeSet = jur_Pattern_processRangeSet($this, $res);
    $rangeSet.$setNext($last);
    return $rangeSet;
},
jur_Pattern_processRangeExpression = ($this, $alt) => {
    let $res, $buffer, $intersection, $notClosed, $firstInClass, var$7, $cur, $negative, $cs, $$je;
    $res = jur_CharClass__init_3($alt, jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
    $buffer = (-1);
    $intersection = 0;
    $notClosed = 0;
    $firstInClass = 1;
    a: {
        b: {
            c: while (true) {
                if ($this.$lexemes.$isEmpty())
                    break a;
                $notClosed = $this.$lexemes.$peek() == (-536870819) && !$firstInClass ? 0 : 1;
                if (!$notClosed)
                    break a;
                d: {
                    switch ($this.$lexemes.$peek()) {
                        case -536870874:
                            if ($buffer >= 0)
                                $res.$add($buffer);
                            $buffer = $this.$lexemes.$next1();
                            if ($this.$lexemes.$peek() != (-536870874)) {
                                $buffer = 38;
                                break d;
                            }
                            if ($this.$lexemes.$lookAhead() == (-536870821)) {
                                $this.$lexemes.$next1();
                                $intersection = 1;
                                $buffer = (-1);
                                break d;
                            }
                            $this.$lexemes.$next1();
                            if ($firstInClass) {
                                $res = jur_Pattern_processRangeExpression($this, 0);
                                break d;
                            }
                            if ($this.$lexemes.$peek() == (-536870819))
                                break d;
                            $res.$intersection(jur_Pattern_processRangeExpression($this, 0));
                            break d;
                        case -536870867:
                            if (!$firstInClass && $this.$lexemes.$lookAhead() != (-536870819)) {
                                var$7 = $this.$lexemes;
                                if (var$7.$lookAhead() != (-536870821) && $buffer >= 0) {
                                    $this.$lexemes.$next1();
                                    $cur = $this.$lexemes.$peek();
                                    if ($this.$lexemes.$isSpecial())
                                        break c;
                                    if ($cur < 0) {
                                        var$7 = $this.$lexemes;
                                        if (var$7.$lookAhead() != (-536870819)) {
                                            var$7 = $this.$lexemes;
                                            if (var$7.$lookAhead() != (-536870821) && $buffer >= 0)
                                                break c;
                                        }
                                    }
                                    e: {
                                        try {
                                            if (jur_Lexer_isLetter($cur))
                                                break e;
                                            $cur = $cur & 65535;
                                            break e;
                                        } catch ($$e) {
                                            $$je = $rt_wrapException($$e);
                                            if ($$je instanceof jl_Exception) {
                                                break b;
                                            } else {
                                                throw $$e;
                                            }
                                        }
                                    }
                                    try {
                                        $res.$add0($buffer, $cur);
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Exception) {
                                            break b;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                    $this.$lexemes.$next1();
                                    $buffer = (-1);
                                    break d;
                                }
                            }
                            if ($buffer >= 0)
                                $res.$add($buffer);
                            $buffer = 45;
                            $this.$lexemes.$next1();
                            break d;
                        case -536870821:
                            if ($buffer >= 0) {
                                $res.$add($buffer);
                                $buffer = (-1);
                            }
                            $this.$lexemes.$next1();
                            $negative = 0;
                            if ($this.$lexemes.$peek() == (-536870818)) {
                                $this.$lexemes.$next1();
                                $negative = 1;
                            }
                            if (!$intersection)
                                $res.$union(jur_Pattern_processRangeExpression($this, $negative));
                            else
                                $res.$intersection(jur_Pattern_processRangeExpression($this, $negative));
                            $intersection = 0;
                            $this.$lexemes.$next1();
                            break d;
                        case -536870819:
                            if ($buffer >= 0)
                                $res.$add($buffer);
                            $buffer = 93;
                            $this.$lexemes.$next1();
                            break d;
                        case -536870818:
                            if ($buffer >= 0)
                                $res.$add($buffer);
                            $buffer = 94;
                            $this.$lexemes.$next1();
                            break d;
                        case 0:
                            if ($buffer >= 0)
                                $res.$add($buffer);
                            $cs = $this.$lexemes.$peekSpecial();
                            if ($cs === null)
                                $buffer = 0;
                            else {
                                $res.$add3($cs);
                                $buffer = (-1);
                            }
                            $this.$lexemes.$next1();
                            break d;
                        default:
                    }
                    if ($buffer >= 0)
                        $res.$add($buffer);
                    $buffer = $this.$lexemes.$next1();
                }
                $firstInClass = 0;
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), jur_Pattern_pattern($this), $this.$lexemes.$getIndex()));
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), jur_Pattern_pattern($this), $this.$lexemes.$getIndex()));
    }
    if (!$notClosed) {
        if ($buffer >= 0)
            $res.$add($buffer);
        return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), jur_Pattern_pattern($this), $this.$lexemes.$getIndex() - 1 | 0));
},
jur_Pattern_processCharSet = ($this, $ch) => {
    let $isSupplCodePoint;
    $isSupplCodePoint = jl_Character_isSupplementaryCodePoint($ch);
    if (jur_Pattern_hasFlag($this, 2)) {
        a: {
            if (!($ch >= 97 && $ch <= 122)) {
                if ($ch < 65)
                    break a;
                if ($ch > 90)
                    break a;
            }
            return jur_CICharSet__init_($ch & 65535);
        }
        if (jur_Pattern_hasFlag($this, 64) && $ch > 128) {
            if ($isSupplCodePoint)
                return jur_UCISupplCharSet__init_0($ch);
            if (jur_Lexer_isLowSurrogate($ch))
                return jur_LowSurrogateCharSet__init_($ch & 65535);
            if (!jur_Lexer_isHighSurrogate($ch))
                return jur_UCICharSet__init_0($ch & 65535);
            return jur_HighSurrogateCharSet__init_0($ch & 65535);
        }
    }
    if ($isSupplCodePoint)
        return jur_SupplCharSet__init_0($ch);
    if (jur_Lexer_isLowSurrogate($ch))
        return jur_LowSurrogateCharSet__init_($ch & 65535);
    if (!jur_Lexer_isHighSurrogate($ch))
        return jur_CharSet__init_($ch & 65535);
    return jur_HighSurrogateCharSet__init_0($ch & 65535);
},
jur_Pattern_processRangeSet = ($this, $charClass) => {
    let $surrogates, $lowHighSurrRangeSet;
    if (!$charClass.$hasLowHighSurrogates()) {
        if (!$charClass.$mayContainSupplCodepoints()) {
            if ($charClass.$hasUCI())
                return jur_UCIRangeSet__init_0($charClass);
            return jur_RangeSet__init_0($charClass);
        }
        if ($charClass.$hasUCI())
            return jur_UCISupplRangeSet__init_($charClass);
        return jur_SupplRangeSet__init_0($charClass);
    }
    $surrogates = $charClass.$getSurrogates();
    $lowHighSurrRangeSet = jur_LowHighSurrogateRangeSet__init_0($surrogates);
    if (!$charClass.$mayContainSupplCodepoints()) {
        if ($charClass.$hasUCI())
            return jur_CompositeRangeSet__init_(jur_UCIRangeSet__init_0($charClass.$getWithoutSurrogates()), $lowHighSurrRangeSet);
        return jur_CompositeRangeSet__init_(jur_RangeSet__init_0($charClass.$getWithoutSurrogates()), $lowHighSurrRangeSet);
    }
    if ($charClass.$hasUCI())
        return jur_CompositeRangeSet__init_(jur_UCISupplRangeSet__init_($charClass.$getWithoutSurrogates()), $lowHighSurrRangeSet);
    return jur_CompositeRangeSet__init_(jur_SupplRangeSet__init_0($charClass.$getWithoutSurrogates()), $lowHighSurrRangeSet);
},
jur_Pattern_compile = $pattern => {
    return jur_Pattern_compile0($pattern, 0);
},
jur_Pattern_finalizeCompile = $this => {
    if ($this.$needsBackRefReplacement)
        $this.$start1.$processSecondPass();
    if ($this.$namedGroups0 === null)
        $this.$namedGroups0 = ju_Collections_emptyMap();
    else
        $this.$namedGroups0 = ju_Collections_unmodifiableMap($this.$namedGroups0);
},
jur_Pattern_quote = $s => {
    let $sb, $apos, var$4, $apos_0;
    $sb = (jl_StringBuilder__init_()).$append3($rt_s(289));
    $apos = 0;
    while (true) {
        var$4 = jl_String_indexOf0($s, $rt_s(290), $apos);
        if (var$4 < 0)
            break;
        $apos_0 = var$4 + 2 | 0;
        ($sb.$append3(jl_String_substring($s, $apos, $apos_0))).$append3($rt_s(291));
        $apos = $apos_0;
    }
    return (($sb.$append3(jl_String_substring0($s, $apos))).$append3($rt_s(290))).$toString();
},
jur_Pattern_namedGroups = $this => {
    return $this.$namedGroups0;
},
jur_Pattern_groupCount = $this => {
    return $this.$globalGroupIndex;
},
jur_Pattern_compCount = $this => {
    return $this.$compCount0 + 1 | 0;
},
jur_Pattern_consCount = $this => {
    return $this.$consCount0 + 1 | 0;
},
jur_Pattern_getSupplement = $ch => {
    if ($ch >= 97 && $ch <= 122)
        $ch = ($ch - 32 | 0) & 65535;
    else if ($ch >= 65 && $ch <= 90)
        $ch = ($ch + 32 | 0) & 65535;
    return $ch;
},
jur_Pattern_hasFlag = ($this, $flag) => {
    return ($this.$flags & $flag) != $flag ? 0 : 1;
},
jur_Pattern__init_ = $this => {
    jl_Object__init_($this);
    $this.$backRefs = $rt_createArray(jur_FSet, 10);
    $this.$globalGroupIndex = (-1);
    $this.$compCount0 = (-1);
    $this.$consCount0 = (-1);
},
jur_Pattern__init_0 = () => {
    let var_0 = new jur_Pattern();
    jur_Pattern__init_(var_0);
    return var_0;
},
jur_PosAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_PosAltGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AltGroupQuantifierSet__init_($this, $innerSet, $next, $type);
    jur_FSet_$callClinit();
    $innerSet.$setNext(jur_FSet_posFSet);
},
jur_PosAltGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PosAltGroupQuantifierSet();
    jur_PosAltGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PosAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex <= 0)
        $nextIndex = $stringIndex;
    return $this.$next2.$matches($nextIndex, $testString, $matchResult);
},
jur_PosAltGroupQuantifierSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$ordinal = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    jl_Object__init_($this);
    $this.$name0 = $name;
    $this.$ordinal = $ordinal;
},
igiae_PluginStatus = $rt_classWithoutFields(jl_Enum),
igiae_PluginStatus_ACTIVATING = null,
igiae_PluginStatus_ACTIVE = null,
igiae_PluginStatus_BROKEN = null,
igiae_PluginStatus_STOPPED = null,
igiae_PluginStatus_$VALUES = null,
igiae_PluginStatus_$callClinit = () => {
    igiae_PluginStatus_$callClinit = $rt_eraseClinit(igiae_PluginStatus);
    igiae_PluginStatus__clinit_();
},
igiae_PluginStatus__init_0 = ($this, var$1, var$2) => {
    igiae_PluginStatus_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
igiae_PluginStatus__init_ = (var_0, var_1) => {
    let var_2 = new igiae_PluginStatus();
    igiae_PluginStatus__init_0(var_2, var_0, var_1);
    return var_2;
},
igiae_PluginStatus_$values = () => {
    let var$1, var$2;
    igiae_PluginStatus_$callClinit();
    var$1 = $rt_createArray(igiae_PluginStatus, 4);
    var$2 = var$1.data;
    var$2[0] = igiae_PluginStatus_ACTIVATING;
    var$2[1] = igiae_PluginStatus_ACTIVE;
    var$2[2] = igiae_PluginStatus_BROKEN;
    var$2[3] = igiae_PluginStatus_STOPPED;
    return var$1;
},
igiae_PluginStatus__clinit_ = () => {
    igiae_PluginStatus_ACTIVATING = igiae_PluginStatus__init_($rt_s(292), 0);
    igiae_PluginStatus_ACTIVE = igiae_PluginStatus__init_($rt_s(293), 1);
    igiae_PluginStatus_BROKEN = igiae_PluginStatus__init_($rt_s(294), 2);
    igiae_PluginStatus_STOPPED = igiae_PluginStatus__init_($rt_s(295), 3);
    igiae_PluginStatus_$VALUES = igiae_PluginStatus_$values();
};
function ju_Collections$13() {
    ju_AbstractMap.call(this);
    this.$val$m = null;
}
let ju_Collections$13__init_ = ($this, var$1) => {
    $this.$val$m = var$1;
    ju_AbstractMap__init_($this);
},
ju_Collections$13__init_0 = var_0 => {
    let var_1 = new ju_Collections$13();
    ju_Collections$13__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$ContextForFn = $rt_classWithoutFields(0),
jur_AbstractCharClass$LazyJavaLetterOrDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetterOrDigit();
    jur_AbstractCharClass$LazyJavaLetterOrDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function otciu_UnicodeHelper$Range() {
    let a = this; jl_Object.call(a);
    a.$start2 = 0;
    a.$end1 = 0;
    a.$data1 = null;
}
let otciu_UnicodeHelper$Range__init_ = ($this, $start, $end, $data) => {
    jl_Object__init_($this);
    $this.$start2 = $start;
    $this.$end1 = $end;
    $this.$data1 = $data;
},
otciu_UnicodeHelper$Range__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new otciu_UnicodeHelper$Range();
    otciu_UnicodeHelper$Range__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractLineTerminator$2 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$2__init_ = $this => {
    jur_AbstractLineTerminator__init_($this);
},
jur_AbstractLineTerminator$2__init_0 = () => {
    let var_0 = new jur_AbstractLineTerminator$2();
    jur_AbstractLineTerminator$2__init_(var_0);
    return var_0;
},
jur_AbstractLineTerminator$2_isLineTerminator = ($this, $ch) => {
    return $ch != 10 && $ch != 13 && $ch != 133 && ($ch | 1) != 8233 ? 0 : 1;
},
jur_AbstractLineTerminator$2_isAfterLineTerminator = ($this, $ch, $ch2) => {
    let var$3;
    a: {
        b: {
            if ($ch != 10 && $ch != 133 && ($ch | 1) != 8233) {
                if ($ch != 13)
                    break b;
                if ($ch2 == 10)
                    break b;
            }
            var$3 = 1;
            break a;
        }
        var$3 = 0;
    }
    return var$3;
};
function otciu_CharMapping() {
    let a = this; jl_Object.call(a);
    a.$binarySearchTable0 = null;
    a.$fastTable = null;
}
let otciu_CharMapping__init_ = ($this, $binarySearchTable, $fastTable) => {
    jl_Object__init_($this);
    $this.$binarySearchTable0 = $binarySearchTable;
    $this.$fastTable = $fastTable;
},
otciu_CharMapping__init_0 = (var_0, var_1) => {
    let var_2 = new otciu_CharMapping();
    otciu_CharMapping__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractLineTerminator$1 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$1__init_ = $this => {
    jur_AbstractLineTerminator__init_($this);
},
jur_AbstractLineTerminator$1__init_0 = () => {
    let var_0 = new jur_AbstractLineTerminator$1();
    jur_AbstractLineTerminator$1__init_(var_0);
    return var_0;
},
jur_AbstractLineTerminator$1_isLineTerminator = ($this, $ch) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractLineTerminator$1_isAfterLineTerminator = ($this, $ch, $ch2) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function igiae_ServiceHub$1() {
    let a = this; jl_Object.call(a);
    a.$val$pluginId0 = null;
    a.$this$0 = null;
}
let igiae_ServiceHub$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$0 = $this$0;
    $this.$val$pluginId0 = var$2;
    jl_Object__init_($this);
},
igiae_ServiceHub$1__init_0 = (var_0, var_1) => {
    let var_2 = new igiae_ServiceHub$1();
    igiae_ServiceHub$1__init_(var_2, var_0, var_1);
    return var_2;
},
igiae_ServiceHub$1_get = ($this, $id) => {
    let $entry;
    igiae_ServiceHub_access$000($this.$this$0, $this.$val$pluginId0, $id);
    $entry = (igiae_ServiceHub_access$100($this.$this$0)).$get1($id);
    return $entry !== null ? igiae_ServiceHub$Entry_access$200($entry) : null;
},
igiae_ServiceHub$1_want0 = ($this, $id) => {
    return igiae_ServiceHub_access$300($this.$this$0, $this.$val$pluginId0, $id, null);
},
igiae_ServiceHub$1_want = ($this, $id, $timeoutMillis) => {
    return igiae_ServiceHub_access$300($this.$this$0, $this.$val$pluginId0, $id, jl_Long_valueOf($timeoutMillis));
},
igiae_ServiceHub$1_watch = ($this, $id, $listener) => {
    return igiae_ServiceHub_access$400($this.$this$0, $this.$val$pluginId0, $id, $listener);
},
igiae_ServiceHub$1_register = ($this, $id, $service) => {
    return igiae_ServiceHub_access$500($this.$this$0, $this.$val$pluginId0, $id, $service);
},
igiae_ServiceHub$1_ids = $this => {
    return igiae_ServiceHub_ids($this.$this$0);
},
otjc_JSWeakRef = $rt_classWithoutFields();
function igiae_ServiceHub$2() {
    let a = this; jl_Object.call(a);
    a.$val$pluginId4 = null;
    a.$val$id0 = null;
    a.$this$08 = null;
}
let igiae_ServiceHub$2__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$08 = $this$0;
    $this.$val$pluginId4 = var$2;
    $this.$val$id0 = var$3;
    jl_Object__init_($this);
},
igiae_ServiceHub$2__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new igiae_ServiceHub$2();
    igiae_ServiceHub$2__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
igiae_ServiceHub$2_cancel = $this => {
    igiae_ServiceHub_access$1000($this.$this$08, $this.$val$pluginId4, $this.$val$id0);
};
function otci_CharFlow() {
    let a = this; jl_Object.call(a);
    a.$characters = null;
    a.$pointer = 0;
}
let otci_CharFlow__init_ = ($this, $characters) => {
    jl_Object__init_($this);
    $this.$characters = $characters;
},
otci_CharFlow__init_0 = var_0 => {
    let var_1 = new otci_CharFlow();
    otci_CharFlow__init_(var_1, var_0);
    return var_1;
};
function jur_RangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars0 = null;
    a.$alt2 = 0;
}
let jur_RangeSet__init_ = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars0 = $cc.$getInstance();
    $this.$alt2 = $cc.$alt;
},
jur_RangeSet__init_0 = var_0 => {
    let var_1 = new jur_RangeSet();
    jur_RangeSet__init_(var_1, var_0);
    return var_1;
},
jur_RangeSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$chars0.$contains0($testString.$charAt($strIndex)) ? (-1) : 1;
},
jur_RangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt2 ? $rt_s(38) : $rt_s(39);
    var$2 = $this.$chars0.$toString();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(40)), var$1), var$2);
    return jl_StringBuilder_toString(var$3);
},
jur_RangeSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return jur_AbstractCharClass_intersects0($this.$chars0, $set.$getChar());
    if ($set instanceof jur_RangeSet)
        return jur_AbstractCharClass_intersects($this.$chars0, $set.$chars0);
    if ($set instanceof jur_SupplRangeSet)
        return jur_AbstractCharClass_intersects($this.$chars0, $set.$getChars());
    if (!($set instanceof jur_SupplCharSet))
        return 1;
    return 0;
},
jur_RangeSet_getChars = $this => {
    return $this.$chars0;
};
function jur_UnicodeCategory() {
    jur_AbstractCharClass.call(this);
    this.$category = 0;
}
let jur_UnicodeCategory__init_ = ($this, $category) => {
    jur_AbstractCharClass__init_($this);
    $this.$category = $category;
},
jur_UnicodeCategory__init_0 = var_0 => {
    let var_1 = new jur_UnicodeCategory();
    jur_UnicodeCategory__init_(var_1, var_0);
    return var_1;
},
jur_UnicodeCategory_contains = ($this, $ch) => {
    return $this.$alt ^ ($this.$category != jl_Character_getType0($ch & 65535) ? 0 : 1);
},
jur_UnicodeCategoryScope = $rt_classWithoutFields(jur_UnicodeCategory),
jur_UnicodeCategoryScope__init_ = ($this, $category) => {
    jur_UnicodeCategory__init_($this, $category);
},
jur_UnicodeCategoryScope__init_0 = var_0 => {
    let var_1 = new jur_UnicodeCategoryScope();
    jur_UnicodeCategoryScope__init_(var_1, var_0);
    return var_1;
},
jur_UnicodeCategoryScope_contains = ($this, $ch) => {
    return $this.$alt ^ (!($this.$category >> jl_Character_getType0($ch & 65535) & 1) ? 0 : 1);
};
function jur_CharClass() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$ci = 0;
    a.$uci = 0;
    a.$hasUCI0 = 0;
    a.$invertedSurrogates = 0;
    a.$inverted = 0;
    a.$hideBits = 0;
    a.$bits = null;
    a.$nonBitSet = null;
}
let jur_CharClass__init_2 = $this => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_1();
},
jur_CharClass__init_ = () => {
    let var_0 = new jur_CharClass();
    jur_CharClass__init_2(var_0);
    return var_0;
},
jur_CharClass__init_0 = ($this, $ci, $uci) => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_1();
    $this.$ci = $ci;
    $this.$uci = $uci;
},
jur_CharClass__init_4 = (var_0, var_1) => {
    let var_2 = new jur_CharClass();
    jur_CharClass__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass__init_1 = ($this, $negative, $ci, $uci) => {
    jur_CharClass__init_0($this, $ci, $uci);
    $this.$setNegative($negative);
},
jur_CharClass__init_3 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass();
    jur_CharClass__init_1(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass_add = ($this, $ch) => {
    a: {
        if ($this.$ci) {
            b: {
                if (!($ch >= 97 && $ch <= 122)) {
                    if ($ch < 65)
                        break b;
                    if ($ch > 90)
                        break b;
                }
                if ($this.$inverted) {
                    $this.$bits.$clear(jur_Pattern_getSupplement($ch & 65535));
                    break a;
                }
                $this.$bits.$set0(jur_Pattern_getSupplement($ch & 65535));
                break a;
            }
            if ($this.$uci && $ch > 128) {
                $this.$hasUCI0 = 1;
                $ch = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
            }
        }
    }
    if (!(!jur_Lexer_isHighSurrogate($ch) && !jur_Lexer_isLowSurrogate($ch))) {
        if ($this.$invertedSurrogates)
            $this.$lowHighSurrogates.$clear($ch - 55296 | 0);
        else
            $this.$lowHighSurrogates.$set0($ch - 55296 | 0);
    }
    if ($this.$inverted)
        $this.$bits.$clear($ch);
    else
        $this.$bits.$set0($ch);
    if (!$this.$mayContainSupplCodepoints0 && jl_Character_isSupplementaryCodePoint($ch))
        $this.$mayContainSupplCodepoints0 = 1;
    return $this;
},
jur_CharClass_add1 = ($this, $cc) => {
    let $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints0 && $cc.$mayContainSupplCodepoints0)
        $this.$mayContainSupplCodepoints0 = 1;
    if ($this.$invertedSurrogates) {
        if (!$cc.$altSurrogates)
            $this.$lowHighSurrogates.$andNot($cc.$getLowHighSurrogates());
        else
            $this.$lowHighSurrogates.$and($cc.$getLowHighSurrogates());
    } else if (!$cc.$altSurrogates)
        $this.$lowHighSurrogates.$or($cc.$getLowHighSurrogates());
    else {
        $this.$lowHighSurrogates.$xor($cc.$getLowHighSurrogates());
        $this.$lowHighSurrogates.$and($cc.$getLowHighSurrogates());
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
        $this.$invertedSurrogates = 1;
    }
    if (!$this.$hideBits && $cc.$getBits() !== null) {
        if ($this.$inverted) {
            if (!$cc.$isNegative())
                $this.$bits.$andNot($cc.$getBits());
            else
                $this.$bits.$and($cc.$getBits());
        } else if (!$cc.$isNegative())
            $this.$bits.$or($cc.$getBits());
        else {
            $this.$bits.$xor($cc.$getBits());
            $this.$bits.$and($cc.$getBits());
            $this.$alt = $this.$alt ? 0 : 1;
            $this.$inverted = 1;
        }
    } else {
        $curAlt = $this.$alt;
        if ($this.$nonBitSet !== null) {
            $nb = $this.$nonBitSet;
            if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$5__init_0($this, $curAlt, $nb, $cc);
            else
                $this.$nonBitSet = jur_CharClass$4__init_0($this, $curAlt, $nb, $cc);
        } else {
            if ($curAlt && !$this.$inverted && $this.$bits.$isEmpty())
                $this.$nonBitSet = jur_CharClass$1__init_0($this, $cc);
            else if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$3__init_0($this, $curAlt, $cc);
            else
                $this.$nonBitSet = jur_CharClass$2__init_0($this, $curAlt, $cc);
            $this.$hideBits = 1;
        }
    }
    return $this;
},
jur_CharClass_add0 = ($this, $i, $end) => {
    if ($i > $end)
        $rt_throw(jl_IllegalArgumentException__init_());
    a: {
        b: {
            if (!$this.$ci) {
                if ($end < 55296)
                    break b;
                if ($i > 57343)
                    break b;
            }
            while (true) {
                if ($i >= ($end + 1 | 0))
                    break a;
                $this.$add($i);
                $i = $i + 1 | 0;
            }
        }
        if ($this.$inverted)
            $this.$bits.$clear0($i, $end + 1 | 0);
        else
            $this.$bits.$set($i, $end + 1 | 0);
    }
    return $this;
},
jur_CharClass_union = ($this, $clazz) => {
    let $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints0 && $clazz.$mayContainSupplCodepoints0)
        $this.$mayContainSupplCodepoints0 = 1;
    if ($clazz.$hasUCI())
        $this.$hasUCI0 = 1;
    if (!($this.$altSurrogates ^ $clazz.$altSurrogates)) {
        if (!$this.$altSurrogates)
            $this.$lowHighSurrogates.$or($clazz.$getLowHighSurrogates());
        else
            $this.$lowHighSurrogates.$and($clazz.$getLowHighSurrogates());
    } else if ($this.$altSurrogates)
        $this.$lowHighSurrogates.$andNot($clazz.$getLowHighSurrogates());
    else {
        $this.$lowHighSurrogates.$xor($clazz.$getLowHighSurrogates());
        $this.$lowHighSurrogates.$and($clazz.$getLowHighSurrogates());
        $this.$altSurrogates = 1;
    }
    if (!$this.$hideBits && $clazz.$getBits() !== null) {
        if (!($this.$alt ^ $clazz.$isNegative())) {
            if (!$this.$alt)
                $this.$bits.$or($clazz.$getBits());
            else
                $this.$bits.$and($clazz.$getBits());
        } else if ($this.$alt)
            $this.$bits.$andNot($clazz.$getBits());
        else {
            $this.$bits.$xor($clazz.$getBits());
            $this.$bits.$and($clazz.$getBits());
            $this.$alt = 1;
        }
    } else {
        $curAlt = $this.$alt;
        if ($this.$nonBitSet !== null) {
            $nb = $this.$nonBitSet;
            if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$11__init_0($this, $curAlt, $nb, $clazz);
            else
                $this.$nonBitSet = jur_CharClass$10__init_0($this, $curAlt, $nb, $clazz);
        } else {
            if (!$this.$inverted && $this.$bits.$isEmpty()) {
                if (!$curAlt)
                    $this.$nonBitSet = jur_CharClass$7__init_0($this, $clazz);
                else
                    $this.$nonBitSet = jur_CharClass$6__init_0($this, $clazz);
            } else if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$9__init_0($this, $clazz, $curAlt);
            else
                $this.$nonBitSet = jur_CharClass$8__init_0($this, $clazz, $curAlt);
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_intersection = ($this, $clazz) => {
    let $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints0 && $clazz.$mayContainSupplCodepoints0)
        $this.$mayContainSupplCodepoints0 = 1;
    if ($clazz.$hasUCI())
        $this.$hasUCI0 = 1;
    if (!($this.$altSurrogates ^ $clazz.$altSurrogates)) {
        if (!$this.$altSurrogates)
            $this.$lowHighSurrogates.$and($clazz.$getLowHighSurrogates());
        else
            $this.$lowHighSurrogates.$or($clazz.$getLowHighSurrogates());
    } else if (!$this.$altSurrogates)
        $this.$lowHighSurrogates.$andNot($clazz.$getLowHighSurrogates());
    else {
        $this.$lowHighSurrogates.$xor($clazz.$getLowHighSurrogates());
        $this.$lowHighSurrogates.$and($clazz.$getLowHighSurrogates());
        $this.$altSurrogates = 0;
    }
    if (!$this.$hideBits && $clazz.$getBits() !== null) {
        if (!($this.$alt ^ $clazz.$isNegative())) {
            if (!$this.$alt)
                $this.$bits.$and($clazz.$getBits());
            else
                $this.$bits.$or($clazz.$getBits());
        } else if (!$this.$alt)
            $this.$bits.$andNot($clazz.$getBits());
        else {
            $this.$bits.$xor($clazz.$getBits());
            $this.$bits.$and($clazz.$getBits());
            $this.$alt = 0;
        }
    } else {
        $curAlt = $this.$alt;
        if ($this.$nonBitSet !== null) {
            $nb = $this.$nonBitSet;
            if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$17__init_0($this, $curAlt, $nb, $clazz);
            else
                $this.$nonBitSet = jur_CharClass$16__init_0($this, $curAlt, $nb, $clazz);
        } else {
            if (!$this.$inverted && $this.$bits.$isEmpty()) {
                if (!$curAlt)
                    $this.$nonBitSet = jur_CharClass$13__init_0($this, $clazz);
                else
                    $this.$nonBitSet = jur_CharClass$12__init_0($this, $clazz);
            } else if (!$curAlt)
                $this.$nonBitSet = jur_CharClass$15__init_0($this, $clazz, $curAlt);
            else
                $this.$nonBitSet = jur_CharClass$14__init_0($this, $clazz, $curAlt);
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_contains = ($this, $ch) => {
    if ($this.$nonBitSet !== null)
        return $this.$alt ^ $this.$nonBitSet.$contains0($ch);
    return $this.$alt ^ $this.$bits.$get3($ch);
},
jur_CharClass_getBits = $this => {
    if (!$this.$hideBits)
        return $this.$bits;
    return null;
},
jur_CharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_CharClass_getInstance = $this => {
    let $bs, $res;
    if ($this.$nonBitSet !== null)
        return $this;
    $bs = $this.$getBits();
    $res = jur_CharClass$18__init_0($this, $bs);
    return $res.$setNegative($this.$isNegative());
},
jur_CharClass_toString = $this => {
    let $temp, $i;
    $temp = jl_StringBuilder__init_();
    $i = $this.$bits.$nextSetBit(0);
    while ($i >= 0) {
        $temp.$append8(jl_Character_toChars($i));
        $temp.$append0(124);
        $i = $this.$bits.$nextSetBit($i + 1 | 0);
    }
    if ($temp.$length() > 0)
        $temp.$deleteCharAt($temp.$length() - 1 | 0);
    return $temp.$toString();
},
jur_CharClass_hasUCI = $this => {
    return $this.$hasUCI0;
},
otcit_FloatAnalyzer$Result = $rt_classWithoutFields(),
otcit_FloatAnalyzer$Result__init_ = $this => {
    jl_Object__init_($this);
},
otcit_FloatAnalyzer$Result__init_0 = () => {
    let var_0 = new otcit_FloatAnalyzer$Result();
    otcit_FloatAnalyzer$Result__init_(var_0);
    return var_0;
},
jur_UCIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_UCIDecomposedCharSet__init_ = ($this, $decomp, $decomposedCharLength) => {
    jur_DecomposedCharSet__init_($this, $decomp, $decomposedCharLength);
},
jur_UCIDecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_UCIDecomposedCharSet();
    jur_UCIDecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
otrr_ClassInfo = $rt_classWithoutFields(otrr_ReflectionInfo),
otrr_ClassInfo_newArrayInstance = (var$0, var$1) => {
    switch (var$0.primitiveKind) {
        default: return $rt_createArray(var$0, var$1);
    }
};
function jur_AbstractCharClass$LazyJavaWhitespace$1() {
    jur_AbstractCharClass.call(this);
    this.$this$042 = null;
}
let jur_AbstractCharClass$LazyJavaWhitespace$1__init_ = (var$0, var$1) => {
    var$0.$this$042 = var$1;
    jur_AbstractCharClass__init_(var$0);
},
jur_AbstractCharClass$LazyJavaWhitespace$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaWhitespace$1();
    jur_AbstractCharClass$LazyJavaWhitespace$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaWhitespace$1_contains = ($this, $ch) => {
    return jl_Character_isWhitespace($ch);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
igiae_Scheduler$1 = $rt_classWithoutFields(),
igiae_Scheduler$1__init_ = $this => {
    jl_Object__init_($this);
},
igiae_Scheduler$1__init_0 = () => {
    let var_0 = new igiae_Scheduler$1();
    igiae_Scheduler$1__init_(var_0);
    return var_0;
},
igiae_Scheduler$1_schedule = ($this, $task, $delayMillis) => {
    return igiae_Scheduler$1$1__init_0($this);
};
function jl_Long() {
    jl_Number.call(this);
    this.$value5 = Long_ZERO;
}
let jl_Long_TYPE = null,
jl_Long_$callClinit = () => {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
},
jl_Long__init_ = ($this, $value) => {
    jl_Long_$callClinit();
    jl_Number__init_($this);
    $this.$value5 = $value;
},
jl_Long__init_0 = var_0 => {
    let var_1 = new jl_Long();
    jl_Long__init_(var_1, var_0);
    return var_1;
},
jl_Long_valueOf = $value => {
    jl_Long_$callClinit();
    return jl_Long__init_0($value);
},
jl_Long_longValue = $this => {
    return $this.$value5;
},
jl_Long_divideUnsigned = (var$1, var$2) => {
    return Long_udiv(var$1, var$2);
},
jl_Long_remainderUnsigned = (var$1, var$2) => {
    return Long_urem(var$1, var$2);
},
jl_Long_compareUnsigned = (var$1, var$2) => {
    return Long_ucompare(var$1, var$2);
},
jl_Long__clinit_ = () => {
    jl_Long_TYPE = $rt_cls($rt_longcls);
},
otjc_JSArrayReader = $rt_classWithoutFields(0),
otjc_JSArray = $rt_classWithoutFields();
function jur_SequenceSet$IntHash() {
    let a = this; jl_Object.call(a);
    a.$table = null;
    a.$values0 = null;
    a.$mask = 0;
    a.$size2 = 0;
}
let jur_SequenceSet$IntHash__init_0 = ($this, $size) => {
    jl_Object__init_($this);
    while ($size >= $this.$mask) {
        $this.$mask = $this.$mask << 1 | 1;
    }
    $this.$mask = $this.$mask << 1 | 1;
    $this.$table = $rt_createIntArray($this.$mask + 1 | 0);
    $this.$values0 = $rt_createIntArray($this.$mask + 1 | 0);
    $this.$size2 = $size;
},
jur_SequenceSet$IntHash__init_ = var_0 => {
    let var_1 = new jur_SequenceSet$IntHash();
    jur_SequenceSet$IntHash__init_0(var_1, var_0);
    return var_1;
},
jur_SequenceSet$IntHash_put = ($this, $key, $value) => {
    let $i, $hashCode, var$5;
    $i = 0;
    $hashCode = $key & $this.$mask;
    while ($this.$table.data[$hashCode] && $this.$table.data[$hashCode] != $key) {
        var$5 = $i + 1 | 0;
        $i = var$5 & $this.$mask;
        var$5 = $hashCode + $i | 0;
        $hashCode = var$5 & $this.$mask;
    }
    $this.$table.data[$hashCode] = $key;
    $this.$values0.data[$hashCode] = $value;
},
jur_SequenceSet$IntHash_get = ($this, $key) => {
    let $hashCode, $i, $storedKey, var$5;
    $hashCode = $key & $this.$mask;
    $i = 0;
    while (true) {
        $storedKey = $this.$table.data[$hashCode];
        if (!$storedKey)
            break;
        if ($storedKey == $key)
            return $this.$values0.data[$hashCode];
        var$5 = $i + 1 | 0;
        $i = var$5 & $this.$mask;
        var$5 = $hashCode + $i | 0;
        $hashCode = var$5 & $this.$mask;
    }
    return $this.$size2;
},
jur_AbstractCharClass$LazyNonDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyDigit),
jur_AbstractCharClass$LazyNonDigit__init_ = $this => {
    jur_AbstractCharClass$LazyDigit__init_($this);
},
jur_AbstractCharClass$LazyNonDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonDigit();
    jur_AbstractCharClass$LazyNonDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonDigit_computeValue = $this => {
    let $chCl;
    $chCl = (jur_AbstractCharClass$LazyDigit_computeValue($this)).$setNegative(1);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function igiae_PluginLedger() {
    jl_Object.call(this);
    this.$entries1 = null;
}
let igiae_PluginLedger__init_ = $this => {
    jl_Object__init_($this);
    $this.$entries1 = ju_LinkedHashMap__init_();
},
igiae_PluginLedger__init_0 = () => {
    let var_0 = new igiae_PluginLedger();
    igiae_PluginLedger__init_(var_0);
    return var_0;
},
igiae_PluginLedger_entries = $this => {
    let $copies, var$2, $entry;
    $copies = ju_ArrayList__init_();
    var$2 = ($this.$entries1.$values()).$iterator();
    while (var$2.$hasNext()) {
        $entry = var$2.$next();
        $copies.$add2(igiae_LedgerEntry_copy($entry));
    }
    return $copies;
},
igiae_PluginLedger_entry = ($this, $pluginId) => {
    let $found;
    $found = $this.$entries1.$get1($pluginId);
    return $found !== null ? igiae_LedgerEntry_copy($found) : null;
},
igiae_PluginLedger_recordDeclared = ($this, $pluginId, $capabilities, $permissions) => {
    let $entry, var$5, $id, $permission;
    a: {
        $entry = igiae_PluginLedger_ensure($this, $pluginId);
        igiae_LedgerEntry_reset($entry);
        if ($capabilities !== null) {
            var$5 = $capabilities.$iterator();
            while (true) {
                if (!var$5.$hasNext())
                    break a;
                $id = var$5.$next();
                igiae_LedgerEntry_addCapabilityDeclared($entry, $id);
            }
        }
    }
    b: {
        if ($permissions !== null) {
            var$5 = $permissions.$iterator();
            while (true) {
                if (!var$5.$hasNext())
                    break b;
                $permission = var$5.$next();
                igiae_LedgerEntry_addPermission($entry, $permission);
            }
        }
    }
},
igiae_PluginLedger_recordCapabilityProvided = ($this, $pluginId, $capabilityId) => {
    igiae_LedgerEntry_addCapabilityProvided(igiae_PluginLedger_ensure($this, $pluginId), $capabilityId);
},
igiae_PluginLedger_recordServiceProvided = ($this, $pluginId, $serviceId) => {
    igiae_LedgerEntry_addServiceProvided(igiae_PluginLedger_ensure($this, $pluginId), $serviceId);
},
igiae_PluginLedger_recordServiceConsumed = ($this, $pluginId, $serviceId) => {
    igiae_LedgerEntry_addServiceConsumed(igiae_PluginLedger_ensure($this, $pluginId), $serviceId);
},
igiae_PluginLedger_recordTopic = ($this, $pluginId, $topic) => {
    igiae_LedgerEntry_addTopic(igiae_PluginLedger_ensure($this, $pluginId), $topic);
},
igiae_PluginLedger_recordStatus = ($this, $pluginId, $status, $detail, $fix) => {
    let $entry;
    $entry = igiae_PluginLedger_ensure($this, $pluginId);
    igiae_LedgerEntry_setStatus($entry, $status);
    igiae_LedgerEntry_setError($entry, $detail, $fix);
},
igiae_PluginLedger_ensure = ($this, $pluginId) => {
    let $existing, $fresh;
    $existing = $this.$entries1.$get1($pluginId);
    if ($existing !== null)
        return $existing;
    $fresh = igiae_LedgerEntry__init_($pluginId);
    $this.$entries1.$put($pluginId, $fresh);
    return $fresh;
};
function jur_AbstractCharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS = null;
    a.$this$040 = null;
}
let jur_AbstractCharClass$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$040 = $this$0;
    $this.$val$lHS = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$1__init_0 = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$1();
    jur_AbstractCharClass$1__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$1_contains = ($this, $ch) => {
    let $index;
    $index = $ch - 55296 | 0;
    return $index >= 0 && $index < 2048 ? $this.$altSurrogates ^ $this.$val$lHS.$get3($index) : 0;
},
igiaj_EngineJs = $rt_classWithoutFields(),
igiaj_EngineJs_$callClinit = () => {
    igiaj_EngineJs_$callClinit = $rt_eraseClinit(igiaj_EngineJs);
    igiaj_EngineJs__clinit_();
},
igiaj_EngineJs_activationOrder = $manifests => {
    let $ids, $provides, $consumes, $index, $tree, $id, $services, $plan;
    igiaj_EngineJs_$callClinit();
    $ids = ju_ArrayList__init_();
    $provides = ju_LinkedHashMap__init_();
    $consumes = ju_LinkedHashMap__init_();
    $index = 0;
    while ($index < $manifests.length) {
        $tree = igiaj_JsJson_toTree(otji_JSWrapper_maybeUnwrap($manifests[$index]));
        $id = igiaj_EngineJs_text($tree, $rt_s(16));
        if ($id !== null) {
            $ids.$add2($id);
            $services = igiaj_EngineJs_member($tree, $rt_s(296));
            $provides.$put($id, igiaj_EngineJs_strings(igiaj_EngineJs_member($services, $rt_s(297))));
            $consumes.$put($id, igiaj_EngineJs_strings(igiaj_EngineJs_member($services, $rt_s(298))));
        }
        $index = $index + 1 | 0;
    }
    $plan = igiae_Activation_order($ids, $provides, $consumes);
    return igiaj_EngineJs_plan$js_body$_16(igiaj_JsJson_fromStrings(igiae_ActivationPlan_getOrder($plan)), igiaj_JsJson_fromStringLists(igiae_ActivationPlan_getCycles($plan)));
},
igiaj_EngineJs_assertManifest = ($manifest, $wellKnownServices) => {
    let $known, $index, $failure, $$je;
    igiaj_EngineJs_$callClinit();
    a: {
        $known = ju_ArrayList__init_();
        if ($wellKnownServices !== null && !(igiaj_EngineJs_nullish$js_body$_14($wellKnownServices) ? 1 : 0)) {
            $index = 0;
            while (true) {
                if ($index >= $wellKnownServices.length)
                    break a;
                $known.$add2(jl_String_valueOf(igiaj_JsJson_toTree(otji_JSWrapper_maybeUnwrap($wellKnownServices[$index]))));
                $index = $index + 1 | 0;
            }
        }
    }
    b: {
        try {
            igiae_ManifestValidator_require(igiaj_JsJson_toTree($manifest), $known);
            break b;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof igiae_PluginException) {
                $failure = $$je;
                igiaj_JsErrors_raise$js_body$_4(igiaj_JsErrors_of($failure));
                break b;
            } else {
                throw $$e;
            }
        }
    }
    return $manifest;
},
igiaj_EngineJs_validateManifest = ($manifest, $wellKnownServices) => {
    let $known, $index, $issues, $out, $issue, var$8, var$9, var$10;
    igiaj_EngineJs_$callClinit();
    $known = null;
    if ($wellKnownServices !== null && !(igiaj_EngineJs_nullish$js_body$_14($wellKnownServices) ? 1 : 0)) {
        $known = ju_ArrayList__init_();
        $index = 0;
        while ($index < $wellKnownServices.length) {
            $known.$add2(jl_String_valueOf(igiaj_JsJson_toTree(otji_JSWrapper_maybeUnwrap($wellKnownServices[$index]))));
            $index = $index + 1 | 0;
        }
    }
    $issues = igiae_ManifestValidator_validate(igiaj_JsJson_toTree($manifest), $known);
    $out = new Array();
    $index = 0;
    while ($index < $issues.$size()) {
        $issue = $issues.$get($index);
        var$8 = igiae_SchemaIssue_getPath($issue);
        var$9 = igiae_SchemaIssue_getMessage($issue);
        var$10 = igiae_SchemaIssue_getFix($issue);
        var$8 = igiaj_EngineJs_validationIssue$js_body$_17($rt_ustr(var$8), $rt_ustr(var$9), $rt_ustr(var$10));
        $out[$index] = var$8;
        $index = $index + 1 | 0;
    }
    return $out;
},
igiaj_EngineJs_manifestSchema = () => {
    igiaj_EngineJs_$callClinit();
    return igiaj_JsJson_fromTree(igiae_JsonSchema_toTree(igiae_ManifestSchema_get()));
},
igiaj_EngineJs_pluginError = ($pluginId, $detail, $fix) => {
    igiaj_EngineJs_$callClinit();
    return igiaj_JsErrors_mint($pluginId, $detail, $fix);
},
igiaj_EngineJs_isPluginError = $value => {
    igiaj_EngineJs_$callClinit();
    return igiaj_JsErrors_marked$js_body$_5($value) ? 1 : 0;
},
igiaj_EngineJs_setStrict = $enabled => {
    igiaj_EngineJs_$callClinit();
    igiae_Diagnostics_setStrict(igiaj_EngineJs_booleanOrNull($enabled));
},
igiaj_EngineJs_createPluginHost = $options => {
    igiaj_EngineJs_$callClinit();
    return igiaj_JsPluginHost_from(igiaj_JsJson_toTree($options));
},
igiaj_EngineJs_setDiagnosticSink = $sink => {
    igiaj_EngineJs_$callClinit();
    if ($sink === null) {
        igiae_Diagnostics_setSink(null);
        return;
    }
    igiae_Diagnostics_setSink(igiaj_EngineJs$1__init_0($sink));
},
igiaj_EngineJs_member = ($tree, $name) => {
    igiaj_EngineJs_$callClinit();
    return !$rt_isInstance($tree, ju_Map) ? null : $tree.$get1($name);
},
igiaj_EngineJs_text = ($tree, $name) => {
    let $found;
    igiaj_EngineJs_$callClinit();
    $found = igiaj_EngineJs_member($tree, $name);
    return $found !== null ? jl_String_valueOf($found) : null;
},
igiaj_EngineJs_strings = $value => {
    let $out, var$3, $item;
    igiaj_EngineJs_$callClinit();
    a: {
        $out = ju_ArrayList__init_();
        if ($rt_isInstance($value, ju_List)) {
            var$3 = $value.$iterator();
            while (true) {
                if (!var$3.$hasNext())
                    break a;
                $item = var$3.$next();
                $out.$add2(jl_String_valueOf($item));
            }
        }
    }
    return $out;
},
igiaj_EngineJs_booleanOrNull = $value => {
    igiaj_EngineJs_$callClinit();
    if ($value !== null && !(igiaj_EngineJs_nullish$js_body$_14($value) ? 1 : 0))
        return jl_Boolean_valueOf(!!$value ? 1 : 0);
    return null;
},
igiaj_EngineJs_nullish$js_body$_14 = var$1 => {
    return var$1 === null || var$1 === undefined;
},
igiaj_EngineJs_plan$js_body$_16 = (var$1, var$2) => {
    return { order : var$1, cycles : var$2 };
},
igiaj_EngineJs_validationIssue$js_body$_17 = (var$1, var$2, var$3) => {
    return { path : var$1, message : var$2, fix : var$3 };
},
igiaj_EngineJs_activationOrder$exported$0 = var$1 => {
    igiaj_EngineJs_$callClinit();
    return igiaj_EngineJs_activationOrder(var$1);
},
igiaj_EngineJs_assertManifest$exported$1 = (var$1, var$2) => {
    igiaj_EngineJs_$callClinit();
    return igiaj_EngineJs_assertManifest(var$1, var$2);
},
igiaj_EngineJs_validateManifest$exported$2 = (var$1, var$2) => {
    igiaj_EngineJs_$callClinit();
    return igiaj_EngineJs_validateManifest(var$1, var$2);
},
igiaj_EngineJs_manifestSchema$exported$3 = () => {
    igiaj_EngineJs_$callClinit();
    return igiaj_EngineJs_manifestSchema();
},
igiaj_EngineJs_pluginError$exported$4 = (var$1, var$2, var$3) => {
    igiaj_EngineJs_$callClinit();
    return igiaj_EngineJs_pluginError($rt_str(var$1), $rt_str(var$2), $rt_str(var$3));
},
igiaj_EngineJs_isPluginError$exported$5 = var$1 => {
    igiaj_EngineJs_$callClinit();
    return !!igiaj_EngineJs_isPluginError(var$1);
},
igiaj_EngineJs_setStrict$exported$6 = var$1 => {
    igiaj_EngineJs_$callClinit();
    igiaj_EngineJs_setStrict(var$1);
},
igiaj_EngineJs_createPluginHost$exported$7 = var$1 => {
    igiaj_EngineJs_$callClinit();
    return igiaj_EngineJs_createPluginHost(var$1);
},
igiaj_EngineJs_setDiagnosticSink$exported$8 = var$1 => {
    igiaj_EngineJs_$callClinit();
    igiaj_EngineJs_setDiagnosticSink(otji_JS_functionAsObject(var$1, "accept"));
},
igiaj_EngineJs__clinit_ = () => {
    return;
};
function jur_AbstractCharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS0 = null;
    a.$val$thisClass = null;
    a.$this$025 = null;
}
let jur_AbstractCharClass$2__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$025 = $this$0;
    $this.$val$lHS0 = var$2;
    $this.$val$thisClass = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$2__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$2();
    jur_AbstractCharClass$2__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$2_contains = ($this, $ch) => {
    let $index, $containslHS;
    $index = $ch - 55296 | 0;
    $containslHS = $index >= 0 && $index < 2048 ? $this.$altSurrogates ^ $this.$val$lHS0.$get3($index) : 0;
    return $this.$val$thisClass.$contains0($ch) && !$containslHS ? 1 : 0;
},
jur_AbstractCharClass$LazyJavaLowerCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLowerCase__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLowerCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLowerCase();
    jur_AbstractCharClass$LazyJavaLowerCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLowerCase_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaLowerCase$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
jur_PossessiveCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_PossessiveCompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_CompositeQuantifierSet__init_($this, $quant, $innerSet, $next, $type);
},
jur_PossessiveCompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_PossessiveCompositeQuantifierSet();
    jur_PossessiveCompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_PossessiveCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $min, $max, $i, $shift;
    $min = $this.$quantifier.$min0();
    $max = $this.$quantifier.$max0();
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound())
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound()) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
igiaj_JsPluginHost$ManifestFn = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$1() {
    jl_Object.call(this);
    this.$val$host2 = null;
}
let igiaj_JsPluginHost$1__init_ = ($this, var$1) => {
    $this.$val$host2 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$1__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$1();
    igiaj_JsPluginHost$1__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$1_call = ($this, $manifest) => {
    let $facts, $failure;
    $facts = igiaj_JsPluginHost_factsOf($manifest);
    $failure = igiae_PluginHost_supports($this.$val$host2, igiae_ManifestFacts_getId($facts), igiae_ManifestFacts_getApi($facts));
    return $failure !== null ? igiaj_JsErrors_of($failure) : null;
},
igiaj_JsPluginHost$1_call$exported$0 = (var$1, var$2) => {
    return var$1.$call8(var$2);
};
function jur_AbstractCharClass$LazyJavaLetterOrDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$043 = null;
}
let jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_ = ($this, $this$0) => {
    $this.$this$043 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaLetterOrDigit$1();
    jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains = ($this, $ch) => {
    return jl_Character_isLetterOrDigit($ch);
};
function jur_CharClass$18() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$bs = null;
    a.$this$019 = null;
}
let jur_CharClass$18__init_ = ($this, $this$0, var$2) => {
    $this.$this$019 = $this$0;
    $this.$val$bs = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$18__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$18();
    jur_CharClass$18__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$18_contains = ($this, $ch) => {
    return $this.$alt ^ $this.$val$bs.$get3($ch);
},
jur_CharClass$18_toString = $this => {
    let $temp, $i;
    $temp = jl_StringBuilder__init_();
    $i = $this.$val$bs.$nextSetBit(0);
    while ($i >= 0) {
        $temp.$append8(jl_Character_toChars($i));
        $temp.$append0(124);
        $i = $this.$val$bs.$nextSetBit($i + 1 | 0);
    }
    if ($temp.$length() > 0)
        $temp.$deleteCharAt($temp.$length() - 1 | 0);
    return $temp.$toString();
};
function igiaj_JsPluginHost$3() {
    let a = this; jl_Object.call(a);
    a.$val$host3 = null;
    a.$val$descriptor = null;
}
let igiaj_JsPluginHost$3__init_ = ($this, var$1, var$2) => {
    $this.$val$host3 = var$1;
    $this.$val$descriptor = var$2;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$3__init_0 = (var_0, var_1) => {
    let var_2 = new igiaj_JsPluginHost$3();
    igiaj_JsPluginHost$3__init_(var_2, var_0, var_1);
    return var_2;
},
igiaj_JsPluginHost$3_call = ($this, $manifest, $runtime) => {
    let $facts, $bus, $session;
    $facts = igiaj_JsPluginHost_factsOf($manifest);
    $bus = igiaj_JsPluginHost_wrapBus($runtime.events);
    $session = igiae_PluginHost_sessionFor($this.$val$host3, $facts, $bus);
    return otji_JSWrapper_unwrap(igiaj_JsPluginContext_build($session, $runtime, $this.$val$descriptor));
},
igiaj_JsPluginHost$3_call$exported$0 = (var$1, var$2, var$3) => {
    return var$1.$call9(var$2, var$3);
},
jur_PossessiveGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PossessiveGroupQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_GroupQuantifierSet__init_($this, $innerSet, $next, $type);
    jur_FSet_$callClinit();
    $innerSet.$setNext(jur_FSet_posFSet);
},
jur_PossessiveGroupQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PossessiveGroupQuantifierSet();
    jur_PossessiveGroupQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PossessiveGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $stringIndex_0;
    while (true) {
        $stringIndex_0 = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        if ($stringIndex_0 <= 0)
            break;
        $stringIndex = $stringIndex_0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
};
function igiaj_JsPluginHost$2() {
    jl_Object.call(this);
    this.$val$host5 = null;
}
let igiaj_JsPluginHost$2__init_ = ($this, var$1) => {
    $this.$val$host5 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$2__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$2();
    igiaj_JsPluginHost$2__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$2_call = ($this, $manifest) => {
    let $failure;
    $failure = igiae_PluginHost_verifyActivation($this.$val$host5, igiaj_JsPluginHost_factsOf($manifest));
    return $failure !== null ? igiaj_JsErrors_of($failure) : null;
},
igiaj_JsPluginHost$2_call$exported$0 = (var$1, var$2) => {
    return var$1.$call8(var$2);
};
function igiaj_JsPluginHost$5() {
    jl_Object.call(this);
    this.$val$host = null;
}
let igiaj_JsPluginHost$5__init_ = ($this, var$1) => {
    $this.$val$host = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$5__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$5();
    igiaj_JsPluginHost$5__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$5_call = ($this, $id) => {
    return igiaj_JsPluginHost_orUndefined$js_body$_10(otji_JSWrapper_unwrap(igiae_PluginHost_service($this.$val$host, $id)));
},
igiaj_JsPluginHost$5_call$exported$0 = (var$1, var$2) => {
    var$2 = $rt_str(var$2);
    return var$1.$call(var$2);
};
function igiaj_JsPluginHost$4() {
    jl_Object.call(this);
    this.$val$host0 = null;
}
let igiaj_JsPluginHost$4__init_ = ($this, var$1) => {
    $this.$val$host0 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$4__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$4();
    igiaj_JsPluginHost$4__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$4_call = ($this, $id) => {
    let $records, $out, $index, $record, var$6, var$7;
    $records = igiae_PluginHost_capability($this.$val$host0, $id);
    $out = new Array();
    $index = 0;
    while ($index < $records.$size()) {
        $record = $records.$get($index);
        var$6 = igiae_CapabilityRecord_getPluginId($record);
        var$7 = otji_JSWrapper_unwrap(igiae_CapabilityRecord_getImplementation($record));
        var$6 = igiaj_JsPluginHost_capabilityRecord$js_body$_18($rt_ustr(var$6), var$7);
        $out[$index] = var$6;
        $index = $index + 1 | 0;
    }
    return $out;
},
igiaj_JsPluginHost$4_call$exported$0 = (var$1, var$2) => {
    var$2 = $rt_str(var$2);
    return var$1.$call(var$2);
};
function jur_CharClass$13() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz4 = null;
    a.$this$032 = null;
}
let jur_CharClass$13__init_ = ($this, $this$0, var$2) => {
    $this.$this$032 = $this$0;
    $this.$val$clazz4 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$13__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$13();
    jur_CharClass$13__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$13_contains = ($this, $ch) => {
    return $this.$val$clazz4.$contains0($ch);
};
function jur_CharClass$12() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz5 = null;
    a.$this$047 = null;
}
let jur_CharClass$12__init_ = ($this, $this$0, var$2) => {
    $this.$this$047 = $this$0;
    $this.$val$clazz5 = var$2;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$12__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass$12();
    jur_CharClass$12__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass$12_contains = ($this, $ch) => {
    return $this.$val$clazz5.$contains0($ch) ? 0 : 1;
};
function jur_CharClass$11() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt4 = 0;
    a.$val$nb2 = null;
    a.$val$clazz8 = null;
    a.$this$020 = null;
}
let jur_CharClass$11__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$020 = $this$0;
    $this.$val$curAlt4 = var$2;
    $this.$val$nb2 = var$3;
    $this.$val$clazz8 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$11__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$11();
    jur_CharClass$11__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$11_contains = ($this, $ch) => {
    return !($this.$val$curAlt4 ^ $this.$val$nb2.$contains0($ch)) && !$this.$val$clazz8.$contains0($ch) ? 0 : 1;
},
otci_Base46 = $rt_classWithoutFields(),
otci_Base46_decodeUnsigned = $seq => {
    let $number, $pos, var$4, var$5, $digit, $hasMore;
    $number = 0;
    $pos = 1;
    while (true) {
        var$4 = $seq.$characters.data;
        var$5 = $seq.$pointer;
        $seq.$pointer = var$5 + 1 | 0;
        $digit = otci_Base46_decodeDigit(var$4[var$5]);
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
},
otci_Base46_decode = $seq => {
    let $number, $result;
    $number = otci_Base46_decodeUnsigned($seq);
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result | 0;
    return $result;
},
otci_Base46_decodeDigit = $c => {
    if ($c < 34)
        return $c - 32 | 0;
    if ($c >= 92)
        return ($c - 32 | 0) - 2 | 0;
    return ($c - 32 | 0) - 1 | 0;
};
function jur_CharClass$10() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt6 = 0;
    a.$val$nb0 = null;
    a.$val$clazz0 = null;
    a.$this$028 = null;
}
let jur_CharClass$10__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$028 = $this$0;
    $this.$val$curAlt6 = var$2;
    $this.$val$nb0 = var$3;
    $this.$val$clazz0 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$10__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$10();
    jur_CharClass$10__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$10_contains = ($this, $ch) => {
    return !($this.$val$curAlt6 ^ $this.$val$nb0.$contains0($ch)) && !$this.$val$clazz0.$contains0($ch) ? 1 : 0;
};
function jur_CharClass$17() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt5 = 0;
    a.$val$nb1 = null;
    a.$val$clazz10 = null;
    a.$this$024 = null;
}
let jur_CharClass$17__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$024 = $this$0;
    $this.$val$curAlt5 = var$2;
    $this.$val$nb1 = var$3;
    $this.$val$clazz10 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$17__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$17();
    jur_CharClass$17__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$17_contains = ($this, $ch) => {
    return $this.$val$curAlt5 ^ $this.$val$nb1.$contains0($ch) && $this.$val$clazz10.$contains0($ch) ? 1 : 0;
};
function jur_UCISequenceSet() {
    jur_LeafSet.call(this);
    this.$string1 = null;
}
let jur_UCISequenceSet__init_ = ($this, $substring) => {
    let $res, $i;
    jur_LeafSet__init_($this);
    $res = jl_StringBuilder__init_();
    $i = 0;
    while ($i < $substring.$length()) {
        $res.$append0(jl_Character_toLowerCase(jl_Character_toUpperCase($substring.$charAt($i))));
        $i = $i + 1 | 0;
    }
    $this.$string1 = $res.$toString();
    $this.$charCount0 = $res.$length();
},
jur_UCISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_UCISequenceSet();
    jur_UCISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_UCISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i;
    $i = 0;
    while (true) {
        if ($i >= jl_String_length($this.$string1))
            return jl_String_length($this.$string1);
        if (jl_String_charAt($this.$string1, $i) != jl_Character_toLowerCase(jl_Character_toUpperCase($testString.$charAt($strIndex + $i | 0))))
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_UCISequenceSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$string1;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(299)), var$1);
    return jl_StringBuilder_toString(var$2);
};
function jur_CharClass$16() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt3 = 0;
    a.$val$nb = null;
    a.$val$clazz3 = null;
    a.$this$036 = null;
}
let jur_CharClass$16__init_ = ($this, $this$0, var$2, var$3, var$4) => {
    $this.$this$036 = $this$0;
    $this.$val$curAlt3 = var$2;
    $this.$val$nb = var$3;
    $this.$val$clazz3 = var$4;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$16__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CharClass$16();
    jur_CharClass$16__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CharClass$16_contains = ($this, $ch) => {
    return $this.$val$curAlt3 ^ $this.$val$nb.$contains0($ch) && $this.$val$clazz3.$contains0($ch) ? 0 : 1;
};
function jur_CharClass$15() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz9 = null;
    a.$val$curAlt1 = 0;
    a.$this$014 = null;
}
let jur_CharClass$15__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$014 = $this$0;
    $this.$val$clazz9 = var$2;
    $this.$val$curAlt1 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$15__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$15();
    jur_CharClass$15__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$15_contains = ($this, $ch) => {
    return $this.$val$clazz9.$contains0($ch) && $this.$val$curAlt1 ^ $this.$this$014.$bits.$get3($ch) ? 1 : 0;
};
function jur_AbstractCharClass$LazyJavaDefined$1() {
    jur_AbstractCharClass.call(this);
    this.$this$038 = null;
}
let jur_AbstractCharClass$LazyJavaDefined$1__init_ = ($this, $this$0) => {
    $this.$this$038 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaDefined$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaDefined$1();
    jur_AbstractCharClass$LazyJavaDefined$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaDefined$1_contains = ($this, $ch) => {
    return jl_Character_isDefined($ch);
};
function jur_CharClass$14() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz2 = null;
    a.$val$curAlt10 = 0;
    a.$this$010 = null;
}
let jur_CharClass$14__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$010 = $this$0;
    $this.$val$clazz2 = var$2;
    $this.$val$curAlt10 = var$3;
    jur_AbstractCharClass__init_($this);
},
jur_CharClass$14__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_CharClass$14();
    jur_CharClass$14__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_CharClass$14_contains = ($this, $ch) => {
    return $this.$val$clazz2.$contains0($ch) && $this.$val$curAlt10 ^ $this.$this$010.$bits.$get3($ch) ? 0 : 1;
},
igiaj_JsPluginHost$EntriesFn = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_2 = ($this, $capacity) => {
    jl_AbstractStringBuilder__init_($this, $capacity);
},
jl_StringBuilder__init_0 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_2(var_1, var_0);
    return var_1;
},
jl_StringBuilder__init_1 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_1(var_0);
    return var_0;
},
jl_StringBuilder_append = ($this, $obj) => {
    jl_AbstractStringBuilder_append6($this, $obj);
    return $this;
},
jl_StringBuilder_append2 = ($this, $string) => {
    jl_AbstractStringBuilder_append2($this, $string);
    return $this;
},
jl_StringBuilder_append1 = ($this, $value) => {
    jl_AbstractStringBuilder_append3($this, $value);
    return $this;
},
jl_StringBuilder_append7 = ($this, $value) => {
    jl_AbstractStringBuilder_append5($this, $value);
    return $this;
},
jl_StringBuilder_append4 = ($this, $value) => {
    jl_AbstractStringBuilder_append4($this, $value);
    return $this;
},
jl_StringBuilder_append0 = ($this, $c) => {
    jl_AbstractStringBuilder_append1($this, $c);
    return $this;
},
jl_StringBuilder_append3 = ($this, $chars, $offset, $len) => {
    jl_AbstractStringBuilder_append0($this, $chars, $offset, $len);
    return $this;
},
jl_StringBuilder_append6 = ($this, $chars) => {
    jl_AbstractStringBuilder_append($this, $chars);
    return $this;
},
jl_StringBuilder_insert5 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert4($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert6 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert1($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert3 = ($this, $index, $chars, $offset, $len) => {
    jl_AbstractStringBuilder_insert($this, $index, $chars, $offset, $len);
    return $this;
},
jl_StringBuilder_insert7 = ($this, $index, $obj) => {
    jl_AbstractStringBuilder_insert3($this, $index, $obj);
    return $this;
},
jl_StringBuilder_insert1 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert0($this, $index, $c);
    return $this;
},
jl_StringBuilder_delete = ($this, $start, $end) => {
    jl_AbstractStringBuilder_delete($this, $start, $end);
    return $this;
},
jl_StringBuilder_deleteCharAt = ($this, $index) => {
    jl_AbstractStringBuilder_deleteCharAt($this, $index);
    return $this;
},
jl_StringBuilder_insert9 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert2($this, $index, $string);
    return $this;
},
jl_StringBuilder_insert8 = ($this, var$1, var$2, var$3, var$4) => {
    return $this.$insert9(var$1, var$2, var$3, var$4);
},
jl_StringBuilder_append5 = ($this, var$1, var$2, var$3) => {
    return $this.$append18(var$1, var$2, var$3);
},
jl_StringBuilder_length = $this => {
    return jl_AbstractStringBuilder_length($this);
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    return $this.$insert10(var$1, var$2);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    return $this.$insert11(var$1, var$2);
},
jl_StringBuilder_insert4 = ($this, var$1, var$2) => {
    return $this.$insert12(var$1, var$2);
},
jl_StringBuilder_insert2 = ($this, var$1, var$2) => {
    return $this.$insert13(var$1, var$2);
},
jl_StringBuilder_insert10 = ($this, var$1, var$2) => {
    return $this.$insert14(var$1, var$2);
};
function jur_CompositeRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$withoutSurrogates = null;
    a.$withSurrogates = null;
}
let jur_CompositeRangeSet__init_0 = ($this, $withoutSurrogates, $withSurrogates) => {
    jur_JointSet__init_($this);
    $this.$withoutSurrogates = $withoutSurrogates;
    $this.$withSurrogates = $withSurrogates;
},
jur_CompositeRangeSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_CompositeRangeSet();
    jur_CompositeRangeSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_CompositeRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$withoutSurrogates.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = $this.$withSurrogates.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    return (-1);
},
jur_CompositeRangeSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
    $this.$withSurrogates.$setNext($next);
    $this.$withoutSurrogates.$setNext($next);
},
jur_CompositeRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_String_valueOf($this.$withoutSurrogates);
    var$2 = jl_String_valueOf($this.$withSurrogates);
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(300)), var$1), $rt_s(301)), var$2);
    return jl_StringBuilder_toString(var$3);
},
jur_CompositeRangeSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_CompositeRangeSet_first = ($this, $set) => {
    return 1;
},
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException),
ju_ConcurrentModificationException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
ju_ConcurrentModificationException__init_ = () => {
    let var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_0(var_0);
    return var_0;
},
jur_FinalSet = $rt_classWithoutFields(jur_FSet),
jur_FinalSet__init_ = $this => {
    jur_FSet__init_($this, 0);
},
jur_FinalSet__init_0 = () => {
    let var_0 = new jur_FinalSet();
    jur_FinalSet__init_(var_0);
    return var_0;
},
jur_FinalSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($matchResult.$mode() != 1 && $stringIndex != $matchResult.$getRightBound())
        return (-1);
    $matchResult.$setValid();
    $matchResult.$setEnd(0, $stringIndex);
    return $stringIndex;
},
jur_FinalSet_getName = $this => {
    return $rt_s(302);
},
ju_LinkedHashMapIterator$ValueIterator = $rt_classWithoutFields(ju_LinkedHashMapIterator),
ju_LinkedHashMapIterator$ValueIterator__init_ = ($this, $map, $reversed) => {
    ju_LinkedHashMapIterator__init_($this, $map, $reversed);
},
ju_LinkedHashMapIterator$ValueIterator__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapIterator$ValueIterator();
    ju_LinkedHashMapIterator$ValueIterator__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapIterator$ValueIterator_next = $this => {
    ju_LinkedHashMapIterator_makeNext($this);
    return $this.$currentEntry.$value0;
},
igiae_Diagnostics$Sink = $rt_classWithoutFields(0),
jur_EmptySet = $rt_classWithoutFields(jur_LeafSet),
jur_EmptySet__init_0 = ($this, $next) => {
    jur_LeafSet__init_0($this, $next);
    $this.$charCount0 = 0;
},
jur_EmptySet__init_ = var_0 => {
    let var_1 = new jur_EmptySet();
    jur_EmptySet__init_0(var_1, var_0);
    return var_1;
},
jur_EmptySet_accepts = ($this, $stringIndex, $testString) => {
    return 0;
},
jur_EmptySet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startStr, var$6, $low, $high;
    $strLength = $matchResult.$getRightBound();
    $startStr = $matchResult.$getLeftBound();
    while (true) {
        var$6 = $rt_compare($stringIndex, $strLength);
        if (var$6 > 0)
            return (-1);
        if (var$6 < 0) {
            $low = $testString.$charAt($stringIndex);
            if (jl_Character_isLowSurrogate($low) && $stringIndex > $startStr) {
                $high = $testString.$charAt($stringIndex - 1 | 0);
                if (jl_Character_isHighSurrogate($high)) {
                    $stringIndex = $stringIndex + 1 | 0;
                    continue;
                }
            }
        }
        if ($this.$next2.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_EmptySet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $strLength, $startStr, $low, $high;
    $strLength = $matchResult.$getRightBound();
    $startStr = $matchResult.$getLeftBound();
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($startSearch < $strLength) {
            $low = $testString.$charAt($startSearch);
            if (jl_Character_isLowSurrogate($low) && $startSearch > $startStr) {
                $high = $testString.$charAt($startSearch - 1 | 0);
                if (jl_Character_isHighSurrogate($high)) {
                    $startSearch = $startSearch + (-1) | 0;
                    continue;
                }
            }
        }
        if ($this.$next2.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_EmptySet_getName = $this => {
    return $rt_s(303);
},
jur_EmptySet_hasConsumed = ($this, $mr) => {
    return 0;
},
ju_Map$Entry = $rt_classWithoutFields(0);
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value0 = null;
}
let ju_MapEntry__init_ = ($this, $theKey, $theValue) => {
    jl_Object__init_($this);
    $this.$key = $theKey;
    $this.$value0 = $theValue;
},
ju_MapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_MapEntry();
    ju_MapEntry__init_(var_2, var_0, var_1);
    return var_2;
},
ju_MapEntry_equals = ($this, $object) => {
    let $entry;
    if ($this === $object)
        return 1;
    if (!$rt_isInstance($object, ju_Map$Entry))
        return 0;
    $entry = $object;
    return ju_Objects_equals($this.$key, $entry.$getKey()) && ju_Objects_equals($this.$value0, $entry.$getValue()) ? 1 : 0;
},
ju_MapEntry_getKey = $this => {
    return $this.$key;
},
ju_MapEntry_getValue = $this => {
    return $this.$value0;
},
ju_MapEntry_hashCode = $this => {
    return ju_Objects_hashCode($this.$key) ^ ju_Objects_hashCode($this.$value0);
},
ju_MapEntry_setValue = ($this, $object) => {
    let $result;
    $result = $this.$value0;
    $this.$value0 = $object;
    return $result;
},
ju_MapEntry_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = jl_String_valueOf($this.$key);
    var$2 = jl_String_valueOf($this.$value0);
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$3, var$1), 61), var$2);
    return jl_StringBuilder_toString(var$3);
};
function ju_HashMap$HashEntry() {
    let a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next3 = null;
}
let ju_HashMap$HashEntry__init_ = ($this, $theKey, $hash) => {
    ju_MapEntry__init_($this, $theKey, null);
    $this.$origKeyHash = $hash;
},
ju_HashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_LinkedHashMap$LinkedHashMapEntry() {
    let a = this; ju_HashMap$HashEntry.call(a);
    a.$chainForward = null;
    a.$chainBackward = null;
}
let ju_LinkedHashMap$LinkedHashMapEntry__init_ = ($this, $theKey, $hash) => {
    ju_HashMap$HashEntry__init_($this, $theKey, $hash);
    $this.$chainForward = null;
    $this.$chainBackward = null;
},
ju_LinkedHashMap$LinkedHashMapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMap$LinkedHashMapEntry();
    ju_LinkedHashMap$LinkedHashMapEntry__init_(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyASCII = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyASCII__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyASCII__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyASCII();
    jur_AbstractCharClass$LazyASCII__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyASCII_computeValue = $this => {
    return (jur_CharClass__init_()).$add0(0, 127);
};
function igiae_Activation$Tarjan() {
    let a = this; jl_Object.call(a);
    a.$dependencies = null;
    a.$index1 = null;
    a.$lowLink = null;
    a.$onStack = null;
    a.$stack = null;
    a.$cycles = null;
    a.$counter = 0;
}
let igiae_Activation$Tarjan__init_ = ($this, $dependencies) => {
    jl_Object__init_($this);
    $this.$index1 = ju_HashMap__init_();
    $this.$lowLink = ju_HashMap__init_();
    $this.$onStack = ju_HashSet__init_0();
    $this.$stack = ju_ArrayDeque__init_1();
    $this.$cycles = ju_ArrayList__init_();
    $this.$counter = 0;
    $this.$dependencies = $dependencies;
},
igiae_Activation$Tarjan__init_0 = var_0 => {
    let var_1 = new igiae_Activation$Tarjan();
    igiae_Activation$Tarjan__init_(var_1, var_0);
    return var_1;
},
igiae_Activation$Tarjan_visit = ($this, $id) => {
    let $needed, var$3, $dependency, $component, $member;
    a: {
        $this.$index1.$put($id, jl_Integer_valueOf($this.$counter));
        $this.$lowLink.$put($id, jl_Integer_valueOf($this.$counter));
        $this.$counter = $this.$counter + 1 | 0;
        $this.$stack.$push($id);
        $this.$onStack.$add2($id);
        $needed = $this.$dependencies.$get1($id);
        if ($needed !== null) {
            var$3 = $needed.$iterator();
            while (true) {
                if (!var$3.$hasNext())
                    break a;
                $dependency = var$3.$next();
                if (!$this.$index1.$containsKey($dependency)) {
                    igiae_Activation$Tarjan_visit($this, $dependency);
                    $this.$lowLink.$put($id, jl_Integer_valueOf(jl_Math_min(($this.$lowLink.$get1($id)).$intValue(), ($this.$lowLink.$get1($dependency)).$intValue())));
                } else if ($this.$onStack.$contains($dependency))
                    $this.$lowLink.$put($id, jl_Integer_valueOf(jl_Math_min(($this.$lowLink.$get1($id)).$intValue(), ($this.$index1.$get1($dependency)).$intValue())));
            }
        }
    }
    if (!($this.$lowLink.$get1($id)).$equals($this.$index1.$get1($id)))
        return;
    $component = ju_ArrayList__init_();
    while (true) {
        $member = $this.$stack.$pop();
        $this.$onStack.$remove1($member);
        $component.$add2($member);
        if (!jl_String_equals($member, $id))
            continue;
        else
            break;
    }
    if ($component.$size() > 1) {
        ju_Collections_reverse0($component);
        $this.$cycles.$add2($component);
    }
},
igiae_Activation$Tarjan_access$000 = $x0 => {
    return $x0.$index1;
},
igiae_Activation$Tarjan_access$100 = $x0 => {
    return $x0.$cycles;
};
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index0 = 0;
    a.$modCount1 = 0;
    a.$size1 = 0;
    a.$removeIndex = 0;
    a.$this$00 = null;
}
let ju_AbstractList$1__init_ = ($this, $this$0) => {
    $this.$this$00 = $this$0;
    jl_Object__init_($this);
    $this.$modCount1 = $this.$this$00.$modCount0;
    $this.$size1 = $this.$this$00.$size();
    $this.$removeIndex = (-1);
},
ju_AbstractList$1__init_0 = var_0 => {
    let var_1 = new ju_AbstractList$1();
    ju_AbstractList$1__init_(var_1, var_0);
    return var_1;
},
ju_AbstractList$1_hasNext = $this => {
    return $this.$index0 >= $this.$size1 ? 0 : 1;
},
ju_AbstractList$1_next = $this => {
    let var$1, var$2;
    ju_AbstractList$1_checkConcurrentModification($this);
    $this.$removeIndex = $this.$index0;
    var$1 = $this.$this$00;
    var$2 = $this.$index0;
    $this.$index0 = var$2 + 1 | 0;
    return var$1.$get(var$2);
},
ju_AbstractList$1_remove = $this => {
    if ($this.$removeIndex < 0)
        $rt_throw(jl_IllegalStateException__init_());
    ju_AbstractList$1_checkConcurrentModification($this);
    $this.$this$00.$remove($this.$removeIndex);
    $this.$modCount1 = $this.$this$00.$modCount0;
    if ($this.$removeIndex < $this.$index0)
        $this.$index0 = $this.$index0 - 1 | 0;
    $this.$size1 = $this.$size1 - 1 | 0;
    $this.$removeIndex = (-1);
},
ju_AbstractList$1_checkConcurrentModification = $this => {
    if ($this.$modCount1 == $this.$this$00.$modCount0)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
};
function jur_Quantifier() {
    let a = this; jur_SpecialToken.call(a);
    a.$min1 = 0;
    a.$max1 = 0;
}
let jur_Quantifier__init_ = ($this, $min, $max) => {
    jur_SpecialToken__init_($this);
    $this.$min1 = $min;
    $this.$max1 = $max;
},
jur_Quantifier__init_0 = (var_0, var_1) => {
    let var_2 = new jur_Quantifier();
    jur_Quantifier__init_(var_2, var_0, var_1);
    return var_2;
},
jur_Quantifier_min = $this => {
    return $this.$min1;
},
jur_Quantifier_max = $this => {
    return $this.$max1;
},
jur_Quantifier_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$min1;
    var$2 = $this.$max1 == 2147483647 ? $rt_s(10) : jl_Integer_toString($this.$max1);
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(var$3, 123), var$1), 44), var$2), 125);
    return jl_StringBuilder_toString(var$3);
};
function jur_AbstractCharClass$LazyJavaUpperCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$018 = null;
}
let jur_AbstractCharClass$LazyJavaUpperCase$1__init_ = ($this, $this$0) => {
    $this.$this$018 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUpperCase$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaUpperCase$1();
    jur_AbstractCharClass$LazyJavaUpperCase$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaUpperCase$1_contains = ($this, $ch) => {
    return jl_Character_isUpperCase($ch);
},
otpp_ResourceAccessor = $rt_classWithoutFields(),
jur_PossessiveQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_PossessiveQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_PossessiveQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_PossessiveQuantifierSet();
    jur_PossessiveQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_PossessiveQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    a: {
        while (true) {
            if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound())
                break a;
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$4 < 1)
                break;
            $stringIndex = $stringIndex + var$4 | 0;
        }
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
igiaj_JsErrors = $rt_classWithoutFields(),
igiaj_JsErrors_mint = ($pluginId, $detail, $fix) => {
    let var$4;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append0(var$4, 91), $pluginId), $rt_s(246)), $detail), $rt_s(247)), $fix);
    return igiaj_JsErrors_build$js_body$_3($rt_ustr($pluginId), $rt_ustr($detail), $rt_ustr($fix), $rt_ustr(jl_StringBuilder_toString(var$4)));
},
igiaj_JsErrors_of = $failure => {
    return igiaj_JsErrors_build$js_body$_3($rt_ustr($failure.$getPluginId()), $rt_ustr($failure.$getDetail()), $rt_ustr($failure.$getFix()), $rt_ustr($failure.$getMessage()));
},
igiaj_JsErrors_build$js_body$_3 = (var$1, var$2, var$3, var$4) => {
    var error = new Error(var$4);
    error.name = 'PluginError';
    error.pluginId = var$1;
    error.detail = var$2;
    error.fix = var$3;
    return error;
},
igiaj_JsErrors_raise$js_body$_4 = var$1 => {
    throw var$1;
},
igiaj_JsErrors_marked$js_body$_5 = var$1 => {
    return var$1 !== null && typeof var$1 === 'object' && var$1.name === 'PluginError';
};
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1() {
    jur_AbstractCharClass.call(this);
    this.$this$046 = null;
}
let jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_ = ($this, var$1) => {
    $this.$this$046 = var$1;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1();
    jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains = ($this, $ch) => {
    return jl_Character_isIdentifierIgnorable($ch);
};
function jur_AbstractCharClass$LazyJavaLetter$1() {
    jur_AbstractCharClass.call(this);
    this.$this$037 = null;
}
let jur_AbstractCharClass$LazyJavaLetter$1__init_ = ($this, $this$0) => {
    $this.$this$037 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLetter$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaLetter$1();
    jur_AbstractCharClass$LazyJavaLetter$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaLetter$1_contains = ($this, $ch) => {
    return jl_Character_isLetter($ch);
},
jur_ReluctantQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_ReluctantQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_ReluctantQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_ReluctantQuantifierSet();
    jur_ReluctantQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_ReluctantQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    while (true) {
        var$4 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if (var$4 >= 0)
            break;
        if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            $stringIndex = $stringIndex + var$4 | 0;
        }
        if (var$4 < 1)
            return (-1);
    }
    return var$4;
},
igiae_EventBus$Listener = $rt_classWithoutFields(0),
igiae_ManifestValidator = $rt_classWithoutFields(),
igiae_ManifestValidator_validate = ($value, $wellKnownServices) => {
    let $source, $structural, $issues;
    $source = igiae_ManifestValidator_stringAt($value, $rt_s(16));
    if (!($source !== null && !jl_String_isEmpty($source)))
        $source = $rt_s(304);
    $structural = igiae_SchemaValidator_validate($value, igiae_ManifestSchema_get(), $rt_s(305), $source);
    if (!$structural.$isEmpty())
        return $structural;
    $issues = ju_ArrayList__init_();
    $issues.$addAll(igiae_ManifestValidator_entryIssues($value));
    $issues.$addAll(igiae_ManifestValidator_providedServiceIssues($value, $wellKnownServices));
    $issues.$addAll(igiae_ManifestValidator_duplicateIssues($rt_s(17), igiae_ManifestValidator_listAt($value, $rt_s(17))));
    $issues.$addAll(igiae_ManifestValidator_duplicateIssues($rt_s(306), igiae_ManifestValidator_listAt(igiae_ManifestValidator_mapAt($value, $rt_s(296)), $rt_s(297))));
    $issues.$addAll(igiae_ManifestValidator_duplicateIssues($rt_s(307), igiae_ManifestValidator_listAt(igiae_ManifestValidator_mapAt($value, $rt_s(296)), $rt_s(298))));
    $issues.$addAll(igiae_ManifestValidator_duplicateIssues($rt_s(18), igiae_ManifestValidator_listAt($value, $rt_s(18))));
    return $issues;
},
igiae_ManifestValidator_require = ($value, $wellKnownServices) => {
    let $issues, $pluginId, $first;
    $issues = igiae_ManifestValidator_validate($value, $wellKnownServices);
    if ($issues.$isEmpty())
        return $value;
    $pluginId = igiae_ManifestValidator_stringAt($value, $rt_s(16));
    if (!($pluginId !== null && !jl_String_isEmpty($pluginId)))
        $pluginId = $rt_s(308);
    $first = $issues.$get(0);
    $rt_throw(igiae_PluginException__init_0($pluginId, (((((jl_StringBuilder__init_()).$append3($rt_s(309))).$append3(igiae_SchemaIssue_getPath($first))).$append3($rt_s(4))).$append3(igiae_SchemaIssue_getMessage($first))).$toString(), igiae_SchemaIssue_getFix($first)));
},
igiae_ManifestValidator_entryIssues = $value => {
    let $issues, $capabilities, $entry;
    $issues = ju_ArrayList__init_();
    $capabilities = igiae_ManifestValidator_listAt($value, $rt_s(17));
    $entry = igiae_ManifestValidator_stringAt($value, $rt_s(310));
    if ($capabilities !== null && !$capabilities.$isEmpty() && !($entry !== null && !jl_String_isEmpty($entry))) {
        $issues.$add2(igiae_SchemaIssue__init_0($rt_s(310), $rt_s(311), $rt_s(312)));
        return $issues;
    }
    if ($entry !== null && !jl_String_isEmpty($entry) && igiae_ManifestValidator_escapesRepo($entry))
        $issues.$add2(igiae_SchemaIssue__init_0($rt_s(310), ((((jl_StringBuilder__init_()).$append3($rt_s(313))).$append3($entry)).$append3($rt_s(314))).$toString(), $rt_s(315)));
    return $issues;
},
igiae_ManifestValidator_escapesRepo = $entry => {
    let var$2, var$3, var$4, $segment;
    if (!jl_String_startsWith($entry, $rt_s(316)) && !jl_String_startsWith($entry, $rt_s(317))) {
        if (jl_String_length($entry) >= 2 && jl_String_charAt($entry, 1) == 58 && jl_Character_isLetter0(jl_String_charAt($entry, 0)))
            return 1;
        var$2 = (jl_String_split($entry, $rt_s(318))).data;
        var$3 = var$2.length;
        var$4 = 0;
        while (var$4 < var$3) {
            $segment = var$2[var$4];
            if (jl_String_equals($rt_s(319), $segment))
                return 1;
            var$4 = var$4 + 1 | 0;
        }
        return 0;
    }
    return 1;
},
igiae_ManifestValidator_providedServiceIssues = ($value, $wellKnownServices) => {
    let $issues, $pluginId, $provides, $index, $serviceId, $tail, var$9, var$10, var$11, var$12;
    $issues = ju_ArrayList__init_();
    $pluginId = igiae_ManifestValidator_stringAt($value, $rt_s(16));
    $provides = igiae_ManifestValidator_listAt(igiae_ManifestValidator_mapAt($value, $rt_s(296)), $rt_s(297));
    if ($provides !== null && $wellKnownServices !== null) {
        $index = 0;
        while ($index < $provides.$size()) {
            $serviceId = jl_String_valueOf($provides.$get($index));
            if (!igiae_ManifestValidator_mayRegister($pluginId, $serviceId, $wellKnownServices)) {
                $tail = !jl_String_contains($serviceId, $rt_s(320)) ? $serviceId : jl_String_substring0($serviceId, jl_String_lastIndexOf0($serviceId, 58) + 1 | 0);
                var$9 = new igiae_SchemaIssue;
                var$10 = ((((jl_StringBuilder__init_()).$append3($rt_s(321))).$append2($index)).$append3($rt_s(322))).$toString();
                var$11 = ((((jl_StringBuilder__init_()).$append3($rt_s(313))).$append3($serviceId)).$append3($rt_s(323))).$toString();
                var$12 = (((((jl_StringBuilder__init_()).$append3($rt_s(324))).$append3($pluginId)).$append3($rt_s(320))).$append3($tail)).$append3($rt_s(325));
                igiae_SchemaIssue__init_(var$9, var$10, var$11, (var$12.$append3(igiae_ManifestValidator_join($wellKnownServices))).$toString());
                $issues.$add2(var$9);
            }
            $index = $index + 1 | 0;
        }
        return $issues;
    }
    return $issues;
},
igiae_ManifestValidator_mayRegister = ($pluginId, $serviceId, $wellKnownServices) => {
    let $separator;
    if ($wellKnownServices.$contains($serviceId))
        return 1;
    $separator = jl_String_indexOf1($serviceId, 58);
    if ($separator > 0 && $separator != (jl_String_length($serviceId) - 1 | 0))
        return jl_String_equals(jl_String_substring($serviceId, 0, $separator), $pluginId);
    return 0;
},
igiae_ManifestValidator_duplicateIssues = ($path, $values) => {
    let $issues, $seen, $index, $value;
    $issues = ju_ArrayList__init_();
    if ($values === null)
        return $issues;
    $seen = ju_HashSet__init_0();
    $index = 0;
    while ($index < $values.$size()) {
        $value = jl_String_valueOf($values.$get($index));
        if (!$seen.$add2($value))
            $issues.$add2(igiae_SchemaIssue__init_0((((((jl_StringBuilder__init_()).$append3($path)).$append3($rt_s(245))).$append2($index)).$append3($rt_s(322))).$toString(), ((((jl_StringBuilder__init_()).$append3($rt_s(313))).$append3($value)).$append3($rt_s(326))).$toString(), $rt_s(327)));
        $index = $index + 1 | 0;
    }
    return $issues;
},
igiae_ManifestValidator_stringAt = ($value, $key) => {
    let $found;
    $found = igiae_ManifestValidator_at($value, $key);
    return !($found instanceof jl_String) ? null : $found;
},
igiae_ManifestValidator_listAt = ($value, $key) => {
    let $found;
    $found = igiae_ManifestValidator_at($value, $key);
    return !$rt_isInstance($found, ju_List) ? null : $found;
},
igiae_ManifestValidator_mapAt = ($value, $key) => {
    let $found;
    $found = igiae_ManifestValidator_at($value, $key);
    if (!$rt_isInstance($found, ju_Map))
        $found = null;
    return $found;
},
igiae_ManifestValidator_at = ($value, $key) => {
    if (!$rt_isInstance($value, ju_Map))
        return null;
    return $value.$get1($key);
},
igiae_ManifestValidator_join = $values => {
    let $out, $index;
    if ($values === null)
        return $rt_s(10);
    $out = jl_StringBuilder__init_();
    $index = 0;
    while ($index < $values.$size()) {
        if ($index > 0)
            $out.$append3($rt_s(43));
        $out.$append3($values.$get($index));
        $index = $index + 1 | 0;
    }
    return $out.$toString();
},
jur_EOISet = $rt_classWithoutFields(jur_AbstractSet),
jur_EOISet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_EOISet__init_0 = () => {
    let var_0 = new jur_EOISet();
    jur_EOISet__init_(var_0);
    return var_0;
},
jur_EOISet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $rightBound;
    $rightBound = !$matchResult.$hasTransparentBounds() ? $matchResult.$getRightBound() : $testString.$length();
    if ($stringIndex < $rightBound)
        return (-1);
    $matchResult.$hitEnd = 1;
    $matchResult.$requireEnd = 1;
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_EOISet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_EOISet_getName = $this => {
    return $rt_s(328);
},
jur_AbstractCharClass$LazyUpper = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyUpper__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyUpper__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyUpper();
    jur_AbstractCharClass$LazyUpper__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyUpper_computeValue = $this => {
    return (jur_CharClass__init_()).$add0(65, 90);
},
igiae_ServiceHub$Recorder = $rt_classWithoutFields(0),
ju_HashMap$KeyIterator = $rt_classWithoutFields(ju_HashMap$AbstractMapIterator),
ju_HashMap$KeyIterator__init_ = ($this, $map) => {
    ju_HashMap$AbstractMapIterator__init_($this, $map);
},
ju_HashMap$KeyIterator__init_0 = var_0 => {
    let var_1 = new ju_HashMap$KeyIterator();
    ju_HashMap$KeyIterator__init_(var_1, var_0);
    return var_1;
},
ju_HashMap$KeyIterator_next = $this => {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $this.$currentEntry0.$key;
};
function igiae_PluginSession() {
    let a = this; jl_Object.call(a);
    a.$facts = null;
    a.$services0 = null;
    a.$events = null;
    a.$host = null;
}
let igiae_PluginSession__init_ = ($this, $host, $facts, $services, $events) => {
    jl_Object__init_($this);
    $this.$host = $host;
    $this.$facts = $facts;
    $this.$services0 = $services;
    $this.$events = $events;
},
igiae_PluginSession__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new igiae_PluginSession();
    igiae_PluginSession__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
igiae_PluginSession_getFacts = $this => {
    return $this.$facts;
},
igiae_PluginSession_getServices = $this => {
    return $this.$services0;
},
igiae_PluginSession_getEvents = $this => {
    return $this.$events;
},
igiae_PluginSession_provide = ($this, $id, $implementation) => {
    igiae_PluginHost_provide($this.$host, igiae_ManifestFacts_getId($this.$facts), $id, $implementation);
};
function otji_JSWrapper() {
    jl_Object.call(this);
    this.$js = null;
}
let otji_JSWrapper__init_0 = ($this, $js) => {
    jl_Object__init_($this);
    $this.$js = $js;
},
otji_JSWrapper__init_ = var_0 => {
    let var_1 = new otji_JSWrapper();
    otji_JSWrapper__init_0(var_1, var_0);
    return var_1;
},
otji_JSWrapper_wrap = $o => {
    let $type, $isObject, $wrappers, $existingRef, $existing, $wrapper, $jsString, $stringWrappers, $stringFinalizationRegistry, $wrapperAsJs, $jsNumber, $numberWrappers, $numberFinalizationRegistry;
    if ($o === null)
        return null;
    $type = $rt_str(typeof $o);
    $isObject = !jl_String_equals($type, $rt_s(329)) && !jl_String_equals($type, $rt_s(330)) ? 0 : 1;
    otji_JSWrapper$Helper_$callClinit();
    $wrappers = otji_JSWrapper$Helper_wrappers;
    if ($wrappers !== null) {
        if ($isObject) {
            $existingRef = $wrappers.get($o);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($o);
            $wrappers.set($o, new WeakRef($wrapper));
            return $wrapper;
        }
        if (jl_String_equals($type, $rt_s(260))) {
            $jsString = $o;
            $stringWrappers = otji_JSWrapper$Helper_stringWrappers;
            $stringFinalizationRegistry = otji_JSWrapper$Helper_stringFinalizationRegistry;
            $existingRef = $stringWrappers.get($jsString);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($o);
            $wrapperAsJs = $wrapper;
            $stringWrappers.set($jsString, new WeakRef($wrapperAsJs));
            $stringFinalizationRegistry.register($wrapperAsJs, $jsString);
            return $wrapper;
        }
        if (jl_String_equals($type, $rt_s(261))) {
            $jsNumber = $o;
            $numberWrappers = otji_JSWrapper$Helper_numberWrappers;
            $numberFinalizationRegistry = otji_JSWrapper$Helper_numberFinalizationRegistry;
            $existingRef = $numberWrappers.get($jsNumber);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($o);
            $wrapperAsJs = $wrapper;
            $numberWrappers.set($jsNumber, new WeakRef($wrapperAsJs));
            $numberFinalizationRegistry.register($wrapperAsJs, $jsNumber);
            return $wrapper;
        }
        if (jl_String_equals($type, $rt_s(331))) {
            $existingRef = otji_JSWrapper$Helper_undefinedWrapper;
            $existing = $existingRef === null ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($o);
            $wrapperAsJs = $wrapper;
            otji_JSWrapper$Helper_undefinedWrapper = new WeakRef($wrapperAsJs);
            return $wrapper;
        }
    }
    return otji_JSWrapper__init_($o);
},
otji_JSWrapper_unwrap = $o => {
    if ($o === null)
        return null;
    return !($o instanceof otji_JSWrapper) ? $o : $o.$js;
},
otji_JSWrapper_maybeUnwrap = $o => {
    if ($o === null)
        return null;
    return !($o instanceof $rt_objcls()) ? $o : otji_JSWrapper_unwrap($o);
},
igiaj_JsPluginHost$MarkBrokenFn = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$7() {
    jl_Object.call(this);
    this.$val$host1 = null;
}
let igiaj_JsPluginHost$7__init_ = ($this, var$1) => {
    $this.$val$host1 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$7__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$7();
    igiaj_JsPluginHost$7__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$7_call = ($this, $pluginId, $error) => {
    igiae_PluginHost_markBroken($this.$val$host1, $pluginId, igiaj_JsPluginHost_errorOf($pluginId, $error));
},
igiaj_JsPluginHost$7_call$exported$0 = (var$1, var$2, var$3) => {
    var$2 = $rt_str(var$2);
    var$1.$call3(var$2, var$3);
},
igiaj_JsPluginHost$ProvideServiceFn = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$6() {
    jl_Object.call(this);
    this.$val$host8 = null;
}
let igiaj_JsPluginHost$6__init_ = ($this, var$1) => {
    $this.$val$host8 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$6__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$6();
    igiaj_JsPluginHost$6__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$6_call = ($this, $id, $service) => {
    igiae_PluginHost_provideService($this.$val$host8, $id, otji_JSWrapper_wrap($service));
},
igiaj_JsPluginHost$6_call$exported$0 = (var$1, var$2, var$3) => {
    var$2 = $rt_str(var$2);
    var$1.$call3(var$2, var$3);
};
function igiaj_JsPluginHost$9() {
    jl_Object.call(this);
    this.$val$host7 = null;
}
let igiaj_JsPluginHost$9__init_ = ($this, var$1) => {
    $this.$val$host7 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$9__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$9();
    igiaj_JsPluginHost$9__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$9_call = $this => {
    let $rows, $out, $index, var$4;
    $rows = igiae_PluginLedger_entries(igiae_PluginHost_getLedger($this.$val$host7));
    $out = new Array();
    $index = 0;
    while ($index < $rows.$size()) {
        var$4 = igiaj_JsPluginHost_ledgerRow($rows.$get($index));
        $out[$index] = var$4;
        $index = $index + 1 | 0;
    }
    return $out;
},
igiaj_JsPluginHost$9_call$exported$0 = var$1 => {
    return var$1.$call2();
},
igiaj_JsPluginHost$ReleaseFn = $rt_classWithoutFields(0);
function igiaj_JsPluginHost$8() {
    jl_Object.call(this);
    this.$val$host6 = null;
}
let igiaj_JsPluginHost$8__init_ = ($this, var$1) => {
    $this.$val$host6 = var$1;
    jl_Object__init_($this);
},
igiaj_JsPluginHost$8__init_0 = var_0 => {
    let var_1 = new igiaj_JsPluginHost$8();
    igiaj_JsPluginHost$8__init_(var_1, var_0);
    return var_1;
},
igiaj_JsPluginHost$8_call = ($this, $pluginId) => {
    igiae_PluginHost_release($this.$val$host6, $pluginId);
},
igiaj_JsPluginHost$8_call$exported$0 = (var$1, var$2) => {
    var$2 = $rt_str(var$2);
    var$1.$call10(var$2);
},
igiaj_JsScheduler = $rt_classWithoutFields(),
igiaj_JsScheduler__init_ = $this => {
    jl_Object__init_($this);
},
igiaj_JsScheduler__init_0 = () => {
    let var_0 = new igiaj_JsScheduler();
    igiaj_JsScheduler__init_(var_0);
    return var_0;
},
igiaj_JsScheduler_schedule = ($this, $task, $delayMillis) => {
    let var$3, var$4, $handle;
    var$3 = igiaj_JsScheduler$1__init_0($this, $task);
    var$4 = Long_toNumber($delayMillis);
    $handle = setTimeout(otji_JS_function(otji_JSWrapper_unwrap(var$3), "run"), var$4);
    return igiaj_JsScheduler$2__init_0($this, $handle);
};
function jur_MultiLineSOLSet() {
    jur_AbstractSet.call(this);
    this.$lt1 = null;
}
let jur_MultiLineSOLSet__init_ = ($this, $lt) => {
    jur_AbstractSet__init_($this);
    $this.$lt1 = $lt;
},
jur_MultiLineSOLSet__init_0 = var_0 => {
    let var_1 = new jur_MultiLineSOLSet();
    jur_MultiLineSOLSet__init_(var_1, var_0);
    return var_1;
},
jur_MultiLineSOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let var$4, var$5;
    a: {
        if ($strIndex != $matchResult.$getRightBound()) {
            if (!$strIndex)
                break a;
            if ($matchResult.$hasAnchoringBounds() && $strIndex == $matchResult.$getLeftBound())
                break a;
            var$4 = $this.$lt1;
            var$5 = $strIndex - 1 | 0;
            if (var$4.$isAfterLineTerminator($testString.$charAt(var$5), $testString.$charAt($strIndex)))
                break a;
        }
        return (-1);
    }
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_MultiLineSOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_MultiLineSOLSet_getName = $this => {
    return $rt_s(332);
};
function igiae_ServiceHub() {
    let a = this; jl_Object.call(a);
    a.$scheduler = null;
    a.$recorder = null;
    a.$entries0 = null;
    a.$waiters = null;
    a.$watchers = null;
    a.$watching = null;
    a.$wellKnown0 = null;
}
let igiae_ServiceHub__init_ = ($this, $scheduler, $recorder) => {
    jl_Object__init_($this);
    $this.$entries0 = ju_LinkedHashMap__init_();
    $this.$waiters = ju_LinkedHashMap__init_();
    $this.$watchers = ju_LinkedHashMap__init_();
    $this.$watching = ju_LinkedHashMap__init_();
    $this.$wellKnown0 = ju_ArrayList__init_();
    if ($scheduler === null) {
        igiae_Scheduler_$callClinit();
        $scheduler = igiae_Scheduler_NEVER;
    }
    $this.$scheduler = $scheduler;
    $this.$recorder = $recorder;
},
igiae_ServiceHub__init_0 = (var_0, var_1) => {
    let var_2 = new igiae_ServiceHub();
    igiae_ServiceHub__init_(var_2, var_0, var_1);
    return var_2;
},
igiae_ServiceHub_wellKnown = ($this, $ids) => {
    $this.$wellKnown0 = $ids !== null ? ju_ArrayList__init_0($ids) : ju_ArrayList__init_();
},
igiae_ServiceHub_forPlugin = ($this, $pluginId) => {
    return igiae_ServiceHub$1__init_0($this, $pluginId);
},
igiae_ServiceHub_hostService = ($this, $id, $service) => {
    let $pending, var$4, $waiter;
    a: {
        $this.$entries0.$put($id, igiae_ServiceHub$Entry__init_($rt_s(10), $service));
        $pending = $this.$waiters.$remove2($id);
        if ($pending !== null) {
            var$4 = $pending.$iterator();
            while (true) {
                if (!var$4.$hasNext())
                    break a;
                $waiter = var$4.$next();
                if (igiae_ServiceHub$Waiter_access$600($waiter) !== null)
                    (igiae_ServiceHub$Waiter_access$600($waiter)).$cancel();
                igiae_Pending_resolve(igiae_ServiceHub$Waiter_access$700($waiter), $service);
            }
        }
    }
    igiae_ServiceHub_notifyWatchers($this, $id, $service, 1);
},
igiae_ServiceHub_get = ($this, $id) => {
    let $entry;
    $entry = $this.$entries0.$get1($id);
    return $entry !== null ? igiae_ServiceHub$Entry_access$200($entry) : null;
},
igiae_ServiceHub_ids = $this => {
    return ju_ArrayList__init_0($this.$entries0.$keySet());
},
igiae_ServiceHub_releasePlugin = ($this, $pluginId) => {
    let $owned, var$3, $stop, $registered, $pending, $waiting, $waiter;
    a: {
        $owned = $this.$watching.$get1($pluginId);
        if ($owned !== null) {
            var$3 = (ju_ArrayList__init_0($owned)).$iterator();
            while (true) {
                if (!var$3.$hasNext())
                    break a;
                $stop = var$3.$next();
                $stop.$cancel();
            }
        }
    }
    $this.$watching.$remove2($pluginId);
    var$3 = (ju_ArrayList__init_0($this.$entries0.$entrySet())).$iterator();
    while (var$3.$hasNext()) {
        $registered = var$3.$next();
        if (jl_String_equals(igiae_ServiceHub$Entry_access$800($registered.$getValue()), $pluginId))
            igiae_ServiceHub_unregister($this, $pluginId, $registered.$getKey());
    }
    $pending = ($this.$waiters.$entrySet()).$iterator();
    while ($pending.$hasNext()) {
        $waiting = $pending.$next();
        var$3 = (ju_ArrayList__init_0($waiting.$getValue())).$iterator();
        while (var$3.$hasNext()) {
            $waiter = var$3.$next();
            if (!jl_String_equals(igiae_ServiceHub$Waiter_access$900($waiter), $pluginId))
                continue;
            ($waiting.$getValue()).$remove1($waiter);
            if (igiae_ServiceHub$Waiter_access$600($waiter) !== null)
                (igiae_ServiceHub$Waiter_access$600($waiter)).$cancel();
            igiae_Pending_reject(igiae_ServiceHub$Waiter_access$700($waiter), igiae_ServiceHub_stoppedWaiting($pluginId, $waiting.$getKey()));
        }
        if (($waiting.$getValue()).$isEmpty())
            $pending.$remove0();
    }
},
igiae_ServiceHub_addService = ($this, $pluginId, $id, $service) => {
    let $existing, var$5, var$6, $pending, $waiter, $name, var$10, var$11;
    if (igiae_ServiceHub_mayRegister($this, $pluginId, $id)) {
        $existing = $this.$entries0.$get1($id);
        if ($existing !== null) {
            var$5 = new igiae_PluginException;
            var$6 = (((jl_StringBuilder__init_()).$append3($rt_s(333))).$append3($id)).$append3($rt_s(334));
            igiae_PluginException__init_(var$5, $pluginId, (var$6.$append3(igiae_ServiceHub$Entry_access$800($existing))).$toString(), $rt_s(335));
            $rt_throw(var$5);
        }
        a: {
            $this.$entries0.$put($id, igiae_ServiceHub$Entry__init_($pluginId, $service));
            igiae_ServiceHub_provided($this, $pluginId, $id);
            $pending = $this.$waiters.$remove2($id);
            if ($pending !== null) {
                var$6 = $pending.$iterator();
                while (true) {
                    if (!var$6.$hasNext())
                        break a;
                    $waiter = var$6.$next();
                    if (igiae_ServiceHub$Waiter_access$600($waiter) !== null)
                        (igiae_ServiceHub$Waiter_access$600($waiter)).$cancel();
                    igiae_Pending_resolve(igiae_ServiceHub$Waiter_access$700($waiter), $service);
                }
            }
        }
        igiae_ServiceHub_notifyWatchers($this, $id, $service, 1);
        return igiae_ServiceHub$2__init_0($this, $pluginId, $id);
    }
    $name = !jl_String_contains($id, $rt_s(320)) ? $id : jl_String_substring0($id, jl_String_lastIndexOf0($id, 58) + 1 | 0);
    var$6 = new igiae_PluginException;
    var$10 = ((((jl_StringBuilder__init_()).$append3($rt_s(336))).$append3($id)).$append3($rt_s(337))).$toString();
    var$5 = (((((jl_StringBuilder__init_()).$append3($rt_s(338))).$append3($pluginId)).$append3($rt_s(320))).$append3($name)).$append3($rt_s(339));
    var$11 = $this.$wellKnown0;
    igiae_PluginException__init_(var$6, $pluginId, var$10, (var$5.$append3(igiae_ServiceHub_join(var$11))).$toString());
    $rt_throw(var$6);
},
igiae_ServiceHub_unregister = ($this, $pluginId, $id) => {
    let $entry;
    $entry = $this.$entries0.$get1($id);
    if ($entry !== null && jl_String_equals(igiae_ServiceHub$Entry_access$800($entry), $pluginId)) {
        $this.$entries0.$remove2($id);
        igiae_ServiceHub_notifyWatchers($this, $id, null, 0);
        return;
    }
},
igiae_ServiceHub_awaitService = ($this, $pluginId, $id, $timeoutMillis) => {
    let $entry, $settled, $waiter, $millis, $pending;
    igiae_ServiceHub_consumed($this, $pluginId, $id);
    $entry = $this.$entries0.$get1($id);
    if ($entry !== null)
        return igiae_Pending_of(igiae_ServiceHub$Entry_access$200($entry));
    $settled = igiae_Pending__init_();
    $waiter = igiae_ServiceHub$Waiter__init_0($pluginId, $settled);
    if ($timeoutMillis !== null) {
        $millis = $timeoutMillis.$longValue();
        igiae_ServiceHub$Waiter_access$602($waiter, $this.$scheduler.$schedule(igiae_ServiceHub$3__init_0($this, $id, $waiter, $pluginId, $millis), $millis));
    }
    $pending = $this.$waiters.$get1($id);
    if ($pending === null) {
        $pending = ju_LinkedHashSet__init_();
        $this.$waiters.$put($id, $pending);
    }
    $pending.$add2($waiter);
    return $settled;
},
igiae_ServiceHub_addWatcher = ($this, $pluginId, $id, $listener) => {
    let $listeners;
    igiae_ServiceHub_consumed($this, $pluginId, $id);
    $listeners = $this.$watchers.$get1($id);
    if ($listeners === null) {
        $listeners = ju_LinkedHashSet__init_();
        $this.$watchers.$put($id, $listeners);
    }
    $listeners.$add2($listener);
    return igiae_ServiceHub_tracked($this, $pluginId, igiae_ServiceHub$4__init_0($this, $listeners, $listener));
},
igiae_ServiceHub_tracked = ($this, $pluginId, $dispose) => {
    let $done, $self, var$5, $owned;
    $done = $rt_createBooleanArray(1);
    $self = $rt_createArray(igiae_Scheduler$Cancellable, 1);
    var$5 = $self.data;
    var$5[0] = igiae_ServiceHub$5__init_0($this, $done, $dispose, $pluginId, $self);
    $owned = $this.$watching.$get1($pluginId);
    if ($owned === null) {
        $owned = ju_ArrayList__init_();
        $this.$watching.$put($pluginId, $owned);
    }
    $owned.$add2(var$5[0]);
    return var$5[0];
},
igiae_ServiceHub_notifyWatchers = ($this, $id, $service, $registered) => {
    let $listeners, var$5, $listener, var$7, $failure, $$je;
    $listeners = $this.$watchers.$get1($id);
    if ($listeners === null)
        return;
    var$5 = (ju_ArrayList__init_0($listeners)).$iterator();
    while (var$5.$hasNext()) {
        $listener = var$5.$next();
        if (!$listeners.$contains($listener))
            continue;
        a: {
            try {
                $listener.$changed($service, $registered);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_RuntimeException) {
                    $failure = $$je;
                    var$7 = (((jl_StringBuilder__init_()).$append3($rt_s(340))).$append3($id)).$append3($rt_s(341));
                    var$7 = (((var$7.$append3(!$registered ? $rt_s(25) : $rt_s(26))).$append3($rt_s(4))).$append($failure)).$toString();
                    igiae_Diagnostics_report(var$7);
                    break a;
                } else {
                    throw $$e;
                }
            }
        }
    }
},
igiae_ServiceHub_mayRegister = ($this, $pluginId, $serviceId) => {
    let $separator;
    if ($this.$wellKnown0.$contains($serviceId))
        return 1;
    $separator = jl_String_indexOf1($serviceId, 58);
    if ($separator > 0 && $separator != (jl_String_length($serviceId) - 1 | 0))
        return jl_String_equals(jl_String_substring($serviceId, 0, $separator), $pluginId);
    return 0;
},
igiae_ServiceHub_stoppedWaiting = ($pluginId, $id) => {
    return igiae_PluginException__init_0($pluginId, ((((jl_StringBuilder__init_()).$append3($rt_s(342))).$append3($id)).$append3($rt_s(313))).$toString(), ((((jl_StringBuilder__init_()).$append3($rt_s(343))).$append3($id)).$append3($rt_s(344))).$toString());
},
igiae_ServiceHub_provided = ($this, $pluginId, $serviceId) => {
    if ($this.$recorder !== null)
        $this.$recorder.$provided($pluginId, $serviceId);
},
igiae_ServiceHub_consumed = ($this, $pluginId, $serviceId) => {
    if ($this.$recorder !== null)
        $this.$recorder.$consumed($pluginId, $serviceId);
},
igiae_ServiceHub_join = $values => {
    let $out, $index;
    $out = jl_StringBuilder__init_();
    $index = 0;
    while ($index < $values.$size()) {
        if ($index > 0)
            $out.$append3($rt_s(43));
        $out.$append3($values.$get($index));
        $index = $index + 1 | 0;
    }
    return $out.$toString();
},
igiae_ServiceHub_access$000 = ($x0, $x1, $x2) => {
    igiae_ServiceHub_consumed($x0, $x1, $x2);
},
igiae_ServiceHub_access$100 = $x0 => {
    return $x0.$entries0;
},
igiae_ServiceHub_access$300 = ($x0, $x1, $x2, $x3) => {
    return igiae_ServiceHub_awaitService($x0, $x1, $x2, $x3);
},
igiae_ServiceHub_access$400 = ($x0, $x1, $x2, $x3) => {
    return igiae_ServiceHub_addWatcher($x0, $x1, $x2, $x3);
},
igiae_ServiceHub_access$500 = ($x0, $x1, $x2, $x3) => {
    return igiae_ServiceHub_addService($x0, $x1, $x2, $x3);
},
igiae_ServiceHub_access$1000 = ($x0, $x1, $x2) => {
    igiae_ServiceHub_unregister($x0, $x1, $x2);
},
igiae_ServiceHub_access$1100 = $x0 => {
    return $x0.$waiters;
},
igiae_ServiceHub_access$1200 = $x0 => {
    return $x0.$watching;
},
otjc_JSString = $rt_classWithoutFields(),
otjc_JSString_stringValue$static = $this => {
    return $rt_str($this);
},
otcic_JSStderrPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStderrPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStderrPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStderrPrintStream();
    otcic_JSStderrPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStderrPrintStream_print = ($this, $s) => {
    if ($s === null)
        $s = $rt_s(44);
    $rt_putStderr($rt_ustr($s));
},
jur_AbstractCharClass$LazyLower = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyLower__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyLower__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyLower();
    jur_AbstractCharClass$LazyLower__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyLower_computeValue = $this => {
    return (jur_CharClass__init_()).$add0(97, 122);
},
jur_AbstractCharClass$LazyJavaTitleCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaTitleCase__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaTitleCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaTitleCase();
    jur_AbstractCharClass$LazyJavaTitleCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaTitleCase_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaTitleCase$1__init_0($this);
},
jur_PreviousMatch = $rt_classWithoutFields(jur_AbstractSet),
jur_PreviousMatch__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_PreviousMatch__init_0 = () => {
    let var_0 = new jur_PreviousMatch();
    jur_PreviousMatch__init_(var_0);
    return var_0;
},
jur_PreviousMatch_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($stringIndex != $matchResult.$getPreviousMatchEnd())
        return (-1);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_PreviousMatch_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PreviousMatch_getName = $this => {
    return $rt_s(345);
},
jur_NonCapFSet = $rt_classWithoutFields(jur_FSet),
jur_NonCapFSet__init_ = ($this, $groupIndex) => {
    jur_FSet__init_($this, $groupIndex);
},
jur_NonCapFSet__init_0 = var_0 => {
    let var_1 = new jur_NonCapFSet();
    jur_NonCapFSet__init_(var_1, var_0);
    return var_1;
};
let jur_NonCapFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$getGroupIndex();
    $matchResult.$setConsumed($gr, $stringIndex - $matchResult.$getConsumed($gr) | 0);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_NonCapFSet_getName = $this => {
    return $rt_s(346);
},
jur_NonCapFSet_hasConsumed = ($this, $mr) => {
    return 0;
};
function jur_UCISupplCharSet() {
    jur_LeafSet.call(this);
    this.$ch4 = 0;
}
let jur_UCISupplCharSet__init_ = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$charCount0 = 2;
    $this.$ch4 = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
},
jur_UCISupplCharSet__init_0 = var_0 => {
    let var_1 = new jur_UCISupplCharSet();
    jur_UCISupplCharSet__init_(var_1, var_0);
    return var_1;
},
jur_UCISupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let var$3, $high, $low;
    var$3 = $strIndex + 1 | 0;
    $high = $testString.$charAt($strIndex);
    $low = $testString.$charAt(var$3);
    return $this.$ch4 != jl_Character_toLowerCase0(jl_Character_toUpperCase0(jl_Character_toCodePoint($high, $low))) ? (-1) : 2;
},
jur_UCISupplCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jl_String__init_(jl_Character_toChars($this.$ch4));
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(271)), var$1);
    return jl_StringBuilder_toString(var$2);
},
jl_System = $rt_classWithoutFields(),
jl_System_errCache = null,
jl_System_err = () => {
    if (jl_System_errCache === null)
        jl_System_errCache = otcic_JSStderrPrintStream__init_0();
    return jl_System_errCache;
},
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
            var$6 = $destPos + $length | 0;
            if (var$6 <= jlr_Array_getLength($dest)) {
                a: {
                    b: {
                        if ($src !== $dest) {
                            $srcType = jl_Class_getComponentType(jl_Object_getClass($src));
                            $targetType = jl_Class_getComponentType(jl_Object_getClass($dest));
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break b;
                                if (!jl_Class_isPrimitive($srcType) && !jl_Class_isPrimitive($targetType)) {
                                    $srcArray = $src;
                                    $i = 0;
                                    var$6 = $srcPos;
                                    while ($i < $length) {
                                        var$11 = $srcArray.data;
                                        var$12 = var$6 + 1 | 0;
                                        $elem = var$11[var$6];
                                        if (!jl_Class_isInstance($targetType, $elem)) {
                                            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                            $rt_throw(jl_ArrayStoreException__init_());
                                        }
                                        $i = $i + 1 | 0;
                                        var$6 = var$12;
                                    }
                                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                    return;
                                }
                                if (!jl_Class_isPrimitive($srcType))
                                    break a;
                                if (jl_Class_isPrimitive($targetType))
                                    break b;
                                else
                                    break a;
                            }
                            $rt_throw(jl_ArrayStoreException__init_());
                        }
                    }
                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                    return;
                }
                $rt_throw(jl_ArrayStoreException__init_());
            }
        }
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    $rt_throw(jl_NullPointerException__init_($rt_s(347)));
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let var$6;
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
        var$6 = $destPos + $length | 0;
        if (var$6 <= jlr_Array_getLength($dest)) {
            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
            return;
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_());
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_System_getenv = var$1 => {
    return null;
};
function igiae_PluginHost$1() {
    jl_Object.call(this);
    this.$this$06 = null;
}
let igiae_PluginHost$1__init_ = ($this, $this$0) => {
    $this.$this$06 = $this$0;
    jl_Object__init_($this);
},
igiae_PluginHost$1__init_0 = var_0 => {
    let var_1 = new igiae_PluginHost$1();
    igiae_PluginHost$1__init_(var_1, var_0);
    return var_1;
},
igiae_PluginHost$1_provided = ($this, $pluginId, $serviceId) => {
    igiae_PluginLedger_recordServiceProvided(igiae_PluginHost_access$000($this.$this$06), $pluginId, $serviceId);
},
igiae_PluginHost$1_consumed = ($this, $pluginId, $serviceId) => {
    igiae_PluginLedger_recordServiceConsumed(igiae_PluginHost_access$000($this.$this$06), $pluginId, $serviceId);
},
igiaj_JsPluginContext = $rt_classWithoutFields(),
igiaj_JsPluginContext_build = ($session, $runtime, $hostDescriptor) => {
    let $services, $events, $manifest, $get, $want, $watch, $register, $ids, $servicesObj, $publish, $subscribe, $eventsObj, $provide, $capability, $service, $topic, $registry, $homes;
    $services = igiae_PluginSession_getServices($session);
    $events = igiae_PluginSession_getEvents($session);
    $manifest = otji_JSWrapper_unwrap(igiae_ManifestFacts_getPayload(igiae_PluginSession_getFacts($session)));
    $get = igiaj_JsPluginContext$1__init_0($services);
    $want = igiaj_JsPluginContext$2__init_0($services);
    $watch = igiaj_JsPluginContext$3__init_0($services);
    $register = igiaj_JsPluginContext$4__init_0($services);
    $ids = igiaj_JsPluginContext$5__init_0($services);
    $servicesObj = igiaj_JsPluginContext_servicesObject$js_body$_7(otji_JS_function(otji_JSWrapper_unwrap($get), "call"), otji_JS_function(otji_JSWrapper_unwrap($want), "call"), otji_JS_function(otji_JSWrapper_unwrap($watch), "call"), otji_JS_function(otji_JSWrapper_unwrap($register), "call"), otji_JS_function(otji_JSWrapper_unwrap($ids), "call"));
    $publish = igiaj_JsPluginContext$6__init_0($events);
    $subscribe = igiaj_JsPluginContext$7__init_0($events);
    $eventsObj = igiaj_JsPluginContext_eventsObject$js_body$_8(otji_JS_function(otji_JSWrapper_unwrap($publish), "call"), otji_JS_function(otji_JSWrapper_unwrap($subscribe), "call"));
    $provide = igiaj_JsPluginContext$8__init_0($session);
    $capability = igiaj_JsPluginContext$9__init_0();
    $service = igiaj_JsPluginContext$10__init_0();
    $topic = igiaj_JsPluginContext$11__init_0();
    $registry = $runtime.homes;
    $homes = igiaj_JsPluginContext$12__init_0($registry);
    return igiaj_JsPluginContext_assemble$js_body$_9($manifest, $hostDescriptor, $runtime.config, $runtime.log, $runtime.paths, $servicesObj, $eventsObj, otji_JS_function(otji_JSWrapper_unwrap($provide), "call"), otji_JS_function(otji_JSWrapper_unwrap($capability), "call"), otji_JS_function(otji_JSWrapper_unwrap($service), "call"), otji_JS_function(otji_JSWrapper_unwrap($topic), "call"), otji_JS_function(otji_JSWrapper_unwrap($homes), "call"));
},
igiaj_JsPluginContext_disposerOf = $cancellable => {
    return otji_JSWrapper_unwrap(igiaj_JsPluginContext$13__init_0($cancellable));
},
igiaj_JsPluginContext_timeoutOf = $options => {
    let $tree, $value;
    if ($options === null)
        return null;
    $tree = igiaj_JsJson_toTree($options);
    $value = !$rt_isInstance($tree, ju_Map) ? null : $tree.$get1($rt_s(348));
    return !($value instanceof jl_Number) ? null : jl_Long_valueOf($value.$longValue());
},
igiaj_JsPluginContext_typedKey$js_body$_2 = var$1 => {
    return { id : String(var$1) };
},
igiaj_JsPluginContext_homesOf$js_body$_3 = var$1 => {
    return var$1 === null || var$1 === undefined ? [] : var$1.all();
},
igiaj_JsPluginContext_capabilityId$js_body$_4 = var$1 => {
    return var$1 !== null && typeof var$1 === 'object' ? String(var$1.id) : String(var$1);
},
igiaj_JsPluginContext_servicesObject$js_body$_7 = (var$1, var$2, var$3, var$4, var$5) => {
    return { get : var$1, want : var$2, watch : var$3, register : var$4, ids : var$5 };
},
igiaj_JsPluginContext_eventsObject$js_body$_8 = (var$1, var$2) => {
    return { publish : var$1, subscribe : var$2 };
},
igiaj_JsPluginContext_assemble$js_body$_9 = (var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12) => {
    return { manifest : var$1, host : var$2, config : var$3, log : var$4, paths : var$5, services : var$6, events : var$7, provide : var$8, capability : var$9, service : var$10, topic : var$11, homes : var$12 };
};
function igiae_PluginHost() {
    let a = this; jl_Object.call(a);
    a.$app0 = null;
    a.$api = 0;
    a.$surfaces = null;
    a.$ledger = null;
    a.$hub = null;
    a.$capabilities = null;
    a.$disposers = null;
    a.$revoked = null;
    a.$known = null;
}
let igiae_PluginHost__init_ = ($this, var$1, var$2, var$3, var$4) => {
    jl_Object__init_($this);
    $this.$ledger = igiae_PluginLedger__init_0();
    $this.$capabilities = ju_LinkedHashMap__init_();
    $this.$disposers = ju_LinkedHashMap__init_();
    $this.$revoked = ju_HashSet__init_0();
    $this.$known = ju_ArrayList__init_();
    $this.$app0 = var$1;
    $this.$api = var$2;
    $this.$surfaces = var$3 !== null ? ju_ArrayList__init_0(var$3) : ju_ArrayList__init_();
    $this.$hub = igiae_ServiceHub__init_0(var$4, igiae_PluginHost$1__init_0($this));
},
igiae_PluginHost__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new igiae_PluginHost();
    igiae_PluginHost__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
igiae_PluginHost_getApp = $this => {
    return $this.$app0;
},
igiae_PluginHost_getApi = $this => {
    return $this.$api;
},
igiae_PluginHost_getSurfaces = $this => {
    return ju_Collections_unmodifiableList($this.$surfaces);
},
igiae_PluginHost_getLedger = $this => {
    return $this.$ledger;
},
igiae_PluginHost_knownCapabilities = ($this, $ids) => {
    $this.$known = $ids !== null ? ju_ArrayList__init_0($ids) : ju_ArrayList__init_();
},
igiae_PluginHost_wellKnownServices = ($this, $ids) => {
    igiae_ServiceHub_wellKnown($this.$hub, $ids);
},
igiae_PluginHost_supports = ($this, $pluginId, $pluginApi) => {
    if ($pluginApi <= $this.$api)
        return null;
    return igiae_PluginException__init_0($pluginId, (((((jl_StringBuilder__init_()).$append3($rt_s(349))).$append2($pluginApi)).$append3($rt_s(350))).$append2($this.$api)).$toString(), ((((jl_StringBuilder__init_()).$append3($rt_s(351))).$append2($pluginApi)).$append3($rt_s(352))).$toString());
},
igiae_PluginHost_sessionFor = ($this, $facts, $bus) => {
    let $pluginId;
    $pluginId = igiae_ManifestFacts_getId($facts);
    $this.$revoked.$remove1($pluginId);
    igiae_PluginLedger_recordDeclared($this.$ledger, $pluginId, igiae_ManifestFacts_getCapabilities($facts), igiae_ManifestFacts_getPermissions($facts));
    return igiae_PluginSession__init_0($this, $facts, igiae_PluginHost_fenced($this, $pluginId, igiae_ServiceHub_forPlugin($this.$hub, $pluginId)), igiae_PluginHost_recording($this, $pluginId, $bus));
},
igiae_PluginHost_verifyActivation = ($this, $facts) => {
    let $pluginId, $declared, $entry, $provided, $missing, var$7, var$8, var$9, $extra, var$11;
    $pluginId = igiae_ManifestFacts_getId($facts);
    $declared = igiae_ManifestFacts_getCapabilities($facts);
    $entry = igiae_PluginLedger_entry($this.$ledger, $pluginId);
    $provided = $entry !== null ? igiae_LedgerEntry_getCapabilitiesProvided($entry) : ju_ArrayList__init_();
    $missing = igiae_PluginHost_missingFrom($declared, $provided);
    if (!$missing.$isEmpty()) {
        var$7 = new igiae_PluginException;
        var$8 = (jl_StringBuilder__init_()).$append3($rt_s(353));
        var$9 = (var$8.$append3(igiae_PluginHost_join($missing))).$toString();
        var$8 = (jl_StringBuilder__init_()).$append3($rt_s(354));
        igiae_PluginException__init_(var$7, $pluginId, var$9, ((var$8.$append3($missing.$get(0))).$append3($rt_s(355))).$toString());
        return var$7;
    }
    $extra = igiae_PluginHost_missingFrom($provided, $declared);
    if ($extra.$isEmpty()) {
        var$11 = $this.$ledger;
        igiae_PluginStatus_$callClinit();
        igiae_PluginLedger_recordStatus(var$11, $pluginId, igiae_PluginStatus_ACTIVE, null, null);
        return null;
    }
    var$7 = new igiae_PluginException;
    var$8 = (jl_StringBuilder__init_()).$append3($rt_s(356));
    var$8 = (var$8.$append3(igiae_PluginHost_join($extra))).$toString();
    var$9 = (jl_StringBuilder__init_()).$append3($rt_s(357));
    igiae_PluginException__init_(var$7, $pluginId, var$8, ((var$9.$append3($extra.$get(0))).$append3($rt_s(358))).$toString());
    return var$7;
},
igiae_PluginHost_capability = ($this, $id) => {
    let $records;
    $records = $this.$capabilities.$get1($id);
    return $records !== null ? ju_ArrayList__init_0($records) : ju_ArrayList__init_();
},
igiae_PluginHost_service = ($this, $id) => {
    return igiae_ServiceHub_get($this.$hub, $id);
},
igiae_PluginHost_provideService = ($this, $id, $service) => {
    igiae_ServiceHub_hostService($this.$hub, $id, $service);
},
igiae_PluginHost_markBroken = ($this, $pluginId, $error) => {
    let var$3;
    igiae_PluginHost_strip($this, $pluginId);
    var$3 = $this.$ledger;
    igiae_PluginStatus_$callClinit();
    igiae_PluginLedger_recordStatus(var$3, $pluginId, igiae_PluginStatus_BROKEN, $error.$getDetail(), $error.$getFix());
},
igiae_PluginHost_release = ($this, $pluginId) => {
    let var$2;
    igiae_PluginHost_strip($this, $pluginId);
    var$2 = $this.$ledger;
    igiae_PluginStatus_$callClinit();
    igiae_PluginLedger_recordStatus(var$2, $pluginId, igiae_PluginStatus_STOPPED, null, null);
},
igiae_PluginHost_provide = ($this, $pluginId, $id, $implementation) => {
    let $records, var$5, $record;
    if (igiae_PluginHost_refuseLate($this, $pluginId, $rt_s(359), $id))
        return;
    if (!$this.$known.$isEmpty() && !$this.$known.$contains($id))
        igiae_Diagnostics_ignoreUnknown($rt_s(360), $id, $pluginId);
    $records = $this.$capabilities.$get1($id);
    if ($records === null) {
        $records = ju_ArrayList__init_();
        $this.$capabilities.$put($id, $records);
    }
    var$5 = $records.$iterator();
    while (var$5.$hasNext()) {
        $record = var$5.$next();
        if (jl_String_equals(igiae_CapabilityRecord_getPluginId($record), $pluginId))
            $rt_throw(igiae_PluginException__init_0($pluginId, ((((jl_StringBuilder__init_()).$append3($rt_s(361))).$append3($id)).$append3($rt_s(362))).$toString(), $rt_s(363)));
    }
    $records.$add2(igiae_CapabilityRecord__init_0($pluginId, $implementation));
    igiae_PluginLedger_recordCapabilityProvided($this.$ledger, $pluginId, $id);
},
igiae_PluginHost_strip = ($this, $pluginId) => {
    $this.$revoked.$add2($pluginId);
    igiae_PluginHost_dropCapabilities($this, $pluginId);
    igiae_PluginHost_detach($this, $pluginId);
    igiae_ServiceHub_releasePlugin($this.$hub, $pluginId);
},
igiae_PluginHost_refuseLate = ($this, $pluginId, $what, $id) => {
    if (!$this.$revoked.$contains($pluginId))
        return 0;
    igiae_Diagnostics_report(((((((((jl_StringBuilder__init_()).$append3($rt_s(364))).$append3($what)).$append3($rt_s(35))).$append3($id)).$append3($rt_s(36))).$append3($pluginId)).$append3($rt_s(365))).$toString());
    return 1;
},
igiae_PluginHost_fenced = ($this, $pluginId, $registry) => {
    return igiae_PluginHost$2__init_0($this, $registry, $pluginId);
},
igiae_PluginHost_recording = ($this, $pluginId, $bus) => {
    return igiae_PluginHost$3__init_0($this, $bus, $pluginId);
},
igiae_PluginHost_tracked = ($this, $pluginId, $dispose) => {
    let $done, $self, var$5, $owned;
    $done = $rt_createBooleanArray(1);
    $self = $rt_createArray(igiae_Scheduler$Cancellable, 1);
    var$5 = $self.data;
    var$5[0] = igiae_PluginHost$4__init_0($this, $done, $dispose, $pluginId, $self);
    $owned = $this.$disposers.$get1($pluginId);
    if ($owned === null) {
        $owned = ju_ArrayList__init_();
        $this.$disposers.$put($pluginId, $owned);
    }
    $owned.$add2(var$5[0]);
    return var$5[0];
},
igiae_PluginHost_detach = ($this, $pluginId) => {
    let $owned, var$3, $dispose;
    a: {
        $owned = $this.$disposers.$get1($pluginId);
        if ($owned !== null) {
            var$3 = (ju_ArrayList__init_0($owned)).$iterator();
            while (true) {
                if (!var$3.$hasNext())
                    break a;
                $dispose = var$3.$next();
                $dispose.$cancel();
            }
        }
    }
    $this.$disposers.$remove2($pluginId);
},
igiae_PluginHost_dropCapabilities = ($this, $pluginId) => {
    let $emptied, var$3, $held, $kept, var$6, $record, var$8, $id;
    $emptied = ju_ArrayList__init_();
    var$3 = ($this.$capabilities.$entrySet()).$iterator();
    while (var$3.$hasNext()) {
        $held = var$3.$next();
        $kept = ju_ArrayList__init_();
        var$6 = ($held.$getValue()).$iterator();
        while (var$6.$hasNext()) {
            $record = var$6.$next();
            if (!jl_String_equals(igiae_CapabilityRecord_getPluginId($record), $pluginId))
                $kept.$add2($record);
        }
        if (!$kept.$isEmpty())
            $held.$setValue($kept);
        else
            $emptied.$add2($held.$getKey());
    }
    var$8 = $emptied.$iterator();
    while (var$8.$hasNext()) {
        $id = var$8.$next();
        $this.$capabilities.$remove2($id);
    }
},
igiae_PluginHost_refuseWant = ($pluginId, $id) => {
    let $refused;
    $refused = igiae_Pending__init_();
    igiae_Pending_reject($refused, igiae_ServiceHub_stoppedWaiting($pluginId, $id));
    return $refused;
},
igiae_PluginHost_inert = () => {
    return igiae_PluginHost$5__init_0();
},
igiae_PluginHost_missingFrom = ($wanted, $present) => {
    let $absent, var$4, $id;
    $absent = ju_ArrayList__init_();
    var$4 = $wanted.$iterator();
    while (var$4.$hasNext()) {
        $id = var$4.$next();
        if (!$present.$contains($id))
            $absent.$add2($id);
    }
    return $absent;
},
igiae_PluginHost_join = $values => {
    let $out, $index;
    $out = jl_StringBuilder__init_();
    $index = 0;
    while ($index < $values.$size()) {
        if ($index > 0)
            $out.$append3($rt_s(43));
        $out.$append3($values.$get($index));
        $index = $index + 1 | 0;
    }
    return $out.$toString();
},
igiae_PluginHost_access$000 = $x0 => {
    return $x0.$ledger;
},
igiae_PluginHost_access$100 = ($x0, $x1, $x2, $x3) => {
    return igiae_PluginHost_refuseLate($x0, $x1, $x2, $x3);
},
igiae_PluginHost_access$200 = ($x0, $x1) => {
    return igiae_PluginHost_refuseWant($x0, $x1);
},
igiae_PluginHost_access$300 = () => {
    return igiae_PluginHost_inert();
},
igiae_PluginHost_access$400 = ($x0, $x1, $x2) => {
    return igiae_PluginHost_tracked($x0, $x1, $x2);
},
igiae_PluginHost_access$500 = $x0 => {
    return $x0.$disposers;
};
function igiae_PluginHost$3() {
    let a = this; jl_Object.call(a);
    a.$val$bus0 = null;
    a.$val$pluginId1 = null;
    a.$this$02 = null;
}
let igiae_PluginHost$3__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$02 = $this$0;
    $this.$val$bus0 = var$2;
    $this.$val$pluginId1 = var$3;
    jl_Object__init_($this);
},
igiae_PluginHost$3__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new igiae_PluginHost$3();
    igiae_PluginHost$3__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
igiae_PluginHost$3_publish = ($this, $topic, $payload) => {
    $this.$val$bus0.$publish($topic, $payload);
},
igiae_PluginHost$3_subscribe = ($this, $topic, $listener) => {
    if (igiae_PluginHost_access$100($this.$this$02, $this.$val$pluginId1, $rt_s(366), $topic))
        return igiae_PluginHost_access$300();
    igiae_PluginLedger_recordTopic(igiae_PluginHost_access$000($this.$this$02), $this.$val$pluginId1, $topic);
    return igiae_PluginHost_access$400($this.$this$02, $this.$val$pluginId1, $this.$val$bus0.$subscribe($topic, $listener));
};
function igiae_PluginHost$2() {
    let a = this; jl_Object.call(a);
    a.$val$registry = null;
    a.$val$pluginId = null;
    a.$this$01 = null;
}
let igiae_PluginHost$2__init_ = ($this, $this$0, var$2, var$3) => {
    $this.$this$01 = $this$0;
    $this.$val$registry = var$2;
    $this.$val$pluginId = var$3;
    jl_Object__init_($this);
},
igiae_PluginHost$2__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new igiae_PluginHost$2();
    igiae_PluginHost$2__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
igiae_PluginHost$2_get = ($this, $id) => {
    return $this.$val$registry.$get0($id);
},
igiae_PluginHost$2_want0 = ($this, $id) => {
    return !igiae_PluginHost_access$100($this.$this$01, $this.$val$pluginId, $rt_s(367), $id) ? $this.$val$registry.$want($id) : igiae_PluginHost_access$200($this.$val$pluginId, $id);
},
igiae_PluginHost$2_want = ($this, $id, $timeoutMillis) => {
    return !igiae_PluginHost_access$100($this.$this$01, $this.$val$pluginId, $rt_s(367), $id) ? $this.$val$registry.$want0($id, $timeoutMillis) : igiae_PluginHost_access$200($this.$val$pluginId, $id);
},
igiae_PluginHost$2_watch = ($this, $id, $listener) => {
    return igiae_PluginHost_access$100($this.$this$01, $this.$val$pluginId, $rt_s(368), $id) ? igiae_PluginHost_access$300() : $this.$val$registry.$watch($id, $listener);
},
igiae_PluginHost$2_register = ($this, $id, $service) => {
    return igiae_PluginHost_access$100($this.$this$01, $this.$val$pluginId, $rt_s(369), $id) ? igiae_PluginHost_access$300() : $this.$val$registry.$register($id, $service);
},
igiae_PluginHost$2_ids = $this => {
    return $this.$val$registry.$ids();
};
function jur_AbstractCharClass$LazyRange() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$start4 = 0;
    a.$end2 = 0;
}
let jur_AbstractCharClass$LazyRange__init_0 = ($this, $start, $end) => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
    $this.$start4 = $start;
    $this.$end2 = $end;
},
jur_AbstractCharClass$LazyRange__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyRange();
    jur_AbstractCharClass$LazyRange__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyRange_computeValue = $this => {
    let $chCl;
    $chCl = (jur_CharClass__init_()).$add0($this.$start4, $this.$end2);
    return $chCl;
},
igiae_PluginHost$5 = $rt_classWithoutFields(),
igiae_PluginHost$5__init_ = $this => {
    jl_Object__init_($this);
},
igiae_PluginHost$5__init_0 = () => {
    let var_0 = new igiae_PluginHost$5();
    igiae_PluginHost$5__init_(var_0);
    return var_0;
},
igiae_PluginHost$5_cancel = $this => {
    return;
},
jur_AbstractCharClass$LazyXDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyXDigit__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyXDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyXDigit();
    jur_AbstractCharClass$LazyXDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyXDigit_computeValue = $this => {
    return (((jur_CharClass__init_()).$add0(48, 57)).$add0(97, 102)).$add0(65, 70);
};
function igiae_PluginHost$4() {
    let a = this; jl_Object.call(a);
    a.$val$done0 = null;
    a.$val$dispose = null;
    a.$val$pluginId3 = null;
    a.$val$self0 = null;
    a.$this$07 = null;
}
let igiae_PluginHost$4__init_ = ($this, $this$0, var$2, var$3, var$4, var$5) => {
    $this.$this$07 = $this$0;
    $this.$val$done0 = var$2;
    $this.$val$dispose = var$3;
    $this.$val$pluginId3 = var$4;
    $this.$val$self0 = var$5;
    jl_Object__init_($this);
},
igiae_PluginHost$4__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new igiae_PluginHost$4();
    igiae_PluginHost$4__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
igiae_PluginHost$4_cancel = $this => {
    let $owned;
    if ($this.$val$done0.data[0])
        return;
    $this.$val$done0.data[0] = 1;
    $this.$val$dispose.$cancel();
    $owned = (igiae_PluginHost_access$500($this.$this$07)).$get1($this.$val$pluginId3);
    if ($owned === null)
        return;
    $owned.$remove1($this.$val$self0.data[0]);
    if ($owned.$isEmpty())
        (igiae_PluginHost_access$500($this.$this$07)).$remove2($this.$val$pluginId3);
};
function jur_Matcher() {
    let a = this; jl_Object.call(a);
    a.$pat = null;
    a.$start3 = null;
    a.$string2 = null;
    a.$matchResult = null;
    a.$leftBound = 0;
    a.$rightBound = 0;
}
let jur_Matcher_find = ($this, $start) => {
    let $stringLength, var$3;
    $stringLength = $this.$string2.$length();
    if ($start >= 0 && $start <= $stringLength) {
        var$3 = jur_Matcher_findAt($this, $start);
        if (var$3 >= 0 && $this.$matchResult.$isValid()) {
            $this.$matchResult.$finalizeMatch();
            return 1;
        }
        $this.$matchResult.$startIndex = (-1);
        return 0;
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_1(jl_String_valueOf0($start)));
},
jur_Matcher_findAt = ($this, $startIndex) => {
    let $foundIndex;
    $this.$matchResult.$reset0();
    $this.$matchResult.$setMode(1);
    $this.$matchResult.$setStartIndex($startIndex);
    $foundIndex = $this.$start3.$find($startIndex, $this.$string2, $this.$matchResult);
    if ($foundIndex == (-1))
        $this.$matchResult.$hitEnd = 1;
    return $foundIndex;
},
jur_Matcher_find0 = $this => {
    let $length, var$2;
    $length = $this.$string2.$length();
    if (!jur_Matcher_hasTransparentBounds($this))
        $length = $this.$rightBound;
    if ($this.$matchResult.$startIndex >= 0 && $this.$matchResult.$mode() == 1) {
        $this.$matchResult.$startIndex = $this.$matchResult.$end0();
        if ($this.$matchResult.$end0() == $this.$matchResult.$start0()) {
            var$2 = $this.$matchResult;
            var$2.$startIndex = var$2.$startIndex + 1 | 0;
        }
        return $this.$matchResult.$startIndex <= $length && jur_Matcher_find($this, $this.$matchResult.$startIndex) ? 1 : 0;
    }
    return jur_Matcher_find($this, $this.$leftBound);
},
jur_Matcher_start0 = ($this, $group) => {
    return $this.$matchResult.$start($group);
},
jur_Matcher_end = ($this, $group) => {
    return $this.$matchResult.$end($group);
},
jur_Matcher_start = $this => {
    return jur_Matcher_start0($this, 0);
},
jur_Matcher_end0 = $this => {
    return jur_Matcher_end($this, 0);
},
jur_Matcher_hasTransparentBounds = $this => {
    return $this.$matchResult.$hasTransparentBounds();
},
jur_Matcher__init_ = ($this, $pat, $cs) => {
    let var$3, var$4, var$5, var$6, var$7;
    jl_Object__init_($this);
    $this.$leftBound = (-1);
    $this.$rightBound = (-1);
    $this.$pat = $pat;
    $this.$start3 = $pat.$start1;
    $this.$string2 = $cs;
    $this.$leftBound = 0;
    $this.$rightBound = $this.$string2.$length();
    var$3 = new jur_MatchResultImpl;
    var$4 = $this.$leftBound;
    var$5 = $this.$rightBound;
    var$6 = jur_Pattern_groupCount($pat);
    var$7 = jur_Pattern_compCount($pat);
    jur_MatchResultImpl__init_(var$3, $cs, var$4, var$5, var$6, var$7, jur_Pattern_consCount($pat), jur_Pattern_namedGroups($pat));
    $this.$matchResult = var$3;
    $this.$matchResult.$useAnchoringBounds(1);
},
jur_Matcher__init_0 = (var_0, var_1) => {
    let var_2 = new jur_Matcher();
    jur_Matcher__init_(var_2, var_0, var_1);
    return var_2;
},
jur_DotAllSet = $rt_classWithoutFields(jur_JointSet),
jur_DotAllSet__init_ = $this => {
    jur_JointSet__init_($this);
},
jur_DotAllSet__init_0 = () => {
    let var_0 = new jur_DotAllSet();
    jur_DotAllSet__init_(var_0);
    return var_0;
},
jur_DotAllSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $high, var$7, $low;
    $strLength = $matchResult.$getRightBound();
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $high = $testString.$charAt($stringIndex);
    if (jl_Character_isHighSurrogate($high)) {
        var$7 = $stringIndex + 2 | 0;
        if (var$7 <= $strLength) {
            $low = $testString.$charAt(var$5);
            if (jl_Character_isSurrogatePair($high, $low))
                return $this.$next2.$matches(var$7, $testString, $matchResult);
        }
    }
    return $this.$next2.$matches(var$5, $testString, $matchResult);
},
jur_DotAllSet_getName = $this => {
    return $rt_s(370);
},
jur_DotAllSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DotAllSet_getType = $this => {
    return (-2147483602);
},
jur_DotAllSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_AbstractCharClass$LazyJavaLowerCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$052 = null;
}
let jur_AbstractCharClass$LazyJavaLowerCase$1__init_ = ($this, $this$0) => {
    $this.$this$052 = $this$0;
    jur_AbstractCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaLowerCase$1__init_0 = var_0 => {
    let var_1 = new jur_AbstractCharClass$LazyJavaLowerCase$1();
    jur_AbstractCharClass$LazyJavaLowerCase$1__init_(var_1, var_0);
    return var_1;
},
jur_AbstractCharClass$LazyJavaLowerCase$1_contains = ($this, $ch) => {
    return jl_Character_isLowerCase($ch);
},
jur_UCISupplRangeSet = $rt_classWithoutFields(jur_SupplRangeSet),
jur_UCISupplRangeSet__init_0 = ($this, $cc) => {
    jur_SupplRangeSet__init_($this, $cc);
},
jur_UCISupplRangeSet__init_ = var_0 => {
    let var_1 = new jur_UCISupplRangeSet();
    jur_UCISupplRangeSet__init_0(var_1, var_0);
    return var_1;
},
jur_UCISupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains0(jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch)));
},
jur_UCISupplRangeSet_getName = $this => {
    let var$1, var$2, var$3;
    var$1 = !$this.$alt0 ? $rt_s(38) : $rt_s(39);
    var$2 = $this.$chars.$toString();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(252)), var$1), var$2);
    return jl_StringBuilder_toString(var$3);
},
jur_AbstractCharClass$LazyJavaUpperCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUpperCase__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaUpperCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUpperCase();
    jur_AbstractCharClass$LazyJavaUpperCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUpperCase_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaUpperCase$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function jur_HangulDecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$decomposedChar = null;
    a.$decomposedCharUTF16 = null;
    a.$decomposedCharLength = 0;
}
let jur_HangulDecomposedCharSet__init_ = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_JointSet__init_($this);
    $this.$decomposedChar = $decomposedChar;
    $this.$decomposedCharLength = $decomposedCharLength;
},
jur_HangulDecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_HangulDecomposedCharSet();
    jur_HangulDecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_HangulDecomposedCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_HangulDecomposedCharSet_getDecomposedChar = $this => {
    if ($this.$decomposedCharUTF16 === null)
        $this.$decomposedCharUTF16 = jl_String__init_($this.$decomposedChar);
    return $this.$decomposedCharUTF16;
},
jur_HangulDecomposedCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = jur_HangulDecomposedCharSet_getDecomposedChar($this);
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(371)), var$1);
    return jl_StringBuilder_toString(var$2);
},
jur_HangulDecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, $syllIndex, $decompSyllable, $vIndex, $tIndex, var$9, $curSymb, $decompCurSymb, var$12, $i, var$14, $lIndex, var$16, var$17;
    $rightBound = $matchResult.$getRightBound();
    $syllIndex = 0;
    $decompSyllable = $rt_createIntArray(3);
    $vIndex = (-1);
    $tIndex = (-1);
    if ($strIndex >= $rightBound)
        return (-1);
    var$9 = $strIndex + 1 | 0;
    $curSymb = $testString.$charAt($strIndex);
    $decompCurSymb = jur_Lexer_getHangulDecomposition($curSymb);
    if ($decompCurSymb !== null) {
        var$12 = $decompCurSymb.data;
        $i = 0;
        if (var$12.length != $this.$decomposedCharLength)
            return (-1);
        while (true) {
            if ($i >= $this.$decomposedCharLength)
                return $this.$next2.$matches(var$9, $testString, $matchResult);
            if (var$12[$i] != $this.$decomposedChar.data[$i])
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    var$14 = $decompSyllable.data;
    var$14[$syllIndex] = $curSymb;
    $lIndex = $curSymb - 4352 | 0;
    if ($lIndex >= 0 && $lIndex < 19) {
        if (var$9 < $rightBound) {
            $curSymb = $testString.$charAt(var$9);
            $vIndex = $curSymb - 4449 | 0;
        }
        if ($vIndex >= 0 && $vIndex < 21) {
            var$16 = var$9 + 1 | 0;
            var$14[1] = $curSymb;
            if (var$16 < $rightBound) {
                $curSymb = $testString.$charAt(var$16);
                $tIndex = $curSymb - 4519 | 0;
            }
            if ($tIndex >= 0 && $tIndex < 28) {
                var$17 = var$16 + 1 | 0;
                var$14[2] = $curSymb;
                var$17 = $this.$decomposedCharLength == 3 && var$14[0] == $this.$decomposedChar.data[0] && var$14[1] == $this.$decomposedChar.data[1] && var$14[2] == $this.$decomposedChar.data[2] ? $this.$next2.$matches(var$17, $testString, $matchResult) : (-1);
                return var$17;
            }
            var$17 = $this.$decomposedCharLength == 2 && var$14[0] == $this.$decomposedChar.data[0] && var$14[1] == $this.$decomposedChar.data[1] ? $this.$next2.$matches(var$16, $testString, $matchResult) : (-1);
            return var$17;
        }
        return (-1);
    }
    return (-1);
},
jur_HangulDecomposedCharSet_first = ($this, $set) => {
    let var$2, var$3;
    a: {
        if ($set instanceof jur_HangulDecomposedCharSet) {
            var$2 = $set;
            if (!jl_String_equals(jur_HangulDecomposedCharSet_getDecomposedChar(var$2), jur_HangulDecomposedCharSet_getDecomposedChar($this))) {
                var$3 = 0;
                break a;
            }
        }
        var$3 = 1;
    }
    return var$3;
},
jur_HangulDecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_AbstractCharClass$LazyPunct = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyPunct__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyPunct__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyPunct();
    jur_AbstractCharClass$LazyPunct__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPunct_computeValue = $this => {
    return (((jur_CharClass__init_()).$add0(33, 64)).$add0(91, 96)).$add0(123, 126);
};
function igiae_SchemaIssue() {
    let a = this; jl_Object.call(a);
    a.$path = null;
    a.$message = null;
    a.$fix = null;
}
let igiae_SchemaIssue__init_ = ($this, $path, $message, $fix) => {
    jl_Object__init_($this);
    $this.$path = $path;
    $this.$message = $message;
    $this.$fix = $fix;
},
igiae_SchemaIssue__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new igiae_SchemaIssue();
    igiae_SchemaIssue__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
igiae_SchemaIssue_getPath = $this => {
    return $this.$path;
},
igiae_SchemaIssue_getMessage = $this => {
    return $this.$message;
},
igiae_SchemaIssue_getFix = $this => {
    return $this.$fix;
},
igiae_SchemaIssue_toString = $this => {
    return (((((((jl_StringBuilder__init_()).$append3($this.$path)).$append3($rt_s(4))).$append3($this.$message)).$append3($rt_s(372))).$append3($this.$fix)).$append3($rt_s(373))).$toString();
},
otjc_JSBoolean = $rt_classWithoutFields(),
otjc_JSBoolean_booleanValue$static = $this => {
    return $this ? 1 : 0;
};
function igiae_ActivationPlan() {
    let a = this; jl_Object.call(a);
    a.$order0 = null;
    a.$cycles0 = null;
}
let igiae_ActivationPlan__init_ = ($this, $order, $cycles) => {
    jl_Object__init_($this);
    $this.$order0 = ju_Collections_unmodifiableList($order);
    $this.$cycles0 = ju_Collections_unmodifiableList($cycles);
},
igiae_ActivationPlan__init_0 = (var_0, var_1) => {
    let var_2 = new igiae_ActivationPlan();
    igiae_ActivationPlan__init_(var_2, var_0, var_1);
    return var_2;
},
igiae_ActivationPlan_getOrder = $this => {
    return $this.$order0;
},
igiae_ActivationPlan_getCycles = $this => {
    return $this.$cycles0;
};
function ju_LinkedHashMapKeySet() {
    let a = this; ju_AbstractSet.call(a);
    a.$base0 = null;
    a.$reversed1 = 0;
}
let ju_LinkedHashMapKeySet__init_ = ($this, $base, $reversed) => {
    ju_AbstractSet__init_($this);
    $this.$base0 = $base;
    $this.$reversed1 = $reversed;
},
ju_LinkedHashMapKeySet__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapKeySet();
    ju_LinkedHashMapKeySet__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapKeySet_size = $this => {
    return $this.$base0.$elementCount;
},
ju_LinkedHashMapKeySet_iterator = $this => {
    return ju_LinkedHashMapIterator$KeyIterator__init_0($this.$base0, $this.$reversed1);
};
function jur_WordBoundary() {
    jur_AbstractSet.call(this);
    this.$positive = 0;
}
let jur_WordBoundary__init_0 = ($this, $positive) => {
    jur_AbstractSet__init_($this);
    $this.$positive = $positive;
},
jur_WordBoundary__init_ = var_0 => {
    let var_1 = new jur_WordBoundary();
    jur_WordBoundary__init_0(var_1, var_0);
    return var_1;
},
jur_WordBoundary_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $ch1, $ch2, $leftBound, $left, $right;
    $ch1 = $stringIndex < $matchResult.$getRightBound() ? $testString.$charAt($stringIndex) : 32;
    $ch2 = !$stringIndex ? 32 : $testString.$charAt($stringIndex - 1 | 0);
    $leftBound = !$matchResult.$hasTransparentBounds() ? $matchResult.$getLeftBound() : 0;
    $left = $ch1 != 32 && !jur_WordBoundary_isSpace($this, $ch1, $stringIndex, $leftBound, $testString) ? 0 : 1;
    $right = $ch2 != 32 && !jur_WordBoundary_isSpace($this, $ch2, $stringIndex - 1 | 0, $leftBound, $testString) ? 0 : 1;
    return $left ^ $right ^ $this.$positive ? (-1) : $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_WordBoundary_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_WordBoundary_getName = $this => {
    return $rt_s(374);
},
jur_WordBoundary_isSpace = ($this, $ch, $index, $leftBound, $testString) => {
    let var$5;
    if (!jl_Character_isLetterOrDigit0($ch) && $ch != 95) {
        a: {
            if (jl_Character_getType0($ch) == 6)
                while (true) {
                    $index = $index + (-1) | 0;
                    if ($index < $leftBound)
                        break a;
                    var$5 = $testString.$charAt($index);
                    if (jl_Character_isLetterOrDigit0(var$5))
                        return 0;
                    if (jl_Character_getType0(var$5) != 6)
                        return 1;
                }
        }
        return 1;
    }
    return 0;
},
jur_AbstractCharClass$LazySpace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpace__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazySpace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazySpace();
    jur_AbstractCharClass$LazySpace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpace_computeValue = $this => {
    return ((jur_CharClass__init_()).$add0(9, 13)).$add(32);
},
igiae_SchemaValidator = $rt_classWithoutFields(),
igiae_SchemaValidator_validate = ($value, $schema, $path, $source) => {
    let $issues;
    $issues = ju_ArrayList__init_();
    if ($path === null)
        $path = $rt_s(305);
    igiae_SchemaValidator_check($value, $schema, $path, $issues, $source);
    return $issues;
},
igiae_SchemaValidator_check = ($value, $schema, $path, $issues, $source) => {
    let $type;
    $type = igiae_JsonSchema_getType($schema);
    if (jl_String_equals($rt_s(329), $type))
        igiae_SchemaValidator_checkObject($value, $schema, $path, $issues, $source);
    else if (jl_String_equals($rt_s(375), $type))
        igiae_SchemaValidator_checkArray($value, $schema, $path, $issues, $source);
    else if (jl_String_equals($rt_s(260), $type))
        igiae_SchemaValidator_checkString($value, $schema, $path, $issues);
    else if (!(!jl_String_equals($rt_s(376), $type) && !jl_String_equals($rt_s(261), $type)))
        igiae_SchemaValidator_checkNumber($value, $schema, $path, $issues);
    else if (jl_String_equals($rt_s(262), $type) && !($value instanceof jl_Boolean))
        $issues.$add2(igiae_SchemaValidator_typeIssue($value, $schema, $path));
},
igiae_SchemaValidator_checkObject = ($value, $schema, $path, $issues, $source) => {
    let $record, $required, var$8, $key, $child, var$11, var$12, var$13, $entry, $childSchema;
    if (!$rt_isInstance($value, ju_Map)) {
        $issues.$add2(igiae_SchemaValidator_typeIssue($value, $schema, $path));
        return;
    }
    a: {
        $record = $value;
        $required = igiae_JsonSchema_getRequired($schema);
        if ($required !== null) {
            var$8 = $required.$iterator();
            while (true) {
                if (!var$8.$hasNext())
                    break a;
                $key = var$8.$next();
                if ($record.$get1($key) !== null)
                    continue;
                $child = igiae_SchemaValidator_property($schema, $key);
                var$11 = new igiae_SchemaIssue;
                var$12 = igiae_SchemaValidator_childPath($path, $key);
                var$13 = ((((jl_StringBuilder__init_()).$append3($rt_s(377))).$append3($key)).$append3($rt_s(378))).$toString();
                igiae_SchemaIssue__init_(var$11, var$12, var$13, $child !== null && igiae_JsonSchema_getFix($child) !== null ? igiae_JsonSchema_getFix($child) : (((((jl_StringBuilder__init_()).$append3($rt_s(357))).$append3($key)).$append3($rt_s(379))).$append3($path)).$toString());
                $issues.$add2(var$11);
            }
        }
    }
    var$8 = ($record.$entrySet()).$iterator();
    while (var$8.$hasNext()) {
        $entry = var$8.$next();
        if ($entry.$getValue() === null)
            continue;
        $key = jl_String_valueOf($entry.$getKey());
        $childSchema = igiae_SchemaValidator_property($schema, $key);
        if ($childSchema === null)
            $childSchema = igiae_JsonSchema_getAdditionalProperties($schema);
        if ($childSchema !== null) {
            igiae_SchemaValidator_check($entry.$getValue(), $childSchema, igiae_SchemaValidator_childPath($path, $key), $issues, $source);
            continue;
        }
        if ($source === null)
            continue;
        igiae_Diagnostics_ignoreUnknown($rt_s(380), igiae_SchemaValidator_childPath($path, $key), $source);
    }
},
igiae_SchemaValidator_property = ($schema, $key) => {
    let $properties;
    $properties = igiae_JsonSchema_getProperties($schema);
    return $properties === null ? null : $properties.$get1($key);
},
igiae_SchemaValidator_checkArray = ($value, $schema, $path, $issues, $source) => {
    let $items, $values, $index;
    if (!$rt_isInstance($value, ju_List)) {
        $issues.$add2(igiae_SchemaValidator_typeIssue($value, $schema, $path));
        return;
    }
    $items = igiae_JsonSchema_getItems($schema);
    if ($items === null)
        return;
    $values = $value;
    $index = 0;
    while ($index < $values.$size()) {
        igiae_SchemaValidator_check($values.$get($index), $items, (((((jl_StringBuilder__init_()).$append3($path)).$append3($rt_s(245))).$append2($index)).$append3($rt_s(322))).$toString(), $issues, $source);
        $index = $index + 1 | 0;
    }
},
igiae_SchemaValidator_checkString = ($value, $schema, $path, $issues) => {
    let $text, $pattern, var$7, var$8, $allowed, $joined, var$11;
    if (!($value instanceof jl_String)) {
        $issues.$add2(igiae_SchemaValidator_typeIssue($value, $schema, $path));
        return;
    }
    $text = $value;
    $pattern = igiae_JsonSchema_getPattern($schema);
    if ($pattern !== null && !jur_Matcher_find0(jur_Pattern_matcher(jur_Pattern_compile($pattern), $text))) {
        var$7 = new igiae_SchemaIssue;
        var$8 = (((((jl_StringBuilder__init_()).$append3($rt_s(313))).$append3($text)).$append3($rt_s(381))).$append3($pattern)).$toString();
        igiae_SchemaIssue__init_(var$7, $path, var$8, igiae_JsonSchema_getFix($schema) !== null ? igiae_JsonSchema_getFix($schema) : (((((jl_StringBuilder__init_()).$append3($rt_s(382))).$append3($path)).$append3($rt_s(383))).$append3($pattern)).$toString());
        $issues.$add2(var$7);
    }
    $allowed = igiae_JsonSchema_getEnumValues($schema);
    if ($allowed !== null && !$allowed.$contains($text)) {
        $joined = igiae_SchemaValidator_join($allowed);
        var$11 = new igiae_SchemaIssue;
        var$7 = (((((jl_StringBuilder__init_()).$append3($rt_s(313))).$append3($text)).$append3($rt_s(384))).$append3($joined)).$toString();
        igiae_SchemaIssue__init_(var$11, $path, var$7, igiae_JsonSchema_getFix($schema) !== null ? igiae_JsonSchema_getFix($schema) : (((((jl_StringBuilder__init_()).$append3($rt_s(385))).$append3($path)).$append3($rt_s(386))).$append3($joined)).$toString());
        $issues.$add2(var$11);
    }
},
igiae_SchemaValidator_checkNumber = ($value, $schema, $path, $issues) => {
    let var$5, $minimum, var$7, var$8;
    a: {
        if ($value instanceof jl_Number) {
            var$5 = $value;
            if (!igiae_SchemaValidator_isNotANumber(var$5)) {
                if (!jl_String_equals($rt_s(376), igiae_JsonSchema_getType($schema)))
                    break a;
                if (igiae_SchemaValidator_isIntegral(var$5))
                    break a;
            }
        }
        $issues.$add2(igiae_SchemaValidator_typeIssue($value, $schema, $path));
        return;
    }
    $minimum = igiae_JsonSchema_getMinimum($schema);
    if ($minimum !== null && var$5.$doubleValue() < $minimum.$doubleValue()) {
        var$7 = new igiae_SchemaIssue;
        var$8 = (((jl_StringBuilder__init_()).$append3($rt_s(387))).$append($minimum)).$append3($rt_s(388));
        var$8 = (var$8.$append3(igiae_SchemaValidator_describeNumber(var$5))).$toString();
        igiae_SchemaIssue__init_(var$7, $path, var$8, igiae_JsonSchema_getFix($schema) !== null ? igiae_JsonSchema_getFix($schema) : (((((jl_StringBuilder__init_()).$append3($rt_s(385))).$append3($path)).$append3($rt_s(389))).$append($minimum)).$toString());
        $issues.$add2(var$7);
    }
},
igiae_SchemaValidator_isNotANumber = $value => {
    let $asDouble;
    $asDouble = $value.$doubleValue();
    return !(isNaN($asDouble) ? 1 : 0) && !jl_Double_isInfinite($asDouble) ? 0 : 1;
},
igiae_SchemaValidator_isIntegral = $value => {
    let $asDouble;
    $asDouble = $value.$doubleValue();
    return $asDouble !== jl_Math_floor($asDouble) ? 0 : 1;
},
igiae_SchemaValidator_describeNumber = $value => {
    let $asDouble;
    $asDouble = $value.$doubleValue();
    return $asDouble !== jl_Math_floor($asDouble) ? jl_String_valueOf2($asDouble) : jl_String_valueOf1(Long_fromNumber($asDouble));
},
igiae_SchemaValidator_typeIssue = ($value, $schema, $path) => {
    let var$4, var$5;
    var$4 = new igiae_SchemaIssue;
    var$5 = (((((jl_StringBuilder__init_()).$append3($rt_s(390))).$append3(igiae_JsonSchema_getType($schema))).$append3($rt_s(388))).$append3(igiae_SchemaValidator_describe($value))).$toString();
    igiae_SchemaIssue__init_(var$4, $path, var$5, igiae_JsonSchema_getFix($schema) !== null ? igiae_JsonSchema_getFix($schema) : (((((jl_StringBuilder__init_()).$append3($rt_s(385))).$append3($path)).$append3($rt_s(391))).$append3(igiae_JsonSchema_getType($schema))).$toString());
    return var$4;
},
igiae_SchemaValidator_describe = $value => {
    if ($value === null)
        return $rt_s(44);
    if ($rt_isInstance($value, ju_List))
        return $rt_s(375);
    if ($value instanceof jl_String)
        return $rt_s(260);
    if ($value instanceof jl_Boolean)
        return $rt_s(262);
    if (!($value instanceof jl_Number))
        return $rt_s(329);
    return $rt_s(261);
},
igiae_SchemaValidator_join = $values => {
    let $out, $index;
    $out = jl_StringBuilder__init_();
    $index = 0;
    while ($index < $values.$size()) {
        if ($index > 0)
            $out.$append3($rt_s(43));
        $out.$append3($values.$get($index));
        $index = $index + 1 | 0;
    }
    return $out.$toString();
},
igiae_SchemaValidator_childPath = ($path, $key) => {
    if (!jl_String_equals($rt_s(305), $path))
        $key = ((((jl_StringBuilder__init_()).$append3($path)).$append3($rt_s(263))).$append3($key)).$toString();
    return $key;
};
function ju_HashMap$1() {
    ju_AbstractSet.call(this);
    this.$this$011 = null;
}
let ju_HashMap$1__init_ = ($this, $this$0) => {
    $this.$this$011 = $this$0;
    ju_AbstractSet__init_($this);
},
ju_HashMap$1__init_0 = var_0 => {
    let var_1 = new ju_HashMap$1();
    ju_HashMap$1__init_(var_1, var_0);
    return var_1;
},
ju_HashMap$1_iterator = $this => {
    return ju_HashMap$KeyIterator__init_0($this.$this$011);
};
function jl_Double() {
    jl_Number.call(this);
    this.$value1 = 0.0;
}
let jl_Double_TYPE = null,
jl_Double_$callClinit = () => {
    jl_Double_$callClinit = $rt_eraseClinit(jl_Double);
    jl_Double__clinit_();
},
jl_Double__init_ = ($this, $value) => {
    jl_Double_$callClinit();
    jl_Number__init_($this);
    $this.$value1 = $value;
},
jl_Double__init_0 = var_0 => {
    let var_1 = new jl_Double();
    jl_Double__init_(var_1, var_0);
    return var_1;
},
jl_Double_doubleValue = $this => {
    return $this.$value1;
},
jl_Double_intValue = $this => {
    return $this.$value1 | 0;
},
jl_Double_longValue = $this => {
    return Long_fromNumber($this.$value1);
},
jl_Double_valueOf = $d => {
    jl_Double_$callClinit();
    return jl_Double__init_0($d);
},
jl_Double_toString = $d => {
    jl_Double_$callClinit();
    return ((jl_StringBuilder__init_()).$append10($d)).$toString();
},
jl_Double_toString0 = $this => {
    return jl_Double_toString($this.$value1);
},
jl_Double_equals0 = ($this, $other) => {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Double && jl_Double_equals($this.$value1, $other.$value1) ? 1 : 0;
},
jl_Double_equals = ($a, $b) => {
    jl_Double_$callClinit();
    return $rt_equalDoubles($a, $b);
},
jl_Double_hashCode = $this => {
    return jl_Double_hashCode0($this.$value1);
},
jl_Double_hashCode0 = $d => {
    let $h;
    jl_Double_$callClinit();
    $h = jl_Double_doubleToLongBits($d);
    return Long_hi($h) ^ Long_lo($h);
},
jl_Double_isInfinite = $v => {
    jl_Double_$callClinit();
    return !(isFinite($v) ? 1 : 0) && !(isNaN($v) ? 1 : 0) ? 1 : 0;
},
jl_Double_doubleToLongBits = $value => {
    jl_Double_$callClinit();
    if (!(isNaN($value) ? 1 : 0))
        return $rt_doubleToRawLongBits($value);
    return Long_create(0, 2146959360);
},
jl_Double__clinit_ = () => {
    jl_Double_TYPE = $rt_cls($rt_doublecls);
},
jur_IntHash = $rt_classWithoutFields();
function igiae_LedgerEntry() {
    let a = this; jl_Object.call(a);
    a.$pluginId = null;
    a.$status = null;
    a.$capabilitiesDeclared = null;
    a.$capabilitiesProvided = null;
    a.$servicesProvided = null;
    a.$servicesConsumed = null;
    a.$topics = null;
    a.$permissions = null;
    a.$errorDetail = null;
    a.$errorFix = null;
}
let igiae_LedgerEntry__init_0 = ($this, $pluginId) => {
    jl_Object__init_($this);
    igiae_PluginStatus_$callClinit();
    $this.$status = igiae_PluginStatus_ACTIVATING;
    $this.$capabilitiesDeclared = ju_ArrayList__init_();
    $this.$capabilitiesProvided = ju_ArrayList__init_();
    $this.$servicesProvided = ju_ArrayList__init_();
    $this.$servicesConsumed = ju_ArrayList__init_();
    $this.$topics = ju_ArrayList__init_();
    $this.$permissions = ju_ArrayList__init_();
    $this.$pluginId = $pluginId;
},
igiae_LedgerEntry__init_ = var_0 => {
    let var_1 = new igiae_LedgerEntry();
    igiae_LedgerEntry__init_0(var_1, var_0);
    return var_1;
},
igiae_LedgerEntry_getPluginId = $this => {
    return $this.$pluginId;
},
igiae_LedgerEntry_getStatus = $this => {
    return $this.$status;
},
igiae_LedgerEntry_getCapabilitiesDeclared = $this => {
    return ju_Collections_unmodifiableList($this.$capabilitiesDeclared);
},
igiae_LedgerEntry_getCapabilitiesProvided = $this => {
    return ju_Collections_unmodifiableList($this.$capabilitiesProvided);
},
igiae_LedgerEntry_getServicesProvided = $this => {
    return ju_Collections_unmodifiableList($this.$servicesProvided);
},
igiae_LedgerEntry_getServicesConsumed = $this => {
    return ju_Collections_unmodifiableList($this.$servicesConsumed);
},
igiae_LedgerEntry_getTopics = $this => {
    return ju_Collections_unmodifiableList($this.$topics);
},
igiae_LedgerEntry_getPermissions = $this => {
    return ju_Collections_unmodifiableList($this.$permissions);
},
igiae_LedgerEntry_getErrorDetail = $this => {
    return $this.$errorDetail;
},
igiae_LedgerEntry_getErrorFix = $this => {
    return $this.$errorFix;
},
igiae_LedgerEntry_setStatus = ($this, $value) => {
    $this.$status = $value;
},
igiae_LedgerEntry_setError = ($this, $detail, $fix) => {
    $this.$errorDetail = $detail;
    $this.$errorFix = $fix;
},
igiae_LedgerEntry_reset = $this => {
    $this.$capabilitiesDeclared = ju_ArrayList__init_();
    $this.$capabilitiesProvided = ju_ArrayList__init_();
    $this.$servicesProvided = ju_ArrayList__init_();
    $this.$servicesConsumed = ju_ArrayList__init_();
    $this.$topics = ju_ArrayList__init_();
    $this.$permissions = ju_ArrayList__init_();
    $this.$errorDetail = null;
    $this.$errorFix = null;
    igiae_PluginStatus_$callClinit();
    $this.$status = igiae_PluginStatus_ACTIVATING;
},
igiae_LedgerEntry_addCapabilityDeclared = ($this, $id) => {
    igiae_LedgerEntry_add($this.$capabilitiesDeclared, $id);
},
igiae_LedgerEntry_addCapabilityProvided = ($this, $id) => {
    igiae_LedgerEntry_add($this.$capabilitiesProvided, $id);
},
igiae_LedgerEntry_addServiceProvided = ($this, $id) => {
    igiae_LedgerEntry_add($this.$servicesProvided, $id);
},
igiae_LedgerEntry_addServiceConsumed = ($this, $id) => {
    igiae_LedgerEntry_add($this.$servicesConsumed, $id);
},
igiae_LedgerEntry_addTopic = ($this, $id) => {
    igiae_LedgerEntry_add($this.$topics, $id);
},
igiae_LedgerEntry_addPermission = ($this, $id) => {
    igiae_LedgerEntry_add($this.$permissions, $id);
},
igiae_LedgerEntry_copy = $this => {
    let $clone;
    $clone = igiae_LedgerEntry__init_($this.$pluginId);
    $clone.$status = $this.$status;
    $clone.$capabilitiesDeclared = ju_ArrayList__init_0($this.$capabilitiesDeclared);
    $clone.$capabilitiesProvided = ju_ArrayList__init_0($this.$capabilitiesProvided);
    $clone.$servicesProvided = ju_ArrayList__init_0($this.$servicesProvided);
    $clone.$servicesConsumed = ju_ArrayList__init_0($this.$servicesConsumed);
    $clone.$topics = ju_ArrayList__init_0($this.$topics);
    $clone.$permissions = ju_ArrayList__init_0($this.$permissions);
    $clone.$errorDetail = $this.$errorDetail;
    $clone.$errorFix = $this.$errorFix;
    return $clone;
},
igiae_LedgerEntry_add = ($list, $value) => {
    if (!$list.$contains($value))
        $list.$add2($value);
},
jur_ReluctantAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_ReluctantAltQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AltQuantifierSet__init_($this, $innerSet, $next, $type);
},
jur_ReluctantAltQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_ReluctantAltQuantifierSet();
    jur_ReluctantAltQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_ReluctantAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jl_NegativeArraySizeException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_NegativeArraySizeException__init_0 = () => {
    let var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaWhitespace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaWhitespace__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaWhitespace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaWhitespace();
    jur_AbstractCharClass$LazyJavaWhitespace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaWhitespace_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaWhitespace$1__init_0($this);
},
jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException),
jl_UnsupportedOperationException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_UnsupportedOperationException__init_ = () => {
    let var_0 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_0(var_0);
    return var_0;
},
jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException),
jl_NumberFormatException__init_1 = $this => {
    jl_IllegalArgumentException__init_0($this);
},
jl_NumberFormatException__init_2 = () => {
    let var_0 = new jl_NumberFormatException();
    jl_NumberFormatException__init_1(var_0);
    return var_0;
},
jl_NumberFormatException__init_ = ($this, $message) => {
    jl_IllegalArgumentException__init_1($this, $message);
},
jl_NumberFormatException__init_0 = var_0 => {
    let var_1 = new jl_NumberFormatException();
    jl_NumberFormatException__init_(var_1, var_0);
    return var_1;
},
jur_IntArrHash = $rt_classWithoutFields(),
jur_AbstractCharClass$LazyJavaMirrored = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaMirrored__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaMirrored__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaMirrored();
    jur_AbstractCharClass$LazyJavaMirrored__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaMirrored_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaMirrored$1__init_0($this);
},
jur_AbstractCharClass$LazyJavaISOControl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaISOControl__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaISOControl__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaISOControl();
    jur_AbstractCharClass$LazyJavaISOControl__init_(var_0);
    return var_0;
};
let jur_AbstractCharClass$LazyJavaISOControl_computeValue = $this => {
    return jur_AbstractCharClass$LazyJavaISOControl$1__init_0($this);
},
jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalStateException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalStateException__init_ = () => {
    let var_0 = new jl_IllegalStateException();
    jl_IllegalStateException__init_0(var_0);
    return var_0;
};
function jur_HighSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$high = 0;
}
let jur_HighSurrogateCharSet__init_ = ($this, $high) => {
    jur_JointSet__init_($this);
    $this.$high = $high;
},
jur_HighSurrogateCharSet__init_0 = var_0 => {
    let var_1 = new jur_HighSurrogateCharSet();
    jur_HighSurrogateCharSet__init_(var_1, var_0);
    return var_1;
},
jur_HighSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_HighSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, $high, $low;
    $strLength = $matchResult.$getRightBound();
    var$5 = $stringIndex + 1 | 0;
    var$6 = $rt_compare(var$5, $strLength);
    if (var$6 > 0) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $high = $testString.$charAt($stringIndex);
    if (var$6 < 0) {
        $low = $testString.$charAt(var$5);
        if (jl_Character_isLowSurrogate($low))
            return (-1);
    }
    if ($this.$high != $high)
        return (-1);
    return $this.$next2.$matches(var$5, $testString, $matchResult);
},
jur_HighSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$getRightBound();
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$6 = jl_String_indexOf($testStr, $this.$high, $strIndex);
        if (var$6 < 0)
            return (-1);
        $strIndex = var$6 + 1 | 0;
        if ($strIndex < $strLength && jl_Character_isLowSurrogate(jl_String_charAt($testStr, $strIndex))) {
            $strIndex = var$6 + 2 | 0;
            continue;
        }
        if ($this.$next2.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$6;
},
jur_HighSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$7, var$8;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$getRightBound();
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$7 = jl_String_lastIndexOf($testStr, $this.$high, $lastIndex);
            if (var$7 < 0)
                break a;
            if (var$7 < $strIndex)
                break a;
            var$8 = var$7 + 1 | 0;
            if (var$8 < $strLength && jl_Character_isLowSurrogate(jl_String_charAt($testStr, var$8))) {
                $lastIndex = var$7 + (-1) | 0;
                continue;
            }
            if ($this.$next2.$matches(var$8, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$7 + (-1) | 0;
        }
        return var$7;
    }
    return (-1);
},
jur_HighSurrogateCharSet_getName = $this => {
    let var$1, var$2;
    var$1 = $this.$high;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append0(var$2, var$1);
    return jl_StringBuilder_toString(var$2);
},
jur_HighSurrogateCharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_LowSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_HighSurrogateCharSet))
        return 1;
    return $set.$high != $this.$high ? 0 : 1;
},
jur_HighSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_ReluctantCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_ReluctantCompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_CompositeQuantifierSet__init_($this, $quant, $innerSet, $next, $type);
},
jur_ReluctantCompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_ReluctantCompositeQuantifierSet();
    jur_ReluctantCompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_ReluctantCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $min, $max, $i, var$7, var$8;
    $min = $this.$quantifier.$min0();
    $max = $this.$quantifier.$max0();
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    var$7 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
                    if (var$7 >= 0)
                        break;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$getRightBound()) {
                        var$7 = $this.$leaf.$accepts($stringIndex, $testString);
                        $stringIndex = $stringIndex + var$7 | 0;
                        $i = $i + 1 | 0;
                    }
                    if (var$7 < 1)
                        break a;
                    if ($i > $max)
                        break a;
                }
                return var$7;
            }
            return (-1);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$getRightBound()) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        var$8 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$8 < 1)
            break;
        $stringIndex = $stringIndex + var$8 | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_SOLSet = $rt_classWithoutFields(jur_AbstractSet),
jur_SOLSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_SOLSet__init_0 = () => {
    let var_0 = new jur_SOLSet();
    jur_SOLSet__init_(var_0);
    return var_0;
},
jur_SOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    if ($strIndex && !($matchResult.$hasAnchoringBounds() && $strIndex == $matchResult.$getLeftBound()))
        return (-1);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_SOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_SOLSet_getName = $this => {
    return $rt_s(392);
};
function igiaj_JsPluginContext$7$1() {
    let a = this; jl_Object.call(a);
    a.$val$listener0 = null;
    a.$this$045 = null;
}
let igiaj_JsPluginContext$7$1__init_ = ($this, $this$0, var$2) => {
    $this.$this$045 = $this$0;
    $this.$val$listener0 = var$2;
    jl_Object__init_($this);
},
igiaj_JsPluginContext$7$1__init_0 = (var_0, var_1) => {
    let var_2 = new igiaj_JsPluginContext$7$1();
    igiaj_JsPluginContext$7$1__init_(var_2, var_0, var_1);
    return var_2;
},
igiaj_JsPluginContext$7$1_received = ($this, $payload) => {
    let var$2, var$3;
    var$2 = $this.$val$listener0;
    var$3 = otji_JSWrapper_unwrap($payload);
    var$2.call(var$3);
};
function igiae_Pending() {
    let a = this; jl_Object.call(a);
    a.$handlers = null;
    a.$settled = 0;
    a.$value4 = null;
    a.$failure0 = null;
}
let igiae_Pending__init_0 = $this => {
    jl_Object__init_($this);
    $this.$handlers = ju_ArrayList__init_();
},
igiae_Pending__init_ = () => {
    let var_0 = new igiae_Pending();
    igiae_Pending__init_0(var_0);
    return var_0;
},
igiae_Pending_of = $value => {
    let $ready;
    $ready = igiae_Pending__init_();
    igiae_Pending_resolve($ready, $value);
    return $ready;
},
igiae_Pending_then = ($this, $handler) => {
    if ($this.$settled) {
        igiae_Pending_deliver($this, $handler);
        return;
    }
    $this.$handlers.$add2($handler);
},
igiae_Pending_resolve = ($this, $result) => {
    igiae_Pending_settle($this, $result, null);
},
igiae_Pending_reject = ($this, $reason) => {
    igiae_Pending_settle($this, null, $reason);
},
igiae_Pending_settle = ($this, $result, $reason) => {
    let $waiting, var$4, $handler;
    if ($this.$settled)
        return;
    $this.$settled = 1;
    $this.$value4 = $result;
    $this.$failure0 = $reason;
    $waiting = ju_ArrayList__init_0($this.$handlers);
    $this.$handlers.$clear1();
    var$4 = $waiting.$iterator();
    while (var$4.$hasNext()) {
        $handler = var$4.$next();
        igiae_Pending_deliver($this, $handler);
    }
},
igiae_Pending_deliver = ($this, $handler) => {
    if ($this.$failure0 === null)
        $handler.$value($this.$value4);
    else
        $handler.$failure($this.$failure0);
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable();
    jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_0($this);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
};
function jur_UMultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter2 = 0;
}
let jur_UMultiLineEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter2 = $counter;
},
jur_UMultiLineEOLSet__init_0 = var_0 => {
    let var_1 = new jur_UMultiLineEOLSet();
    jur_UMultiLineEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_UMultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $strDif;
    $strDif = !$matchResult.$hasAnchoringBounds() ? $testString.$length() - $strIndex | 0 : $matchResult.$getRightBound() - $strIndex | 0;
    if ($strDif <= 0) {
        $matchResult.$setConsumed($this.$consCounter2, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    if ($testString.$charAt($strIndex) != 10)
        return (-1);
    $matchResult.$setConsumed($this.$consCounter2, 1);
    return $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult);
},
jur_UMultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter2) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter2, (-1));
    return $res;
},
jur_UMultiLineEOLSet_getName = $this => {
    return $rt_s(393);
},
ju_LinkedHashMapIterator$KeyIterator = $rt_classWithoutFields(ju_LinkedHashMapIterator),
ju_LinkedHashMapIterator$KeyIterator__init_ = ($this, $map, $reversed) => {
    ju_LinkedHashMapIterator__init_($this, $map, $reversed);
},
ju_LinkedHashMapIterator$KeyIterator__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapIterator$KeyIterator();
    ju_LinkedHashMapIterator$KeyIterator__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapIterator$KeyIterator_next = $this => {
    ju_LinkedHashMapIterator_makeNext($this);
    return $this.$currentEntry.$key;
},
otcit_DoubleAnalyzer = $rt_classWithoutFields(),
otcit_DoubleAnalyzer_MAX_MANTISSA = Long_ZERO,
otcit_DoubleAnalyzer_resultForLog10 = null,
otcit_DoubleAnalyzer_mantissa10Table = null,
otcit_DoubleAnalyzer_exp10Table = null,
otcit_DoubleAnalyzer_$callClinit = () => {
    otcit_DoubleAnalyzer_$callClinit = $rt_eraseClinit(otcit_DoubleAnalyzer);
    otcit_DoubleAnalyzer__clinit_();
},
otcit_DoubleAnalyzer_analyze = ($d, $result) => {
    let $bits, $mantissa, $exponent, var$6, $decExponent, var$8, var$9, $binExponentCorrection, $mantissaShift, $decMantissa, var$13, var$14, var$15, $decMantissaHi, $decMantissaLow, $lowerPos, $upperPos, $posCmp;
    otcit_DoubleAnalyzer_$callClinit();
    $bits = jl_Double_doubleToLongBits($d);
    $result.$sign = Long_eq(Long_and($bits, Long_create(0, 2147483648)), Long_ZERO) ? 0 : 1;
    $mantissa = Long_and($bits, Long_create(4294967295, 1048575));
    $exponent = Long_lo(Long_shr($bits, 52)) & 2047;
    if (Long_eq($mantissa, Long_ZERO) && !$exponent) {
        $result.$mantissa = Long_ZERO;
        $result.$exponent = 0;
        return;
    }
    if ($exponent)
        var$6 = Long_or($mantissa, Long_create(0, 1048576));
    else {
        var$6 = Long_shl($mantissa, 1);
        while (Long_eq(Long_and(var$6, Long_create(0, 1048576)), Long_ZERO)) {
            var$6 = Long_shl(var$6, 1);
            $exponent = $exponent + (-1) | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch(otcit_DoubleAnalyzer_exp10Table, $exponent << 16 >> 16);
    if ($decExponent < 0)
        $decExponent =  -$decExponent | 0;
    var$8 = otcit_DoubleAnalyzer_exp10Table.data;
    var$9 = $decExponent + 1 | 0;
    $binExponentCorrection = $exponent - var$8[var$9] | 0;
    $mantissaShift = 12 + $binExponentCorrection | 0;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, otcit_DoubleAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    if (Long_le($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA)) {
        while (jl_Long_compareUnsigned($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA) <= 0) {
            $decExponent = $decExponent + (-1) | 0;
            $decMantissa = Long_add(Long_mul($decMantissa, Long_fromInt(10)), Long_fromInt(9));
        }
        var$8 = otcit_DoubleAnalyzer_exp10Table.data;
        var$9 = $decExponent + 1 | 0;
        var$13 = $exponent - var$8[var$9] | 0;
        $mantissaShift = 12 + var$13 | 0;
        $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, otcit_DoubleAnalyzer_mantissa10Table.data[var$9], $mantissaShift);
    }
    var$14 = Long_shl(var$6, 1);
    var$6 = Long_add(var$14, Long_fromInt(1));
    var$8 = otcit_DoubleAnalyzer_mantissa10Table.data;
    var$13 = $decExponent + 1 | 0;
    var$15 = var$8[var$13];
    var$9 = $mantissaShift - 1 | 0;
    $decMantissaHi = otcit_DoubleAnalyzer_mulAndShiftRight(var$6, var$15, var$9);
    $decMantissaLow = otcit_DoubleAnalyzer_mulAndShiftRight(Long_sub(var$14, Long_fromInt(1)), otcit_DoubleAnalyzer_mantissa10Table.data[var$13], var$9);
    $lowerPos = otcit_DoubleAnalyzer_findLowerDistance($decMantissa, $decMantissaLow);
    $upperPos = otcit_DoubleAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = jl_Long_compareUnsigned($lowerPos, $upperPos);
    var$6 = $posCmp > 0 ? Long_mul(jl_Long_divideUnsigned($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? Long_add(Long_mul(jl_Long_divideUnsigned($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(jl_Long_divideUnsigned(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
    if (jl_Long_compareUnsigned(var$6, Long_create(2808348672, 232830643)) >= 0)
        while (true) {
            $decExponent = $decExponent + 1 | 0;
            var$6 = jl_Long_divideUnsigned(var$6, Long_fromInt(10));
            if (jl_Long_compareUnsigned(var$6, Long_create(2808348672, 232830643)) < 0)
                break;
        }
    else if (jl_Long_compareUnsigned(var$6, Long_create(1569325056, 23283064)) < 0) {
        $decExponent = $decExponent + (-1) | 0;
        var$6 = Long_mul(var$6, Long_fromInt(10));
    }
    $result.$mantissa = var$6;
    $result.$exponent = $decExponent - 330 | 0;
},
otcit_DoubleAnalyzer_findLowerDistance = ($mantissa, $lower) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        var$5 = jl_Long_divideUnsigned($mantissa, $pos_0);
        var$6 = jl_Long_divideUnsigned($lower, $pos_0);
        if (jl_Long_compareUnsigned(var$5, var$6) <= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_findUpperDistance = ($mantissa, $upper) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        var$5 = jl_Long_divideUnsigned($mantissa, $pos_0);
        var$6 = jl_Long_divideUnsigned($upper, $pos_0);
        if (jl_Long_compareUnsigned(var$5, var$6) >= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_mulAndShiftRight = ($a, $b, $shift) => {
    let $a1, $a2, $a3, $a4, $b1, $b2, $b3, $b4, $cm, $c0, $c1, $c2, $c3, $c, var$18;
    otcit_DoubleAnalyzer_$callClinit();
    $a1 = Long_and($a, Long_fromInt(65535));
    $a2 = Long_and(Long_shru($a, 16), Long_fromInt(65535));
    $a3 = Long_and(Long_shru($a, 32), Long_fromInt(65535));
    $a4 = Long_and(Long_shru($a, 48), Long_fromInt(65535));
    $b1 = Long_and($b, Long_fromInt(65535));
    $b2 = Long_and(Long_shru($b, 16), Long_fromInt(65535));
    $b3 = Long_and(Long_shru($b, 32), Long_fromInt(65535));
    $b4 = Long_and(Long_shru($b, 48), Long_fromInt(65535));
    $cm = Long_add(Long_add(Long_mul($b3, $a1), Long_mul($b2, $a2)), Long_mul($b1, $a3));
    $c0 = Long_add(Long_add(Long_add(Long_mul($b4, $a1), Long_mul($b3, $a2)), Long_mul($b2, $a3)), Long_mul($b1, $a4));
    $c1 = Long_add(Long_add(Long_mul($b4, $a2), Long_mul($b3, $a3)), Long_mul($b2, $a4));
    $c2 = Long_add(Long_mul($b4, $a3), Long_mul($b3, $a4));
    $c3 = Long_mul($b4, $a4);
    $c = Long_add(Long_add(Long_shl($c3, 32 + $shift | 0), Long_shl($c2, 16 + $shift | 0)), Long_shl($c1, $shift));
    var$18 = Long_add($cm, Long_shl($c0, 16));
    var$18 = Long_add($c, Long_shru(var$18, 32 - $shift | 0));
    return var$18;
},
otcit_DoubleAnalyzer__clinit_ = () => {
    otcit_DoubleAnalyzer_MAX_MANTISSA = jl_Long_divideUnsigned(Long_fromInt(-1), Long_fromInt(10));
    otcit_DoubleAnalyzer_resultForLog10 = otcit_DoubleAnalyzer$Result__init_();
    otcit_DoubleAnalyzer_mantissa10Table = $rt_createLongArrayFromData([Long_create(3251292512, 2194092222), Long_create(1766094183, 3510547556), Long_create(553881887, 2808438045), Long_create(443105509, 2246750436), Long_create(3285949193, 3594800697), Long_create(910772436, 2875840558), Long_create(2446604867, 2300672446), Long_create(2196580869, 3681075914), Long_create(2616258154, 2944860731), Long_create(1234013064, 2355888585), Long_create(1974420903, 3769421736), Long_create(720543263, 3015537389), Long_create(1435428070, 2412429911),
    Long_create(578697993, 3859887858), Long_create(2180945313, 3087910286), Long_create(885762791, 2470328229), Long_create(3135207384, 3952525166), Long_create(1649172448, 3162020133), Long_create(3037324877, 2529616106), Long_create(3141732885, 4047385770), Long_create(2513386308, 3237908616), Long_create(1151715587, 2590326893), Long_create(983751480, 4144523029), Long_create(1645994643, 3315618423), Long_create(3034782633, 2652494738), Long_create(3996658754, 4243991581), Long_create(2338333544, 3395193265),
    Long_create(1870666835, 2716154612), Long_create(4073513845, 2172923689), Long_create(3940641775, 3476677903), Long_create(575533043, 2781342323), Long_create(2178413352, 2225073858), Long_create(2626467905, 3560118173), Long_create(3819161242, 2848094538), Long_create(478348616, 2278475631), Long_create(3342338164, 3645561009), Long_create(3532863990, 2916448807), Long_create(1108304273, 2333159046), Long_create(55299919, 3733054474), Long_create(903233395, 2986443579), Long_create(1581580175, 2389154863),
    Long_create(1671534821, 3822647781), Long_create(478234397, 3058118225), Long_create(382587518, 2446494580), Long_create(612140029, 3914391328), Long_create(2207698941, 3131513062), Long_create(48172235, 2505210450), Long_create(77075576, 4008336720), Long_create(61660460, 3206669376), Long_create(3485302205, 2565335500), Long_create(1281516232, 4104536801), Long_create(166219527, 3283629441), Long_create(3568949458, 2626903552), Long_create(2274345296, 4203045684), Long_create(2678469696, 3362436547), Long_create(424788838, 2689949238),
    Long_create(2057817989, 2151959390), Long_create(3292508783, 3443135024), Long_create(3493000485, 2754508019), Long_create(3653393847, 2203606415), Long_create(1550462860, 3525770265), Long_create(1240370288, 2820616212), Long_create(3569276608, 2256492969), Long_create(3133862195, 3610388751), Long_create(1648096297, 2888311001), Long_create(459483578, 2310648801), Long_create(3312154103, 3697038081), Long_create(1790729823, 2957630465), Long_create(1432583858, 2366104372), Long_create(3151127633, 3785766995),
    Long_create(2520902106, 3028613596), Long_create(1157728226, 2422890877), Long_create(2711358621, 3876625403), Long_create(3887073815, 3101300322), Long_create(1391672133, 2481040258), Long_create(1367681954, 3969664413), Long_create(2812132482, 3175731530), Long_create(2249705985, 2540585224), Long_create(1022549199, 4064936359), Long_create(1677032818, 3251949087), Long_create(3918606632, 2601559269), Long_create(3692790234, 4162494831), Long_create(2095238728, 3329995865), Long_create(1676190982, 2663996692),
    Long_create(3540899031, 4262394707), Long_create(1114732307, 3409915766), Long_create(32792386, 2727932613), Long_create(1744220827, 2182346090), Long_create(2790753324, 3491753744), Long_create(3091596118, 2793402995), Long_create(2473276894, 2234722396), Long_create(2239256113, 3575555834), Long_create(2650398349, 2860444667), Long_create(402331761, 2288355734), Long_create(2361717736, 3661369174), Long_create(2748367648, 2929095339), Long_create(3057687578, 2343276271), Long_create(3174313206, 3749242034),
    Long_create(3398444024, 2999393627), Long_create(1000768301, 2399514902), Long_create(2460222741, 3839223843), Long_create(3686165111, 3071379074), Long_create(3807925548, 2457103259), Long_create(3515700499, 3931365215), Long_create(2812560399, 3145092172), Long_create(532061401, 2516073738), Long_create(4287272078, 4025717980), Long_create(3429817663, 3220574384), Long_create(3602847589, 2576459507), Long_create(2328582306, 4122335212), Long_create(144878926, 3297868170), Long_create(115903141, 2638294536),
    Long_create(2762425404, 4221271257), Long_create(491953404, 3377017006), Long_create(3829536560, 2701613604), Long_create(3922622707, 2161290883), Long_create(1122235577, 3458065414), Long_create(1756781920, 2766452331), Long_create(546432077, 2213161865), Long_create(874291324, 3541058984), Long_create(1558426518, 2832847187), Long_create(3823721592, 2266277749), Long_create(3540974170, 3626044399), Long_create(3691772795, 2900835519), Long_create(3812411695, 2320668415), Long_create(1804891416, 3713069465),
    Long_create(1443913133, 2970455572), Long_create(3732110884, 2376364457), Long_create(2535403578, 3802183132), Long_create(310335944, 3041746506), Long_create(3684242592, 2433397204), Long_create(3317807769, 3893435527), Long_create(936259297, 3114748422), Long_create(3325987815, 2491798737), Long_create(1885606668, 3986877980), Long_create(1508485334, 3189502384), Long_create(2065781726, 2551601907), Long_create(4164244222, 4082563051), Long_create(2472401918, 3266050441), Long_create(1118928075, 2612840353),
    Long_create(931291461, 4180544565), Long_create(745033169, 3344435652), Long_create(3173006913, 2675548521), Long_create(3358824142, 4280877634), Long_create(3546052773, 3424702107), Long_create(1118855300, 2739761686), Long_create(36090780, 2191809349), Long_create(1775732167, 3506894958), Long_create(3138572652, 2805515966), Long_create(1651864662, 2244412773), Long_create(1783990001, 3591060437), Long_create(4004172378, 2872848349), Long_create(4062331362, 2298278679), Long_create(3922749802, 3677245887),
    Long_create(1420212923, 2941796710), Long_create(1136170338, 2353437368), Long_create(958879082, 3765499789), Long_create(1626096725, 3012399831), Long_create(441883920, 2409919865), Long_create(707014273, 3855871784), Long_create(1424604878, 3084697427), Long_create(3716664280, 2467757941), Long_create(4228675929, 3948412706), Long_create(2523947284, 3158730165), Long_create(2019157827, 2526984132), Long_create(4089645983, 4043174611), Long_create(2412723327, 3234539689), Long_create(2789172121, 2587631751),
    Long_create(2744688475, 4140210802), Long_create(477763862, 3312168642), Long_create(2959191467, 2649734913), Long_create(3875712888, 4239575861), Long_create(2241576851, 3391660689), Long_create(2652254940, 2713328551), Long_create(1262810493, 2170662841), Long_create(302509870, 3473060546), Long_create(3677981733, 2778448436), Long_create(2083391927, 2222758749), Long_create(756446706, 3556413999), Long_create(1464150824, 2845131199), Long_create(2030314118, 2276104959), Long_create(671522212, 3641767935),
    Long_create(537217769, 2913414348), Long_create(2147761134, 2330731478), Long_create(2577424355, 3729170365), Long_create(2061939484, 2983336292), Long_create(4226531965, 2386669033), Long_create(1608490388, 3818670454), Long_create(2145785770, 3054936363), Long_create(3434615534, 2443949090), Long_create(1200417559, 3910318545), Long_create(960334047, 3128254836), Long_create(4204241074, 2502603868), Long_create(1572824964, 4004166190), Long_create(1258259971, 3203332952), Long_create(3583588354, 2562666361),
    Long_create(4015754449, 4100266178), Long_create(635623181, 3280212943), Long_create(2226485463, 2624170354), Long_create(985396364, 4198672567), Long_create(3365297469, 3358938053), Long_create(115257597, 2687150443), Long_create(1810192996, 2149720354), Long_create(319328417, 3439552567), Long_create(2832443111, 2751642053), Long_create(3983941407, 2201313642), Long_create(2938332415, 3522101828), Long_create(4068652850, 2817681462), Long_create(1536935362, 2254145170), Long_create(2459096579, 3606632272),
    Long_create(249290345, 2885305818), Long_create(1917419194, 2308244654), Long_create(490890333, 3693191447), Long_create(2969692644, 2954553157), Long_create(657767197, 2363642526), Long_create(3629407892, 3781828041), Long_create(2044532855, 3025462433), Long_create(3353613202, 2420369946), Long_create(3647794205, 3872591914), Long_create(3777228823, 3098073531), Long_create(2162789599, 2478458825), Long_create(3460463359, 3965534120), Long_create(2768370687, 3172427296), Long_create(1355703090, 2537941837),
    Long_create(3028118404, 4060706939), Long_create(3281488183, 3248565551), Long_create(1766197087, 2598852441), Long_create(1107928421, 4158163906), Long_create(27349277, 3326531125), Long_create(21879422, 2661224900), Long_create(35007075, 4257959840), Long_create(28005660, 3406367872), Long_create(2599384905, 2725094297), Long_create(361521006, 2180075438), Long_create(4014407446, 3488120700), Long_create(3211525957, 2790496560), Long_create(2569220766, 2232397248), Long_create(3251759766, 3571835597),
    Long_create(883420894, 2857468478), Long_create(2424723634, 2285974782), Long_create(443583977, 3657559652), Long_create(2931847559, 2926047721), Long_create(1486484588, 2340838177), Long_create(3237368801, 3745341083), Long_create(12914663, 2996272867), Long_create(2587312108, 2397018293), Long_create(3280705914, 3835229269), Long_create(3483558190, 3068183415), Long_create(2786846552, 2454546732), Long_create(1022980646, 3927274772), Long_create(3395364895, 3141819817), Long_create(998304997, 2513455854),
    Long_create(3315274914, 4021529366), Long_create(1793226472, 3217223493), Long_create(3152568096, 2573778794), Long_create(2467128576, 4118046071), Long_create(1114709402, 3294436857), Long_create(3468747899, 2635549485), Long_create(1255029343, 4216879177), Long_create(3581003852, 3373503341), Long_create(2005809622, 2698802673), Long_create(3322634616, 2159042138), Long_create(162254630, 3454467422), Long_create(2706784082, 2763573937), Long_create(447440347, 2210859150), Long_create(715904555, 3537374640),
    Long_create(572723644, 2829899712), Long_create(3035159293, 2263919769), Long_create(2279274491, 3622271631), Long_create(964426134, 2897817305), Long_create(771540907, 2318253844), Long_create(2952452370, 3709206150), Long_create(2361961896, 2967364920), Long_create(1889569516, 2373891936), Long_create(1305324308, 3798227098), Long_create(2762246365, 3038581678), Long_create(3927784010, 2430865342), Long_create(2848480580, 3889384548), Long_create(3996771382, 3111507638), Long_create(620436728, 2489206111),
    Long_create(3569679143, 3982729777), Long_create(1137756396, 3186183822), Long_create(3487185494, 2548947057), Long_create(2143522954, 4078315292), Long_create(4291798741, 3262652233), Long_create(856458615, 2610121787), Long_create(2229327243, 4176194859), Long_create(2642455254, 3340955887), Long_create(395977285, 2672764710), Long_create(633563656, 4276423536), Long_create(3942824761, 3421138828), Long_create(577279431, 2736911063), Long_create(2179810463, 2189528850), Long_create(3487696741, 3503246160),
    Long_create(2790157393, 2802596928), Long_create(3950112833, 2242077542), Long_create(2884206696, 3587324068), Long_create(4025352275, 2869859254), Long_create(4079275279, 2295887403), Long_create(1372879692, 3673419846), Long_create(239310294, 2938735877), Long_create(2768428613, 2350988701), Long_create(2711498862, 3761581922), Long_create(451212171, 3009265538), Long_create(2078956655, 2407412430), Long_create(3326330649, 3851859888), Long_create(84084141, 3081487911), Long_create(3503241150, 2465190328),
    Long_create(451225085, 3944304526), Long_create(3796953905, 3155443620), Long_create(3037563124, 2524354896), Long_create(3142114080, 4038967834), Long_create(3372684723, 3231174267), Long_create(980160860, 2584939414), Long_create(3286244294, 4135903062), Long_create(911008517, 3308722450), Long_create(728806813, 2646977960), Long_create(1166090902, 4235164736), Long_create(73879262, 3388131789), Long_create(918096869, 2710505431), Long_create(4170451332, 2168404344), Long_create(4095741754, 3469446951),
    Long_create(2417599944, 2775557561), Long_create(1075086496, 2220446049), Long_create(3438125312, 3552713678), Long_create(173519872, 2842170943), Long_create(1856802816, 2273736754), Long_create(393904128, 3637978807), Long_create(2892103680, 2910383045), Long_create(2313682944, 2328306436), Long_create(1983905792, 3725290298), Long_create(3305111552, 2980232238), Long_create(67108864, 2384185791), Long_create(2684354560, 3814697265), Long_create(2147483648, 3051757812), Long_create(0, 2441406250), Long_create(0, 3906250000),
    Long_create(0, 3125000000), Long_create(0, 2500000000), Long_create(0, 4000000000), Long_create(0, 3200000000), Long_create(0, 2560000000), Long_create(0, 4096000000), Long_create(0, 3276800000), Long_create(0, 2621440000), Long_create(0, 4194304000), Long_create(0, 3355443200), Long_create(0, 2684354560), Long_create(0, 2147483648), Long_create(3435973836, 3435973836), Long_create(1889785610, 2748779069), Long_create(2370821947, 2199023255), Long_create(3793315115, 3518437208), Long_create(457671715, 2814749767),
    Long_create(2943117749, 2251799813), Long_create(3849994940, 3602879701), Long_create(2221002492, 2882303761), Long_create(917808535, 2305843009), Long_create(3186480574, 3689348814), Long_create(3408177918, 2951479051), Long_create(1867548875, 2361183241), Long_create(1270091283, 3777893186), Long_create(157079567, 3022314549), Long_create(984657113, 2417851639), Long_create(3293438299, 3868562622), Long_create(916763721, 3094850098), Long_create(2451397895, 2475880078), Long_create(3063243173, 3961408125),
    Long_create(2450594538, 3169126500), Long_create(1960475630, 2535301200), Long_create(3136761009, 4056481920), Long_create(2509408807, 3245185536), Long_create(1148533586, 2596148429), Long_create(3555640657, 4153837486), Long_create(1985519066, 3323069989), Long_create(2447408712, 2658455991), Long_create(2197867021, 4253529586), Long_create(899300158, 3402823669), Long_create(1578433585, 2722258935), Long_create(1262746868, 2177807148), Long_create(1161401530, 3484491437), Long_create(3506101601, 2787593149),
    Long_create(3663874740, 2230074519), Long_create(3285219207, 3568119231), Long_create(1769181906, 2854495385), Long_create(1415345525, 2283596308), Long_create(1405559381, 3653754093), Long_create(2842434423, 2923003274), Long_create(3132940998, 2338402619), Long_create(2435725219, 3741444191), Long_create(1089586716, 2993155353), Long_create(2589656291, 2394524282), Long_create(707476229, 3831238852), Long_create(3142961361, 3064991081), Long_create(1655375629, 2451992865), Long_create(2648601007, 3923188584),
    Long_create(2977874265, 3138550867), Long_create(664312493, 2510840694), Long_create(2780886908, 4017345110), Long_create(2224709526, 3213876088), Long_create(3497754539, 2571100870), Long_create(1301439967, 4113761393), Long_create(2759138892, 3291009114), Long_create(3066304573, 2632807291), Long_create(3188100398, 4212491666), Long_create(1691486859, 3369993333), Long_create(3071176406, 2695994666), Long_create(1597947665, 2156795733), Long_create(1697722806, 3450873173), Long_create(3076165163, 2760698538),
    Long_create(4178919049, 2208558830), Long_create(2391303182, 3533694129), Long_create(2772036005, 2826955303), Long_create(3935615722, 2261564242), Long_create(2861011319, 3618502788), Long_create(4006795973, 2894802230), Long_create(3205436779, 2315841784), Long_create(2551718468, 3705346855), Long_create(2041374775, 2964277484), Long_create(2492093279, 2371421987), Long_create(551375410, 3794275180), Long_create(441100328, 3035420144), Long_create(1211873721, 2428336115), Long_create(1938997954, 3885337784),
    Long_create(2410191822, 3108270227), Long_create(210166539, 2486616182), Long_create(1195259923, 3978585891), Long_create(97214479, 3182868713), Long_create(1795758501, 2546294970), Long_create(2873213602, 4074071952), Long_create(580583963, 3259257562), Long_create(3041447548, 2607406049), Long_create(2289335700, 4171849679), Long_create(2690462019, 3337479743), Long_create(3870356534, 2669983794), Long_create(3615590076, 4271974071), Long_create(2033478602, 3417579257), Long_create(4203763259, 2734063405),
    Long_create(3363010607, 2187250724), Long_create(2803836594, 3499601159), Long_create(3102062734, 2799680927), Long_create(763663269, 2239744742), Long_create(2080854690, 3583591587), Long_create(4241664129, 2866873269), Long_create(4252324763, 2293498615), Long_create(2508752324, 3669597785), Long_create(2007001859, 2935678228), Long_create(3323588406, 2348542582), Long_create(1881767613, 3757668132), Long_create(4082394468, 3006134505), Long_create(3265915574, 2404907604), Long_create(2648484541, 3847852167),
    Long_create(400800715, 3078281734), Long_create(1179634031, 2462625387), Long_create(2746407909, 3940200619), Long_create(3056119786, 3152160495), Long_create(2444895829, 2521728396), Long_create(2193846408, 4034765434), Long_create(2614070585, 3227812347), Long_create(373269550, 2582249878), Long_create(4033205117, 4131599804), Long_create(4085557553, 3305279843), Long_create(691465664, 2644223875), Long_create(1106345063, 4230758200), Long_create(885076050, 3384606560), Long_create(708060840, 2707685248),
    Long_create(2284435591, 2166148198), Long_create(2796103486, 3465837117), Long_create(518895870, 2772669694), Long_create(1274110155, 2218135755), Long_create(2038576249, 3549017208), Long_create(3348847917, 2839213766), Long_create(1820084875, 2271371013), Long_create(2053142340, 3634193621), Long_create(783520413, 2907354897), Long_create(3203796708, 2325883917), Long_create(1690100896, 3721414268), Long_create(3070067635, 2977131414), Long_create(3315047567, 2381705131), Long_create(3586089190, 3810728210),
    Long_create(2868871352, 3048582568), Long_create(4013084000, 2438866054), Long_create(3843954022, 3902185687), Long_create(1357176299, 3121748550), Long_create(1085741039, 2497398840), Long_create(1737185663, 3995838144), Long_create(2248741989, 3196670515), Long_create(1798993591, 2557336412), Long_create(3737383206, 4091738259), Long_create(3848900024, 3273390607), Long_create(1361133101, 2618712486), Long_create(459826043, 4189939978), Long_create(2085847752, 3351951982), Long_create(4245658579, 2681561585),
    Long_create(2498086431, 4290498537), Long_create(280482227, 3432398830), Long_create(224385781, 2745919064), Long_create(1038502084, 2196735251), Long_create(4238583712, 3514776401), Long_create(2531873511, 2811821121), Long_create(1166505349, 2249456897), Long_create(2725402018, 3599131035), Long_create(2180321615, 2879304828), Long_create(3462244210, 2303443862), Long_create(2103616899, 3685510180), Long_create(1682893519, 2948408144), Long_create(2205308275, 2358726515), Long_create(3528493240, 3773962424),
    Long_create(3681788051, 3019169939), Long_create(3804423900, 2415335951), Long_create(74124026, 3864537523), Long_create(1777286139, 3091630018), Long_create(3139815829, 2473304014), Long_create(2446724950, 3957286423), Long_create(3675366878, 3165829138), Long_create(363313125, 2532663311), Long_create(3158281377, 4052261297), Long_create(808638183, 3241809038), Long_create(2364897465, 2593447230), Long_create(3783835944, 4149515568), Long_create(450088378, 3319612455), Long_create(360070702, 2655689964),
    Long_create(2294100042, 4249103942), Long_create(117293115, 3399283154), Long_create(952827951, 2719426523), Long_create(2480249279, 2175541218), Long_create(3109405388, 3480865949), Long_create(3346517769, 2784692759), Long_create(3536207675, 2227754207), Long_create(2221958443, 3564406732), Long_create(59579836, 2851525386), Long_create(3483637705, 2281220308), Long_create(419859574, 3649952494), Long_create(1194881118, 2919961995), Long_create(955904894, 2335969596), Long_create(4106428209, 3737551353),
    Long_create(708162189, 2990041083), Long_create(2284516670, 2392032866), Long_create(1937239754, 3827252586), Long_create(690798344, 3061802069), Long_create(1411632134, 2449441655), Long_create(2258611415, 3919106648), Long_create(3524876050, 3135285318), Long_create(242920462, 2508228255), Long_create(388672740, 4013165208), Long_create(2028925110, 3210532166), Long_create(764146629, 2568425733), Long_create(363641147, 4109481173), Long_create(2008899836, 3287584938), Long_create(3325106787, 2630067950),
    Long_create(1025203564, 4208108721), Long_create(4256136688, 3366486976), Long_create(2545915891, 2693189581), Long_create(1177739254, 2154551665), Long_create(1884382806, 3447282664), Long_create(2366499704, 2757826131), Long_create(1034206304, 2206260905), Long_create(1654730086, 3530017448), Long_create(3041770987, 2824013958), Long_create(4151403708, 2259211166), Long_create(629291719, 3614737867), Long_create(3080413753, 2891790293), Long_create(4182317920, 2313432234), Long_create(4114728295, 3701491575),
    Long_create(3291782636, 2961193260), Long_create(2633426109, 2368954608), Long_create(3354488315, 3790327373), Long_create(106610275, 3032261899), Long_create(944281679, 2425809519), Long_create(3228837605, 3881295230), Long_create(2583070084, 3105036184), Long_create(2925449526, 2484028947), Long_create(1244745405, 3974446316), Long_create(136802865, 3179557053), Long_create(1827429210, 2543645642), Long_create(3782880196, 4069833027), Long_create(1308317238, 3255866422), Long_create(3623634168, 2604693137),
    Long_create(2361840832, 4167509020), Long_create(1889472666, 3334007216), Long_create(652584673, 2667205773), Long_create(185142018, 4267529237), Long_create(2725093992, 3414023389), Long_create(3039068653, 2731218711), Long_create(1572261463, 2184974969), Long_create(4233605259, 3495959950), Long_create(3386884207, 2796767960), Long_create(2709507366, 2237414368), Long_create(3476218326, 3579862989), Long_create(3639968120, 2863890391), Long_create(2052981037, 2291112313), Long_create(2425776200, 3665779701),
    Long_create(1081627501, 2932623761), Long_create(6308541, 2346099009), Long_create(1728080585, 3753758414), Long_create(2241457927, 3003006731), Long_create(934172882, 2402405385), Long_create(1494676612, 3843848616), Long_create(336747830, 3075078893), Long_create(1987385183, 2460063114), Long_create(602835915, 3936100983), Long_create(2200255650, 3148880786), Long_create(901211061, 2519104629), Long_create(3159924616, 4030567406), Long_create(1668946233, 3224453925), Long_create(1335156987, 2579563140),
    Long_create(2136251179, 4127301024), Long_create(2567994402, 3301840819), Long_create(2913388981, 2641472655), Long_create(366455074, 4226356249), Long_create(1152157518, 3381084999), Long_create(1780719474, 2704867999), Long_create(2283569038, 2163894399), Long_create(1076730083, 3462231039), Long_create(1720377526, 2769784831), Long_create(517308561, 2215827865), Long_create(827693699, 3545324584), Long_create(1521148418, 2836259667), Long_create(3793899112, 2269007733), Long_create(916277824, 3630412374),
    Long_create(1592015718, 2904329899), Long_create(2132606034, 2323463919), Long_create(835189277, 3717542271), Long_create(4104125258, 2974033816), Long_create(2424306747, 2379227053), Long_create(3019897337, 3806763285), Long_create(2415917869, 3045410628), Long_create(3650721214, 2436328502), Long_create(2405180105, 3898125604), Long_create(2783137543, 3118500483), Long_create(3944496953, 2494800386), Long_create(298240911, 3991680619), Long_create(1097586188, 3193344495), Long_create(878068950, 2554675596),
    Long_create(3981890698, 4087480953), Long_create(608532181, 3269984763), Long_create(2204812663, 2615987810), Long_create(3527700261, 4185580496), Long_create(1963166749, 3348464397), Long_create(4147513777, 2678771517), Long_create(3200048207, 4286034428), Long_create(4278025484, 3428827542), Long_create(1704433468, 2743062034), Long_create(2222540234, 2194449627), Long_create(120090538, 3511119404), Long_create(955065889, 2808895523), Long_create(2482039630, 2247116418), Long_create(3112269949, 3595386269),
    Long_create(3348809418, 2876309015), Long_create(2679047534, 2301047212), Long_create(850502218, 3681675540), Long_create(680401775, 2945340432), Long_create(3121301797, 2356272345), Long_create(699115580, 3770035753), Long_create(2277279382, 3016028602), Long_create(103836587, 2412822882), Long_create(1025131999, 3860516611), Long_create(4256079436, 3088413288), Long_create(827883168, 2470730631), Long_create(3901593088, 3953169009)]);
    otcit_DoubleAnalyzer_exp10Table = $rt_createShortArrayFromData([(-70), (-66), (-63), (-60), (-56), (-53), (-50), (-46), (-43), (-40), (-36), (-33), (-30), (-26), (-23), (-20), (-16), (-13), (-10), (-6), (-3), 0, 4, 7, 10, 14, 17, 20, 23, 27, 30, 33, 37, 40, 43, 47, 50, 53, 57, 60, 63, 67, 70, 73, 77, 80, 83, 87, 90, 93, 97, 100, 103, 107, 110, 113, 116, 120, 123, 126, 130, 133, 136, 140, 143, 146, 150, 153, 156, 160, 163, 166, 170, 173, 176, 180, 183, 186, 190, 193, 196, 200, 203, 206, 210, 213, 216, 219,
    223, 226, 229, 233, 236, 239, 243, 246, 249, 253, 256, 259, 263, 266, 269, 273, 276, 279, 283, 286, 289, 293, 296, 299, 303, 306, 309, 312, 316, 319, 322, 326, 329, 332, 336, 339, 342, 346, 349, 352, 356, 359, 362, 366, 369, 372, 376, 379, 382, 386, 389, 392, 396, 399, 402, 406, 409, 412, 415, 419, 422, 425, 429, 432, 435, 439, 442, 445, 449, 452, 455, 459, 462, 465, 469, 472, 475, 479, 482, 485, 489, 492, 495, 499, 502, 505, 508, 512, 515, 518, 522, 525, 528, 532, 535, 538, 542, 545, 548, 552, 555, 558,
    562, 565, 568, 572, 575, 578, 582, 585, 588, 592, 595, 598, 601, 605, 608, 611, 615, 618, 621, 625, 628, 631, 635, 638, 641, 645, 648, 651, 655, 658, 661, 665, 668, 671, 675, 678, 681, 685, 688, 691, 695, 698, 701, 704, 708, 711, 714, 718, 721, 724, 728, 731, 734, 738, 741, 744, 748, 751, 754, 758, 761, 764, 768, 771, 774, 778, 781, 784, 788, 791, 794, 797, 801, 804, 807, 811, 814, 817, 821, 824, 827, 831, 834, 837, 841, 844, 847, 851, 854, 857, 861, 864, 867, 871, 874, 877, 881, 884, 887, 891, 894, 897,
    900, 904, 907, 910, 914, 917, 920, 924, 927, 930, 934, 937, 940, 944, 947, 950, 954, 957, 960, 964, 967, 970, 974, 977, 980, 984, 987, 990, 993, 997, 1000, 1003, 1007, 1010, 1013, 1017, 1020, 1023, 1027, 1030, 1033, 1037, 1040, 1043, 1047, 1050, 1053, 1057, 1060, 1063, 1067, 1070, 1073, 1077, 1080, 1083, 1086, 1090, 1093, 1096, 1100, 1103, 1106, 1110, 1113, 1116, 1120, 1123, 1126, 1130, 1133, 1136, 1140, 1143, 1146, 1150, 1153, 1156, 1160, 1163, 1166, 1170, 1173, 1176, 1180, 1183, 1186, 1189, 1193, 1196,
    1199, 1203, 1206, 1209, 1213, 1216, 1219, 1223, 1226, 1229, 1233, 1236, 1239, 1243, 1246, 1249, 1253, 1256, 1259, 1263, 1266, 1269, 1273, 1276, 1279, 1282, 1286, 1289, 1292, 1296, 1299, 1302, 1306, 1309, 1312, 1316, 1319, 1322, 1326, 1329, 1332, 1336, 1339, 1342, 1346, 1349, 1352, 1356, 1359, 1362, 1366, 1369, 1372, 1376, 1379, 1382, 1385, 1389, 1392, 1395, 1399, 1402, 1405, 1409, 1412, 1415, 1419, 1422, 1425, 1429, 1432, 1435, 1439, 1442, 1445, 1449, 1452, 1455, 1459, 1462, 1465, 1469, 1472, 1475, 1478,
    1482, 1485, 1488, 1492, 1495, 1498, 1502, 1505, 1508, 1512, 1515, 1518, 1522, 1525, 1528, 1532, 1535, 1538, 1542, 1545, 1548, 1552, 1555, 1558, 1562, 1565, 1568, 1572, 1575, 1578, 1581, 1585, 1588, 1591, 1595, 1598, 1601, 1605, 1608, 1611, 1615, 1618, 1621, 1625, 1628, 1631, 1635, 1638, 1641, 1645, 1648, 1651, 1655, 1658, 1661, 1665, 1668, 1671, 1674, 1678, 1681, 1684, 1688, 1691, 1694, 1698, 1701, 1704, 1708, 1711, 1714, 1718, 1721, 1724, 1728, 1731, 1734, 1738, 1741, 1744, 1748, 1751, 1754, 1758, 1761,
    1764, 1767, 1771, 1774, 1777, 1781, 1784, 1787, 1791, 1794, 1797, 1801, 1804, 1807, 1811, 1814, 1817, 1821, 1824, 1827, 1831, 1834, 1837, 1841, 1844, 1847, 1851, 1854, 1857, 1861, 1864, 1867, 1870, 1874, 1877, 1880, 1884, 1887, 1890, 1894, 1897, 1900, 1904, 1907, 1910, 1914, 1917, 1920, 1924, 1927, 1930, 1934, 1937, 1940, 1944, 1947, 1950, 1954, 1957, 1960, 1963, 1967, 1970, 1973, 1977, 1980, 1983, 1987, 1990, 1993, 1997, 2000, 2003, 2007, 2010, 2013, 2017, 2020, 2023, 2027, 2030, 2033, 2037, 2040, 2043,
    2047, 2050, 2053, 2057, 2060, 2063, 2066, 2070, 2073, 2076, 2080, 2083, 2086, 2090, 2093, 2096, 2100, 2103, 2106, 2110, 2113, 2116, 2120]);
};
function jur_EOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter0 = 0;
}
let jur_EOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter0 = $counter;
},
jur_EOLSet__init_0 = var_0 => {
    let var_1 = new jur_EOLSet();
    jur_EOLSet__init_(var_1, var_0);
    return var_1;
},
jur_EOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, var$5, var$6, $ch;
    $rightBound = !$matchResult.$hasAnchoringBounds() ? $testString.$length() : $matchResult.$getRightBound();
    if ($strIndex >= $rightBound) {
        $matchResult.$setConsumed($this.$consCounter0, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    var$5 = $rightBound - $strIndex | 0;
    if (var$5 == 2 && $testString.$charAt($strIndex) == 13) {
        var$6 = $strIndex + 1 | 0;
        if ($testString.$charAt(var$6) == 10) {
            $matchResult.$setConsumed($this.$consCounter0, 0);
            return $this.$next2.$matches($strIndex, $testString, $matchResult);
        }
    }
    a: {
        if (var$5 == 1) {
            $ch = $testString.$charAt($strIndex);
            if ($ch == 10)
                break a;
            if ($ch == 13)
                break a;
            if ($ch == 133)
                break a;
            if (($ch | 1) == 8233)
                break a;
        }
        return (-1);
    }
    $matchResult.$setConsumed($this.$consCounter0, 0);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_EOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !$matchResult.$getConsumed($this.$consCounter0) ? 0 : 1;
    $matchResult.$setConsumed($this.$consCounter0, (-1));
    return $res;
},
jur_EOLSet_getName = $this => {
    return $rt_s(270);
},
otr_StringInfo = $rt_classWithoutFields(otrr_ReflectionInfo);
function igiaj_EngineJs$1() {
    jl_Object.call(this);
    this.$val$sink = null;
}
let igiaj_EngineJs$1__init_ = ($this, var$1) => {
    $this.$val$sink = var$1;
    jl_Object__init_($this);
},
igiaj_EngineJs$1__init_0 = var_0 => {
    let var_1 = new igiaj_EngineJs$1();
    igiaj_EngineJs$1__init_(var_1, var_0);
    return var_1;
},
igiaj_EngineJs$1_accept = ($this, $message) => {
    $this.$val$sink.accept($rt_ustr($message));
};
function jur_Lexer() {
    let a = this; jl_Object.call(a);
    a.$pattern0 = null;
    a.$flags0 = 0;
    a.$mode0 = 0;
    a.$savedMode = 0;
    a.$lookBack = 0;
    a.$ch = 0;
    a.$lookAhead0 = 0;
    a.$groupName = null;
    a.$patternFullLength = 0;
    a.$curST = null;
    a.$lookAheadST = null;
    a.$index = 0;
    a.$prevNW = 0;
    a.$curToc = 0;
    a.$lookAheadToc = 0;
    a.$orig = null;
}
let jur_Lexer_decompTable = null,
jur_Lexer_singleDecompTable = null,
jur_Lexer_singleDecompTableSize = 0,
jur_Lexer__init_ = ($this, $pattern, $flags) => {
    jl_Object__init_($this);
    $this.$mode0 = 1;
    $this.$orig = $pattern;
    if (($flags & 16) > 0)
        $pattern = jur_Pattern_quote($pattern);
    else if (($flags & 128) > 0)
        $pattern = jur_Lexer_normalize($pattern);
    $this.$pattern0 = $rt_createCharArray(jl_String_length($pattern) + 2 | 0);
    jl_System_fastArraycopy(jl_String_toCharArray($pattern), 0, $this.$pattern0, 0, jl_String_length($pattern));
    $this.$pattern0.data[$this.$pattern0.data.length - 1 | 0] = 0;
    $this.$pattern0.data[$this.$pattern0.data.length - 2 | 0] = 0;
    $this.$patternFullLength = $this.$pattern0.data.length;
    $this.$flags0 = $flags;
    jur_Lexer_movePointer($this);
    jur_Lexer_movePointer($this);
},
jur_Lexer__init_0 = (var_0, var_1) => {
    let var_2 = new jur_Lexer();
    jur_Lexer__init_(var_2, var_0, var_1);
    return var_2;
},
jur_Lexer_peek = $this => {
    return $this.$ch;
},
jur_Lexer_setMode = ($this, $mode) => {
    if ($mode > 0 && $mode < 3)
        $this.$mode0 = $mode;
    if ($mode == 1)
        jur_Lexer_reread($this);
},
jur_Lexer_restoreFlags = ($this, $flags) => {
    $this.$flags0 = $flags;
    $this.$lookAhead0 = $this.$ch;
    $this.$lookAheadST = $this.$curST;
    $this.$index = $this.$curToc + 1 | 0;
    $this.$lookAheadToc = $this.$curToc;
    jur_Lexer_movePointer($this);
},
jur_Lexer_peekSpecial = $this => {
    return $this.$curST;
},
jur_Lexer_isSpecial = $this => {
    return $this.$curST === null ? 0 : 1;
},
jur_Lexer_isNextSpecial = $this => {
    return $this.$lookAheadST === null ? 0 : 1;
},
jur_Lexer_next = $this => {
    jur_Lexer_movePointer($this);
    return $this.$lookBack;
},
jur_Lexer_nextSpecial = $this => {
    let $res;
    $res = $this.$curST;
    jur_Lexer_movePointer($this);
    return $res;
},
jur_Lexer_lookAhead = $this => {
    return $this.$lookAhead0;
},
jur_Lexer_back = $this => {
    return $this.$lookBack;
},
jur_Lexer_normalize = $input => {
    return $input;
},
jur_Lexer_reread = $this => {
    $this.$lookAhead0 = $this.$ch;
    $this.$lookAheadST = $this.$curST;
    $this.$index = $this.$lookAheadToc;
    $this.$lookAheadToc = $this.$curToc;
    jur_Lexer_movePointer($this);
},
jur_Lexer_movePointer = $this => {
    let $reread, var$2, $cs, $negative, $nonCap, $behindOrNamed, $nameBuilder, var$8, $mod, $$je;
    $this.$lookBack = $this.$ch;
    $this.$ch = $this.$lookAhead0;
    $this.$curST = $this.$lookAheadST;
    $this.$curToc = $this.$lookAheadToc;
    $this.$lookAheadToc = $this.$index;
    a: {
        while (true) {
            $reread = 0;
            $this.$lookAhead0 = $this.$index >= $this.$pattern0.data.length ? 0 : jur_Lexer_nextCodePoint($this);
            $this.$lookAheadST = null;
            if ($this.$mode0 == 4) {
                if ($this.$lookAhead0 != 92)
                    return;
                $this.$lookAhead0 = $this.$index >= $this.$pattern0.data.length ? 0 : $this.$pattern0.data[jur_Lexer_nextIndex($this)];
                switch ($this.$lookAhead0) {
                    case 69:
                        break;
                    default:
                        $this.$lookAhead0 = 92;
                        $this.$index = $this.$prevNW;
                        return;
                }
                $this.$mode0 = $this.$savedMode;
                $this.$lookAhead0 = $this.$index > ($this.$pattern0.data.length - 2 | 0) ? 0 : jur_Lexer_nextCodePoint($this);
            }
            b: {
                if ($this.$lookAhead0 == 92) {
                    var$2 = $this.$index >= ($this.$pattern0.data.length - 2 | 0) ? (-1) : jur_Lexer_nextCodePoint($this);
                    c: {
                        $this.$lookAhead0 = var$2;
                        switch ($this.$lookAhead0) {
                            case -1:
                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                            case 20:
                            case 21:
                            case 22:
                            case 23:
                            case 24:
                            case 25:
                            case 26:
                            case 27:
                            case 28:
                            case 29:
                            case 30:
                            case 31:
                            case 32:
                            case 33:
                            case 34:
                            case 35:
                            case 36:
                            case 37:
                            case 38:
                            case 39:
                            case 40:
                            case 41:
                            case 42:
                            case 43:
                            case 44:
                            case 45:
                            case 46:
                            case 47:
                            case 58:
                            case 59:
                            case 60:
                            case 61:
                            case 62:
                            case 63:
                            case 64:
                            case 91:
                            case 92:
                            case 93:
                            case 94:
                            case 95:
                            case 96:
                            case 118:
                                break;
                            case 48:
                                $this.$lookAhead0 = jur_Lexer_readOctals($this);
                                break b;
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                                if ($this.$mode0 != 1)
                                    break b;
                                $this.$lookAhead0 = (-2147483648) | $this.$lookAhead0;
                                break b;
                            case 65:
                                $this.$lookAhead0 = (-2147483583);
                                break b;
                            case 66:
                                $this.$lookAhead0 = (-2147483582);
                                break b;
                            case 67:
                            case 69:
                            case 70:
                            case 72:
                            case 73:
                            case 74:
                            case 75:
                            case 76:
                            case 77:
                            case 78:
                            case 79:
                            case 82:
                            case 84:
                            case 85:
                            case 86:
                            case 88:
                            case 89:
                            case 103:
                            case 104:
                            case 105:
                            case 106:
                            case 107:
                            case 108:
                            case 109:
                            case 111:
                            case 113:
                            case 121:
                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
                            case 68:
                            case 83:
                            case 87:
                            case 100:
                            case 115:
                            case 119:
                                $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass(jl_String__init_1($this.$pattern0, $this.$prevNW, 1), 0);
                                $this.$lookAhead0 = 0;
                                break b;
                            case 71:
                                $this.$lookAhead0 = (-2147483577);
                                break b;
                            case 80:
                            case 112:
                                break c;
                            case 81:
                                $this.$savedMode = $this.$mode0;
                                $this.$mode0 = 4;
                                $reread = 1;
                                break b;
                            case 90:
                                $this.$lookAhead0 = (-2147483558);
                                break b;
                            case 97:
                                $this.$lookAhead0 = 7;
                                break b;
                            case 98:
                                $this.$lookAhead0 = (-2147483550);
                                break b;
                            case 99:
                                if ($this.$index >= ($this.$pattern0.data.length - 2 | 0))
                                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
                                $this.$lookAhead0 = $this.$pattern0.data[jur_Lexer_nextIndex($this)] & 31;
                                break b;
                            case 101:
                                $this.$lookAhead0 = 27;
                                break b;
                            case 102:
                                $this.$lookAhead0 = 12;
                                break b;
                            case 110:
                                $this.$lookAhead0 = 10;
                                break b;
                            case 114:
                                $this.$lookAhead0 = 13;
                                break b;
                            case 116:
                                $this.$lookAhead0 = 9;
                                break b;
                            case 117:
                                $this.$lookAhead0 = jur_Lexer_readHex($this, 4);
                                break b;
                            case 120:
                                $this.$lookAhead0 = jur_Lexer_readHex($this, 2);
                                break b;
                            case 122:
                                $this.$lookAhead0 = (-2147483526);
                                break b;
                            default:
                        }
                        break b;
                    }
                    $cs = jur_Lexer_parseCharClassName($this);
                    $negative = 0;
                    if ($this.$lookAhead0 == 80)
                        $negative = 1;
                    try {
                        $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass($cs, $negative);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof ju_MissingResourceException) {
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
                        } else {
                            throw $$e;
                        }
                    }
                    $this.$lookAhead0 = 0;
                } else if ($this.$mode0 == 1)
                    switch ($this.$lookAhead0) {
                        case 36:
                            $this.$lookAhead0 = (-536870876);
                            break b;
                        case 40:
                            if ($this.$pattern0.data[$this.$index] != 63) {
                                $this.$lookAhead0 = (-2147483608);
                                break b;
                            }
                            jur_Lexer_nextIndex($this);
                            $nonCap = $this.$pattern0.data[$this.$index];
                            $behindOrNamed = 0;
                            $nameBuilder = null;
                            while (true) {
                                d: {
                                    if (!$behindOrNamed) {
                                        switch ($nonCap) {
                                            case 33:
                                                break;
                                            case 60:
                                                jur_Lexer_nextIndex($this);
                                                $nonCap = $this.$pattern0.data[$this.$index];
                                                $behindOrNamed = 1;
                                                break d;
                                            case 61:
                                                $this.$lookAhead0 = (-536870872);
                                                jur_Lexer_nextIndex($this);
                                                break d;
                                            case 62:
                                                $this.$lookAhead0 = (-33554392);
                                                jur_Lexer_nextIndex($this);
                                                break d;
                                            default:
                                                $this.$lookAhead0 = jur_Lexer_readFlags($this);
                                                if ($this.$lookAhead0 < 256) {
                                                    $this.$flags0 = $this.$lookAhead0;
                                                    $this.$lookAhead0 = $this.$lookAhead0 << 16;
                                                    $this.$lookAhead0 = (-1073741784) | $this.$lookAhead0;
                                                    break d;
                                                }
                                                $this.$lookAhead0 = $this.$lookAhead0 & 255;
                                                $this.$flags0 = $this.$lookAhead0;
                                                $this.$lookAhead0 = $this.$lookAhead0 << 16;
                                                $this.$lookAhead0 = (-16777176) | $this.$lookAhead0;
                                                break d;
                                        }
                                        $this.$lookAhead0 = (-268435416);
                                        jur_Lexer_nextIndex($this);
                                    } else {
                                        e: {
                                            switch ($nonCap) {
                                                case 33:
                                                    break;
                                                case 61:
                                                    $behindOrNamed = 0;
                                                    $this.$lookAhead0 = (-134217688);
                                                    jur_Lexer_nextIndex($this);
                                                    break d;
                                                case 62:
                                                    if ($nameBuilder === null)
                                                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
                                                    $this.$groupName = $nameBuilder.$toString();
                                                    jur_Lexer_nextIndex($this);
                                                    $nameBuilder = null;
                                                    $behindOrNamed = 0;
                                                    $this.$lookAhead0 = (-2130706392);
                                                    break d;
                                                default:
                                                    break e;
                                            }
                                            $behindOrNamed = 0;
                                            $this.$lookAhead0 = (-67108824);
                                            jur_Lexer_nextIndex($this);
                                            break d;
                                        }
                                        f: {
                                            if (!($nonCap >= 65 && $nonCap <= 90)) {
                                                if ($nonCap < 97)
                                                    break f;
                                                if ($nonCap > 122)
                                                    break f;
                                            }
                                            if ($nameBuilder === null)
                                                $nameBuilder = jl_StringBuilder__init_();
                                            $nameBuilder.$append0($nonCap);
                                            jur_Lexer_nextIndex($this);
                                            $nonCap = $this.$pattern0.data[$this.$index];
                                            break d;
                                        }
                                        if ($nonCap < 48)
                                            break a;
                                        if ($nonCap > 57)
                                            break a;
                                        if ($nameBuilder === null) {
                                            var$8 = jur_PatternSyntaxException__init_($rt_s(394), $this.$toString(), $this.$index);
                                            $rt_throw(var$8);
                                        }
                                        $nameBuilder.$append0($nonCap);
                                        jur_Lexer_nextIndex($this);
                                        $nonCap = $this.$pattern0.data[$this.$index];
                                    }
                                }
                                if (!$behindOrNamed)
                                    break;
                            }
                            break b;
                        case 41:
                            $this.$lookAhead0 = (-536870871);
                            break b;
                        case 42:
                        case 43:
                        case 63:
                            $mod = $this.$index >= $this.$pattern0.data.length ? 42 : $this.$pattern0.data[$this.$index];
                            switch ($mod) {
                                case 43:
                                    $this.$lookAhead0 = $this.$lookAhead0 | (-2147483648);
                                    jur_Lexer_nextIndex($this);
                                    break b;
                                case 63:
                                    $this.$lookAhead0 = $this.$lookAhead0 | (-1073741824);
                                    jur_Lexer_nextIndex($this);
                                    break b;
                                default:
                            }
                            $this.$lookAhead0 = $this.$lookAhead0 | (-536870912);
                            break b;
                        case 46:
                            $this.$lookAhead0 = (-536870866);
                            break b;
                        case 91:
                            $this.$lookAhead0 = (-536870821);
                            $this.$setMode(2);
                            break b;
                        case 93:
                            if ($this.$mode0 != 2)
                                break b;
                            $this.$lookAhead0 = (-536870819);
                            break b;
                        case 94:
                            $this.$lookAhead0 = (-536870818);
                            break b;
                        case 123:
                            $this.$lookAheadST = jur_Lexer_processQuantifier($this, $this.$lookAhead0);
                            break b;
                        case 124:
                            $this.$lookAhead0 = (-536870788);
                            break b;
                        default:
                    }
                else if ($this.$mode0 == 2)
                    switch ($this.$lookAhead0) {
                        case 38:
                            $this.$lookAhead0 = (-536870874);
                            break b;
                        case 45:
                            $this.$lookAhead0 = (-536870867);
                            break b;
                        case 91:
                            $this.$lookAhead0 = (-536870821);
                            break b;
                        case 93:
                            $this.$lookAhead0 = (-536870819);
                            break b;
                        case 94:
                            $this.$lookAhead0 = (-536870818);
                            break b;
                        default:
                    }
            }
            if ($reread)
                continue;
            else
                break;
        }
        return;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
},
jur_Lexer_parseCharClassName = $this => {
    let $sb, var$2, var$3, $ch, $res;
    $sb = jl_StringBuilder__init_0(10);
    if ($this.$index < ($this.$pattern0.data.length - 2 | 0)) {
        if ($this.$pattern0.data[$this.$index] != 123) {
            var$2 = jl_String__init_1($this.$pattern0, jur_Lexer_nextIndex($this), 1);
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(395)), var$2);
            return jl_StringBuilder_toString(var$3);
        }
        jur_Lexer_nextIndex($this);
        $ch = 0;
        a: {
            while ($this.$index < ($this.$pattern0.data.length - 2 | 0)) {
                $ch = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
                if ($ch == 125)
                    break a;
                $sb.$append0($ch);
            }
        }
        if ($ch != 125)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
    }
    if (!$sb.$length())
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
    $res = $sb.$toString();
    if (jl_String_length($res) == 1) {
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(395)), $res);
        return jl_StringBuilder_toString(var$2);
    }
    b: {
        c: {
            if (jl_String_length($res) > 3) {
                if (jl_String_startsWith($res, $rt_s(395)))
                    break c;
                if (jl_String_startsWith($res, $rt_s(396)))
                    break c;
            }
            break b;
        }
        $res = jl_String_substring0($res, 2);
    }
    return $res;
},
jur_Lexer_processQuantifier = ($this, $ch) => {
    let $sb, $min, $max, $mod, $$je;
    $sb = jl_StringBuilder__init_0(4);
    $min = (-1);
    $max = 2147483647;
    a: {
        while (true) {
            if ($this.$index >= $this.$pattern0.data.length)
                break a;
            $ch = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
            if ($ch == 125)
                break a;
            if ($ch == 44 && $min < 0)
                try {
                    $min = jl_Integer_parseInt($sb.$toString(), 10);
                    $sb.$delete0(0, $sb.$length());
                    continue;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_NumberFormatException) {
                        break;
                    } else {
                        throw $$e;
                    }
                }
            $sb.$append0($ch & 65535);
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
    }
    if ($ch != 125)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
    if ($sb.$length() > 0)
        b: {
            try {
                $max = jl_Integer_parseInt($sb.$toString(), 10);
                if ($min >= 0)
                    break b;
                $min = $max;
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
                } else {
                    throw $$e;
                }
            }
        }
    else if ($min < 0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
    if (($min | $max | ($max - $min | 0)) < 0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
    $mod = $this.$index >= $this.$pattern0.data.length ? 42 : $this.$pattern0.data[$this.$index];
    c: {
        switch ($mod) {
            case 43:
                $this.$lookAhead0 = (-2147483525);
                jur_Lexer_nextIndex($this);
                break c;
            case 63:
                $this.$lookAhead0 = (-1073741701);
                jur_Lexer_nextIndex($this);
                break c;
            default:
        }
        $this.$lookAhead0 = (-536870789);
    }
    return jur_Quantifier__init_0($min, $max);
},
jur_Lexer_toString = $this => {
    return $this.$orig;
},
jur_Lexer_isEmpty = $this => {
    return !$this.$ch && !$this.$lookAhead0 && $this.$index == $this.$patternFullLength && !$this.$isSpecial() ? 1 : 0;
},
jur_Lexer_isLetter = $ch => {
    return $ch < 0 ? 0 : 1;
},
jur_Lexer_isLetter0 = $this => {
    return !$this.$isEmpty() && !$this.$isSpecial() && jur_Lexer_isLetter($this.$ch) ? 1 : 0;
},
jur_Lexer_isHighSurrogate0 = $this => {
    return $this.$ch <= 56319 && $this.$ch >= 55296 ? 1 : 0;
},
jur_Lexer_isLowSurrogate0 = $this => {
    return $this.$ch <= 57343 && $this.$ch >= 56320 ? 1 : 0;
},
jur_Lexer_isHighSurrogate = $ch => {
    return $ch <= 56319 && $ch >= 55296 ? 1 : 0;
},
jur_Lexer_isLowSurrogate = $ch => {
    return $ch <= 57343 && $ch >= 56320 ? 1 : 0;
},
jur_Lexer_readHex = ($this, $max) => {
    let $st, $length, $i, var$5, $$je;
    $st = jl_StringBuilder__init_0($max);
    $length = $this.$pattern0.data.length - 2 | 0;
    $i = 0;
    while (true) {
        var$5 = $rt_compare($i, $max);
        if (var$5 >= 0)
            break;
        if ($this.$index >= $length)
            break;
        $st.$append0($this.$pattern0.data[jur_Lexer_nextIndex($this)]);
        $i = $i + 1 | 0;
    }
    if (!var$5)
        a: {
            try {
                var$5 = jl_Integer_parseInt($st.$toString(), 16);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return var$5;
        }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
},
jur_Lexer_readOctals = $this => {
    let $max, $i, $length, $res, var$5;
    $max = 3;
    $i = 1;
    $length = $this.$pattern0.data.length - 2 | 0;
    $res = jl_Character_digit($this.$pattern0.data[$this.$index], 8);
    switch ($res) {
        case -1:
            break;
        default:
            if ($res > 3)
                $max = 2;
            jur_Lexer_nextIndex($this);
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    if ($this.$index >= $length)
                        break a;
                    var$5 = jl_Character_digit($this.$pattern0.data[$this.$index], 8);
                    if (var$5 < 0)
                        break;
                    $res = ($res * 8 | 0) + var$5 | 0;
                    jur_Lexer_nextIndex($this);
                    $i = $i + 1 | 0;
                }
            }
            return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
},
jur_Lexer_readFlags = $this => {
    let $pos, $res, $ch;
    $pos = 1;
    $res = $this.$flags0;
    a: while (true) {
        if ($this.$index >= $this.$pattern0.data.length)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
        b: {
            c: {
                $ch = $this.$pattern0.data[$this.$index];
                switch ($ch) {
                    case 41:
                        jur_Lexer_nextIndex($this);
                        return $res | 256;
                    case 45:
                        if (!$pos)
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(10), $this.$toString(), $this.$index));
                        $pos = 0;
                        break b;
                    case 58:
                        break a;
                    case 100:
                        break c;
                    case 105:
                        $res = $pos ? $res | 2 : ($res ^ 2) & $res;
                        break b;
                    case 109:
                        $res = $pos ? $res | 8 : ($res ^ 8) & $res;
                        break b;
                    case 115:
                        $res = $pos ? $res | 32 : ($res ^ 32) & $res;
                        break b;
                    case 117:
                        $res = $pos ? $res | 64 : ($res ^ 64) & $res;
                        break b;
                    case 120:
                        $res = $pos ? $res | 4 : ($res ^ 4) & $res;
                        break b;
                    default:
                }
                break b;
            }
            $res = $pos ? $res | 1 : ($res ^ 1) & $res;
        }
        jur_Lexer_nextIndex($this);
    }
    jur_Lexer_nextIndex($this);
    return $res;
},
jur_Lexer_nextIndex = $this => {
    $this.$prevNW = $this.$index;
    if ($this.$flags0 & 4)
        jur_Lexer_skipComments($this);
    else
        $this.$index = $this.$index + 1 | 0;
    return $this.$prevNW;
},
jur_Lexer_skipComments = $this => {
    let $length;
    $length = $this.$pattern0.data.length - 2 | 0;
    $this.$index = $this.$index + 1 | 0;
    a: while (true) {
        if ($this.$index < $length && jl_Character_isWhitespace0($this.$pattern0.data[$this.$index])) {
            $this.$index = $this.$index + 1 | 0;
            continue;
        }
        if ($this.$index >= $length)
            break;
        if ($this.$pattern0.data[$this.$index] != 35)
            break;
        $this.$index = $this.$index + 1 | 0;
        while (true) {
            if ($this.$index >= $length)
                continue a;
            if (jur_Lexer_isLineSeparator($this, $this.$pattern0.data[$this.$index]))
                continue a;
            $this.$index = $this.$index + 1 | 0;
        }
    }
    return $this.$index;
},
jur_Lexer_isLineSeparator = ($this, $ch) => {
    return $ch != 10 && $ch != 13 && $ch != 133 && ($ch | 1) != 8233 ? 0 : 1;
},
jur_Lexer_getDecomposition = $ch => {
    return jur_Lexer_decompTable.$get5($ch);
},
jur_Lexer_getHangulDecomposition = $ch => {
    let $sIndex, $l, $v, $t, $decomp, var$7;
    $sIndex = $ch - 44032 | 0;
    if ($sIndex >= 0 && $sIndex < 11172) {
        $l = 4352 + ($sIndex / 588 | 0) | 0;
        $v = 4449 + (($sIndex % 588 | 0) / 28 | 0) | 0;
        $t = $sIndex % 28 | 0;
        if (!$t)
            $decomp = $rt_createIntArrayFromData([$l, $v]);
        else {
            var$7 = 4519 + $t | 0;
            $decomp = $rt_createIntArrayFromData([$l, $v, var$7]);
        }
        return $decomp;
    }
    return null;
},
jur_Lexer_hasSingleCodepointDecomposition = $ch => {
    let $hasSingleDecomp;
    $hasSingleDecomp = jur_Lexer_singleDecompTable.$get2($ch);
    return $hasSingleDecomp == jur_Lexer_singleDecompTableSize ? 0 : 1;
},
jur_Lexer_hasDecompositionNonNullCanClass = $ch => {
    return ($ch != 832 ? 0 : 1) | ($ch != 833 ? 0 : 1) | ($ch != 835 ? 0 : 1) | ($ch != 836 ? 0 : 1);
},
jur_Lexer_nextCodePoint = $this => {
    let $high, $lowExpectedIndex, $low;
    $high = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
    if (jl_Character_isHighSurrogate($high)) {
        $lowExpectedIndex = $this.$prevNW + 1 | 0;
        if ($lowExpectedIndex < $this.$pattern0.data.length) {
            $low = $this.$pattern0.data[$lowExpectedIndex];
            if (jl_Character_isLowSurrogate($low)) {
                jur_Lexer_nextIndex($this);
                return jl_Character_toCodePoint($high, $low);
            }
        }
    }
    return $high;
},
jur_Lexer_getIndex = $this => {
    return $this.$curToc;
},
jur_AbstractCharClass$LazySpecialsBlock = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpecialsBlock__init_ = $this => {
    jur_AbstractCharClass$LazyCharClass__init_($this);
},
jur_AbstractCharClass$LazySpecialsBlock__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazySpecialsBlock();
    jur_AbstractCharClass$LazySpecialsBlock__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpecialsBlock_computeValue = $this => {
    return ((jur_CharClass__init_()).$add0(65279, 65279)).$add0(65520, 65533);
},
jur_AbstractCharClass$LazyNonSpace = $rt_classWithoutFields(jur_AbstractCharClass$LazySpace),
jur_AbstractCharClass$LazyNonSpace__init_ = $this => {
    jur_AbstractCharClass$LazySpace__init_($this);
},
jur_AbstractCharClass$LazyNonSpace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonSpace();
    jur_AbstractCharClass$LazyNonSpace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonSpace_computeValue = $this => {
    let $chCl;
    $chCl = (jur_AbstractCharClass$LazySpace_computeValue($this)).$setNegative(1);
    $chCl.$mayContainSupplCodepoints0 = 1;
    return $chCl;
},
igiae_ManifestSchema = $rt_classWithoutFields(),
igiae_ManifestSchema_get = () => {
    let $properties, $id, $api, $entry, $icons, $capabilities, $permissions, $root;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(274), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(397)));
    $id = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(398));
    igiae_JsonSchema_setPattern($id, $rt_s(399));
    igiae_JsonSchema_setFix($id, $rt_s(400));
    $properties.$put($rt_s(16), $id);
    $api = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(376)), $rt_s(401));
    igiae_JsonSchema_setMinimum($api, jl_Integer_valueOf(1));
    igiae_JsonSchema_setFix($api, $rt_s(402));
    $properties.$put($rt_s(12), $api);
    $entry = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(403));
    igiae_JsonSchema_setFix($entry, $rt_s(404));
    $properties.$put($rt_s(310), $entry);
    $properties.$put($rt_s(405), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(406)));
    $properties.$put($rt_s(407), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(408)));
    $icons = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(409));
    igiae_JsonSchema_setAdditionalProperties($icons, igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(408)));
    $properties.$put($rt_s(410), $icons);
    $capabilities = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(411));
    igiae_JsonSchema_setItems($capabilities, igiae_JsonSchema_ofType($rt_s(260)));
    igiae_JsonSchema_setFix($capabilities, $rt_s(412));
    $properties.$put($rt_s(17), $capabilities);
    $properties.$put($rt_s(296), igiae_ManifestSchema_services());
    $properties.$put($rt_s(413), igiae_ManifestSchema_commands());
    $properties.$put($rt_s(414), igiae_ManifestSchema_config());
    $properties.$put($rt_s(415), igiae_ManifestSchema_data());
    $permissions = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(416));
    igiae_JsonSchema_setItems($permissions, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(18), $permissions);
    $properties.$put($rt_s(417), igiae_ManifestSchema_lifecycle());
    $properties.$put($rt_s(418), igiae_ManifestSchema_publish());
    $properties.$put($rt_s(419), igiae_ManifestSchema_repo());
    $properties.$put($rt_s(420), igiae_ManifestSchema_marketplace());
    $properties.$put($rt_s(11), igiae_ManifestSchema_app());
    $root = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(421));
    igiae_JsonSchema_setSchemaDraft($root, $rt_s(422));
    igiae_JsonSchema_setSchemaId($root, $rt_s(423));
    igiae_JsonSchema_setTitle($root, $rt_s(424));
    igiae_JsonSchema_setRequired($root, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(16), $rt_s(12)])));
    igiae_JsonSchema_setProperties($root, $properties);
    return $root;
};
let igiae_ManifestSchema_services = () => {
    let $properties, $provides, $consumes, $services;
    $properties = ju_LinkedHashMap__init_();
    $provides = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(425));
    igiae_JsonSchema_setItems($provides, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(297), $provides);
    $consumes = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(426));
    igiae_JsonSchema_setItems($consumes, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(298), $consumes);
    $services = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(427));
    igiae_JsonSchema_setProperties($services, $properties);
    return $services;
},
igiae_ManifestSchema_commands = () => {
    let $properties, $command, $commands;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(428), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(429)));
    $properties.$put($rt_s(277), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(430)));
    $properties.$put($rt_s(431), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(432)));
    $properties.$put($rt_s(433), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(434)));
    $properties.$put($rt_s(435), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(436)));
    $command = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(437));
    igiae_JsonSchema_setRequired($command, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(428), $rt_s(277)])));
    igiae_JsonSchema_setProperties($command, $properties);
    $commands = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(438));
    igiae_JsonSchema_setItems($commands, $command);
    return $commands;
},
igiae_ManifestSchema_data = () => {
    let $paths, $properties, $data, var$4;
    $paths = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(439));
    igiae_JsonSchema_setItems($paths, igiae_JsonSchema_ofType($rt_s(260)));
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(440), $paths);
    $data = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(441));
    var$4 = $rt_createArray(jl_String, 1);
    var$4.data[0] = $rt_s(440);
    igiae_JsonSchema_setRequired($data, ju_Arrays_asList(var$4));
    igiae_JsonSchema_setProperties($data, $properties);
    return $data;
},
igiae_ManifestSchema_config = () => {
    let $properties, $config, var$3;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(428), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(442)));
    $properties.$put($rt_s(443), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(444)));
    $config = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(445));
    var$3 = $rt_createArray(jl_String, 1);
    var$3.data[0] = $rt_s(443);
    igiae_JsonSchema_setRequired($config, ju_Arrays_asList(var$3));
    igiae_JsonSchema_setProperties($config, $properties);
    return $config;
},
igiae_ManifestSchema_lifecycle = () => {
    let $properties, $lifecycle;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(446), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(262)), $rt_s(447)));
    $properties.$put($rt_s(448), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(262)), $rt_s(449)));
    $lifecycle = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(450));
    igiae_JsonSchema_setProperties($lifecycle, $properties);
    return $lifecycle;
},
igiae_ManifestSchema_publish = () => {
    let $properties, $jarModule, $publish;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(451), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(262)), $rt_s(452)));
    $jarModule = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(453));
    igiae_JsonSchema_setItems($jarModule, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(454), $jarModule);
    $properties.$put($rt_s(455), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(262)), $rt_s(456)));
    $properties.$put($rt_s(457), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(262)), $rt_s(458)));
    $publish = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(459));
    igiae_JsonSchema_setProperties($publish, $properties);
    return $publish;
},
igiae_ManifestSchema_repo = () => {
    let $properties, $domains, $tech, $topics, $repo;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(460), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(461)));
    $properties.$put($rt_s(462), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(463)));
    $domains = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(464));
    igiae_JsonSchema_setItems($domains, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(465), $domains);
    $tech = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(466));
    igiae_JsonSchema_setItems($tech, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(467), $tech);
    $topics = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(468));
    igiae_JsonSchema_setItems($topics, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(469), $topics);
    $repo = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(470));
    igiae_JsonSchema_setRequired($repo, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(460), $rt_s(462), $rt_s(467)])));
    igiae_JsonSchema_setProperties($repo, $properties);
    return $repo;
},
igiae_ManifestSchema_marketplace = () => {
    let $matchProperties, $topics, $match, $categoryProperties, $category, $categories, $properties, $marketplace, var$9;
    $matchProperties = ju_LinkedHashMap__init_();
    $topics = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(471));
    igiae_JsonSchema_setItems($topics, igiae_JsonSchema_ofType($rt_s(260)));
    $matchProperties.$put($rt_s(469), $topics);
    $matchProperties.$put($rt_s(472), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(473)));
    $match = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(474));
    igiae_JsonSchema_setProperties($match, $matchProperties);
    $categoryProperties = ju_LinkedHashMap__init_();
    $categoryProperties.$put($rt_s(16), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(475)));
    $categoryProperties.$put($rt_s(476), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(477)));
    $categoryProperties.$put($rt_s(478), $match);
    $category = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(479));
    igiae_JsonSchema_setRequired($category, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(16), $rt_s(478)])));
    igiae_JsonSchema_setProperties($category, $categoryProperties);
    $categories = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(480));
    igiae_JsonSchema_setItems($categories, $category);
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(481), $categories);
    $marketplace = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(482));
    var$9 = $rt_createArray(jl_String, 1);
    var$9.data[0] = $rt_s(481);
    igiae_JsonSchema_setRequired($marketplace, ju_Arrays_asList(var$9));
    igiae_JsonSchema_setProperties($marketplace, $properties);
    return $marketplace;
},
igiae_ManifestSchema_app = () => {
    let $properties, $integration, $app;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(16), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(483)));
    $properties.$put($rt_s(476), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(406)));
    $properties.$put($rt_s(407), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(484)));
    $properties.$put($rt_s(485), igiae_ManifestSchema_appHome());
    $properties.$put($rt_s(486), igiae_ManifestSchema_appDetect());
    $properties.$put($rt_s(487), igiae_ManifestSchema_appLoader());
    $properties.$put($rt_s(488), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(489)));
    $properties.$put($rt_s(440), igiae_ManifestSchema_appPathNames());
    $properties.$put($rt_s(490), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(376)), $rt_s(491)));
    $integration = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(492));
    igiae_JsonSchema_setEnumValues($integration, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(493), $rt_s(494)])));
    igiae_JsonSchema_setFix($integration, $rt_s(495));
    $properties.$put($rt_s(496), $integration);
    $properties.$put($rt_s(497), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(498)));
    $properties.$put($rt_s(499), igiae_ManifestSchema_appUsage());
    $properties.$put($rt_s(500), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(501)));
    $properties.$put($rt_s(502), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(503)));
    $properties.$put($rt_s(504), igiae_ManifestSchema_appNpmPlugins());
    $properties.$put($rt_s(505), igiae_ManifestSchema_appStartupHook());
    $properties.$put($rt_s(506), igiae_ManifestSchema_appDiscovery());
    $properties.$put($rt_s(507), igiae_ManifestSchema_appProjects());
    $properties.$put($rt_s(508), igiae_ManifestSchema_appModelCatalog());
    $app = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(509));
    igiae_JsonSchema_setRequired($app, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(16), $rt_s(476), $rt_s(485)])));
    igiae_JsonSchema_setProperties($app, $properties);
    return $app;
},
igiae_ManifestSchema_appHome = () => {
    let $properties, $candidates, $home, var$4;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(510), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(511)));
    $properties.$put($rt_s(512), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(513)));
    $properties.$put($rt_s(514), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(515)));
    $candidates = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(516));
    igiae_JsonSchema_setItems($candidates, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(517), $candidates);
    $home = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(518));
    var$4 = $rt_createArray(jl_String, 1);
    var$4.data[0] = $rt_s(517);
    igiae_JsonSchema_setRequired($home, ju_Arrays_asList(var$4));
    igiae_JsonSchema_setProperties($home, $properties);
    return $home;
},
igiae_ManifestSchema_appDetect = () => {
    let $properties, $detect;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(519), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(520)));
    $properties.$put($rt_s(521), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(522)));
    $detect = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(523));
    igiae_JsonSchema_setProperties($detect, $properties);
    return $detect;
},
igiae_ManifestSchema_appLoader = () => {
    let $properties, $loader;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(16), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(524)));
    $properties.$put($rt_s(525), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(526)));
    $loader = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(527));
    igiae_JsonSchema_setRequired($loader, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(16), $rt_s(525)])));
    igiae_JsonSchema_setProperties($loader, $properties);
    return $loader;
},
igiae_ManifestSchema_appPathNames = () => {
    let $properties, $paths;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(528), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(529)));
    $properties.$put($rt_s(530), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(531)));
    $properties.$put($rt_s(532), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(533)));
    $properties.$put($rt_s(414), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(534)));
    $paths = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(535));
    igiae_JsonSchema_setProperties($paths, $properties);
    return $paths;
},
igiae_ManifestSchema_appUsage = () => {
    let $properties, $formats, $usage, var$4;
    $properties = ju_LinkedHashMap__init_();
    $formats = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(536));
    igiae_JsonSchema_setItems($formats, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(537), $formats);
    $usage = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(538));
    var$4 = $rt_createArray(jl_String, 1);
    var$4.data[0] = $rt_s(537);
    igiae_JsonSchema_setRequired($usage, ju_Arrays_asList(var$4));
    igiae_JsonSchema_setProperties($usage, $properties);
    return $usage;
},
igiae_ManifestSchema_appNpmPlugins = () => {
    let $properties, $configFiles, $npmPlugins;
    $properties = ju_LinkedHashMap__init_();
    $configFiles = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(539));
    igiae_JsonSchema_setItems($configFiles, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(540), $configFiles);
    $properties.$put($rt_s(541), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(542)));
    $properties.$put($rt_s(543), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(544)));
    $properties.$put($rt_s(545), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(546)));
    $npmPlugins = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(547));
    igiae_JsonSchema_setRequired($npmPlugins, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(540), $rt_s(541)])));
    igiae_JsonSchema_setProperties($npmPlugins, $properties);
    return $npmPlugins;
},
igiae_ManifestSchema_appStartupHook = () => {
    let $properties, $path, $startupHook;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(548), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(549)));
    $path = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(550));
    igiae_JsonSchema_setItems($path, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(551), $path);
    $properties.$put($rt_s(310), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(552)));
    $startupHook = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(553));
    igiae_JsonSchema_setRequired($startupHook, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(548), $rt_s(551), $rt_s(310)])));
    igiae_JsonSchema_setProperties($startupHook, $properties);
    return $startupHook;
},
igiae_ManifestSchema_appDiscovery = () => {
    let $properties, $discovery;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(554), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(555)));
    $properties.$put($rt_s(556), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(557)));
    $properties.$put($rt_s(558), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(559)));
    $discovery = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(560));
    igiae_JsonSchema_setProperties($discovery, $properties);
    return $discovery;
},
igiae_ManifestSchema_appProjects = () => {
    let $properties, $sessionDb, $projects;
    $properties = ju_LinkedHashMap__init_();
    $properties.$put($rt_s(561), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(562)));
    $sessionDb = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(563));
    igiae_JsonSchema_setItems($sessionDb, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(564), $sessionDb);
    $properties.$put($rt_s(565), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(566)));
    $projects = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(567));
    igiae_JsonSchema_setProperties($projects, $properties);
    return $projects;
},
igiae_ManifestSchema_appModelCatalog = () => {
    let $properties, $files, $modelCatalog;
    $properties = ju_LinkedHashMap__init_();
    $files = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(375)), $rt_s(568));
    igiae_JsonSchema_setItems($files, igiae_JsonSchema_ofType($rt_s(260)));
    $properties.$put($rt_s(569), $files);
    $properties.$put($rt_s(510), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(570)));
    $properties.$put($rt_s(545), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(546)));
    $properties.$put($rt_s(571), igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(260)), $rt_s(572)));
    $modelCatalog = igiae_ManifestSchema_described(igiae_JsonSchema_ofType($rt_s(329)), $rt_s(573));
    igiae_JsonSchema_setRequired($modelCatalog, ju_Arrays_asList($rt_wrapArray(jl_String, [$rt_s(569), $rt_s(571)])));
    igiae_JsonSchema_setProperties($modelCatalog, $properties);
    return $modelCatalog;
},
igiae_ManifestSchema_described = ($schema, $description) => {
    igiae_JsonSchema_setDescription($schema, $description);
    return $schema;
};
function igiae_ManifestFacts() {
    let a = this; jl_Object.call(a);
    a.$id = null;
    a.$api0 = 0;
    a.$capabilities0 = null;
    a.$permissions0 = null;
    a.$payload = null;
}
let igiae_ManifestFacts__init_ = ($this, $id, $api, $capabilities, $permissions, $payload) => {
    jl_Object__init_($this);
    $this.$id = $id;
    $this.$api0 = $api;
    $this.$capabilities0 = igiae_ManifestFacts_copy($capabilities);
    $this.$permissions0 = igiae_ManifestFacts_copy($permissions);
    $this.$payload = $payload;
},
igiae_ManifestFacts__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new igiae_ManifestFacts();
    igiae_ManifestFacts__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
igiae_ManifestFacts_getId = $this => {
    return $this.$id;
},
igiae_ManifestFacts_getApi = $this => {
    return $this.$api0;
},
igiae_ManifestFacts_getCapabilities = $this => {
    return ju_Collections_unmodifiableList($this.$capabilities0);
},
igiae_ManifestFacts_getPermissions = $this => {
    return ju_Collections_unmodifiableList($this.$permissions0);
},
igiae_ManifestFacts_getPayload = $this => {
    return $this.$payload;
},
igiae_ManifestFacts_copy = $values => {
    return $values !== null ? ju_ArrayList__init_0($values) : ju_ArrayList__init_();
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_1 = $rt_classWithoutFields(),
otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_0 = () => {
    let var_0 = new otji_JSWrapper$Helper$_clinit_$lambda$_3_1();
    otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_(var_0);
    return var_0;
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept = (var$0, var$1) => {
    otji_JSWrapper$Helper_lambda$static$1(var$1);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept$exported$0 = (var$1, var$2) => {
    var$1.$accept0(var$2);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_0 = $rt_classWithoutFields(),
otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_0 = () => {
    let var_0 = new otji_JSWrapper$Helper$_clinit_$lambda$_3_0();
    otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_(var_0);
    return var_0;
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept = (var$0, var$1) => {
    otji_JSWrapper$Helper_lambda$static$0(var$1);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept$exported$0 = (var$1, var$2) => {
    var$1.$accept0(var$2);
};
function ju_Arrays$ArrayAsList() {
    ju_AbstractList.call(this);
    this.$array1 = null;
}
let ju_Arrays$ArrayAsList__init_ = ($this, $array) => {
    ju_AbstractList__init_($this);
    $this.$array1 = $array;
},
ju_Arrays$ArrayAsList__init_0 = var_0 => {
    let var_1 = new ju_Arrays$ArrayAsList();
    ju_Arrays$ArrayAsList__init_(var_1, var_0);
    return var_1;
},
ju_Arrays$ArrayAsList_get = ($this, $index) => {
    return $this.$array1.data[$index];
},
ju_Arrays$ArrayAsList_size = $this => {
    return $this.$array1.data.length;
},
ju_Collections = $rt_classWithoutFields(),
ju_Collections_EMPTY_SET = null,
ju_Collections_EMPTY_MAP = null,
ju_Collections_EMPTY_LIST = null,
ju_Collections_EMPTY_ITERATOR = null,
ju_Collections_EMPTY_LIST_ITERATOR = null,
ju_Collections_reverseOrder = null,
ju_Collections_$callClinit = () => {
    ju_Collections_$callClinit = $rt_eraseClinit(ju_Collections);
    ju_Collections__clinit_();
},
ju_Collections_emptyMap = () => {
    ju_Collections_$callClinit();
    return ju_Collections_EMPTY_MAP;
},
ju_Collections_reverse0 = $list => {
    let $randomAccess;
    ju_Collections_$callClinit();
    if ($rt_isInstance($list, ju_RandomAccess))
        ju_Collections_reverse($list, 0, $list.$size());
    else {
        $randomAccess = ju_ArrayList__init_0($list);
        ju_Collections_reverse($randomAccess, 0, $randomAccess.$size());
        $list.$clear1();
        $list.$addAll($randomAccess);
    }
},
ju_Collections_reverse = ($list, $i, $to) => {
    let $half, $j, $tmp_0;
    ju_Collections_$callClinit();
    $half = ($i + $to | 0) / 2 | 0;
    $j = $to - 1 | 0;
    while ($i < $half) {
        $tmp_0 = $list.$get($i);
        $list.$set1($i, $list.$get($j));
        $list.$set1($j, $tmp_0);
        $i = $i + 1 | 0;
        $j = $j + (-1) | 0;
    }
},
ju_Collections_unmodifiableList = $list => {
    ju_Collections_$callClinit();
    ju_Objects_requireNonNull($list);
    return ju_Collections$9__init_0($list);
},
ju_Collections_unmodifiableMap = $m => {
    ju_Collections_$callClinit();
    ju_Objects_requireNonNull($m);
    return ju_Collections$13__init_0($m);
},
ju_Collections__clinit_ = () => {
    ju_Collections_EMPTY_SET = ju_Collections$1__init_0();
    ju_Collections_EMPTY_MAP = ju_Collections$2__init_0();
    ju_Collections_EMPTY_LIST = ju_Collections$3__init_0();
    ju_Collections_EMPTY_ITERATOR = ju_Collections$4__init_0();
    ju_Collections_EMPTY_LIST_ITERATOR = ju_Collections$5__init_0();
    ju_Collections_reverseOrder = ju_Collections$_clinit_$lambda$_59_0__init_0();
};
$rt_packages([-1, "java", 0, "util", 1, "regex", 0, "lang", -1, "org", 4, "teavm", 5, "classlib", 6, "impl", 7, "unicode", -1, "io", 9, "github", 10, "intisy", 11, "ai", 12, "engine", 12, "js"
]);
$rt_metadata([jl_Object, "Object", 3, 0, [], 1, 0, 0, ["$getClass", $rt_wrapFunction0(jl_Object_getClass), "$hashCode0", $rt_wrapFunction0(jl_Object_hashCode), "$equals", $rt_wrapFunction1(jl_Object_equals), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity)],
jur_AbstractCharClass$LazyCharClass, 0, jl_Object, [], 1024, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyCharClass__init_), "$getValue0", $rt_wrapFunction1(jur_AbstractCharClass$LazyCharClass_getValue)],
jur_AbstractCharClass$LazyBlank, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyBlank__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyBlank_computeValue)],
jur_AbstractCharClass$LazyCntrl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyCntrl__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCntrl_computeValue)],
ji_Serializable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1025, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Number__init_)],
jl_Comparable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Integer, "Integer", 3, jl_Number, [jl_Comparable], 1, 0, () => jl_Integer_$callClinit(), ["$_init_0", $rt_wrapFunction1(jl_Integer__init_), "$intValue", $rt_wrapFunction0(jl_Integer_intValue), "$longValue", $rt_wrapFunction0(jl_Integer_longValue), "$doubleValue", $rt_wrapFunction0(jl_Integer_doubleValue), "$toString", $rt_wrapFunction0(jl_Integer_toString1), "$hashCode0", $rt_wrapFunction0(jl_Integer_hashCode), "$equals", $rt_wrapFunction1(jl_Integer_equals)],
igiae_Scheduler$Cancellable, 0, jl_Object, [], 1537, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 1537, 0, 0, 0,
igiaj_JsPluginContext$IdFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginContext$9, 0, jl_Object, [igiaj_JsPluginContext$IdFn], 0, 0, 0, ["$_init_", $rt_wrapFunction0(igiaj_JsPluginContext$9__init_), "$call", $rt_wrapFunction1(igiaj_JsPluginContext$9_call)],
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, () => jl_AbstractStringBuilder$Constants_$callClinit(), 0,
jur_AbstractSet, 0, jl_Object, [], 1024, 0, () => jur_AbstractSet_$callClinit(), ["$_init_", $rt_wrapFunction0(jur_AbstractSet__init_), "$_init_6", $rt_wrapFunction1(jur_AbstractSet__init_0), "$find", $rt_wrapFunction3(jur_AbstractSet_find), "$findBack", $rt_wrapFunction4(jur_AbstractSet_findBack), "$setType", $rt_wrapFunction1(jur_AbstractSet_setType), "$getType", $rt_wrapFunction0(jur_AbstractSet_getType), "$getQualifiedName", $rt_wrapFunction0(jur_AbstractSet_getQualifiedName), "$toString", $rt_wrapFunction0(jur_AbstractSet_toString),
"$getNext", $rt_wrapFunction0(jur_AbstractSet_getNext), "$setNext", $rt_wrapFunction1(jur_AbstractSet_setNext), "$first", $rt_wrapFunction1(jur_AbstractSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_AbstractSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_AbstractSet_processSecondPass)],
jur_JointSet, "JointSet", 2, jur_AbstractSet, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_JointSet__init_), "$_init_29", $rt_wrapFunction2(jur_JointSet__init_0), "$matches", $rt_wrapFunction3(jur_JointSet_matches), "$setNext", $rt_wrapFunction1(jur_JointSet_setNext), "$getName", $rt_wrapFunction0(jur_JointSet_getName), "$first", $rt_wrapFunction1(jur_JointSet_first), "$hasConsumed", $rt_wrapFunction1(jur_JointSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_JointSet_processSecondPass)],
jur_SingleSet, "SingleSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_5", $rt_wrapFunction2(jur_SingleSet__init_), "$matches", $rt_wrapFunction3(jur_SingleSet_matches), "$find", $rt_wrapFunction3(jur_SingleSet_find), "$findBack", $rt_wrapFunction4(jur_SingleSet_findBack), "$first", $rt_wrapFunction1(jur_SingleSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_SingleSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_SingleSet_processSecondPass)],
igiaj_JsPluginContext$SubscribeFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginContext$7, 0, jl_Object, [igiaj_JsPluginContext$SubscribeFn], 0, 0, 0, ["$_init_90", $rt_wrapFunction1(igiaj_JsPluginContext$7__init_), "$call0", $rt_wrapFunction2(igiaj_JsPluginContext$7_call)],
igiaj_JsPluginContext$ProvideFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginContext$8, 0, jl_Object, [igiaj_JsPluginContext$ProvideFn], 0, 0, 0, ["$_init_91", $rt_wrapFunction1(igiaj_JsPluginContext$8__init_), "$call1", $rt_wrapFunction2(igiaj_JsPluginContext$8_call)],
igiaj_JsPluginContext$IdsFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginContext$5, 0, jl_Object, [igiaj_JsPluginContext$IdsFn], 0, 0, 0, ["$_init_89", $rt_wrapFunction1(igiaj_JsPluginContext$5__init_), "$call2", $rt_wrapFunction0(igiaj_JsPluginContext$5_call)],
igiaj_JsPluginContext$PublishFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginContext$6, 0, jl_Object, [igiaj_JsPluginContext$PublishFn], 0, 0, 0, ["$_init_90", $rt_wrapFunction1(igiaj_JsPluginContext$6__init_), "$call3", $rt_wrapFunction2(igiaj_JsPluginContext$6_call)],
igiaj_JsPluginContext$WatchFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginContext$3, 0, jl_Object, [igiaj_JsPluginContext$WatchFn], 0, 0, 0, ["$_init_89", $rt_wrapFunction1(igiaj_JsPluginContext$3__init_), "$call4", $rt_wrapFunction2(igiaj_JsPluginContext$3_call)],
igiaj_JsPluginContext$RegisterFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginContext$4, 0, jl_Object, [igiaj_JsPluginContext$RegisterFn], 0, 0, 0, ["$_init_89", $rt_wrapFunction1(igiaj_JsPluginContext$4__init_), "$call5", $rt_wrapFunction2(igiaj_JsPluginContext$4_call)],
jur_AbstractCharClass$LazyAlpha, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlpha__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlpha_computeValue)],
igiaj_JsPluginContext$1, 0, jl_Object, [igiaj_JsPluginContext$IdFn], 0, 0, 0, ["$_init_89", $rt_wrapFunction1(igiaj_JsPluginContext$1__init_), "$call", $rt_wrapFunction1(igiaj_JsPluginContext$1_call)],
igiaj_JsPluginContext$WantFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginContext$2, 0, jl_Object, [igiaj_JsPluginContext$WantFn], 0, 0, 0, ["$_init_89", $rt_wrapFunction1(igiaj_JsPluginContext$2__init_), "$call6", $rt_wrapFunction2(igiaj_JsPluginContext$2_call)],
jur_BackReferencedSingleSet, "BackReferencedSingleSet", 2, jur_SingleSet, [], 0, 0, 0, ["$_init_2", $rt_wrapFunction1(jur_BackReferencedSingleSet__init_), "$find", $rt_wrapFunction3(jur_BackReferencedSingleSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferencedSingleSet_findBack), "$processBackRefReplacement", $rt_wrapFunction0(jur_BackReferencedSingleSet_processBackRefReplacement)],
jur_AbstractCharClass$LazyWord, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyWord__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyWord_computeValue)],
jur_AbstractCharClass$LazyNonWord, 0, jur_AbstractCharClass$LazyWord, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonWord__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonWord_computeValue)],
jur_LeafSet, 0, jur_AbstractSet, [], 1024, 0, 0, ["$_init_6", $rt_wrapFunction1(jur_LeafSet__init_0), "$_init_", $rt_wrapFunction0(jur_LeafSet__init_), "$matches", $rt_wrapFunction3(jur_LeafSet_matches), "$charCount", $rt_wrapFunction0(jur_LeafSet_charCount), "$hasConsumed", $rt_wrapFunction1(jur_LeafSet_hasConsumed)],
jur_CISequenceSet, "CISequenceSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_54", $rt_wrapFunction1(jur_CISequenceSet__init_), "$accepts", $rt_wrapFunction2(jur_CISequenceSet_accepts), "$getName", $rt_wrapFunction0(jur_CISequenceSet_getName)],
jl_CharSequence, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Map, 0, jl_Object, [], 1537, 0, 0, 0,
ju_SequencedMap, 0, jl_Object, [ju_Map], 1537, 0, 0, 0,
jl_Throwable, 0, jl_Object, [], 1, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getLocalizedMessage", $rt_wrapFunction0(jl_Throwable_getLocalizedMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause), "$toString", $rt_wrapFunction0(jl_Throwable_toString)],
jl_Exception, 0, jl_Throwable, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_0), "$_init_1", $rt_wrapFunction1(jl_Exception__init_)],
jl_RuntimeException, 0, jl_Exception, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_), "$_init_1", $rt_wrapFunction1(jl_RuntimeException__init_0)],
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 3, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0), "$_init_1", $rt_wrapFunction1(jl_IndexOutOfBoundsException__init_2)],
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 3, jl_IndexOutOfBoundsException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
ju_MissingResourceException, "MissingResourceException", 1, jl_RuntimeException, [], 1, 0, 0, ["$_init_12", $rt_wrapFunction3(ju_MissingResourceException__init_)],
igiaj_JsPluginHost, 0, jl_Object, [otj_JSObject], 16, 0, 0, 0,
igiae_Activation, 0, jl_Object, [], 17, 0, 0, 0,
jur_CIBackReferenceSet, "CIBackReferenceSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_16", $rt_wrapFunction2(jur_CIBackReferenceSet__init_), "$matches", $rt_wrapFunction3(jur_CIBackReferenceSet_matches), "$setNext", $rt_wrapFunction1(jur_CIBackReferenceSet_setNext), "$getString", $rt_wrapFunction1(jur_CIBackReferenceSet_getString), "$getName", $rt_wrapFunction0(jur_CIBackReferenceSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_CIBackReferenceSet_hasConsumed)],
jur_UCIBackReferenceSet, "UCIBackReferenceSet", 2, jur_CIBackReferenceSet, [], 0, 0, 0, ["$_init_16", $rt_wrapFunction2(jur_UCIBackReferenceSet__init_), "$matches", $rt_wrapFunction3(jur_UCIBackReferenceSet_matches), "$getName", $rt_wrapFunction0(jur_UCIBackReferenceSet_getName)]]);
$rt_metadata([jur_AbstractCharClass$LazyCategory, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_25", $rt_wrapFunction2(jur_AbstractCharClass$LazyCategory__init_0), "$_init_26", $rt_wrapFunction3(jur_AbstractCharClass$LazyCategory__init_1), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategory_computeValue)],
jur_QuantifierSet, 0, jur_AbstractSet, [], 1024, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_QuantifierSet__init_), "$getInnerSet", $rt_wrapFunction0(jur_QuantifierSet_getInnerSet), "$first", $rt_wrapFunction1(jur_QuantifierSet_first), "$hasConsumed", $rt_wrapFunction1(jur_QuantifierSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_QuantifierSet_processSecondPass)],
jur_DotAllQuantifierSet, "DotAllQuantifierSet", 2, jur_QuantifierSet, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_DotAllQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_DotAllQuantifierSet_matches), "$find", $rt_wrapFunction3(jur_DotAllQuantifierSet_find), "$getName", $rt_wrapFunction0(jur_DotAllQuantifierSet_getName)],
otji_JSWrapper$Helper, 0, jl_Object, [], 0, 0, () => otji_JSWrapper$Helper_$callClinit(), 0,
ju_Comparator, 0, jl_Object, [], 1537, 0, 0, 0,
jl_String$_clinit_$lambda$_118_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_118_0__init_)],
jur_FSet, "FSet", 2, jur_AbstractSet, [], 0, 0, () => jur_FSet_$callClinit(), ["$_init_0", $rt_wrapFunction1(jur_FSet__init_), "$matches", $rt_wrapFunction3(jur_FSet_matches), "$getGroupIndex", $rt_wrapFunction0(jur_FSet_getGroupIndex), "$getName", $rt_wrapFunction0(jur_FSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_FSet_hasConsumed)],
jur_BehindFSet, "BehindFSet", 2, jur_FSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_BehindFSet__init_), "$matches", $rt_wrapFunction3(jur_BehindFSet_matches), "$getName", $rt_wrapFunction0(jur_BehindFSet_getName)],
igiae_Diagnostics, 0, jl_Object, [], 17, 0, () => igiae_Diagnostics_$callClinit(), 0,
igiaj_JsPluginHost$IdFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
jur_LowHighSurrogateRangeSet, "LowHighSurrogateRangeSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_62", $rt_wrapFunction1(jur_LowHighSurrogateRangeSet__init_), "$setNext", $rt_wrapFunction1(jur_LowHighSurrogateRangeSet_setNext), "$matches", $rt_wrapFunction3(jur_LowHighSurrogateRangeSet_matches), "$getName", $rt_wrapFunction0(jur_LowHighSurrogateRangeSet_getName)],
jur_GroupQuantifierSet, "GroupQuantifierSet", 2, jur_QuantifierSet, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_GroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_GroupQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_GroupQuantifierSet_getName)],
jur_ReluctantGroupQuantifierSet, "ReluctantGroupQuantifierSet", 2, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_ReluctantGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_ReluctantGroupQuantifierSet_matches)],
jl_ClassCastException, "ClassCastException", 3, jl_RuntimeException, [], 1, 0, 0, 0,
igiae_Scheduler$1$1, 0, jl_Object, [igiae_Scheduler$Cancellable], 0, 0, 0, ["$_init_72", $rt_wrapFunction1(igiae_Scheduler$1$1__init_), "$cancel", $rt_wrapFunction0(igiae_Scheduler$1$1_cancel)],
ju_AbstractMap, 0, jl_Object, [ju_Map], 1025, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractMap__init_), "$put", $rt_wrapFunction2(ju_AbstractMap_put), "$equals", $rt_wrapFunction1(ju_AbstractMap_equals), "$hashCode0", $rt_wrapFunction0(ju_AbstractMap_hashCode), "$toString", $rt_wrapFunction0(ju_AbstractMap_toString)],
jl_Cloneable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 1, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray), "$_init_", $rt_wrapFunction0(ju_HashMap__init_1), "$_init_0", $rt_wrapFunction1(ju_HashMap__init_0), "$_init_18", $rt_wrapFunction2(ju_HashMap__init_2), "$containsKey", $rt_wrapFunction1(ju_HashMap_containsKey), "$get1", $rt_wrapFunction1(ju_HashMap_get), "$entryByKey", $rt_wrapFunction1(ju_HashMap_entryByKey), "$findNonNullKeyEntry", $rt_wrapFunction3(ju_HashMap_findNonNullKeyEntry),
"$findNullKeyEntry", $rt_wrapFunction0(ju_HashMap_findNullKeyEntry), "$isEmpty", $rt_wrapFunction0(ju_HashMap_isEmpty), "$keySet", $rt_wrapFunction0(ju_HashMap_keySet), "$put", $rt_wrapFunction2(ju_HashMap_put), "$rehash0", $rt_wrapFunction1(ju_HashMap_rehash0), "$rehash", $rt_wrapFunction0(ju_HashMap_rehash), "$remove2", $rt_wrapFunction1(ju_HashMap_remove), "$removeEntry", $rt_wrapFunction1(ju_HashMap_removeEntry), "$removeByKey", $rt_wrapFunction1(ju_HashMap_removeByKey), "$size", $rt_wrapFunction0(ju_HashMap_size)],
ju_LinkedHashMap, "LinkedHashMap", 1, ju_HashMap, [ju_SequencedMap], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_LinkedHashMap__init_0), "$newElementArray", $rt_wrapFunction1(ju_LinkedHashMap_newElementArray), "$getOrDefault", $rt_wrapFunction2(ju_LinkedHashMap_getOrDefault), "$get1", $rt_wrapFunction1(ju_LinkedHashMap_get), "$put", $rt_wrapFunction2(ju_LinkedHashMap_put), "$putImpl0", $rt_wrapFunction4(ju_LinkedHashMap_putImpl), "$entrySet", $rt_wrapFunction0(ju_LinkedHashMap_entrySet), "$keySet", $rt_wrapFunction0(ju_LinkedHashMap_keySet),
"$sequencedKeySet", $rt_wrapFunction0(ju_LinkedHashMap_sequencedKeySet), "$values", $rt_wrapFunction0(ju_LinkedHashMap_values), "$sequencedValues", $rt_wrapFunction0(ju_LinkedHashMap_sequencedValues), "$remove2", $rt_wrapFunction1(ju_LinkedHashMap_remove), "$removeLinkedEntry", $rt_wrapFunction1(ju_LinkedHashMap_removeLinkedEntry), "$removeEldestEntry", $rt_wrapFunction1(ju_LinkedHashMap_removeEldestEntry)],
jur_PosPlusGroupQuantifierSet, "PosPlusGroupQuantifierSet", 2, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_PosPlusGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PosPlusGroupQuantifierSet_matches)],
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_0", $rt_wrapFunction1(jl_AbstractStringBuilder__init_), "$append13", $rt_wrapFunction1(jl_AbstractStringBuilder_append6), "$append14", $rt_wrapFunction1(jl_AbstractStringBuilder_append2), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert2), "$append15", $rt_wrapFunction1(jl_AbstractStringBuilder_append3), "$append1", $rt_wrapFunction2(jl_AbstractStringBuilder_append7),
"$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert6), "$append16", $rt_wrapFunction1(jl_AbstractStringBuilder_append5), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert4), "$insert3", $rt_wrapFunction3(jl_AbstractStringBuilder_insert5), "$append17", $rt_wrapFunction1(jl_AbstractStringBuilder_append4), "$insert4", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$append5", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$insert5", $rt_wrapFunction2(jl_AbstractStringBuilder_insert0),
"$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert3), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString), "$length", $rt_wrapFunction0(jl_AbstractStringBuilder_length), "$charAt", $rt_wrapFunction1(jl_AbstractStringBuilder_charAt), "$append4", $rt_wrapFunction3(jl_AbstractStringBuilder_append0), "$insert6", $rt_wrapFunction4(jl_AbstractStringBuilder_insert), "$append6", $rt_wrapFunction1(jl_AbstractStringBuilder_append),
"$deleteCharAt0", $rt_wrapFunction1(jl_AbstractStringBuilder_deleteCharAt), "$delete", $rt_wrapFunction2(jl_AbstractStringBuilder_delete)],
jl_Appendable, 0, jl_Object, [], 1537, 0, 0, 0,
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringBuffer__init_), "$append11", $rt_wrapFunction1(jl_StringBuffer_append1), "$append7", $rt_wrapFunction3(jl_StringBuffer_append2), "$append12", $rt_wrapFunction1(jl_StringBuffer_append0), "$insert7", $rt_wrapFunction4(jl_StringBuffer_insert), "$insert8", $rt_wrapFunction2(jl_StringBuffer_insert2), "$insert6", $rt_wrapFunction4(jl_StringBuffer_insert1), "$append4", $rt_wrapFunction3(jl_StringBuffer_append),
"$charAt", $rt_wrapFunction1(jl_StringBuffer_charAt), "$length", $rt_wrapFunction0(jl_StringBuffer_length), "$toString", $rt_wrapFunction0(jl_StringBuffer_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity), "$insert5", $rt_wrapFunction2(jl_StringBuffer_insert0)],
jur_SpecialToken, 0, jl_Object, [], 1024, 0, 0, ["$_init_", $rt_wrapFunction0(jur_SpecialToken__init_)],
jur_AbstractCharClass, 0, jur_SpecialToken, [], 1024, 0, () => jur_AbstractCharClass_$callClinit(), ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass__init_), "$getBits", $rt_wrapFunction0(jur_AbstractCharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getLowHighSurrogates), "$hasLowHighSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_hasLowHighSurrogates), "$mayContainSupplCodepoints", $rt_wrapFunction0(jur_AbstractCharClass_mayContainSupplCodepoints), "$getInstance",
$rt_wrapFunction0(jur_AbstractCharClass_getInstance), "$getSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getSurrogates), "$getWithoutSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getWithoutSurrogates), "$hasUCI", $rt_wrapFunction0(jur_AbstractCharClass_hasUCI), "$setNegative", $rt_wrapFunction1(jur_AbstractCharClass_setNegative), "$isNegative", $rt_wrapFunction0(jur_AbstractCharClass_isNegative)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierPart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_48", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains)],
jur_AbstractCharClass$PredefinedCharacterClasses, 0, jl_Object, [], 16, 0, () => jur_AbstractCharClass$PredefinedCharacterClasses_$callClinit(), ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$PredefinedCharacterClasses__init_), "$getObject", $rt_wrapFunction1(jur_AbstractCharClass$PredefinedCharacterClasses_getObject)],
jl_Iterable, 0, jl_Object, [], 1537, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 1537, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1025, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractCollection__init_), "$isEmpty", $rt_wrapFunction0(ju_AbstractCollection_isEmpty), "$contains", $rt_wrapFunction1(ju_AbstractCollection_contains), "$toArray", $rt_wrapFunction1(ju_AbstractCollection_toArray), "$remove1", $rt_wrapFunction1(ju_AbstractCollection_remove), "$addAll", $rt_wrapFunction1(ju_AbstractCollection_addAll), "$toString", $rt_wrapFunction0(ju_AbstractCollection_toString)],
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_LinkedHashMapValues, 0, ju_AbstractCollection, [ju_SequencedCollection], 0, 0, 0, ["$_init_21", $rt_wrapFunction2(ju_LinkedHashMapValues__init_), "$iterator", $rt_wrapFunction0(ju_LinkedHashMapValues_iterator)],
jur_AbstractCharClass$LazyDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyDigit_computeValue)],
jur_AbstractCharClass$LazyJavaLetter, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetter__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetter_computeValue)],
ji_Flushable, 0, jl_Object, [], 1537, 0, 0, 0,
jur_DecomposedCharSet, "DecomposedCharSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction2(jur_DecomposedCharSet__init_), "$setNext", $rt_wrapFunction1(jur_DecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_DecomposedCharSet_matches), "$getName", $rt_wrapFunction0(jur_DecomposedCharSet_getName), "$codePointAt", $rt_wrapFunction3(jur_DecomposedCharSet_codePointAt), "$first", $rt_wrapFunction1(jur_DecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_DecomposedCharSet_hasConsumed)],
jur_CIDecomposedCharSet, "CIDecomposedCharSet", 2, jur_DecomposedCharSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction2(jur_CIDecomposedCharSet__init_)],
jur_AheadFSet, "AheadFSet", 2, jur_FSet, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AheadFSet__init_), "$matches", $rt_wrapFunction3(jur_AheadFSet_matches), "$getName", $rt_wrapFunction0(jur_AheadFSet_getName)],
jur_NonCapJointSet, "NonCapJointSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_29", $rt_wrapFunction2(jur_NonCapJointSet__init_), "$matches", $rt_wrapFunction3(jur_NonCapJointSet_matches), "$getName", $rt_wrapFunction0(jur_NonCapJointSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_NonCapJointSet_hasConsumed)],
jur_AtomicJointSet, "AtomicJointSet", 2, jur_NonCapJointSet, [], 0, 0, 0, ["$_init_29", $rt_wrapFunction2(jur_AtomicJointSet__init_), "$matches", $rt_wrapFunction3(jur_AtomicJointSet_matches), "$setNext", $rt_wrapFunction1(jur_AtomicJointSet_setNext), "$getName", $rt_wrapFunction0(jur_AtomicJointSet_getName)],
jur_PositiveLookAhead, "PositiveLookAhead", 2, jur_AtomicJointSet, [], 0, 0, 0, ["$_init_29", $rt_wrapFunction2(jur_PositiveLookAhead__init_), "$matches", $rt_wrapFunction3(jur_PositiveLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookAhead_hasConsumed), "$getName", $rt_wrapFunction0(jur_PositiveLookAhead_getName)],
jur_NegativeLookAhead, "NegativeLookAhead", 2, jur_AtomicJointSet, [], 0, 0, 0, ["$_init_29", $rt_wrapFunction2(jur_NegativeLookAhead__init_), "$matches", $rt_wrapFunction3(jur_NegativeLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookAhead_hasConsumed), "$getName", $rt_wrapFunction0(jur_NegativeLookAhead_getName)],
jlr_Array, 0, jl_Object, [], 17, 0, 0, 0,
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(otcit_DoubleAnalyzer$Result__init_0)],
igiae_PluginException, "PluginException", 13, jl_RuntimeException, [], 1, 0, 0, ["$_init_12", $rt_wrapFunction3(igiae_PluginException__init_), "$getPluginId", $rt_wrapFunction0(igiae_PluginException_getPluginId), "$getDetail", $rt_wrapFunction0(igiae_PluginException_getDetail), "$getFix", $rt_wrapFunction0(igiae_PluginException_getFix)],
jur_AbstractCharClass$LazyJavaDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDigit_computeValue)],
otci_IntegerUtil, 0, jl_Object, [], 17, 0, 0, 0,
jur_LeafQuantifierSet, "LeafQuantifierSet", 2, jur_QuantifierSet, [], 0, 0, 0, ["$_init_32", $rt_wrapFunction3(jur_LeafQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_LeafQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_LeafQuantifierSet_getName)],
jur_AltQuantifierSet, "AltQuantifierSet", 2, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_32", $rt_wrapFunction3(jur_AltQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_AltQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltQuantifierSet_setNext)],
jur_PossessiveAltQuantifierSet, "PossessiveAltQuantifierSet", 2, jur_AltQuantifierSet, [], 0, 0, 0, ["$_init_32", $rt_wrapFunction3(jur_PossessiveAltQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PossessiveAltQuantifierSet_matches)]]);
$rt_metadata([igiae_ServiceHub$Listener, 0, jl_Object, [], 1537, 0, 0, 0,
igiaj_JsPluginContext$3$1, "JsPluginContext$3$1", 14, jl_Object, [igiae_ServiceHub$Listener], 0, 0, 0, ["$_init_4", $rt_wrapFunction2(igiaj_JsPluginContext$3$1__init_), "$changed", $rt_wrapFunction2(igiaj_JsPluginContext$3$1_changed)],
otjc_JSObjects, 0, jl_Object, [], 17, 0, 0, 0,
igiaj_JsScheduler$Task, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
otji_JS, 0, jl_Object, [], 17, 0, 0, 0,
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierStart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_65", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains)],
otciu_UnicodeHelper, 0, jl_Object, [], 17, 0, 0, 0,
ju_Objects, 0, jl_Object, [], 17, 0, 0, 0,
jur_AbstractCharClass$LazyAlnum, 0, jur_AbstractCharClass$LazyAlpha, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlnum__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlnum_computeValue)],
jur_AbstractCharClass$LazyGraph, 0, jur_AbstractCharClass$LazyAlnum, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyGraph__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyGraph_computeValue)],
jur_AbstractCharClass$LazyPrint, 0, jur_AbstractCharClass$LazyGraph, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyPrint__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPrint_computeValue)],
jur_AbstractCharClass$LazyJavaSpaceChar, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaSpaceChar__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaSpaceChar_computeValue)],
otjc_JSUndefined, 0, jl_Object, [otj_JSObject], 1, 0, 0, 0,
jur_PositiveLookBehind, "PositiveLookBehind", 2, jur_AtomicJointSet, [], 0, 0, 0, ["$_init_29", $rt_wrapFunction2(jur_PositiveLookBehind__init_), "$matches", $rt_wrapFunction3(jur_PositiveLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookBehind_hasConsumed), "$getName", $rt_wrapFunction0(jur_PositiveLookBehind_getName)],
jur_SequenceSet, "SequenceSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_54", $rt_wrapFunction1(jur_SequenceSet__init_), "$accepts", $rt_wrapFunction2(jur_SequenceSet_accepts), "$find", $rt_wrapFunction3(jur_SequenceSet_find), "$findBack", $rt_wrapFunction4(jur_SequenceSet_findBack), "$getName", $rt_wrapFunction0(jur_SequenceSet_getName), "$first", $rt_wrapFunction1(jur_SequenceSet_first), "$indexOf", $rt_wrapFunction3(jur_SequenceSet_indexOf), "$lastIndexOf", $rt_wrapFunction3(jur_SequenceSet_lastIndexOf), "$startsWith",
$rt_wrapFunction2(jur_SequenceSet_startsWith)],
jl_ArrayStoreException, "ArrayStoreException", 3, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArrayStoreException__init_0)],
jur_AltGroupQuantifierSet, "AltGroupQuantifierSet", 2, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_AltGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_AltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltGroupQuantifierSet_setNext)],
igiae_Scheduler, 0, jl_Object, [], 1537, 0, () => igiae_Scheduler_$callClinit(), 0,
jur_MatchResult, 0, jl_Object, [], 1537, 0, 0, 0,
jur_MatchResultImpl, 0, jl_Object, [jur_MatchResult], 0, 0, 0, ["$_init_99", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { jur_MatchResultImpl__init_(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }, "$setConsumed", $rt_wrapFunction2(jur_MatchResultImpl_setConsumed), "$getConsumed", $rt_wrapFunction1(jur_MatchResultImpl_getConsumed), "$end0", $rt_wrapFunction0(jur_MatchResultImpl_end), "$end", $rt_wrapFunction1(jur_MatchResultImpl_end0), "$setStart", $rt_wrapFunction2(jur_MatchResultImpl_setStart),
"$setEnd", $rt_wrapFunction2(jur_MatchResultImpl_setEnd), "$getStart", $rt_wrapFunction1(jur_MatchResultImpl_getStart), "$getEnd", $rt_wrapFunction1(jur_MatchResultImpl_getEnd), "$getGroupNoCheck", $rt_wrapFunction1(jur_MatchResultImpl_getGroupNoCheck), "$start0", $rt_wrapFunction0(jur_MatchResultImpl_start), "$start", $rt_wrapFunction1(jur_MatchResultImpl_start0), "$finalizeMatch", $rt_wrapFunction0(jur_MatchResultImpl_finalizeMatch), "$getEnterCounter", $rt_wrapFunction1(jur_MatchResultImpl_getEnterCounter),
"$setEnterCounter", $rt_wrapFunction2(jur_MatchResultImpl_setEnterCounter), "$setValid", $rt_wrapFunction0(jur_MatchResultImpl_setValid), "$isValid", $rt_wrapFunction0(jur_MatchResultImpl_isValid), "$reset", $rt_wrapFunction3(jur_MatchResultImpl_reset0), "$reset0", $rt_wrapFunction0(jur_MatchResultImpl_reset), "$setStartIndex", $rt_wrapFunction1(jur_MatchResultImpl_setStartIndex), "$getLeftBound", $rt_wrapFunction0(jur_MatchResultImpl_getLeftBound), "$getRightBound", $rt_wrapFunction0(jur_MatchResultImpl_getRightBound),
"$setMode", $rt_wrapFunction1(jur_MatchResultImpl_setMode), "$mode", $rt_wrapFunction0(jur_MatchResultImpl_mode), "$useAnchoringBounds", $rt_wrapFunction1(jur_MatchResultImpl_useAnchoringBounds), "$hasAnchoringBounds", $rt_wrapFunction0(jur_MatchResultImpl_hasAnchoringBounds), "$hasTransparentBounds", $rt_wrapFunction0(jur_MatchResultImpl_hasTransparentBounds), "$getPreviousMatchEnd", $rt_wrapFunction0(jur_MatchResultImpl_getPreviousMatchEnd)],
jur_UCIRangeSet, "UCIRangeSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_62", $rt_wrapFunction1(jur_UCIRangeSet__init_), "$accepts", $rt_wrapFunction2(jur_UCIRangeSet_accepts), "$getName", $rt_wrapFunction0(jur_UCIRangeSet_getName)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1, "AbstractCharClass$LazyJavaJavaIdentifierPart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_39", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains)],
jl_AutoCloseable, 0, jl_Object, [], 1537, 0, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 1537, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1025, 0, 0, ["$_init_", $rt_wrapFunction0(ji_OutputStream__init_)],
ji_FilterOutputStream, 0, ji_OutputStream, [], 1, 0, 0, ["$_init_36", $rt_wrapFunction1(ji_FilterOutputStream__init_)],
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 1, 0, 0, ["$_init_37", $rt_wrapFunction3(ji_PrintStream__init_)],
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1025, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JsConsolePrintStream__init_), "$println", $rt_wrapFunction1(otcic_JsConsolePrintStream_println)],
otp_Platform, 0, jl_Object, [], 17, 0, 0, 0,
jnc_Charset, 0, jl_Object, [jl_Comparable], 1025, 0, 0, 0,
jl_Boolean, "Boolean", 3, jl_Object, [ji_Serializable, jl_Comparable], 1, 0, () => jl_Boolean_$callClinit(), ["$_init_38", $rt_wrapFunction1(jl_Boolean__init_0), "$booleanValue", $rt_wrapFunction0(jl_Boolean_booleanValue), "$toString", $rt_wrapFunction0(jl_Boolean_toString), "$hashCode0", $rt_wrapFunction0(jl_Boolean_hashCode), "$equals", $rt_wrapFunction1(jl_Boolean_equals)],
ju_NoSuchElementException, "NoSuchElementException", 1, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_NoSuchElementException__init_0)],
igiae_ServiceHub$Registry, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 1537, 0, 0, 0,
jlr_GenericDeclaration, 0, jl_Object, [jlr_AnnotatedElement], 1537, 0, 0, 0,
jur_NegativeLookBehind, "NegativeLookBehind", 2, jur_AtomicJointSet, [], 0, 0, 0, ["$_init_29", $rt_wrapFunction2(jur_NegativeLookBehind__init_), "$matches", $rt_wrapFunction3(jur_NegativeLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookBehind_hasConsumed), "$getName", $rt_wrapFunction0(jur_NegativeLookBehind_getName)],
jur_BackReferenceSet, "BackReferenceSet", 2, jur_CIBackReferenceSet, [], 0, 0, 0, ["$_init_16", $rt_wrapFunction2(jur_BackReferenceSet__init_), "$matches", $rt_wrapFunction3(jur_BackReferenceSet_matches), "$find", $rt_wrapFunction3(jur_BackReferenceSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferenceSet_findBack), "$first", $rt_wrapFunction1(jur_BackReferenceSet_first), "$getName", $rt_wrapFunction0(jur_BackReferenceSet_getName)],
jur_DotQuantifierSet, "DotQuantifierSet", 2, jur_QuantifierSet, [], 0, 0, 0, ["$_init_58", $rt_wrapFunction4(jur_DotQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_DotQuantifierSet_matches), "$find", $rt_wrapFunction3(jur_DotQuantifierSet_find), "$getName", $rt_wrapFunction0(jur_DotQuantifierSet_getName)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue)],
igiaj_JsPluginHost$10, 0, jl_Object, [igiaj_JsPluginHost$IdFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$10__init_), "$call", $rt_wrapFunction1(igiaj_JsPluginHost$10_call)],
igiaj_JsPluginHost$RecordDeclaredFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginHost$11, 0, jl_Object, [igiaj_JsPluginHost$RecordDeclaredFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$11__init_), "$call7", $rt_wrapFunction1(igiaj_JsPluginHost$11_call)],
otjc_JSPromise$Executor, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
igiaj_JsPluginHost$12, 0, jl_Object, [otjc_JSPromise$Executor], 0, 0, 0, ["$_init_10", $rt_wrapFunction1(igiaj_JsPluginHost$12__init_), "$onExecute", $rt_wrapFunction2(igiaj_JsPluginHost$12_onExecute)],
jur_UnifiedQuantifierSet, "UnifiedQuantifierSet", 2, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_57", $rt_wrapFunction1(jur_UnifiedQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_UnifiedQuantifierSet_matches), "$find", $rt_wrapFunction3(jur_UnifiedQuantifierSet_find)],
jlr_Type, 0, jl_Object, [], 1537, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_GenericDeclaration, jlr_Type], 17, 0, 0, ["$getClassInfo", $rt_wrapFunction0(jl_Class_getClassInfo), "$isInstance", $rt_wrapFunction1(jl_Class_isInstance), "$isAssignableFrom", $rt_wrapFunction1(jl_Class_isAssignableFrom), "$getName", $rt_wrapFunction0(jl_Class_getName), "$isPrimitive", $rt_wrapFunction0(jl_Class_isPrimitive), "$getComponentType", $rt_wrapFunction0(jl_Class_getComponentType)],
ju_BitSet, 0, jl_Object, [jl_Cloneable, ji_Serializable], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_BitSet__init_0), "$_init_0", $rt_wrapFunction1(ju_BitSet__init_), "$set0", $rt_wrapFunction1(ju_BitSet_set), "$set", $rt_wrapFunction2(ju_BitSet_set0), "$clear", $rt_wrapFunction1(ju_BitSet_clear0), "$clear0", $rt_wrapFunction2(ju_BitSet_clear), "$get3", $rt_wrapFunction1(ju_BitSet_get), "$nextSetBit", $rt_wrapFunction1(ju_BitSet_nextSetBit), "$nextClearBit", $rt_wrapFunction1(ju_BitSet_nextClearBit), "$intersects",
$rt_wrapFunction1(ju_BitSet_intersects), "$and", $rt_wrapFunction1(ju_BitSet_and), "$andNot", $rt_wrapFunction1(ju_BitSet_andNot), "$or", $rt_wrapFunction1(ju_BitSet_or), "$xor", $rt_wrapFunction1(ju_BitSet_xor), "$isEmpty", $rt_wrapFunction0(ju_BitSet_isEmpty)],
igiae_EventBus, 0, jl_Object, [], 1537, 0, 0, 0,
igiaj_JsPluginHost$13, 0, jl_Object, [igiae_EventBus], 0, 0, 0, ["$_init_13", $rt_wrapFunction1(igiaj_JsPluginHost$13__init_), "$publish", $rt_wrapFunction2(igiaj_JsPluginHost$13_publish), "$subscribe", $rt_wrapFunction2(igiaj_JsPluginHost$13_subscribe)]]);
$rt_metadata([jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1, "AbstractCharClass$LazyJavaJavaIdentifierStart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_71", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains)],
ju_Arrays, 0, jl_Object, [], 1, 0, 0, 0,
jur_CharSet, "CharSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_56", $rt_wrapFunction1(jur_CharSet__init_0), "$charCount", $rt_wrapFunction0(jur_CharSet_charCount), "$accepts", $rt_wrapFunction2(jur_CharSet_accepts), "$find", $rt_wrapFunction3(jur_CharSet_find), "$findBack", $rt_wrapFunction4(jur_CharSet_findBack), "$getName", $rt_wrapFunction0(jur_CharSet_getName), "$getChar", $rt_wrapFunction0(jur_CharSet_getChar), "$first", $rt_wrapFunction1(jur_CharSet_first)],
jur_CharClass$3, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_68", $rt_wrapFunction3(jur_CharClass$3__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$3_contains)],
jur_CharClass$4, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction4(jur_CharClass$4__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$4_contains)],
jur_CharClass$1, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_67", $rt_wrapFunction2(jur_CharClass$1__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$1_contains)],
jur_CharClass$2, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_68", $rt_wrapFunction3(jur_CharClass$2__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$2_contains)],
jur_CharClass$7, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_67", $rt_wrapFunction2(jur_CharClass$7__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$7_contains)],
jur_CharClass$8, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_69", $rt_wrapFunction3(jur_CharClass$8__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$8_contains)],
igiae_CapabilityRecord, "CapabilityRecord", 13, jl_Object, [], 17, 0, 0, ["$_init_82", $rt_wrapFunction2(igiae_CapabilityRecord__init_), "$getPluginId", $rt_wrapFunction0(igiae_CapabilityRecord_getPluginId), "$getImplementation", $rt_wrapFunction0(igiae_CapabilityRecord_getImplementation)],
jur_CharClass$5, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction4(jur_CharClass$5__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$5_contains)],
jur_CharClass$6, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_67", $rt_wrapFunction2(jur_CharClass$6__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$6_contains)],
igiaj_JsJson, 0, jl_Object, [], 16, 0, 0, 0,
ju_Iterator, 0, jl_Object, [], 1537, 0, 0, 0,
ju_ListIterator, 0, jl_Object, [ju_Iterator], 1537, 0, 0, 0,
ju_Collections$5, 0, jl_Object, [ju_ListIterator], 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$5__init_)],
ju_List, 0, jl_Object, [ju_SequencedCollection], 1537, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1025, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractList__init_), "$add2", $rt_wrapFunction1(ju_AbstractList_add), "$iterator", $rt_wrapFunction0(ju_AbstractList_iterator), "$add1", $rt_wrapFunction2(ju_AbstractList_add0), "$remove", $rt_wrapFunction1(ju_AbstractList_remove), "$indexOf2", $rt_wrapFunction1(ju_AbstractList_indexOf), "$hashCode0", $rt_wrapFunction0(ju_AbstractList_hashCode), "$equals", $rt_wrapFunction1(ju_AbstractList_equals)],
ju_RandomAccess, 0, jl_Object, [], 1537, 0, 0, 0,
ju_TemplateCollections$AbstractImmutableList, 0, ju_AbstractList, [ju_RandomAccess], 1024, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableList__init_)],
ju_Collections$3, 0, ju_TemplateCollections$AbstractImmutableList, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$3__init_)],
jur_DotSet, "DotSet", 2, jur_JointSet, [], 16, 0, 0, ["$_init_60", $rt_wrapFunction1(jur_DotSet__init_), "$matches", $rt_wrapFunction3(jur_DotSet_matches), "$getName", $rt_wrapFunction0(jur_DotSet_getName), "$setNext", $rt_wrapFunction1(jur_DotSet_setNext), "$getType", $rt_wrapFunction0(jur_DotSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotSet_hasConsumed)],
jur_CharClass$9, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_69", $rt_wrapFunction3(jur_CharClass$9__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$9_contains)],
igiaj_JsPluginContext$10, 0, jl_Object, [igiaj_JsPluginContext$IdFn], 0, 0, 0, ["$_init_", $rt_wrapFunction0(igiaj_JsPluginContext$10__init_), "$call", $rt_wrapFunction1(igiaj_JsPluginContext$10_call)],
ju_Collections$4, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$4__init_)],
igiaj_JsPluginContext$11, 0, jl_Object, [igiaj_JsPluginContext$IdFn], 0, 0, 0, ["$_init_", $rt_wrapFunction0(igiaj_JsPluginContext$11__init_), "$call", $rt_wrapFunction1(igiaj_JsPluginContext$11_call)],
jl_Character, 0, jl_Object, [jl_Comparable], 1, 0, () => jl_Character_$callClinit(), 0,
ju_Set, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1025, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractSet__init_), "$equals", $rt_wrapFunction1(ju_AbstractSet_equals), "$hashCode0", $rt_wrapFunction0(ju_AbstractSet_hashCode)],
ju_TemplateCollections$AbstractImmutableSet, 0, ju_AbstractSet, [], 1024, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableSet__init_)],
ju_Collections$1, 0, ju_TemplateCollections$AbstractImmutableSet, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$1__init_)],
igiaj_JsPluginContext$12, 0, jl_Object, [igiaj_JsPluginContext$IdsFn], 0, 0, 0, ["$_init_92", $rt_wrapFunction1(igiaj_JsPluginContext$12__init_), "$call2", $rt_wrapFunction0(igiaj_JsPluginContext$12_call)],
igiae_ServiceHub$Waiter, "ServiceHub$Waiter", 13, jl_Object, [], 16, 0, 0, ["$_init_84", $rt_wrapFunction2(igiae_ServiceHub$Waiter__init_)],
ju_TemplateCollections$AbstractImmutableMap, 0, ju_AbstractMap, [], 1024, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableMap__init_), "$put", $rt_wrapFunction2(ju_TemplateCollections$AbstractImmutableMap_put)],
ju_Collections$2, 0, ju_TemplateCollections$AbstractImmutableMap, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$2__init_)],
jur_CICharSet, "CICharSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_56", $rt_wrapFunction1(jur_CICharSet__init_0), "$accepts", $rt_wrapFunction2(jur_CICharSet_accepts), "$getName", $rt_wrapFunction0(jur_CICharSet_getName)],
jur_SupplCharSet, "SupplCharSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_SupplCharSet__init_), "$accepts", $rt_wrapFunction2(jur_SupplCharSet_accepts), "$find", $rt_wrapFunction3(jur_SupplCharSet_find), "$findBack", $rt_wrapFunction4(jur_SupplCharSet_findBack), "$getName", $rt_wrapFunction0(jur_SupplCharSet_getName), "$getCodePoint", $rt_wrapFunction0(jur_SupplCharSet_getCodePoint), "$first", $rt_wrapFunction1(jur_SupplCharSet_first)],
igiaj_JsRuntime$Disposer, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
igiaj_JsPluginContext$13, 0, jl_Object, [igiaj_JsRuntime$Disposer], 0, 0, 0, ["$_init_93", $rt_wrapFunction1(igiaj_JsPluginContext$13__init_), "$dispose", $rt_wrapFunction0(igiaj_JsPluginContext$13_dispose)],
otrr_ReflectionInfo, 0, jl_Object, [], 1025, 0, 0, 0,
otjc_JSNumber, 0, jl_Object, [otj_JSObject], 1025, 0, 0, 0,
jur_AbstractCharClass$LazyCategoryScope, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_25", $rt_wrapFunction2(jur_AbstractCharClass$LazyCategoryScope__init_1), "$_init_26", $rt_wrapFunction3(jur_AbstractCharClass$LazyCategoryScope__init_0), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategoryScope_computeValue)],
ju_Collections$9, 0, ju_AbstractList, [], 0, 0, 0, ["$_init_106", $rt_wrapFunction1(ju_Collections$9__init_), "$get", $rt_wrapFunction1(ju_Collections$9_get), "$size", $rt_wrapFunction0(ju_Collections$9_size)],
igiae_ServiceHub$5, "ServiceHub$5", 13, jl_Object, [igiae_Scheduler$Cancellable], 0, 0, 0, ["$_init_87", function(var_1, var_2, var_3, var_4, var_5) { igiae_ServiceHub$5__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$cancel", $rt_wrapFunction0(igiae_ServiceHub$5_cancel)],
jl_Runnable, 0, jl_Object, [], 1537, 0, 0, 0,
igiae_ServiceHub$3, 0, jl_Object, [jl_Runnable], 0, 0, 0, ["$_init_85", function(var_1, var_2, var_3, var_4, var_5) { igiae_ServiceHub$3__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$run", $rt_wrapFunction0(igiae_ServiceHub$3_run)],
igiae_ServiceHub$4, 0, jl_Object, [igiae_Scheduler$Cancellable], 0, 0, 0, ["$_init_86", $rt_wrapFunction3(igiae_ServiceHub$4__init_), "$cancel", $rt_wrapFunction0(igiae_ServiceHub$4_cancel)],
ju_SequencedSet, 0, jl_Object, [ju_SequencedCollection, ju_Set], 1537, 0, 0, 0,
jur_AbstractLineTerminator, 0, jl_Object, [], 1024, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractLineTerminator__init_)],
igiaj_JsPluginHost$13$2, 0, jl_Object, [igiae_Scheduler$Cancellable], 0, 0, 0, ["$_init_43", $rt_wrapFunction2(igiaj_JsPluginHost$13$2__init_), "$cancel", $rt_wrapFunction0(igiaj_JsPluginHost$13$2_cancel)]]);
$rt_metadata([jur_AbstractCharClass$LazyJavaTitleCase$1, "AbstractCharClass$LazyJavaTitleCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_88", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaTitleCase$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaTitleCase$1_contains)],
igiaj_JsRuntime$Listener, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
igiaj_JsPluginHost$13$1, 0, jl_Object, [igiaj_JsRuntime$Listener], 0, 0, 0, ["$_init_42", $rt_wrapFunction2(igiaj_JsPluginHost$13$1__init_), "$received0", $rt_wrapFunction1(igiaj_JsPluginHost$13$1_received)],
ju_Collections$_clinit_$lambda$_59_0, 0, jl_Object, [ju_Comparator], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$_clinit_$lambda$_59_0__init_)],
jur_AbstractCharClass$LazyJavaMirrored$1, "AbstractCharClass$LazyJavaMirrored$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_103", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaMirrored$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaMirrored$1_contains)],
ju_LinkedHashMapIterator, 0, jl_Object, [], 0, 0, 0, ["$_init_21", $rt_wrapFunction2(ju_LinkedHashMapIterator__init_), "$hasNext", $rt_wrapFunction0(ju_LinkedHashMapIterator_hasNext), "$checkConcurrentMod", $rt_wrapFunction0(ju_LinkedHashMapIterator_checkConcurrentMod), "$makeNext", $rt_wrapFunction0(ju_LinkedHashMapIterator_makeNext), "$remove0", $rt_wrapFunction0(ju_LinkedHashMapIterator_remove)],
jur_AbstractCharClass$LazyJavaISOControl$1, "AbstractCharClass$LazyJavaISOControl$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_104", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaISOControl$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaISOControl$1_contains)],
jur_UEOLSet, "UEOLSet", 2, jur_AbstractSet, [], 16, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_UEOLSet__init_), "$matches", $rt_wrapFunction3(jur_UEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_UEOLSet_getName)],
jur_UCICharSet, "UCICharSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_56", $rt_wrapFunction1(jur_UCICharSet__init_), "$accepts", $rt_wrapFunction2(jur_UCICharSet_accepts), "$getName", $rt_wrapFunction0(jur_UCICharSet_getName)],
jur_AtomicFSet, "AtomicFSet", 2, jur_FSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_AtomicFSet__init_), "$matches", $rt_wrapFunction3(jur_AtomicFSet_matches), "$getIndex", $rt_wrapFunction0(jur_AtomicFSet_getIndex), "$getName", $rt_wrapFunction0(jur_AtomicFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_AtomicFSet_hasConsumed)],
jur_LowSurrogateCharSet, "LowSurrogateCharSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_56", $rt_wrapFunction1(jur_LowSurrogateCharSet__init_0), "$setNext", $rt_wrapFunction1(jur_LowSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_LowSurrogateCharSet_matches), "$find", $rt_wrapFunction3(jur_LowSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_LowSurrogateCharSet_findBack), "$getName", $rt_wrapFunction0(jur_LowSurrogateCharSet_getName), "$first", $rt_wrapFunction1(jur_LowSurrogateCharSet_first),
"$hasConsumed", $rt_wrapFunction1(jur_LowSurrogateCharSet_hasConsumed)],
jur_CompositeGroupQuantifierSet, "CompositeGroupQuantifierSet", 2, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_46", function(var_1, var_2, var_3, var_4, var_5) { jur_CompositeGroupQuantifierSet__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$matches", $rt_wrapFunction3(jur_CompositeGroupQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_CompositeGroupQuantifierSet_getName)],
jur_RelCompositeGroupQuantifierSet, "RelCompositeGroupQuantifierSet", 2, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, ["$_init_46", function(var_1, var_2, var_3, var_4, var_5) { jur_RelCompositeGroupQuantifierSet__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$matches", $rt_wrapFunction3(jur_RelCompositeGroupQuantifierSet_matches)],
ju_ArrayList, "ArrayList", 1, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ArrayList__init_3), "$_init_0", $rt_wrapFunction1(ju_ArrayList__init_1), "$_init_80", $rt_wrapFunction1(ju_ArrayList__init_2), "$ensureCapacity", $rt_wrapFunction1(ju_ArrayList_ensureCapacity), "$get", $rt_wrapFunction1(ju_ArrayList_get), "$size", $rt_wrapFunction0(ju_ArrayList_size), "$set1", $rt_wrapFunction2(ju_ArrayList_set), "$add2", $rt_wrapFunction1(ju_ArrayList_add),
"$add1", $rt_wrapFunction2(ju_ArrayList_add0), "$remove", $rt_wrapFunction1(ju_ArrayList_remove), "$remove1", $rt_wrapFunction1(ju_ArrayList_remove0), "$clear1", $rt_wrapFunction0(ju_ArrayList_clear), "$toString", $rt_wrapFunction0(ju_ArrayList_toString), "$hashCode0", $rt_wrapFunction0(ju_ArrayList_hashCode)],
igiaj_JsScheduler$1, 0, jl_Object, [igiaj_JsScheduler$Task], 0, 0, 0, ["$_init_78", $rt_wrapFunction2(igiaj_JsScheduler$1__init_), "$run", $rt_wrapFunction0(igiaj_JsScheduler$1_run)],
igiaj_JsScheduler$2, 0, jl_Object, [igiae_Scheduler$Cancellable], 0, 0, 0, ["$_init_79", $rt_wrapFunction2(igiaj_JsScheduler$2__init_), "$cancel", $rt_wrapFunction0(igiaj_JsScheduler$2_cancel)],
ju_LinkedHashMapIterator$EntryIterator, 0, ju_LinkedHashMapIterator, [ju_Iterator], 0, 0, 0, ["$_init_21", $rt_wrapFunction2(ju_LinkedHashMapIterator$EntryIterator__init_), "$next0", $rt_wrapFunction0(ju_LinkedHashMapIterator$EntryIterator_next), "$next", $rt_wrapFunction0(ju_LinkedHashMapIterator$EntryIterator_next0)],
jur_CompositeQuantifierSet, "CompositeQuantifierSet", 2, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_59", $rt_wrapFunction4(jur_CompositeQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_CompositeQuantifierSet_matches), "$getName", $rt_wrapFunction0(jur_CompositeQuantifierSet_getName)],
jur_SupplRangeSet, "SupplRangeSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_62", $rt_wrapFunction1(jur_SupplRangeSet__init_), "$matches", $rt_wrapFunction3(jur_SupplRangeSet_matches), "$getName", $rt_wrapFunction0(jur_SupplRangeSet_getName), "$contains0", $rt_wrapFunction1(jur_SupplRangeSet_contains), "$first", $rt_wrapFunction1(jur_SupplRangeSet_first), "$getChars", $rt_wrapFunction0(jur_SupplRangeSet_getChars), "$setNext", $rt_wrapFunction1(jur_SupplRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_SupplRangeSet_hasConsumed)],
jur_RelAltGroupQuantifierSet, "RelAltGroupQuantifierSet", 2, jur_AltGroupQuantifierSet, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_RelAltGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_RelAltGroupQuantifierSet_matches)],
jl_String, "String", 3, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 17, 0, () => jl_String_$callClinit(), ["$_init_", $rt_wrapFunction0(jl_String__init_2), "$_init_31", $rt_wrapFunction1(jl_String__init_0), "$_init_47", $rt_wrapFunction1(jl_String__init_4), "$_init_22", $rt_wrapFunction3(jl_String__init_5), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$startsWith0", $rt_wrapFunction2(jl_String_startsWith0),
"$startsWith1", $rt_wrapFunction1(jl_String_startsWith), "$indexOf1", $rt_wrapFunction2(jl_String_indexOf), "$indexOf3", $rt_wrapFunction1(jl_String_indexOf1), "$lastIndexOf1", $rt_wrapFunction2(jl_String_lastIndexOf), "$lastIndexOf2", $rt_wrapFunction1(jl_String_lastIndexOf0), "$indexOf0", $rt_wrapFunction2(jl_String_indexOf0), "$lastIndexOf0", $rt_wrapFunction2(jl_String_lastIndexOf1), "$substring", $rt_wrapFunction2(jl_String_substring), "$substring0", $rt_wrapFunction1(jl_String_substring0), "$subSequence",
$rt_wrapFunction2(jl_String_subSequence), "$contains1", $rt_wrapFunction1(jl_String_contains), "$toString", $rt_wrapFunction0(jl_String_toString), "$toCharArray", $rt_wrapFunction0(jl_String_toCharArray), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode), "$split1", $rt_wrapFunction1(jl_String_split)],
ju_HashSet, "HashSet", 1, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_HashSet__init_1), "$_init_19", $rt_wrapFunction1(ju_HashSet__init_), "$add2", $rt_wrapFunction1(ju_HashSet_add), "$contains", $rt_wrapFunction1(ju_HashSet_contains), "$isEmpty", $rt_wrapFunction0(ju_HashSet_isEmpty), "$iterator", $rt_wrapFunction0(ju_HashSet_iterator), "$remove1", $rt_wrapFunction1(ju_HashSet_remove), "$size", $rt_wrapFunction0(ju_HashSet_size)],
ju_LinkedHashSet, "LinkedHashSet", 1, ju_HashSet, [ju_SequencedSet, jl_Cloneable, ji_Serializable], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_LinkedHashSet__init_0)],
igiae_JsonSchema, "JsonSchema", 13, jl_Object, [], 17, 0, 0, ["$getType2", $rt_wrapFunction0(igiae_JsonSchema_getType), "$setTitle", $rt_wrapFunction1(igiae_JsonSchema_setTitle), "$setDescription", $rt_wrapFunction1(igiae_JsonSchema_setDescription), "$getProperties", $rt_wrapFunction0(igiae_JsonSchema_getProperties), "$setProperties", $rt_wrapFunction1(igiae_JsonSchema_setProperties), "$getRequired", $rt_wrapFunction0(igiae_JsonSchema_getRequired), "$setRequired", $rt_wrapFunction1(igiae_JsonSchema_setRequired),
"$getItems", $rt_wrapFunction0(igiae_JsonSchema_getItems), "$setItems", $rt_wrapFunction1(igiae_JsonSchema_setItems), "$getAdditionalProperties", $rt_wrapFunction0(igiae_JsonSchema_getAdditionalProperties), "$setAdditionalProperties", $rt_wrapFunction1(igiae_JsonSchema_setAdditionalProperties), "$getPattern", $rt_wrapFunction0(igiae_JsonSchema_getPattern), "$setPattern", $rt_wrapFunction1(igiae_JsonSchema_setPattern), "$getMinimum", $rt_wrapFunction0(igiae_JsonSchema_getMinimum), "$setMinimum", $rt_wrapFunction1(igiae_JsonSchema_setMinimum),
"$getEnumValues", $rt_wrapFunction0(igiae_JsonSchema_getEnumValues), "$setEnumValues", $rt_wrapFunction1(igiae_JsonSchema_setEnumValues), "$getFix", $rt_wrapFunction0(igiae_JsonSchema_getFix), "$setFix", $rt_wrapFunction1(igiae_JsonSchema_setFix), "$setSchemaDraft", $rt_wrapFunction1(igiae_JsonSchema_setSchemaDraft), "$setSchemaId", $rt_wrapFunction1(igiae_JsonSchema_setSchemaId), "$toTree0", $rt_wrapFunction0(igiae_JsonSchema_toTree)],
jur_FSet$PossessiveFSet, "FSet$PossessiveFSet", 2, jur_AbstractSet, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_FSet$PossessiveFSet__init_), "$matches", $rt_wrapFunction3(jur_FSet$PossessiveFSet_matches), "$getName", $rt_wrapFunction0(jur_FSet$PossessiveFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_FSet$PossessiveFSet_hasConsumed)],
igiae_Pending$Settlement, 0, jl_Object, [], 1537, 0, 0, 0,
igiaj_JsPluginHost$12$1, "JsPluginHost$12$1", 14, jl_Object, [igiae_Pending$Settlement], 0, 0, 0, ["$_init_40", $rt_wrapFunction3(igiaj_JsPluginHost$12$1__init_), "$value", $rt_wrapFunction1(igiaj_JsPluginHost$12$1_value), "$failure", $rt_wrapFunction1(igiaj_JsPluginHost$12$1_failure)],
jur_PosCompositeGroupQuantifierSet, "PosCompositeGroupQuantifierSet", 2, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, ["$_init_46", function(var_1, var_2, var_3, var_4, var_5) { jur_PosCompositeGroupQuantifierSet__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$matches", $rt_wrapFunction3(jur_PosCompositeGroupQuantifierSet_matches)],
jur_MultiLineEOLSet, "MultiLineEOLSet", 2, jur_AbstractSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_MultiLineEOLSet__init_), "$matches", $rt_wrapFunction3(jur_MultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_MultiLineEOLSet_getName)],
ju_Queue, 0, jl_Object, [ju_Collection], 1537, 0, 0, 0,
ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 1537, 0, 0, 0,
ju_ArrayDeque, 0, ju_AbstractCollection, [ju_Deque, jl_Cloneable, ji_Serializable], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ArrayDeque__init_0), "$_init_0", $rt_wrapFunction1(ju_ArrayDeque__init_), "$addFirst", $rt_wrapFunction1(ju_ArrayDeque_addFirst), "$removeFirst", $rt_wrapFunction0(ju_ArrayDeque_removeFirst), "$pollFirst", $rt_wrapFunction0(ju_ArrayDeque_pollFirst), "$push", $rt_wrapFunction1(ju_ArrayDeque_push), "$pop", $rt_wrapFunction0(ju_ArrayDeque_pop), "$size", $rt_wrapFunction0(ju_ArrayDeque_size)],
jur_AbstractCharClass$LazyJavaDigit$1, "AbstractCharClass$LazyJavaDigit$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_30", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDigit$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDigit$1_contains)],
igiae_ServiceHub$Entry, "ServiceHub$Entry", 13, jl_Object, [], 16, 0, 0, ["$_init_82", $rt_wrapFunction2(igiae_ServiceHub$Entry__init_0)],
ju_HashMap$AbstractMapIterator, 0, jl_Object, [], 0, 0, 0, ["$_init_19", $rt_wrapFunction1(ju_HashMap$AbstractMapIterator__init_), "$hasNext", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_hasNext), "$checkConcurrentMod", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_checkConcurrentMod), "$makeNext", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_makeNext)],
jl_NullPointerException, "NullPointerException", 3, jl_RuntimeException, [], 1, 0, 0, ["$_init_1", $rt_wrapFunction1(jl_NullPointerException__init_1), "$_init_", $rt_wrapFunction0(jl_NullPointerException__init_0)],
jur_AbstractCharClass$LazyJavaSpaceChar$1, "AbstractCharClass$LazyJavaSpaceChar$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_35", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaSpaceChar$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaSpaceChar$1_contains)],
ju_LinkedHashMapEntrySet, 0, ju_AbstractSet, [ju_SequencedSet], 0, 0, 0, ["$_init_21", $rt_wrapFunction2(ju_LinkedHashMapEntrySet__init_), "$size", $rt_wrapFunction0(ju_LinkedHashMapEntrySet_size), "$iterator", $rt_wrapFunction0(ju_LinkedHashMapEntrySet_iterator)],
jl_Math, 0, jl_Object, [], 17, 0, 0, 0,
otji_JSWrapper$Helper$FinalizationRegistryConsumer, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue)],
jl_IllegalArgumentException, "IllegalArgumentException", 3, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_0), "$_init_1", $rt_wrapFunction1(jl_IllegalArgumentException__init_1)],
jur_PatternSyntaxException, "PatternSyntaxException", 2, jl_IllegalArgumentException, [], 1, 0, 0, ["$_init_52", $rt_wrapFunction3(jur_PatternSyntaxException__init_0), "$getMessage", $rt_wrapFunction0(jur_PatternSyntaxException_getMessage)],
jur_AbstractCharClass$LazyJavaDefined, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDefined__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDefined_computeValue)],
jur_Pattern, 0, jl_Object, [ji_Serializable], 17, 0, 0, ["$matcher", $rt_wrapFunction1(jur_Pattern_matcher), "$split0", $rt_wrapFunction2(jur_Pattern_split0), "$split", $rt_wrapFunction1(jur_Pattern_split), "$pattern", $rt_wrapFunction0(jur_Pattern_pattern), "$namedGroups", $rt_wrapFunction0(jur_Pattern_namedGroups), "$groupCount", $rt_wrapFunction0(jur_Pattern_groupCount), "$compCount", $rt_wrapFunction0(jur_Pattern_compCount), "$consCount", $rt_wrapFunction0(jur_Pattern_consCount)],
jur_PosAltGroupQuantifierSet, "PosAltGroupQuantifierSet", 2, jur_AltGroupQuantifierSet, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_PosAltGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PosAltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_PosAltGroupQuantifierSet_setNext)],
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1025, 0, 0, ["$_init_51", $rt_wrapFunction2(jl_Enum__init_)],
igiae_PluginStatus, 0, jl_Enum, [], 65553, 0, () => igiae_PluginStatus_$callClinit(), 0,
ju_Collections$13, 0, ju_AbstractMap, [], 0, 0, 0, ["$_init_15", $rt_wrapFunction1(ju_Collections$13__init_)],
igiaj_JsPluginHost$ContextForFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0]);
$rt_metadata([jur_AbstractCharClass$LazyJavaLetterOrDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetterOrDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue)],
otciu_UnicodeHelper$Range, "UnicodeHelper$Range", 8, jl_Object, [], 1, 0, 0, ["$_init_34", $rt_wrapFunction3(otciu_UnicodeHelper$Range__init_)],
jur_AbstractLineTerminator$2, 0, jur_AbstractLineTerminator, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractLineTerminator$2__init_), "$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$2_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$2_isAfterLineTerminator)],
otciu_CharMapping, 0, jl_Object, [], 1, 0, 0, ["$_init_33", $rt_wrapFunction2(otciu_CharMapping__init_)],
jur_AbstractLineTerminator$1, 0, jur_AbstractLineTerminator, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractLineTerminator$1__init_), "$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$1_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$1_isAfterLineTerminator)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue)],
igiae_ServiceHub$1, 0, jl_Object, [igiae_ServiceHub$Registry], 0, 0, 0, ["$_init_81", $rt_wrapFunction2(igiae_ServiceHub$1__init_), "$get0", $rt_wrapFunction1(igiae_ServiceHub$1_get), "$want", $rt_wrapFunction1(igiae_ServiceHub$1_want0), "$want0", $rt_wrapFunction2(igiae_ServiceHub$1_want), "$watch", $rt_wrapFunction2(igiae_ServiceHub$1_watch), "$register", $rt_wrapFunction2(igiae_ServiceHub$1_register), "$ids", $rt_wrapFunction0(igiae_ServiceHub$1_ids)],
otjc_JSWeakRef, 0, jl_Object, [otj_JSObject], 1025, 0, 0, 0,
igiae_ServiceHub$2, 0, jl_Object, [igiae_Scheduler$Cancellable], 0, 0, 0, ["$_init_83", $rt_wrapFunction3(igiae_ServiceHub$2__init_), "$cancel", $rt_wrapFunction0(igiae_ServiceHub$2_cancel)],
otci_CharFlow, 0, jl_Object, [], 1, 0, 0, ["$_init_31", $rt_wrapFunction1(otci_CharFlow__init_)],
jur_RangeSet, "RangeSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_62", $rt_wrapFunction1(jur_RangeSet__init_), "$accepts", $rt_wrapFunction2(jur_RangeSet_accepts), "$getName", $rt_wrapFunction0(jur_RangeSet_getName), "$first", $rt_wrapFunction1(jur_RangeSet_first), "$getChars", $rt_wrapFunction0(jur_RangeSet_getChars)],
jur_UnicodeCategory, "UnicodeCategory", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_UnicodeCategory__init_), "$contains0", $rt_wrapFunction1(jur_UnicodeCategory_contains)],
jur_UnicodeCategoryScope, "UnicodeCategoryScope", 2, jur_UnicodeCategory, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_UnicodeCategoryScope__init_), "$contains0", $rt_wrapFunction1(jur_UnicodeCategoryScope_contains)],
jur_CharClass, "CharClass", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_CharClass__init_2), "$_init_53", $rt_wrapFunction2(jur_CharClass__init_0), "$_init_61", $rt_wrapFunction3(jur_CharClass__init_1), "$add", $rt_wrapFunction1(jur_CharClass_add), "$add3", $rt_wrapFunction1(jur_CharClass_add1), "$add0", $rt_wrapFunction2(jur_CharClass_add0), "$union", $rt_wrapFunction1(jur_CharClass_union), "$intersection", $rt_wrapFunction1(jur_CharClass_intersection), "$contains0", $rt_wrapFunction1(jur_CharClass_contains),
"$getBits", $rt_wrapFunction0(jur_CharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_CharClass_getLowHighSurrogates), "$getInstance", $rt_wrapFunction0(jur_CharClass_getInstance), "$toString", $rt_wrapFunction0(jur_CharClass_toString), "$hasUCI", $rt_wrapFunction0(jur_CharClass_hasUCI)],
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(otcit_FloatAnalyzer$Result__init_)],
jur_UCIDecomposedCharSet, "UCIDecomposedCharSet", 2, jur_DecomposedCharSet, [], 0, 0, 0, ["$_init_28", $rt_wrapFunction2(jur_UCIDecomposedCharSet__init_)],
otrr_ClassInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, ["$newArrayInstance", $rt_wrapFunction1(otrr_ClassInfo_newArrayInstance)],
jur_AbstractCharClass$LazyJavaWhitespace$1, "AbstractCharClass$LazyJavaWhitespace$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_102", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaWhitespace$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaWhitespace$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue)],
igiae_Scheduler$1, 0, jl_Object, [igiae_Scheduler], 0, 0, 0, ["$_init_", $rt_wrapFunction0(igiae_Scheduler$1__init_), "$schedule", $rt_wrapFunction2(igiae_Scheduler$1_schedule)],
jl_Long, 0, jl_Number, [jl_Comparable], 1, 0, () => jl_Long_$callClinit(), ["$_init_73", $rt_wrapFunction1(jl_Long__init_), "$longValue", $rt_wrapFunction0(jl_Long_longValue)],
otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 1537, 0, 0, 0,
otjc_JSArray, 0, jl_Object, [otjc_JSArrayReader], 1, 0, 0, 0,
jur_SequenceSet$IntHash, 0, jl_Object, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_SequenceSet$IntHash__init_0), "$put0", $rt_wrapFunction2(jur_SequenceSet$IntHash_put), "$get2", $rt_wrapFunction1(jur_SequenceSet$IntHash_get)],
jur_AbstractCharClass$LazyNonDigit, 0, jur_AbstractCharClass$LazyDigit, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonDigit_computeValue)],
igiae_PluginLedger, 0, jl_Object, [], 17, 0, 0, ["$_init_", $rt_wrapFunction0(igiae_PluginLedger__init_), "$entries", $rt_wrapFunction0(igiae_PluginLedger_entries), "$entry", $rt_wrapFunction1(igiae_PluginLedger_entry), "$recordDeclared", $rt_wrapFunction3(igiae_PluginLedger_recordDeclared), "$recordCapabilityProvided", $rt_wrapFunction2(igiae_PluginLedger_recordCapabilityProvided), "$recordServiceProvided", $rt_wrapFunction2(igiae_PluginLedger_recordServiceProvided), "$recordServiceConsumed", $rt_wrapFunction2(igiae_PluginLedger_recordServiceConsumed),
"$recordTopic", $rt_wrapFunction2(igiae_PluginLedger_recordTopic), "$recordStatus", $rt_wrapFunction4(igiae_PluginLedger_recordStatus)],
jur_AbstractCharClass$1, "AbstractCharClass$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_23", $rt_wrapFunction2(jur_AbstractCharClass$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$1_contains)],
igiaj_EngineJs, 0, jl_Object, [], 17, 0, () => igiaj_EngineJs_$callClinit(), 0,
jur_AbstractCharClass$2, "AbstractCharClass$2", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_24", $rt_wrapFunction3(jur_AbstractCharClass$2__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$2_contains)],
jur_AbstractCharClass$LazyJavaLowerCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLowerCase__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLowerCase_computeValue)],
jur_PossessiveCompositeQuantifierSet, "PossessiveCompositeQuantifierSet", 2, jur_CompositeQuantifierSet, [], 0, 0, 0, ["$_init_59", $rt_wrapFunction4(jur_PossessiveCompositeQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PossessiveCompositeQuantifierSet_matches)],
igiaj_JsPluginHost$ManifestFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginHost$1, 0, jl_Object, [igiaj_JsPluginHost$ManifestFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$1__init_), "$call8", $rt_wrapFunction1(igiaj_JsPluginHost$1_call)],
jur_AbstractCharClass$LazyJavaLetterOrDigit$1, "AbstractCharClass$LazyJavaLetterOrDigit$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_64", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetterOrDigit$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains)],
jur_CharClass$18, "CharClass$18", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_70", $rt_wrapFunction2(jur_CharClass$18__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$18_contains), "$toString", $rt_wrapFunction0(jur_CharClass$18_toString)],
igiaj_JsPluginHost$3, 0, jl_Object, [igiaj_JsPluginHost$ContextForFn], 0, 0, 0, ["$_init_9", $rt_wrapFunction2(igiaj_JsPluginHost$3__init_), "$call9", $rt_wrapFunction2(igiaj_JsPluginHost$3_call)],
jur_PossessiveGroupQuantifierSet, "PossessiveGroupQuantifierSet", 2, jur_GroupQuantifierSet, [], 0, 0, 0, ["$_init_17", $rt_wrapFunction3(jur_PossessiveGroupQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PossessiveGroupQuantifierSet_matches)],
igiaj_JsPluginHost$2, 0, jl_Object, [igiaj_JsPluginHost$ManifestFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$2__init_), "$call8", $rt_wrapFunction1(igiaj_JsPluginHost$2_call)],
igiaj_JsPluginHost$5, 0, jl_Object, [igiaj_JsPluginHost$IdFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$5__init_), "$call", $rt_wrapFunction1(igiaj_JsPluginHost$5_call)],
igiaj_JsPluginHost$4, 0, jl_Object, [igiaj_JsPluginHost$IdFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$4__init_), "$call", $rt_wrapFunction1(igiaj_JsPluginHost$4_call)],
jur_CharClass$13, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_67", $rt_wrapFunction2(jur_CharClass$13__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$13_contains)],
jur_CharClass$12, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_67", $rt_wrapFunction2(jur_CharClass$12__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$12_contains)],
jur_CharClass$11, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction4(jur_CharClass$11__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$11_contains)],
otci_Base46, 0, jl_Object, [], 17, 0, 0, 0,
jur_CharClass$10, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction4(jur_CharClass$10__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$10_contains)],
jur_CharClass$17, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction4(jur_CharClass$17__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$17_contains)],
jur_UCISequenceSet, "UCISequenceSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_54", $rt_wrapFunction1(jur_UCISequenceSet__init_), "$accepts", $rt_wrapFunction2(jur_UCISequenceSet_accepts), "$getName", $rt_wrapFunction0(jur_UCISequenceSet_getName)],
jur_CharClass$16, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_66", $rt_wrapFunction4(jur_CharClass$16__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$16_contains)],
jur_CharClass$15, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_69", $rt_wrapFunction3(jur_CharClass$15__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$15_contains)],
jur_AbstractCharClass$LazyJavaDefined$1, "AbstractCharClass$LazyJavaDefined$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_49", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDefined$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDefined$1_contains)]]);
$rt_metadata([jur_CharClass$14, 0, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_69", $rt_wrapFunction3(jur_CharClass$14__init_), "$contains0", $rt_wrapFunction1(jur_CharClass$14_contains)],
igiaj_JsPluginHost$EntriesFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 1, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_StringBuilder__init_2), "$_init_", $rt_wrapFunction0(jl_StringBuilder__init_1), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append3", $rt_wrapFunction1(jl_StringBuilder_append2), "$append2", $rt_wrapFunction1(jl_StringBuilder_append1), "$append9", $rt_wrapFunction1(jl_StringBuilder_append7), "$append10", $rt_wrapFunction1(jl_StringBuilder_append4), "$append0", $rt_wrapFunction1(jl_StringBuilder_append0),
"$append18", $rt_wrapFunction3(jl_StringBuilder_append3), "$append8", $rt_wrapFunction1(jl_StringBuilder_append6), "$insert13", $rt_wrapFunction2(jl_StringBuilder_insert5), "$insert12", $rt_wrapFunction2(jl_StringBuilder_insert6), "$insert9", $rt_wrapFunction4(jl_StringBuilder_insert3), "$insert10", $rt_wrapFunction2(jl_StringBuilder_insert7), "$insert11", $rt_wrapFunction2(jl_StringBuilder_insert1), "$delete0", $rt_wrapFunction2(jl_StringBuilder_delete), "$deleteCharAt", $rt_wrapFunction1(jl_StringBuilder_deleteCharAt),
"$insert14", $rt_wrapFunction2(jl_StringBuilder_insert9), "$insert6", $rt_wrapFunction4(jl_StringBuilder_insert8), "$append4", $rt_wrapFunction3(jl_StringBuilder_append5), "$length", $rt_wrapFunction0(jl_StringBuilder_length), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert0), "$insert5", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert4),
"$insert2", $rt_wrapFunction2(jl_StringBuilder_insert2), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert10)],
jur_CompositeRangeSet, "CompositeRangeSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_63", $rt_wrapFunction2(jur_CompositeRangeSet__init_0), "$matches", $rt_wrapFunction3(jur_CompositeRangeSet_matches), "$setNext", $rt_wrapFunction1(jur_CompositeRangeSet_setNext), "$getName", $rt_wrapFunction0(jur_CompositeRangeSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_CompositeRangeSet_hasConsumed), "$first", $rt_wrapFunction1(jur_CompositeRangeSet_first)],
ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ConcurrentModificationException__init_0)],
jur_FinalSet, "FinalSet", 2, jur_FSet, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_FinalSet__init_), "$matches", $rt_wrapFunction3(jur_FinalSet_matches), "$getName", $rt_wrapFunction0(jur_FinalSet_getName)],
ju_LinkedHashMapIterator$ValueIterator, 0, ju_LinkedHashMapIterator, [ju_Iterator], 0, 0, 0, ["$_init_21", $rt_wrapFunction2(ju_LinkedHashMapIterator$ValueIterator__init_), "$next", $rt_wrapFunction0(ju_LinkedHashMapIterator$ValueIterator_next)],
igiae_Diagnostics$Sink, 0, jl_Object, [], 1537, 0, 0, 0,
jur_EmptySet, "EmptySet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_6", $rt_wrapFunction1(jur_EmptySet__init_0), "$accepts", $rt_wrapFunction2(jur_EmptySet_accepts), "$find", $rt_wrapFunction3(jur_EmptySet_find), "$findBack", $rt_wrapFunction4(jur_EmptySet_findBack), "$getName", $rt_wrapFunction0(jur_EmptySet_getName), "$hasConsumed", $rt_wrapFunction1(jur_EmptySet_hasConsumed)],
ju_Map$Entry, 0, jl_Object, [], 1537, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, ["$_init_76", $rt_wrapFunction2(ju_MapEntry__init_), "$equals", $rt_wrapFunction1(ju_MapEntry_equals), "$getKey", $rt_wrapFunction0(ju_MapEntry_getKey), "$getValue", $rt_wrapFunction0(ju_MapEntry_getValue), "$hashCode0", $rt_wrapFunction0(ju_MapEntry_hashCode), "$setValue", $rt_wrapFunction1(ju_MapEntry_setValue), "$toString", $rt_wrapFunction0(ju_MapEntry_toString)],
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, ["$_init_20", $rt_wrapFunction2(ju_HashMap$HashEntry__init_)],
ju_LinkedHashMap$LinkedHashMapEntry, "LinkedHashMap$LinkedHashMapEntry", 1, ju_HashMap$HashEntry, [], 16, 0, 0, ["$_init_20", $rt_wrapFunction2(ju_LinkedHashMap$LinkedHashMapEntry__init_)],
jur_AbstractCharClass$LazyASCII, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyASCII__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyASCII_computeValue)],
igiae_Activation$Tarjan, 0, jl_Object, [], 16, 0, 0, ["$_init_15", $rt_wrapFunction1(igiae_Activation$Tarjan__init_), "$visit", $rt_wrapFunction1(igiae_Activation$Tarjan_visit)],
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, ["$_init_45", $rt_wrapFunction1(ju_AbstractList$1__init_), "$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next", $rt_wrapFunction0(ju_AbstractList$1_next), "$remove0", $rt_wrapFunction0(ju_AbstractList$1_remove)],
jur_Quantifier, "Quantifier", 2, jur_SpecialToken, [jl_Cloneable], 0, 0, 0, ["$_init_16", $rt_wrapFunction2(jur_Quantifier__init_), "$min0", $rt_wrapFunction0(jur_Quantifier_min), "$max0", $rt_wrapFunction0(jur_Quantifier_max), "$toString", $rt_wrapFunction0(jur_Quantifier_toString)],
jur_AbstractCharClass$LazyJavaUpperCase$1, "AbstractCharClass$LazyJavaUpperCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_100", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUpperCase$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUpperCase$1_contains)],
otpp_ResourceAccessor, 0, jl_Object, [], 16, 0, 0, 0,
jur_PossessiveQuantifierSet, "PossessiveQuantifierSet", 2, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_32", $rt_wrapFunction3(jur_PossessiveQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_PossessiveQuantifierSet_matches)],
igiaj_JsErrors, 0, jl_Object, [], 16, 0, 0, 0,
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1, "AbstractCharClass$LazyJavaIdentifierIgnorable$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_105", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains)],
jur_AbstractCharClass$LazyJavaLetter$1, "AbstractCharClass$LazyJavaLetter$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_27", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetter$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetter$1_contains)],
jur_ReluctantQuantifierSet, "ReluctantQuantifierSet", 2, jur_LeafQuantifierSet, [], 0, 0, 0, ["$_init_32", $rt_wrapFunction3(jur_ReluctantQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_ReluctantQuantifierSet_matches)],
igiae_EventBus$Listener, 0, jl_Object, [], 1537, 0, 0, 0,
igiae_ManifestValidator, 0, jl_Object, [], 17, 0, 0, 0,
jur_EOISet, "EOISet", 2, jur_AbstractSet, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_EOISet__init_), "$matches", $rt_wrapFunction3(jur_EOISet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOISet_hasConsumed), "$getName", $rt_wrapFunction0(jur_EOISet_getName)],
jur_AbstractCharClass$LazyUpper, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyUpper__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyUpper_computeValue)],
igiae_ServiceHub$Recorder, 0, jl_Object, [], 1537, 0, 0, 0,
ju_HashMap$KeyIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, ["$_init_19", $rt_wrapFunction1(ju_HashMap$KeyIterator__init_), "$next", $rt_wrapFunction0(ju_HashMap$KeyIterator_next)],
igiae_PluginSession, 0, jl_Object, [], 17, 0, 0, ["$_init_95", $rt_wrapFunction4(igiae_PluginSession__init_), "$getFacts", $rt_wrapFunction0(igiae_PluginSession_getFacts), "$getServices", $rt_wrapFunction0(igiae_PluginSession_getServices), "$getEvents", $rt_wrapFunction0(igiae_PluginSession_getEvents), "$provide", $rt_wrapFunction2(igiae_PluginSession_provide)],
otji_JSWrapper, 0, jl_Object, [], 17, 0, 0, 0,
igiaj_JsPluginHost$MarkBrokenFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginHost$7, 0, jl_Object, [igiaj_JsPluginHost$MarkBrokenFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$7__init_), "$call3", $rt_wrapFunction2(igiaj_JsPluginHost$7_call)],
igiaj_JsPluginHost$ProvideServiceFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginHost$6, 0, jl_Object, [igiaj_JsPluginHost$ProvideServiceFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$6__init_), "$call3", $rt_wrapFunction2(igiaj_JsPluginHost$6_call)],
igiaj_JsPluginHost$9, 0, jl_Object, [igiaj_JsPluginHost$EntriesFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$9__init_), "$call2", $rt_wrapFunction0(igiaj_JsPluginHost$9_call)],
igiaj_JsPluginHost$ReleaseFn, 0, jl_Object, [otj_JSObject], 1536, 0, 0, 0,
igiaj_JsPluginHost$8, 0, jl_Object, [igiaj_JsPluginHost$ReleaseFn], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiaj_JsPluginHost$8__init_), "$call10", $rt_wrapFunction1(igiaj_JsPluginHost$8_call)],
igiaj_JsScheduler, 0, jl_Object, [igiae_Scheduler], 16, 0, 0, ["$_init_", $rt_wrapFunction0(igiaj_JsScheduler__init_), "$schedule", $rt_wrapFunction2(igiaj_JsScheduler_schedule)],
jur_MultiLineSOLSet, "MultiLineSOLSet", 2, jur_AbstractSet, [], 0, 0, 0, ["$_init_60", $rt_wrapFunction1(jur_MultiLineSOLSet__init_), "$matches", $rt_wrapFunction3(jur_MultiLineSOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineSOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_MultiLineSOLSet_getName)],
igiae_ServiceHub, 0, jl_Object, [], 17, 0, 0, ["$_init_94", $rt_wrapFunction2(igiae_ServiceHub__init_), "$wellKnown", $rt_wrapFunction1(igiae_ServiceHub_wellKnown), "$forPlugin", $rt_wrapFunction1(igiae_ServiceHub_forPlugin), "$hostService", $rt_wrapFunction2(igiae_ServiceHub_hostService), "$get0", $rt_wrapFunction1(igiae_ServiceHub_get), "$ids", $rt_wrapFunction0(igiae_ServiceHub_ids), "$releasePlugin", $rt_wrapFunction1(igiae_ServiceHub_releasePlugin)],
otjc_JSString, 0, jl_Object, [otj_JSObject], 1025, 0, 0, 0,
otcic_JSStderrPrintStream, 0, otcic_JsConsolePrintStream, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JSStderrPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStderrPrintStream_print)],
jur_AbstractCharClass$LazyLower, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyLower__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyLower_computeValue)],
jur_AbstractCharClass$LazyJavaTitleCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaTitleCase__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaTitleCase_computeValue)],
jur_PreviousMatch, "PreviousMatch", 2, jur_AbstractSet, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_PreviousMatch__init_), "$matches", $rt_wrapFunction3(jur_PreviousMatch_matches), "$hasConsumed", $rt_wrapFunction1(jur_PreviousMatch_hasConsumed), "$getName", $rt_wrapFunction0(jur_PreviousMatch_getName)],
jur_NonCapFSet, "NonCapFSet", 2, jur_FSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_NonCapFSet__init_), "$matches", $rt_wrapFunction3(jur_NonCapFSet_matches), "$getName", $rt_wrapFunction0(jur_NonCapFSet_getName), "$hasConsumed", $rt_wrapFunction1(jur_NonCapFSet_hasConsumed)],
jur_UCISupplCharSet, "UCISupplCharSet", 2, jur_LeafSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_UCISupplCharSet__init_), "$accepts", $rt_wrapFunction2(jur_UCISupplCharSet_accepts), "$getName", $rt_wrapFunction0(jur_UCISupplCharSet_getName)],
jl_System, 0, jl_Object, [], 17, 0, 0, 0]);
$rt_metadata([igiae_PluginHost$1, 0, jl_Object, [igiae_ServiceHub$Recorder], 0, 0, 0, ["$_init_8", $rt_wrapFunction1(igiae_PluginHost$1__init_), "$provided", $rt_wrapFunction2(igiae_PluginHost$1_provided), "$consumed", $rt_wrapFunction2(igiae_PluginHost$1_consumed)],
igiaj_JsPluginContext, 0, jl_Object, [otj_JSObject], 16, 0, 0, 0,
igiae_PluginHost, 0, jl_Object, [], 17, 0, 0, ["$_init_7", $rt_wrapFunction4(igiae_PluginHost__init_), "$getApp", $rt_wrapFunction0(igiae_PluginHost_getApp), "$getApi", $rt_wrapFunction0(igiae_PluginHost_getApi), "$getSurfaces", $rt_wrapFunction0(igiae_PluginHost_getSurfaces), "$getLedger", $rt_wrapFunction0(igiae_PluginHost_getLedger), "$knownCapabilities", $rt_wrapFunction1(igiae_PluginHost_knownCapabilities), "$wellKnownServices", $rt_wrapFunction1(igiae_PluginHost_wellKnownServices), "$supports", $rt_wrapFunction2(igiae_PluginHost_supports),
"$sessionFor", $rt_wrapFunction2(igiae_PluginHost_sessionFor), "$verifyActivation", $rt_wrapFunction1(igiae_PluginHost_verifyActivation), "$capability", $rt_wrapFunction1(igiae_PluginHost_capability), "$service", $rt_wrapFunction1(igiae_PluginHost_service), "$provideService", $rt_wrapFunction2(igiae_PluginHost_provideService), "$markBroken", $rt_wrapFunction2(igiae_PluginHost_markBroken), "$release", $rt_wrapFunction1(igiae_PluginHost_release), "$provide0", $rt_wrapFunction3(igiae_PluginHost_provide)],
igiae_PluginHost$3, 0, jl_Object, [igiae_EventBus], 0, 0, 0, ["$_init_97", $rt_wrapFunction3(igiae_PluginHost$3__init_), "$publish", $rt_wrapFunction2(igiae_PluginHost$3_publish), "$subscribe", $rt_wrapFunction2(igiae_PluginHost$3_subscribe)],
igiae_PluginHost$2, 0, jl_Object, [igiae_ServiceHub$Registry], 0, 0, 0, ["$_init_96", $rt_wrapFunction3(igiae_PluginHost$2__init_), "$get0", $rt_wrapFunction1(igiae_PluginHost$2_get), "$want", $rt_wrapFunction1(igiae_PluginHost$2_want0), "$want0", $rt_wrapFunction2(igiae_PluginHost$2_want), "$watch", $rt_wrapFunction2(igiae_PluginHost$2_watch), "$register", $rt_wrapFunction2(igiae_PluginHost$2_register), "$ids", $rt_wrapFunction0(igiae_PluginHost$2_ids)],
jur_AbstractCharClass$LazyRange, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_16", $rt_wrapFunction2(jur_AbstractCharClass$LazyRange__init_0), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyRange_computeValue)],
igiae_PluginHost$5, 0, jl_Object, [igiae_Scheduler$Cancellable], 0, 0, 0, ["$_init_", $rt_wrapFunction0(igiae_PluginHost$5__init_), "$cancel", $rt_wrapFunction0(igiae_PluginHost$5_cancel)],
jur_AbstractCharClass$LazyXDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyXDigit__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyXDigit_computeValue)],
igiae_PluginHost$4, "PluginHost$4", 13, jl_Object, [igiae_Scheduler$Cancellable], 0, 0, 0, ["$_init_98", function(var_1, var_2, var_3, var_4, var_5) { igiae_PluginHost$4__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$cancel", $rt_wrapFunction0(igiae_PluginHost$4_cancel)],
jur_Matcher, 0, jl_Object, [jur_MatchResult], 17, 0, 0, ["$find1", $rt_wrapFunction1(jur_Matcher_find), "$find0", $rt_wrapFunction0(jur_Matcher_find0), "$start", $rt_wrapFunction1(jur_Matcher_start0), "$end", $rt_wrapFunction1(jur_Matcher_end), "$start0", $rt_wrapFunction0(jur_Matcher_start), "$end0", $rt_wrapFunction0(jur_Matcher_end0), "$hasTransparentBounds", $rt_wrapFunction0(jur_Matcher_hasTransparentBounds), "$_init_50", $rt_wrapFunction2(jur_Matcher__init_)],
jur_DotAllSet, "DotAllSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_DotAllSet__init_), "$matches", $rt_wrapFunction3(jur_DotAllSet_matches), "$getName", $rt_wrapFunction0(jur_DotAllSet_getName), "$setNext", $rt_wrapFunction1(jur_DotAllSet_setNext), "$getType", $rt_wrapFunction0(jur_DotAllSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotAllSet_hasConsumed)],
jur_AbstractCharClass$LazyJavaLowerCase$1, "AbstractCharClass$LazyJavaLowerCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, ["$_init_75", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLowerCase$1__init_), "$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLowerCase$1_contains)],
jur_UCISupplRangeSet, "UCISupplRangeSet", 2, jur_SupplRangeSet, [], 0, 0, 0, ["$_init_62", $rt_wrapFunction1(jur_UCISupplRangeSet__init_0), "$contains0", $rt_wrapFunction1(jur_UCISupplRangeSet_contains), "$getName", $rt_wrapFunction0(jur_UCISupplRangeSet_getName)],
jur_AbstractCharClass$LazyJavaUpperCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUpperCase__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUpperCase_computeValue)],
jur_HangulDecomposedCharSet, "HangulDecomposedCharSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_55", $rt_wrapFunction2(jur_HangulDecomposedCharSet__init_), "$setNext", $rt_wrapFunction1(jur_HangulDecomposedCharSet_setNext), "$getName", $rt_wrapFunction0(jur_HangulDecomposedCharSet_getName), "$matches", $rt_wrapFunction3(jur_HangulDecomposedCharSet_matches), "$first", $rt_wrapFunction1(jur_HangulDecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HangulDecomposedCharSet_hasConsumed)],
jur_AbstractCharClass$LazyPunct, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyPunct__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPunct_computeValue)],
igiae_SchemaIssue, "SchemaIssue", 13, jl_Object, [], 17, 0, 0, ["$_init_12", $rt_wrapFunction3(igiae_SchemaIssue__init_), "$getPath", $rt_wrapFunction0(igiae_SchemaIssue_getPath), "$getMessage", $rt_wrapFunction0(igiae_SchemaIssue_getMessage), "$getFix", $rt_wrapFunction0(igiae_SchemaIssue_getFix), "$toString", $rt_wrapFunction0(igiae_SchemaIssue_toString)],
otjc_JSBoolean, 0, jl_Object, [otj_JSObject], 1025, 0, 0, 0,
igiae_ActivationPlan, 0, jl_Object, [], 17, 0, 0, ["$_init_14", $rt_wrapFunction2(igiae_ActivationPlan__init_), "$getOrder", $rt_wrapFunction0(igiae_ActivationPlan_getOrder), "$getCycles", $rt_wrapFunction0(igiae_ActivationPlan_getCycles)],
ju_LinkedHashMapKeySet, 0, ju_AbstractSet, [ju_SequencedSet], 0, 0, 0, ["$_init_21", $rt_wrapFunction2(ju_LinkedHashMapKeySet__init_), "$size", $rt_wrapFunction0(ju_LinkedHashMapKeySet_size), "$iterator", $rt_wrapFunction0(ju_LinkedHashMapKeySet_iterator)],
jur_WordBoundary, "WordBoundary", 2, jur_AbstractSet, [], 0, 0, 0, ["$_init_38", $rt_wrapFunction1(jur_WordBoundary__init_0), "$matches", $rt_wrapFunction3(jur_WordBoundary_matches), "$hasConsumed", $rt_wrapFunction1(jur_WordBoundary_hasConsumed), "$getName", $rt_wrapFunction0(jur_WordBoundary_getName)],
jur_AbstractCharClass$LazySpace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazySpace__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpace_computeValue)],
igiae_SchemaValidator, 0, jl_Object, [], 17, 0, 0, 0,
ju_HashMap$1, 0, ju_AbstractSet, [], 0, 0, 0, ["$_init_19", $rt_wrapFunction1(ju_HashMap$1__init_), "$iterator", $rt_wrapFunction0(ju_HashMap$1_iterator)],
jl_Double, "Double", 3, jl_Number, [jl_Comparable], 1, 0, () => jl_Double_$callClinit(), ["$_init_101", $rt_wrapFunction1(jl_Double__init_), "$doubleValue", $rt_wrapFunction0(jl_Double_doubleValue), "$intValue", $rt_wrapFunction0(jl_Double_intValue), "$longValue", $rt_wrapFunction0(jl_Double_longValue), "$toString", $rt_wrapFunction0(jl_Double_toString0), "$equals", $rt_wrapFunction1(jl_Double_equals0), "$hashCode0", $rt_wrapFunction0(jl_Double_hashCode)],
jur_IntHash, 0, jl_Object, [], 0, 0, 0, 0,
igiae_LedgerEntry, "LedgerEntry", 13, jl_Object, [], 17, 0, 0, ["$_init_1", $rt_wrapFunction1(igiae_LedgerEntry__init_0), "$getPluginId", $rt_wrapFunction0(igiae_LedgerEntry_getPluginId), "$getStatus", $rt_wrapFunction0(igiae_LedgerEntry_getStatus), "$getCapabilitiesDeclared", $rt_wrapFunction0(igiae_LedgerEntry_getCapabilitiesDeclared), "$getCapabilitiesProvided", $rt_wrapFunction0(igiae_LedgerEntry_getCapabilitiesProvided), "$getServicesProvided", $rt_wrapFunction0(igiae_LedgerEntry_getServicesProvided), "$getServicesConsumed",
$rt_wrapFunction0(igiae_LedgerEntry_getServicesConsumed), "$getTopics", $rt_wrapFunction0(igiae_LedgerEntry_getTopics), "$getPermissions", $rt_wrapFunction0(igiae_LedgerEntry_getPermissions), "$getErrorDetail", $rt_wrapFunction0(igiae_LedgerEntry_getErrorDetail), "$getErrorFix", $rt_wrapFunction0(igiae_LedgerEntry_getErrorFix), "$setStatus", $rt_wrapFunction1(igiae_LedgerEntry_setStatus), "$setError", $rt_wrapFunction2(igiae_LedgerEntry_setError), "$reset0", $rt_wrapFunction0(igiae_LedgerEntry_reset), "$addCapabilityDeclared",
$rt_wrapFunction1(igiae_LedgerEntry_addCapabilityDeclared), "$addCapabilityProvided", $rt_wrapFunction1(igiae_LedgerEntry_addCapabilityProvided), "$addServiceProvided", $rt_wrapFunction1(igiae_LedgerEntry_addServiceProvided), "$addServiceConsumed", $rt_wrapFunction1(igiae_LedgerEntry_addServiceConsumed), "$addTopic", $rt_wrapFunction1(igiae_LedgerEntry_addTopic), "$addPermission", $rt_wrapFunction1(igiae_LedgerEntry_addPermission), "$copy", $rt_wrapFunction0(igiae_LedgerEntry_copy)],
jur_ReluctantAltQuantifierSet, "ReluctantAltQuantifierSet", 2, jur_AltQuantifierSet, [], 0, 0, 0, ["$_init_32", $rt_wrapFunction3(jur_ReluctantAltQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_ReluctantAltQuantifierSet_matches)],
jl_NegativeArraySizeException, "NegativeArraySizeException", 3, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NegativeArraySizeException__init_)],
jur_AbstractCharClass$LazyJavaWhitespace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaWhitespace__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaWhitespace_computeValue)],
jl_UnsupportedOperationException, "UnsupportedOperationException", 3, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_UnsupportedOperationException__init_0)],
jl_NumberFormatException, "NumberFormatException", 3, jl_IllegalArgumentException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NumberFormatException__init_1), "$_init_1", $rt_wrapFunction1(jl_NumberFormatException__init_)],
jur_IntArrHash, 0, jl_Object, [], 0, 0, 0, 0,
jur_AbstractCharClass$LazyJavaMirrored, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaMirrored__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaMirrored_computeValue)],
jur_AbstractCharClass$LazyJavaISOControl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaISOControl__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaISOControl_computeValue)],
jl_IllegalStateException, "IllegalStateException", 3, jl_RuntimeException, [], 1, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalStateException__init_0)],
jur_HighSurrogateCharSet, "HighSurrogateCharSet", 2, jur_JointSet, [], 0, 0, 0, ["$_init_56", $rt_wrapFunction1(jur_HighSurrogateCharSet__init_), "$setNext", $rt_wrapFunction1(jur_HighSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HighSurrogateCharSet_matches), "$find", $rt_wrapFunction3(jur_HighSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_HighSurrogateCharSet_findBack), "$getName", $rt_wrapFunction0(jur_HighSurrogateCharSet_getName), "$first", $rt_wrapFunction1(jur_HighSurrogateCharSet_first),
"$hasConsumed", $rt_wrapFunction1(jur_HighSurrogateCharSet_hasConsumed)],
jur_ReluctantCompositeQuantifierSet, "ReluctantCompositeQuantifierSet", 2, jur_CompositeQuantifierSet, [], 0, 0, 0, ["$_init_59", $rt_wrapFunction4(jur_ReluctantCompositeQuantifierSet__init_), "$matches", $rt_wrapFunction3(jur_ReluctantCompositeQuantifierSet_matches)],
jur_SOLSet, "SOLSet", 2, jur_AbstractSet, [], 16, 0, 0, ["$_init_", $rt_wrapFunction0(jur_SOLSet__init_), "$matches", $rt_wrapFunction3(jur_SOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_SOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_SOLSet_getName)],
igiaj_JsPluginContext$7$1, 0, jl_Object, [igiae_EventBus$Listener], 0, 0, 0, ["$_init_3", $rt_wrapFunction2(igiaj_JsPluginContext$7$1__init_), "$received", $rt_wrapFunction1(igiaj_JsPluginContext$7$1_received)],
igiae_Pending, 0, jl_Object, [], 17, 0, 0, ["$_init_", $rt_wrapFunction0(igiae_Pending__init_0), "$then", $rt_wrapFunction1(igiae_Pending_then), "$resolve", $rt_wrapFunction1(igiae_Pending_resolve), "$reject", $rt_wrapFunction1(igiae_Pending_reject)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue)],
jur_UMultiLineEOLSet, "UMultiLineEOLSet", 2, jur_AbstractSet, [], 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_UMultiLineEOLSet__init_), "$matches", $rt_wrapFunction3(jur_UMultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UMultiLineEOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_UMultiLineEOLSet_getName)],
ju_LinkedHashMapIterator$KeyIterator, 0, ju_LinkedHashMapIterator, [ju_Iterator], 0, 0, 0, ["$_init_21", $rt_wrapFunction2(ju_LinkedHashMapIterator$KeyIterator__init_), "$next", $rt_wrapFunction0(ju_LinkedHashMapIterator$KeyIterator_next)],
otcit_DoubleAnalyzer, 0, jl_Object, [], 17, 0, () => otcit_DoubleAnalyzer_$callClinit(), 0,
jur_EOLSet, "EOLSet", 2, jur_AbstractSet, [], 16, 0, 0, ["$_init_0", $rt_wrapFunction1(jur_EOLSet__init_), "$matches", $rt_wrapFunction3(jur_EOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOLSet_hasConsumed), "$getName", $rt_wrapFunction0(jur_EOLSet_getName)],
otr_StringInfo, 0, otrr_ReflectionInfo, [], 17, 0, 0, 0,
igiaj_EngineJs$1, 0, jl_Object, [igiae_Diagnostics$Sink], 0, 0, 0, ["$_init_74", $rt_wrapFunction1(igiaj_EngineJs$1__init_), "$accept", $rt_wrapFunction1(igiaj_EngineJs$1_accept)],
jur_Lexer, 0, jl_Object, [], 0, 0, 0, ["$_init_51", $rt_wrapFunction2(jur_Lexer__init_), "$peek", $rt_wrapFunction0(jur_Lexer_peek), "$setMode", $rt_wrapFunction1(jur_Lexer_setMode), "$restoreFlags", $rt_wrapFunction1(jur_Lexer_restoreFlags), "$peekSpecial", $rt_wrapFunction0(jur_Lexer_peekSpecial), "$isSpecial", $rt_wrapFunction0(jur_Lexer_isSpecial), "$isNextSpecial", $rt_wrapFunction0(jur_Lexer_isNextSpecial), "$next1", $rt_wrapFunction0(jur_Lexer_next), "$nextSpecial", $rt_wrapFunction0(jur_Lexer_nextSpecial),
"$lookAhead", $rt_wrapFunction0(jur_Lexer_lookAhead), "$back", $rt_wrapFunction0(jur_Lexer_back), "$toString", $rt_wrapFunction0(jur_Lexer_toString), "$isEmpty", $rt_wrapFunction0(jur_Lexer_isEmpty), "$isLetter0", $rt_wrapFunction0(jur_Lexer_isLetter0), "$isHighSurrogate0", $rt_wrapFunction0(jur_Lexer_isHighSurrogate0), "$isLowSurrogate0", $rt_wrapFunction0(jur_Lexer_isLowSurrogate0), "$getIndex", $rt_wrapFunction0(jur_Lexer_getIndex)],
jur_AbstractCharClass$LazySpecialsBlock, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazySpecialsBlock__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpecialsBlock_computeValue)]]);
$rt_metadata([jur_AbstractCharClass$LazyNonSpace, 0, jur_AbstractCharClass$LazySpace, [], 0, 0, 0, ["$_init_", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonSpace__init_), "$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonSpace_computeValue)],
igiae_ManifestSchema, 0, jl_Object, [], 17, 0, 0, 0,
igiae_ManifestFacts, 0, jl_Object, [], 17, 0, 0, ["$_init_11", function(var_1, var_2, var_3, var_4, var_5) { igiae_ManifestFacts__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$getId", $rt_wrapFunction0(igiae_ManifestFacts_getId), "$getApi", $rt_wrapFunction0(igiae_ManifestFacts_getApi), "$getCapabilities", $rt_wrapFunction0(igiae_ManifestFacts_getCapabilities), "$getPermissions", $rt_wrapFunction0(igiae_ManifestFacts_getPermissions), "$getPayload", $rt_wrapFunction0(igiae_ManifestFacts_getPayload)],
otji_JSWrapper$Helper$_clinit_$lambda$_3_1, 0, jl_Object, [otji_JSWrapper$Helper$FinalizationRegistryConsumer], 1, 0, 0, ["$_init_", $rt_wrapFunction0(otji_JSWrapper$Helper$_clinit_$lambda$_3_1__init_), "$accept0", $rt_wrapFunction1(otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept)],
otji_JSWrapper$Helper$_clinit_$lambda$_3_0, 0, jl_Object, [otji_JSWrapper$Helper$FinalizationRegistryConsumer], 1, 0, 0, ["$_init_", $rt_wrapFunction0(otji_JSWrapper$Helper$_clinit_$lambda$_3_0__init_), "$accept0", $rt_wrapFunction1(otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept)],
ju_Arrays$ArrayAsList, "Arrays$ArrayAsList", 1, ju_AbstractList, [ju_RandomAccess, ji_Serializable], 0, 0, 0, ["$_init_44", $rt_wrapFunction1(ju_Arrays$ArrayAsList__init_), "$get", $rt_wrapFunction1(ju_Arrays$ArrayAsList_get), "$size", $rt_wrapFunction0(ju_Arrays$ArrayAsList_size)],
ju_Collections, 0, jl_Object, [], 17, 0, () => ju_Collections_$callClinit(), 0]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_shortArrayCls = $rt_arraycls($rt_shortcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls),
$rt_longArrayCls = $rt_arraycls($rt_longcls);
$rt_stringPool(["String is null", "String is empty", "String contains invalid digits: ", "String contains digits out of radix ", ": ", "The value is too big for int type: ", "The value is too big for integer type", "Illegal radix: ", "JointSet", "CI sequence: ", "", "app", "api", "surfaces", "vocabulary", "wellKnownServices", "id", "capabilities", "permissions", "detail", "fix", "active", "broken", "activating", "stopped", "unregister", "register", "CI back reference: ", "UCI back reference: ", "<DotAllQuant>",
"fSet", "BehindFSet", "1", "INTISY_PLUGIN_STRICT", "ignored unknown ", " \"", "\" from ", "[plugin-api] ", " ", "^ ", "range:", "<GroupQuant>", "(this Map)", ", ", "null", "Lower", "Upper", "ASCII", "Alpha", "Digit", "Alnum", "Punct", "Graph", "Print", "Blank", "Cntrl", "XDigit", "javaLowerCase", "javaUpperCase", "javaWhitespace", "javaMirrored", "javaDefined", "javaDigit", "javaIdentifierIgnorable", "javaISOControl", "javaJavaIdentifierPart", "javaJavaIdentifierStart", "javaLetter", "javaLetterOrDigit", "javaSpaceChar",
"javaTitleCase", "javaUnicodeIdentifierPart", "javaUnicodeIdentifierStart", "Space", "w", "W", "s", "S", "d", "D", "BasicLatin", "Latin-1Supplement", "LatinExtended-A", "LatinExtended-B", "IPAExtensions", "SpacingModifierLetters", "CombiningDiacriticalMarks", "Greek", "Cyrillic", "CyrillicSupplement", "Armenian", "Hebrew", "Arabic", "Syriac", "ArabicSupplement", "Thaana", "Devanagari", "Bengali", "Gurmukhi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala", "Thai", "Lao", "Tibetan",
"Myanmar", "Georgian", "HangulJamo", "Ethiopic", "EthiopicSupplement", "Cherokee", "UnifiedCanadianAboriginalSyllabics", "Ogham", "Runic", "Tagalog", "Hanunoo", "Buhid", "Tagbanwa", "Khmer", "Mongolian", "Limbu", "TaiLe", "NewTaiLue", "KhmerSymbols", "Buginese", "PhoneticExtensions", "PhoneticExtensionsSupplement", "CombiningDiacriticalMarksSupplement", "LatinExtendedAdditional", "GreekExtended", "GeneralPunctuation", "SuperscriptsandSubscripts", "CurrencySymbols", "CombiningMarksforSymbols", "LetterlikeSymbols",
"NumberForms", "Arrows", "MathematicalOperators", "MiscellaneousTechnical", "ControlPictures", "OpticalCharacterRecognition", "EnclosedAlphanumerics", "BoxDrawing", "BlockElements", "GeometricShapes", "MiscellaneousSymbols", "Dingbats", "MiscellaneousMathematicalSymbols-A", "SupplementalArrows-A", "BraillePatterns", "SupplementalArrows-B", "MiscellaneousMathematicalSymbols-B", "SupplementalMathematicalOperators", "MiscellaneousSymbolsandArrows", "Glagolitic", "Coptic", "GeorgianSupplement", "Tifinagh", "EthiopicExtended",
"SupplementalPunctuation", "CJKRadicalsSupplement", "KangxiRadicals", "IdeographicDescriptionCharacters", "CJKSymbolsandPunctuation", "Hiragana", "Katakana", "Bopomofo", "HangulCompatibilityJamo", "Kanbun", "BopomofoExtended", "CJKStrokes", "KatakanaPhoneticExtensions", "EnclosedCJKLettersandMonths", "CJKCompatibility", "CJKUnifiedIdeographsExtensionA", "YijingHexagramSymbols", "CJKUnifiedIdeographs", "YiSyllables", "YiRadicals", "ModifierToneLetters", "SylotiNagri", "HangulSyllables", "HighSurrogates", "HighPrivateUseSurrogates",
"LowSurrogates", "PrivateUseArea", "CJKCompatibilityIdeographs", "AlphabeticPresentationForms", "ArabicPresentationForms-A", "VariationSelectors", "VerticalForms", "CombiningHalfMarks", "CJKCompatibilityForms", "SmallFormVariants", "ArabicPresentationForms-B", "HalfwidthandFullwidthForms", "all", "Specials", "Cn", "IsL", "Lu", "Ll", "Lt", "Lm", "Lo", "IsM", "Mn", "Me", "Mc", "N", "Nd", "Nl", "No", "IsZ", "Zs", "Zl", "Zp", "IsC", "Cc", "Cf", "Co", "Cs", "IsP", "Pd", "Ps", "Pe", "Pc", "Po", "IsS", "Sm", "Sc",
"Sk", "So", "Pi", "Pf", "(this Collection)", "decomposed char:", "AheadFSet", "NonCapJointSet", "PosLookaheadJointSet", "NegLookaheadJointSet", "[", "] ", "\n  fix: ", "0", "<Quant>", "PosBehindJointSet", "sequence: ", "UCI range:", "\n", "false", "true", "NegBehindJointSet", "back reference: ", "<DotQuant>", "[L", "string", "number", "boolean", ".", "CI ", "waited ", "ms for service \"", "\" and nothing registered it", "install a plugin that provides \"", "\", or use get() and carry on without it", "<EOL>",
"UCI ", "AtomicFSet", "[]", "$schema", "$id", "title", "description", "type", "properties", "required", "items", "additionalProperties", "pattern", "minimum", "enum", "posFSet", "<MultiLine $>", "Patter is null", "\\Q", "\\E", "\\\\E\\Q", "ACTIVATING", "ACTIVE", "BROKEN", "STOPPED", "services", "provides", "consumes", "UCI sequence: ", "CompositeRangeSet:  <nonsurrogate> ", " <surrogate> ", "FinalSet", "<Empty set>", "the manifest", "(root)", "services.provides", "services.consumes", "(unknown plugin)", "plugin.json ",
"entry", "capabilities are declared but no entry names the module that provides them", "add \"entry\": \"dist/index.js\"", "\"", "\" is not a path inside the repo", "use a repo-relative path with no leading slash and no ..", "/", "\\", "[\\\\/]", "..", ":", "services.provides[", "]", "\" is neither namespaced by this plugin nor a well-known service id", "rename it to \"", "\", or use one of: ", "\" is listed twice", "remove the duplicate entry", "EOI", "object", "function", "undefined", "^", "service \"", "\" is already registered by ",
"disable one of the two plugins, or have each register its own namespaced id so consumers can ask for the one they want", "cannot register service \"", "\", which belongs to another plugin", "namespace it as \"", "\", or register one of the well-known ids: ", "a watcher of \"", "\" threw while handling ", "stopped while waiting for service \"", "provide \"", "\" before this plugin is stopped, or use get() and carry on without it", "PreviousMatch", "NonCapFSet", "Either src or dest is null", "timeoutMs", "needs api ",
", this host has api ", "update the app to a version that implements api ", " or later", "capabilities declared but never provided: ", "call ctx.provide(\"", "\", ...) in activate, or remove it from \"capabilities\" in plugin.json", "capabilities provided but never declared: ", "add \"", "\" to \"capabilities\" in plugin.json", "a late provision of capability", "capability", "provided capability \"", "\" twice", "call ctx.provide once per capability in activate", "ignored ", ", which is no longer running", "a late subscription to topic",
"a late want of service", "a late watch of service", "a late registration of service", "DotAll", "decomposed Hangul syllable:", " (fix: ", ")", "WordBoundary", "array", "integer", "required field \"", "\" is missing", "\" to ", "field", "\" does not match ", "make ", " match ", "\" is not one of ", "set ", " to one of ", "expected a value >= ", ", got ", " to a value >= ", "expected ", " to a ", "<SOL>", "<Unix MultiLine $>", "Name capturing group should start with letter", "Is", "In", "Pointer at the published manifest schema, for an editor\'s completion and validation.",
"The plugin\'s permanent identity, matching its repository name.", "^[a-z0-9]+(-[a-z0-9]+)*$", "use lowercase words joined by single hyphens, for example \"config-ledger\"", "The lowest API major version this plugin needs. A floor, not a build tag.", "set \"api\" to the lowest API major version this plugin needs, for example 1", "The built module a host imports. Required once capabilities are declared.", "point \"entry\" at the built module a host imports, for example \"dist/index.js\"", "displayName", "The name a surface shows instead of the id.",
"icon", "Path to a square-viewBox SVG mark, relative to the repo root.", "Further marks this repo ships, each keyed by the id of the thing it belongs to.", "icons", "Host-facing abilities this plugin provides at activation.", "list capability ids as strings, for example [\"provider\", \"screens\"]", "commands", "config", "data", "Declared permissions, surfaced at install and in dashboards.", "lifecycle", "publish", "repo", "marketplace", "The single machine-readable description of a repo in the intisy-ai ecosystem.",
"http://json-schema.org/draft-07/schema#", "https://intisy.github.io/bayonet/schema/plugin.schema.json", "intisy-ai plugin manifest", "Service ids this plugin registers, each namespaced by its own id or a well-known bare id.", "Service ids this plugin asks for.", "The inter-plugin contract: what this plugin offers other plugins, and what it asks of them.", "name", "The command\'s name, which is also the file it is written to.", "What a command picker shows beside the name.", "argumentHint", "The argument shape a picker hints at, such as \"list | get <key>\".",
"body", "Markdown the model is shown, after any shell output.", "shell", "A shell line run before the body, which may use $ARGUMENTS and {{BUNDLE}}.", "One slash command this plugin contributes.", "Slash commands this plugin contributes, which a host deploys without importing it.", "Paths this plugin writes to, relative to the home it runs in.", "paths", "Where this plugin keeps state that is not named after it.", "The file these settings live in, config/<name>.json, when that is not the plugin\'s id.", "defaults",
"Every setting this plugin has, and what it is worth until a home changes it.", "This plugin\'s settings as it ships them.", "install", "The entry exports install(ctx), run once after first deploy.", "repair", "The entry exports repair(ctx), run on demand from a host.", "Which optional lifecycle hooks the entry module exports.", "scopedOnly", "Publish only as @intisy-ai/<name>, because the unscoped name is unavailable.", "The Gradle modules whose jars ship as release assets, each named by its own classifier.",
"jarModule", "generatedReadme", "The README is rendered at build time, so the release promotes it rather than testing it.", "jarPretest", "Run the Gradle build before the tests, because a test needs its jar installed first.", "How the repo is published, to npm and as Java release assets.", "role", "The role phrase, capitalized, without the fixed \"for the intisy-ai AI-proxy ecosystem.\" suffix.", "category", "The single category topic, for example core-library or ai-provider.", "Domain topics, for example claude or gemini.",
"domains", "The tech topics, for example typescript, java or svelte.", "tech", "Topics this repo needs that no other rule derives, for example github-actions.", "topics", "Repository metadata: the GitHub description and topic set are derived from it.", "Repository topics an entry must carry.", "kind", "The catalog kind an entry must be, as the reading host names its kinds.", "Which entries this category holds.", "The category\'s id, unique across every plugin declaring one.", "label", "The name a surface shows. Absent means the id is shown.",
"match", "One category a plugin adds to a host\'s catalog of installable things.", "Categories this plugin adds.", "categories", "What this plugin contributes to a host\'s catalog of installable things.", "The app\'s permanent id, for example claude or opencode.", "Path to a square-viewBox SVG mark for the app, relative to the repo root.", "home", "detect", "loader", "commandsSubdir", "The subdirectory inside the app home holding its slash commands.", "proxyPort", "The port this app\'s proxy listens on, or 0 when it needs none.",
"How this app reaches the local API.", "env-baseurl", "native", "set \"integration\" to \"env-baseurl\" when the app is pointed at the proxy by an environment variable, or \"native\" when it loads the plugin itself", "integration", "wireFormat", "The wire format this app speaks, for example anthropic.", "usage", "accent", "Accent colour for this app\'s surfaces, as a #rrggbb hex string.", "wrapperCommand", "The command a user types to launch this app through its loader\'s wrapper.", "npmPlugins", "startupHook",
"discovery", "projects", "modelCatalog", "The app this repo is the loader for, declared by the app\'s own project.", "envOverride", "Environment variable that overrides every candidate, set by a host driving this app.", "nativeEnv", "The app\'s OWN environment variable for its config directory, which it reads itself.", "xdgSubdir", "Subdirectory under the XDG config directory, when the app follows that layout.", "Paths to try in order, each with a leading ~ for the user home.", "candidates", "Where this app keeps its home directory, in the order a resolver tries.",
"binary", "The executable a user launches, looked up on the path.", "pkg", "The npm package the app ships as, for a global-install check.", "How to tell whether this app is installed.", "The loader plugin\'s id.", "url", "Where the loader is cloned from, as owner/repo or a full URL.", "The plugin this app is reached through. Absent means the app has no loader.", "repos", "Where plugin checkouts live.", "plugin", "Where deployed plugin bundles and their manifest sidecars live.", "cache", "Where cached downloads live.",
"Where configuration files live.", "The names of the storage subdirectories inside this app\'s home.", "Format ids, each of which a consumer maps to a parser of its own.", "formats", "Session-storage formats this app writes, for usage readers.", "Config files to look in, in order, for the plugin list.", "configFiles", "pluginsKey", "The key inside those files holding the plugin list.", "packageCache", "Where the app caches the packages it installed.", "schemaUrl", "The app\'s config schema, for an editor\'s completion.",
"This app\'s own npm-plugin mechanism. Absent means it has none.", "file", "The file to write, relative to the app home.", "The key path to the array the entry joins.", "path", "A JSON template whose strings have the {plugin} placeholder replaced with the plugin\'s name.", "How this app runs a plugin at startup when it has no npm-plugin list of its own.", "topic", "The repository topic a community plugin carries.", "searchQuery", "A free-text search to run where the topic alone under-reports.", "awesomeList",
"A curated list to read, as a raw URL.", "Where a marketplace looks for this app\'s community plugins.", "historyFile", "A history file inside the app home.", "Session databases to try in order, absolute or relative to the app home.", "sessionDb", "markerFile", "The file the app writes inside a project\'s git directory to record the project id.", "Where this app records the projects a user has worked in.", "Files to try in order, relative to the app home.", "files", "Environment variable naming the config file outright.",
"providerKey", "The key inside that file holding the catalog, named after the app\'s own config key.", "The app config file a model catalog is merged into."]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
    c = igiaj_JsPluginContext$9.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$9_call$exported$0);
    c = igiaj_JsPluginContext$7.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$7_call$exported$0);
    c = igiaj_JsPluginContext$8.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$8_call$exported$0);
    c = igiaj_JsPluginContext$5.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$5_call$exported$0);
    c = igiaj_JsPluginContext$6.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$6_call$exported$0);
    c = igiaj_JsPluginContext$3.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$3_call$exported$0);
    c = igiaj_JsPluginContext$4.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$4_call$exported$0);
    c = igiaj_JsPluginContext$1.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$1_call$exported$0);
    c = igiaj_JsPluginContext$2.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$2_call$exported$0);
    c = igiaj_JsPluginHost$10.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$10_call$exported$0);
    c = igiaj_JsPluginHost$11.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$11_call$exported$0);
    c = igiaj_JsPluginHost$12.prototype;
    c.onExecute = $rt_callWithReceiver(igiaj_JsPluginHost$12_onExecute$exported$0);
    c = igiaj_JsPluginContext$10.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$10_call$exported$0);
    c = igiaj_JsPluginContext$11.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$11_call$exported$0);
    c = igiaj_JsPluginContext$12.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginContext$12_call$exported$0);
    c = igiaj_JsPluginContext$13.prototype;
    c.dispose = $rt_callWithReceiver(igiaj_JsPluginContext$13_dispose$exported$0);
    c = igiaj_JsPluginHost$13$1.prototype;
    c.received = $rt_callWithReceiver(igiaj_JsPluginHost$13$1_received$exported$0);
    c = igiaj_JsScheduler$1.prototype;
    c.run = $rt_callWithReceiver(igiaj_JsScheduler$1_run$exported$0);
    c = igiaj_JsPluginHost$1.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$1_call$exported$0);
    c = igiaj_JsPluginHost$3.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$3_call$exported$0);
    c = igiaj_JsPluginHost$2.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$2_call$exported$0);
    c = igiaj_JsPluginHost$5.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$5_call$exported$0);
    c = igiaj_JsPluginHost$4.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$4_call$exported$0);
    c = igiaj_JsPluginHost$7.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$7_call$exported$0);
    c = igiaj_JsPluginHost$6.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$6_call$exported$0);
    c = igiaj_JsPluginHost$9.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$9_call$exported$0);
    c = igiaj_JsPluginHost$8.prototype;
    c.call = $rt_callWithReceiver(igiaj_JsPluginHost$8_call$exported$0);
    c = otji_JSWrapper$Helper$_clinit_$lambda$_3_1.prototype;
    c.accept = $rt_callWithReceiver(otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept$exported$0);
    c = otji_JSWrapper$Helper$_clinit_$lambda$_3_0.prototype;
    c.accept = $rt_callWithReceiver(otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept$exported$0);
})();
export { igiaj_EngineJs_activationOrder$exported$0 as activationOrder, igiaj_EngineJs_assertManifest$exported$1 as assertManifest, igiaj_EngineJs_validateManifest$exported$2 as validateManifest, igiaj_EngineJs_manifestSchema$exported$3 as manifestSchema, igiaj_EngineJs_pluginError$exported$4 as pluginError, igiaj_EngineJs_isPluginError$exported$5 as isPluginError, igiaj_EngineJs_setStrict$exported$6 as setStrict, igiaj_EngineJs_createPluginHost$exported$7 as createPluginHost, igiaj_EngineJs_setDiagnosticSink$exported$8 as setDiagnosticSink
};
