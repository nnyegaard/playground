class MyBase {
  constructor(obj: any) {
    Object.assign(this, obj);
  }
}

class MyImpl extends MyBase {
  public firstName: any;

  // constructor(obj: any) {
  //   console.log(obj);
  //   super(obj);
  // }

  /**
   * name
   */
  public name() {
    console.log(this.firstName);
  }
}

const bla = new MyImpl({ firstName: "Kristian" });

bla.name();
