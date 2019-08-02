(w=>{'use strict';
	const Promise=w.Promise,
	d=w.document;
	//
	const fileExistAtUrl=(url=>{
		if(url.startsWith('file://')){
			const P=Promise,
			head=d.head,
			onceWhen=(e,s,c)=>{
				const f=()=>{e.removeEventListener(s,g)},g=o=>{f();c(o)};
				e.addEventListener(s,g);
				return f
			};
			return url=>{
				const g=onceWhen,e=head.appendChild(d.createElement('script')),
				p=new P((a,b)=>{
					g(e,'load',a);
					g(e,'error',b)
				}).then(()=>{
					e.remove();
					return true
				}).catch(()=>{
					e.remove();
					return false
				});
				e.async=true;
				e.src=url;
				return p
			}
		}else{
			return url=>fetch(url,{method:'GET'}).then(o=>200!==o.status)
		}
	})(w.location.href);

	//exist?
	fileExistAtUrl('./file.txt').then(res=>{console.dir(res)})

})(window);