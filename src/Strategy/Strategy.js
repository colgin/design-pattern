// 传统OOP语言，策略Strategy和上下文Context都是类

// Context
class Bonus1 {
  constructor() {
    this.salary = 0
    this.strategy = null
  }

  setSalary(salary) {
    this.salary = salary
  }

  setStrategy(strategy) {
    this.strategy = strategy
  }

  getBonus() {
    return this.strategy.calculate(this.salary)
  }
}

// 策略类
class PerfomaceS {
  constructor() {}

  calculate(salary) {
    return salary * 6
  }
}

class PerfomaceA {
  constructor() {}

  calculate(salary) {
    return salary * 4
  }
}

class PerfomaceB {
  constructor() {}

  calculate(salary) {
    return salary * 2
  }
}

// test case
const bonus = new Bonus1()
bonus.setSalary(8000)
bonus.setStrategy(new PerfomaceB())
console.log(bonus.getBonus())

// JavaScript中函数也是对象，更简单的方法是把strategy直接定义为函数
const strategies = {
  S: (salary) => salary * 6,
  A: (salary) => salary * 4,
  B: (salary) => salary * 2,
}

const calculateBonus = (level, salary) =>
  strategies[level] && strategies[level](salary)

// test case
console.log(calculateBonus('S', 8000))
