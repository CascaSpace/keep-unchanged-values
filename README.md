# keep-unchanged-values

The `keep-unchanged-values` function is a utility that facilitates merging two values, providing preference to the new value when conflicts arise. It also aims to preserve unchanged values and maintain object references wherever possible.

## Installation

You can install the `keep-unchanged-values` package using npm:

```bash
npm install keep-unchanged-values
```

After installation, you can import the `keepUnchangedValues` function and utilize it to merge values while preserving unchanged values:

```javascript
import { keepUnchangedValues } from 'keep-unchanged-values';

const oldValue = {...};
const newValue = {...};

const result = keepUnchangedValues(oldValue, newValue);
```

## Parameters

- `oldValue`: The original value or object.
- `newValue`: The new value or object to be merged.

## Return Value

The function returns a merged value that retains unchanged values linked to the original object where possible.

## Examples

```javascript
const oldValue = { a: 1, b: 2 };
const newValue = { a: 1, b: 2 };

const result = keepUnchangedValues(oldValue, newValue);
// result is equal to { a: 1, b: 2 }
// result will be a reference to oldValue since they are equal
```

```javascript
const oldArray = [1, { a: 1 }, 3];
const newArray = [2, 3, 4, { a: 1 }];

const result = keepUnchangedValues(oldArray, newArray);
// result is equal to [2, 3, 4, { a: 1 }]
// result[3] will be a reference to oldArray[1] since they are equal
```

## Goals

Made for [Casca Extension](https://casca.space/) to optimize the perfomance of updating the data in the store and reduce the number of re-renders.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
