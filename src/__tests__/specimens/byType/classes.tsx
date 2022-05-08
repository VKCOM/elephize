export class Classes {
    static readonly MY_VAR = 3;
    public prop = 1;
    protected prop2 = 2;
    private prop3 = 3;
    public getter1() {
        return this.prop;
    }
    protected getter2() {
        return this.prop2 + Classes.MY_VAR;
    }
    private getter3() {
        return this.prop3;
    }
    public setter1(val: number) {
        this.prop3 = val;
        return this;
    }
}