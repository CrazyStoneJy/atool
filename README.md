# setup environment
first you should install `java environment`. you can download jdk from oracle official website or use third party package manager to download.
### sign
sign a unsigned apk use jks.
option arguments blew:

|option argument|description|
|----|----|
|-j|jks(keystore) path|
|-a|alias of jks|
|-p|keystore password of jks|
|-i|input apk|
|-o|output apk|

### verify
verity a apk signature

### diff
diff a apk and a jks wether use same sha256

|option argument|description|
|----|----|
|-apk|apk path|
|-j|jks path|
|-p|keystore password of jks|

### look
look jsk signature cert

### extract
extract abb to universal apk

|option argument|description|
|----|----|
|-aab|aab path|
|-j|jks path|
|-a|alias of jks|
|-p|keystore password of jks|
|-k|key password alias|
|-o|output path of apks|