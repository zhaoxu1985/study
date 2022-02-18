function init() {
    // 创建3D场景 场景对象 Scene
    const scene = new THREE.Scene()
    // 创建摄像机 对象 camera
    let camera = new THREE.PerspectiveCamera( /*角度*/ 45, /*长宽比*/ window.innerWidth / window.innerHeight, /*最近看多少*/ 0.1, /*最远看多少*/ 1000)
    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    // 设置渲染器的初始颜色
    renderer.setClearColor(new THREE.Color(0xEEEEEE))
    // 设置渲染到画布的大小   输出canvas画面的大小
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 显示三位坐标系
    const axes = new THREE.AxesHelper(20)
    // 添加坐标到场景中
    // scene.add(axes)
    camera.lookAt(scene.position)

    let mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({
        color: 0x999999,
        depthWrite: false,

    }));
    mesh.castShadow = true;
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);

    const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    scene.add(grid);

    // 将渲染器输出到html中
    document.getElementById('app').appendChild(renderer.domElement)
    camera.position.x = 0
    camera.position.y = 20
    camera.position.z = 100

    /* 灯光 */
    function initLight() {

        // scene.add(new THREE.AmbientLight(0x0c0c0c));

        let spotLight1 = new THREE.SpotLight(0xffffff);
        spotLight1.position.set(-10000, -10000, -10000);
        spotLight1.castShadow = true;
        let spotLight2 = new THREE.SpotLight(0xffffff);
        spotLight2.position.set(100, 100, 100);

        scene.add(spotLight1);
        scene.add(spotLight2);

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(100, 100, 100);
        scene.add(spotLight);

        var spotLightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(spotLightHelper);

    }
    initLight()

    //添加控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement)

    function initStats() {
        let stats = new Stats();
        document.getElementById('app').appendChild(stats.domElement);
        return stats;
    }

    const loader = new THREE.GLTFLoader();
    loader.setPath('./module/GLTF/')
    loader.load('scene.gltf', function (gltf) {

        scene.add(gltf.scene);

    }, function (xhr) {

        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    }, function (error) {

        console.error(error);

    });

    let state = initStats()

    function animate() {
        state.update()
        requestAnimationFrame(animate);

        controls.update();
        renderer.render(scene, camera);

    }
    window.addEventListener('resize',
        e => {
            renderer.setSize(window.innerWidth, window.innerHeight)

        })
    animate()
}
window.onload = init()