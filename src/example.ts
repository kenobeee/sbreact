// Union type

const strOrNum: string | number = '2';

// Type alias

type StringOrNumber = string | number;
const strOrNum2: StringOrNumber = '2';

const strOrNum3: StringOrNumber = '2';
const strOrNum4: StringOrNumber = '2';
const strOrNum5: StringOrNumber = '2';
const strOrNum6: StringOrNumber = '2';
const strOrNum7: StringOrNumber = '2';

type AllJsSimpleTypes = string | number | [] | object | undefined | null | boolean | void | symbol;
type StrangeTsTypes = any | unknown | never;

// Array

const exampleArray: number[] = [1, 2, 3, 4];
const exampleArrayGeneric: Array<number> = [1, 2, 3, 4];

const unionArray: (string | number)[] = [1, '2', 3, '4'];
const genericArray: Array<number | string> = [1, 2, '3', '4'];

// Tuple - Массив фиксированной длины

const myTuple: [number, string] = [556, 'eco'];
const [val1, val2] = myTuple;

// Object

type ObjectTypes = { a: number, b: string };
const unionObject: { a: number, b: string} = { a: 2, b: 'so' }
const aliasObject: ObjectTypes = { a: 2, b: 'so' };

// Запись типа объекта через интерфейс

interface MyFirstInterface {
    a: number;
    b: string;
    c: number[];
}

const objWithInterface: MyFirstInterface = {
    a: 2,
    b: 'sososo',
    c: [1, 2, 3],
}

// readonly

interface interfaceReadonly {
    readonly a: number;
}

const newObjReadonly: interfaceReadonly = {
    a: 546,
}

objWithInterface.a = 456;
newObjReadonly.a = 456; // Ошибка из-за readonly

// Необязательное использование поля интерфейса Optional Type

interface undefinedFieldInterface {
    a: number;
    b: string;
    c?: number[]; // Знак вопроса дает необязательное использование данного поля
}

const undefinedFieldObject: undefinedFieldInterface = {
    a: 5,
    b: 'strinffff',
}

const definedFieldObject: MyFirstInterface = { // Отсутствие знака вопроса в поле интерфейса
    a: 456,
    b: 'so so',
    c: [1, 2, 3],
}