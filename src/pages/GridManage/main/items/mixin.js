export let Mixin = {
    methods: {
        init(keyword, type, region) {
            alert(type);
            this.keyword = keyword;
            this.type = type;
            this.region = region;
        }
    }
}
