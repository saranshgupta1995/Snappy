
var snaps = {};
var typeSnap = {};

let allPropertiesOf = (val) => Object.getOwnPropertyNames(val);

let isNM = (val) => !['object', 'function'].includes(typeof (val)) || !val;

let isObjectNM = (val) => {
    let props = allPropertiesOf(val)
    let res = true;
    props.forEach(prop => {
        if (val[prop] && !isNM(val[prop])) {
            if (typeof (val[prop]) === 'function' || !isObjectNM(val[prop])) {
                res = false
            }
        }
    }
    )
    return res
}

let countProps = (hash, newScope) => {
    hash = hash.replace('.', '-');
    snaps[`${hash}props`] = allPropertiesOf(newScope)
}

let takeSnap = function (hashKey, newScope, skipSnapping = []) {

    var keyValues = {};
    var keyValueTypes = {};
    for (var prop in newScope) {
        if (!skipSnapping.includes(prop))
            if (isNM(newScope[prop])) {
                keyValues[prop] = newScope[prop]
            } else if (typeof (newScope[prop]) !== 'function') {
                keyValueTypes[`${prop}`] = Object.prototype.toString.call(newScope[prop]) === '[object Array]' ? [] : {};
                takeSnap(`${hashKey}.${prop}`, newScope[prop], [])
            } else {
            }
    }
    countProps(hashKey + '.', newScope);
    if (allPropertiesOf(keyValueTypes).length) {
        typeSnap[hashKey + '.'] = keyValueTypes;
    }
    if (allPropertiesOf(keyValues).length) {
        snaps[hashKey + '.'] = keyValues;
    }

}

let getAllTypes = () => {
    return typeSnap
}


globalScope.restoreSnapTypes = function (hashKey, newScope = globalScope) {
    let allHashes = allPropertiesOf(typeSnap).filter(x => x.startsWith(`${hashKey}.`)).sort((a, b) => {
        return (a.match(/\./g) || []).length - (b.match(/\./g) || []).length;
    });
    allHashes.forEach(hash => {
        let currentTypeSnapSet = typeSnap[hash];
        let cleanHash = hash.slice(0, hash.length - 1);
        let projectedScope = newScope;
        let allSnaps = allPropertiesOf(currentTypeSnapSet)
        let cleanHashArray = cleanHash.split('.');
        cleanHashArray = cleanHashArray.slice(1, cleanHashArray.length)
        cleanHashArray.forEach((propLevel, i) => {
            projectedScope = projectedScope[propLevel];
        })
        allSnaps.forEach(snap => {
            if (projectedScope[snap] === null || projectedScope[snap] === undefined || !(Object.prototype.toString.call(projectedScope[snap]) === Object.prototype.toString.call(currentTypeSnapSet[snap])))
                projectedScope[snap] = currentTypeSnapSet[snap];
        })
    })
}


let restoreSnap = function (hashKey, newScope) {

    restoreSnapTypes(hashKey, newScope);

    let allHashes = allPropertiesOf(snaps).filter(x => x.startsWith(`${hashKey}.`)).sort((a, b) => {
        return (a.match(/\./g) || []).length - (b.match(/\./g) || []).length;
    });
    allHashes.forEach(hash => {
        let currentSnapSet = snaps[hash];
        let cleanHash = hash.slice(0, hash.length - 1);
        let projectedScope = newScope;
        let allSnaps = allPropertiesOf(currentSnapSet)
        let cleanHashArray = cleanHash.split('.');
        cleanHashArray = cleanHashArray.slice(1, cleanHashArray.length)
        cleanHashArray.forEach((propLevel, i) => {
            projectedScope = projectedScope[propLevel];
        })
        allSnaps.forEach(snap => {
            projectedScope[snap] = currentSnapSet[snap];
        })
        let allProps = allPropertiesOf(projectedScope);
        allProps.forEach(prop => {
            let propHash = '';
            if (hash.includes('.'))
                propHash = hash.replace('.', '-');
            else
                propHash = hash + '-';
            if (!snaps[`${propHash}props`].includes(prop)) {
                delete projectedScope[prop]
            }
        })
    });
}

module.exports = {
    takeSnap: takeSnap,
    restoreSnap: restoreSnap
}