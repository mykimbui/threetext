const scene = new THREE.Scene()
const aspect = window.innerWidth/window.innerHeight
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
const controls = new THREE.OrbitControls(camera)
const light = new THREE.DirectionalLight(0xffffff, 1.5)

light.position.set(1,1,1)
light.target.position.set(0,0,0)

scene.add(light)
scene.add(light.target)

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

camera.position.set(100,0,100)
camera.lookAt(scene)


const loader = new THREE.FontLoader()
loader.load('GTWalsheimProMedium_Regular.json', function(font){
  const textGeometry = new THREE.TextGeometry("WAVE", {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 0
  })
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff } )

  const textMesh = new THREE.Mesh(textGeometry, material)
  textMesh.position.set(0,0,0)
  scene.add(textMesh)
})

// const quaternion = new THREE.Quaternion();
// quaternion.setFromAxisAngle(
//   new THREE.Vector3(0, 1, 0),
//   Math.PI / 2
//   )
// const vector = new THREE.Vector3(1, 0, 0);
// vector.applyQuaternion(quaternion)

// function twist(geometry) {
//   const quaternion = new THREE.Quaternion();

//   for (let i = 0; i < textMesh.vertices.length; i++) {
//     // a single vertex Y position
//     const yPos = textMesh.vertices[i].y;
//     const twistAmount = 10;
//     const upVec = new THREE.Vector3(0, 1, 0);

//     quaternion.setFromAxisAngle(
//       upVec,
//       (Math.PI / 180) * (yPos / twistAmount)
//     );

//     textMesh.vertices[i].applyQuaternion(quaternion);
//   }

const render = function () {

  requestAnimationFrame(render)
  controls.update()
  renderer.setClearColor(0x000000, 1.0)
  renderer.render(scene, camera)
  // textMesh.verticesNeedUpdate = true;
}

render()

function onWindowResize(){

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight )

}

window.addEventListener( 'resize', onWindowResize, false )
