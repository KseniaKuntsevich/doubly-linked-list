const Node = require('./node');

class LinkedList {
    constructor(){
        this.list = {};
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        let length = this.length
        let node = new Node(data, this.list[length - 1]);

        this.list[length] = node;
        if(this.list[length - 1]) this.list[length - 1].next = node;

        this.length++;
        if(length === 0) this._head = node;
        this._tail = node;

        return this;
    }

    head() {
        return this.list[0] ? this.list[0].data : null;
    }

    tail() {
        return this.list[this.length - 1] ? this.list[this.length - 1].data : null;
    }

    at(index) {
        return this.list[index].data
    }

    insertAt(index, data) {
        let node = new Node(data, this.list[index - 1], this.list[index]);

        if(this.list[index]) this.list[index].prev = node;
        if(this.list[index - 1]) this.list[index - 1].next = node;

        for(let i = this.length - 1 ; i >= index ; i--){
            this.list[i + 1] = this.list[i]  
        }
        
        this.list[index] = node; 

        this.length++;
        this._head = this.list[0];
        this._tail = this.list[this.length - 1];

        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        for(let i in this.list){
            delete this.list[i];
        }

        this.length = 0;
        this._head = null;
        this._tail = null;

        return this;
    }

    deleteAt(index) {
        for(let i in this.list){
            if(i > index){
              this.list[i - 1] = this.list[i]
            }
        }
        
        delete this.list[this.length - 1];
        this.length--;

        if(this.list[this.length - 1]) this.list[this.length - 1].next = null;
        if(this.list[index]) this.list[index].prev = this.list[index - 1] || null;
        if(this.list[index - 1]) this.list[index - 1].next = this.list[index];

        this._head = this.list[0]
        this._tail = this.list[this.length - 1];

        return this;
    }

    reverse() {
        let arr = [];
        for(let i in this.list){ arr.push(this.list[i]) }
        arr.reverse()
        for(let i in this.list){ 
            this.list[i] = arr[i]
            this.list[i].prev = this.list[i - 1] || null;
            this.list[i].next = null;
            if(this.list[i - 1]) this.list[i - 1].next = this.list[i]
        }

        this._head = this.list[0]
        this._tail = this.list[this.length - 1];

        return this;

    }

    indexOf(data) {
        let i = 0
        for( ; i < this.length; i++) { if(this.list[i].data === data) break; }
        return i === this.length ? -1 : i;
    }
}

module.exports = LinkedList;
