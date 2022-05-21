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
    public serialize() {
        return JSON.stringify([this.prop, this.prop2, this.prop3]);
    }
    public deserialize(input: string) {
        [this.prop, this.prop2, this.prop3] = JSON.parse(input);
        return this;
    }
}