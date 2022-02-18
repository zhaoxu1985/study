function init() {
    // 创建3D场景 场景对象 Scene
    const scene = new THREE.Scene()
    // 创建摄像机 对象 camera
    const camera = new THREE.PerspectiveCamera( /*角度*/ 45, /*长宽比*/ window.innerWidth / window.innerHeight, /*最近看多少*/ 0.1, /*最远看多少*/ 1000)
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染器的初始颜色
    renderer.setClearColor(new THREE.Color(0xEEEEEE))
    // 设置渲染到画布的大小   输出canvas画面的大小
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 显示三位坐标系
    const axes = new THREE.AxisHelper(20)
    // 添加坐标到场景中
    scene.add(axes)



    // 创建 地面几何体
    const planeGeometry = new THREE.PlaneGeometry(60, 25)
    // 给地面物体上色
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xfccccc
    })
    // 创建地面 将地面几何体 和 体面物体色结合
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    // 见地面添加到场景中
    plane.rotation.x = 0
    plane.rotation.y = 0
    plane.rotation.z = 0
    scene.add(plane)
    // 设置相机定位，指向场景中心
    camera.position.x = 20
    camera.position.y = 80
    camera.position.z = 50
    camera.lookAt(scene.position)

    // 将渲染器输出到html中
    document.getElementById('output').appendChild(renderer.domElement)
    renderer.render(scene, camera)
    setInterval(item => {
        camera.position.y = camera.position.y - .1
        // camera.position.x = camera.position.x - 5
        // camera.position.z = camera.position.z + 1
        // camera.lookAt(scene.position)
        // plane.rotation.x = plane.rotation.x + 0.1
        // plane.rotation.y = plane.rotation.y + 0.1
        // plane.rotation.z = plane.rotation.z + 0.1
        renderer.render(scene, camera)
    }, 100)
}
window.onload = init()