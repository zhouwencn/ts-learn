# ts-learn

# https://typescript.bootcss.com/

1. base_learn 主要是 ts 的基本类型用法,还有一些断言，元组，数组， 枚举之类的
2. variable-declare-learn 变量声明
3. interface-learn\*,关于接口的使用，既可以用来限定参数，又可以用来实现，接口可以继承其他接口，接口可以多继承接口，接口也可以继承 class 类
4. class-learn 关于类的使用技巧
5. function-learn 关于函数的使用技巧
6. generic-learn 范型的使用

# 一些知识点

#### 变量名冲突

如果不把文件当作模块使用的话 typescript 会认为所有文件里的代码都是在一个作用域里的，所以即使在不同文件也不能申明同名变量

解决办法(https://segmentfault.com/q/1010000039994758)

1. 把文件当作一个模块,在每个文件至少有一个导出，比如在末尾加上一下代码

`xport default void 0`

2. 使用 namespace 防止命名冲突，比如把每个文件里的代码包在一个 namespace 里

```
a.ts
namespace A {
  let a = 1
}
b.ts

namespace B {
  let a = 1
}
```
