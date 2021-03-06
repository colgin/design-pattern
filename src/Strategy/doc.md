## 定义

定义一系列算法，把他们一个个封装起来，并且使他们可以相互替换。本质上来说是将算法的使用和算法的实现分离开来。

## 实现

一般来说一个策略模式至少存在两个部分，一个是策略类 Strategy（可变），策略类封装了具体的算法，负责具体的计算操作。第二个部分是环境类 Context（不变），context 接收请求，然后把请求委托给某一个策略类进行计算。

## 注意点

实际使用过程中，策略模式中的策略不仅仅是我们潜意识里的那个算法，可以理解为一系列的**业务规则**，只要这些业务规则指向的目标一样，那么就可以被替换。

在传统 OOP 语言中，策略模式中的 Context 和 Strategy 都使用类来表示，以类为中心，不同的算法或者行为或者**业务规则**被封装在各个不同的策略类中，Context 将请求委托给这些策略对象，这些策略对象会根据请求返回不同的执行结果，这样表现了多态。

但是在函数作为一等对象的语言中，策略模式是隐形的，strategy 就是值为函数的变量，被传递到函数中去。

## 使用场景

业务逻辑可以被剥离，并且需要替换

## 优缺点分析

### 优点

1. 利用组合，委托，多态等技术和思想，可以有效避免多重选择语句
2. 提供对开放-封闭原则的完美支持，将易变的算法独立封装到 strategy 中，可以随意切换，容易扩展

### 缺点

1. 使用策略模式会在程序中增加许多策略类或者策略对象，但是这远远逼他们的逻辑堆砌俄在 Context 对象中好
2. 使用策略模式，必须要了解所有的 strategy，这样才能选择一个合适的 strategy，这违背了最少知识原则
