# Changelog

## 0.1.0-alpha.8 (2025-11-13)

Full Changelog: [v0.1.0-alpha.7...v0.1.0-alpha.8](https://github.com/moonbaseai/moonbase-sdk-typescript/compare/v0.1.0-alpha.7...v0.1.0-alpha.8)

### Features

* Add PATCH /v0/meetings/{id} ([84bb127](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/84bb127c3f562a27e887d51179a7ae109169ecb3))
* **api:** manual updates ([305a0a0](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/305a0a05312aafa5038ada24c15f17237726f951))
* **api:** update api ([3a44fff](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/3a44fffbc7c94b47f7a7396bb2d277a4237d0b19))
* **mcp:** add docs search tool ([b5762d4](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/b5762d44d567a6d26b072aacee58beedd2ad03ba))
* **mcp:** add option for including docs tools ([55e11f1](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/55e11f105e3b4d4a5d265da0603dbc0cfc212a42))
* **mcp:** enable experimental docs search tool ([8172a4e](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/8172a4e298830ec3fc7024eb9482fb615b96d21a))
* **mcp:** enable optional code execution tool on http mcp servers ([05b3b0d](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/05b3b0dd619d6a8920356fdd7358f1a8111e86f1))


### Bug Fixes

* **ci:** set permissions for DXT publish action ([bc66b9f](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/bc66b9f3cd82a1a1173e67f7868f0f022e47852d))
* **mcpb:** pin @anthropic-ai/mcpb version ([95ccfba](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/95ccfbae259cf4c355e2babb018b0b4a6fcff18c))
* **mcp:** fix cli argument parsing logic ([1dda522](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/1dda522f3f2d2a82b289a05ac49dd94cf787261d))
* **mcp:** resolve a linting issue in server code ([bbeff57](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/bbeff574084710a4255fe619262b82a91e2b75fe))


### Performance Improvements

* faster formatting ([42160b1](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/42160b1fc0effd383bbd53c09db208806fff03da))


### Chores

* **codegen:** internal codegen update ([51ccf51](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/51ccf5117d3de19d3056322b00d8360fe6317379))
* do not install brew dependencies in ./scripts/bootstrap by default ([28e0df0](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/28e0df0e57e8890a954b4e83164ca4d89653f926))
* **internal:** codegen related update ([d9b0838](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/d9b0838a8d6fe5c734d2a1c0b38523986a273c5d))
* **internal:** codegen related update ([c017cd9](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/c017cd9f1623080bec06761f56db4f76f9fbd5be))
* **internal:** codegen related update ([83d8f31](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/83d8f31a8b81ebe8ed60b32d77811e9acd8de3b6))
* **internal:** fix incremental formatting in some cases ([1369111](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/1369111c6476c9ff64b5baa87aaafaedc13856d2))
* **internal:** gitignore .mcpb files ([bfad376](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/bfad376177351626bd96f6b5e90c7e4456ab51e0))
* **internal:** grammar fix (it's -&gt; its) ([2bf33d1](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/2bf33d190e3714b1019e6952ea8cdcf333e2967d))
* **internal:** ignore .eslintcache ([1b17643](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/1b17643f5459b86dbdd9cb33b2696e086b5ea422))
* **internal:** remove .eslintcache ([c0aba48](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/c0aba480c886910bc4fd5ad7309df2e893187730))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([1113391](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/1113391aa696553c64ea5994032be5d11a18c335))
* **internal:** use npm pack for build uploads ([9519a1f](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/9519a1f26c4febe081662a7e7f2e5ca6e995369e))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([7af7e1c](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/7af7e1cdca363e80a27ca0fff1ee05d7d380f2c9))
* mcp code tool explicit error message when missing a run function ([df73a2d](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/df73a2d578761aea00cf494722b2d54a42f06aa4))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([fa733a9](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/fa733a9e151ed468beb3326f606c2365aad0037d))
* **mcp:** add line numbers to code tool errors ([68f45ae](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/68f45aeb1b1df0e34a56becd828bd7ca83728ddb))
* **mcp:** allow pointing `docs_search` tool at other URLs ([66b2ddb](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/66b2ddb37d32d5b49c9d75d0df04e581d806862a))
* **mcp:** clarify http auth error ([a0b6eff](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/a0b6eff6f5673af6c1710dce260868e429ab3a86))
* **mcp:** rename dxt to mcpb ([4c3f978](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/4c3f9782d49fbb463317beeaa831314edeb790b7))
* update lockfile ([ba63258](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/ba63258af361f7d727e4d778bcfe0679ed5a971d))
* use structured error when code execution tool errors ([91a833c](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/91a833c278f2cedcf5e52c010fe5f88f705c2860))


### Documentation

* **mcp:** add a README button for one-click add to Cursor ([b60e0da](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/b60e0da4ed7c00b845769878759bcd2756096ae8))
* **mcp:** add a README link to add server to VS Code or Claude Code ([2eca541](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/2eca5416e2e13cbab09c9f01a4aa7720f388dccb))

## 0.1.0-alpha.7 (2025-09-12)

Full Changelog: [v0.1.0-alpha.6...v0.1.0-alpha.7](https://github.com/moonbaseai/moonbase-sdk-typescript/compare/v0.1.0-alpha.6...v0.1.0-alpha.7)

### Bug Fixes

* **mcp:** fix uploading dxt release assets ([992a139](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/992a13941cc8ab9bc0a305d51f2351fa9a9df127))


### Documentation

* improve webhook endpoints examples ([2e7cb68](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/2e7cb68384aa5086667f9e91476aec6b5cc57358))


### Refactors

* rename ChoiceFieldOption label to name for consistency ([3838504](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/38385048d6ce684638496c4dce2a4af5371085eb))

## 0.1.0-alpha.6 (2025-09-12)

Full Changelog: [v0.1.0-alpha.5...v0.1.0-alpha.6](https://github.com/moonbaseai/moonbase-sdk-typescript/compare/v0.1.0-alpha.5...v0.1.0-alpha.6)

### Chores

* **api:** manual updates ([e33d03b](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/e33d03b61bda92e5d3a4d3dfeb58fec0f1ed59af))

## 0.1.0-alpha.5 (2025-09-11)

Full Changelog: [v0.1.0-alpha.4...v0.1.0-alpha.5](https://github.com/moonbaseai/moonbase-sdk-typescript/compare/v0.1.0-alpha.4...v0.1.0-alpha.5)

### Features

* Improve examples of API errors ([d81bfb3](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/d81bfb39f768d5f4b2ecbdcf35874751745c64dd))


### Chores

* configure new SDK language ([504b41b](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/504b41b7c3d0610a2ffef9aa2bbcab612d6b5698))

## 0.1.0-alpha.4 (2025-09-09)

Full Changelog: [v0.1.0-alpha.3...v0.1.0-alpha.4](https://github.com/moonbaseai/moonbase-sdk-typescript/compare/v0.1.0-alpha.3...v0.1.0-alpha.4)

### Features

* **api:** add upsert endpoint for Calls ([f9b8955](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/f9b8955e67dd1671cdc10be0b2cb87bce1d4414e))
* **api:** example updates ([90cd01f](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/90cd01f206d667b63edeb89089fd546404acb996))
* **api:** manual updates ([4fea656](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/4fea656dee37f6183c2c5424bd7149fdf0977bbb))
* **api:** manual updates ([b55e2ed](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/b55e2ed9a42839034c8cb0be9f4370b9129497b6))
* **api:** update api ([83a57ef](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/83a57ef43aa36b2644dcf88ce80c7153ff113810))
* **api:** update api ([7d8eee8](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/7d8eee8c4adf3e9ef529bf53e2b6f3a425be06b7))
* **api:** update api ([4046808](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/4046808d9018c3b3aa84c0ef461cd9b85feb1b83))
* **api:** update api ([7e660ed](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/7e660edd3e28a22cb42145d9795a311b7dc9a83f))
* **api:** update api ([ec35812](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/ec3581234bd095a9a54720974467fd799881f419))
* **api:** update examples ([da2f742](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/da2f74249edd4c1a228dbd8dc4c92377ebd36813))
* **mcp:** add code execution tool ([537d00c](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/537d00cb4bbff9c57f44f9d252ce3f159d266fa3))


### Bug Fixes

* coerce nullable values to undefined ([0404c72](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/0404c720848a351b75ff12ec9c25a4129bd471cf))
* **types:** reference pagination type properly ([54244fe](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/54244fe32dc7e18cf7c30fd65918fc7ca2ee1ee1))


### Chores

* add package to package.json ([ae35f34](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/ae35f34bedf3645db8639921e8025312afae8eda))
* ci build action ([8517fed](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/8517fed35853898d0fc242244922b45598d3fbc9))
* **client:** qualify global Blob ([5e33057](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/5e33057a5c57cb3d8ae6f0ad0e05e11d2a410c32))
* **deps:** update dependency @types/node to v20.17.58 ([1f79a7a](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/1f79a7a0b8ab2bd9c6eb67154277467ac461cbd4))
* **internal:** codegen related update ([a3c02dc](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/a3c02dcbe49d6b9bfc165f349680692a1436a880))
* **internal:** formatting change ([e517080](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/e517080dc9a46e200d03a61a614769eb3bc1be16))
* **internal:** move publish config ([6a653e6](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/6a653e64f4bc13c533ab5b3c959aa2be3f529eb9))
* **internal:** remove redundant imports config ([c80f311](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/c80f311cb7df5c3b872c7c941d3c1b01af64dc4a))
* **internal:** update comment in script ([3d5f00a](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/3d5f00ab8767e344b0318fb65b8b718127d119f2))
* **internal:** update global Error reference ([b83de58](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/b83de58a4b8ff9b24e9226802f2205b025c2f6d1))
* update @stainless-api/prism-cli to v5.15.0 ([d95d1ae](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/d95d1ae1ad2488864bda2bc264738d4f2ae05639))
* update CI script ([2551169](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/25511692511fc6389b98a362031c6512f30c3271))

## 0.1.0-alpha.3 (2025-07-20)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/moonbaseai/moonbase-sdk-typescript/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Bug Fixes

* pagination ([2bf3eb6](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/2bf3eb65a0499427856826fd87fc81439bf3cbf1))

## 0.1.0-alpha.2 (2025-07-18)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/moonbaseai/moonbase-sdk-typescript/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* **api:** manual updates ([10e0476](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/10e04765ccda1e6af10d8f7f5cf1c7c3e1d4029c))

## 0.1.0-alpha.1 (2025-07-18)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/moonbaseai/moonbase-sdk-typescript/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **api:** manual updates ([78490d1](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/78490d18b4a0bbb7bb8d36e72c36b1f264f915d9))
* **api:** update api ([2904cf8](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/2904cf815c9708db2be3bc3fdd5010b6bcca8c26))
* **api:** update api ([f43ae10](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/f43ae10fa157c78962888e03b87c3480b3571582))
* **api:** update via SDK Studio ([06d152a](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/06d152a0ba23f0195961318b2ed166781ae60e87))
* **api:** update via SDK Studio ([ba99bb3](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/ba99bb3f965f184d45ae6b4b32739c3d4ece3551))
* **api:** update via SDK Studio ([ad99fb8](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/ad99fb80b89646cc7c71671c5a7a2db6737db685))
* **api:** update via SDK Studio ([1664241](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/16642417e0b6991ce6cb86436eb7aeea452297f3))
* **api:** update via SDK Studio ([e1be25f](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/e1be25f6a0d2cc8b04c1ec667c24e7ceada58a5e))
* **api:** update via SDK Studio ([6124bab](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/6124bab15df2faeabfb6868b47fa9af7eb6b44d4))
* **api:** update via SDK Studio ([e2105a5](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/e2105a5f1108fadd450291a3b6a637692b8e86b7))
* **api:** update via SDK Studio ([ef56ad5](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/ef56ad52ff7f1e244d2669d8b9d99e760055076a))
* **api:** update via SDK Studio ([3fed2f1](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/3fed2f11c7e15a8f6612ae32f5f267f46e446999))
* **api:** update via SDK Studio ([48f348b](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/48f348b0350b2538a68a0574427fb9d012e9101f))
* **api:** update via SDK Studio ([84db676](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/84db676ba55dda97b35ac37d1a932c40f832f80d))
* **api:** update via SDK Studio ([a41dcd7](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/a41dcd76e8202c9b17cac12dd24edab19af39975))
* **api:** update via SDK Studio ([a35a635](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/a35a6359f86c3421fb94f829e79c057d20a3f874))
* **api:** update via SDK Studio ([12fc0a9](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/12fc0a9f6db369d2352b26c21b1eb3f91c12cf50))
* **api:** update via SDK Studio ([e2edae5](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/e2edae590926e0522ae1fd1dba7f67a134eaa2ed))
* **api:** update via SDK Studio ([3a5e63b](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/3a5e63bb2b420c8757669d6a2fdf384a5777e52d))
* **api:** update via SDK Studio ([8c516dc](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/8c516dcf3b6735dbd7feccdd0a67dea26ff05ee2))
* **api:** update via SDK Studio ([385d158](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/385d158ac641afee3e0b6733f086652abca2d8ac))
* **api:** update via SDK Studio ([23cfb8f](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/23cfb8f43ca0e340bc47bf1042a918243db05e28))
* **api:** update via SDK Studio ([cf9d87f](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/cf9d87f7f060cc5edcd4dc7976a909e4f5bbcb34))
* **api:** update via SDK Studio ([dc8e115](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/dc8e1152050b339e4772690a9a2d82c561475efe))
* **api:** update via SDK Studio ([28287cf](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/28287cfe93a8be8562e455edd8fc484a907d9293))
* **api:** update via SDK Studio ([e026c81](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/e026c81653b8e35c8cd531d2b954a9b7cfe5d2ff))
* **api:** update via SDK Studio ([5a43a54](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/5a43a543f4b8dc60e1b3c2e976d7130803326005))
* **api:** update via SDK Studio ([47b7e37](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/47b7e376443626a952c2a440515017f8c0611aa1))
* **api:** update via SDK Studio ([708244e](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/708244e2810b357349a40b034b5d46dc2604b32b))
* **api:** update via SDK Studio ([a048d0e](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/a048d0e2841d5c1c561151f5407f7a39c9abad43))
* **api:** update via SDK Studio ([a97e918](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/a97e918eff765b4830c06a1cf62d5878462dd9fc))
* **api:** update via SDK Studio ([06bbe66](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/06bbe661ab1c370b7eaea492d6cf07eb238261aa))
* **api:** update via SDK Studio ([abdaa7b](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/abdaa7bcfdc75000d221afb104eb3d4c37018fa3))
* **api:** update via SDK Studio ([d6ef970](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/d6ef970ed611855f2f19d5c8072ddbe619d65330))


### Bug Fixes

* reference to Cursor ([19ecdae](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/19ecdae6de17a21dec6815635a428564be06ca4d))


### Chores

* **ts:** reorder package.json imports ([10162f8](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/10162f83a19d239ed56b8e804be84095b35d06a3))
* Update license ([c1e1837](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/c1e18376b3d78531fbaf63d4d202fcb1ac874785))
* update SDK settings ([2396d0b](https://github.com/moonbaseai/moonbase-sdk-typescript/commit/2396d0bf206fd4ae54e59ec846547468fe66b81e))
