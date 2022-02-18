class Prom{
            
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    /**
        * @ executor : 执行者
    */
    constructor(executor){
        this.status = Prom.PENDING;
        this.value = '';
        this.callbacks = [];
        try{
            executor(this.resolve.bind(this),this.rejected.bind(this));
        }catch(e){
            this.rejected()
        }

    }
    resolve(val){
        if(this.status === Prom.PENDING){
            this.status = Prom.FULFILLED
            this.value = val
            this.callbacks.forEach(item=>{
                setTimeout(()=>{
                    item.success(this.value)
                })
            })
        }
    }
    rejected(val){
        if(this.status === Prom.PENDING){
            this.status = Prom.REJECTED
            this.value = val
            this.callbacks.forEach(item=>{
                setTimeout(()=>{
                    item.error(this.value)
                })
            })
        }
    }
    then(success,error){
        setTimeout(()=>{
            typeof success !== 'function'?success=()=>{}:''
            typeof error !== 'function'?error=()=>{}:''
            if(this.status===Prom.PENDING){
                this.callbacks.push({
                    success:value=>{
                        try{
                            success(this.value)
                        }catch(e){error(e)}
                    },
                    error:value=>{
                        try{
                            error(this.value)
                        }catch(e){error(e)}
                    }
                })
            }
            if(this.status === Prom.FULFILLED){
                try{
                    success(this.value)
                }catch(e){
                    error(e)
                }
            }
            if(this.status === Prom.REJECTED){
                try{
                    error(this.value)
                }catch(e){
                    error(e)
                }
            }
            return this
        })
    }
    catch(error){
        if(this.status === Prom.REJECTED){
            error(this.value)
        }
        return this
    }
}