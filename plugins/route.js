/**
 * 路由的全局设置
 */
export default ({app})=>{
	app.router.beforeEach((to,from,next)=>{
		// console.log('查看路由的来源', from)
		// console.log('查看路由的去向',to,);
		next();
	})
}







