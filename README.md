# node-how-outdated

Display age of outdated dependencies in a project. Note that up-to-date dependencies are not listed.

```
npx how-outdated
```

Sample output (using bash):

```
$ npx how-outdated | sort -n
npx: installed 1 in 2.171s
137 mocha 7.0.1 2020-01-26T07:33:24.117Z
141 sinon 8.1.1 2020-01-22T10:30:40.822Z
173 nyc 15.0.0 2019-12-20T21:39:41.413Z
197 coveralls 3.0.9 2019-11-26T17:39:39.086Z
```

Use in scripts:

```
$ npx how-outdated --json
```
