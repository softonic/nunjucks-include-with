# nunjucks-include-with

Nunjucks extension that allows send data to include template.

## Installation

```bash
npm install nunjucks-include-with
```

## Usage

```javascript
// CommonJS
// const IncludeWithNunjucksExtension = require('nunjucks-include-with');

// ES6
import IncludeWithNunjucksExtension from 'nunjucks-include-with';
import nunjucks from 'nunjucks';

// Registration
const nunjucksEnv = nunjucks.configure('views');
nunjucksEnv.addExtension('includeWith', new IncludeWithNunjucksExtension({
  nunjucksEnv
 }));

//Template
{% includeWith "../partial.tpl", { name: 'Test' } %}
```

## Extension API

### IncludeWithNunjucksExtension({Object})

Create a Nunjucks include with. Available options:

##### **{Environment}** nunjucksEnv
Instance of Nunjucks environment.
Docs: https://mozilla.github.io/nunjucks/api.html#environment

##### **{String}** [tagName]
Default: `includeWith`

Name for the tag in the template.

## Template API

### {% includeWith {String}, {Object}, {Object} %}

Create a Nunjucks include with. Available options:

##### **{String}** templatePath
Path of the included template.

##### **{Object}** [data]
Default: `{}`

Object with the data for the included template.

##### **{Object}** [options]
Default: `{ useContext = true }`

Option to include the global context.


## Contribute

1. Fork it: `git clone https://github.com/softonic/nunjucks-include-with.git`
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Added some feature'`
4. Check the build: `npm run build`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
