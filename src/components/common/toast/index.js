import Toast from './Toast'
const obj ={}
//封装toast插件
obj.install = function(Vue){
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.通过new的方式，根据组件构造器，创建一个组件对象
  const toast = new toastConstructor()
  //3.将组件对象手动挂载到一个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el对应的就是这个div了
  //这里的1-4步是为了把Toast组件内的元素挂载到页面内，取代每个页面依赖，注册，使用组件的过程
  document.body.appendChild(toast.$el)

  //5.
  Vue.prototype.$toast = toast
}
export default obj;