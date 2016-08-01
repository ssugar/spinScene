Cloud = function(){
    this.mesh = new THREE.Object3D();
    var geom = new THREE.SphereGeometry(25, 8, 4);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0xffffff, 
    });

    var cloudTex = THREE.ImageUtils.loadTexture('cloud.jpg');
    var cloudMat = new THREE.MeshPhongMaterial({ 
        map:cloudTex,
        shading: THREE.SmoothShading, 
    });

    var nSpheres = 4+Math.floor(Math.random()*2);

    var singleGeometry = new THREE.Geometry();

    for(var i = 0; i<nSpheres; i++){
        var m = new THREE.Mesh(geom);
        m.position.x = i*15;
        m.position.y = Math.random()*10 - 5;
        //m.position.z = Math.random()*10;
        m.rotation.y = Math.random()*Math.PI*2;
        m.rotation.z = Math.random()*Math.PI*2;
        var s = .4 + Math.random()*.5;
        m.scale.set(s,s,s);
        m.castShadow = true;
        m.receiveShadow = true;
        singleGeometry.mergeMesh(m);
    }
    singleGeometry.computeFaceNormals();
    singleGeometry.mergeVertices();
    singleGeometry.computeVertexNormals();
    //var modifier = THREE.SubdivisionModifier(2);
    //modifier.modify(singleGeometry);
    var singleMesh = new THREE.Mesh(singleGeometry, mat);
    this.mesh.add(singleMesh);
}

Sun = function(){
    this.mesh = new THREE.Object3D();
    var geom = new THREE.SphereGeometry(75, 16, 16);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0xffff00,
    });
    var m = new THREE.Mesh(geom, mat);
    m.position.set(200, 1000, 0);

    var pointLight = new THREE.PointLight(0xffffff, 3, 1000);
    pointLight.position.set(0, -300, 0);
    var pointLight2 = new THREE.PointLight(0xffffff, 3, 1000);
    pointLight2.position.set(0, 300, 0);
    var pointLight3 = new THREE.PointLight(0xffffff, 3, 1000);
    pointLight3.position.set(300, 0, 0);
    var pointLight4 = new THREE.PointLight(0xffffff, 3, 1000);
    pointLight4.position.set(-300, 0, 0);
    var pointLight5 = new THREE.PointLight(0xffffff, 3, 1000);
    pointLight5.position.set(0, 0, 300);
    var pointLight6 = new THREE.PointLight(0xffffff, 3, 1000);
    pointLight6.position.set(0, 0, -300);
    m.add(pointLight);
    m.add(pointLight2);
    m.add(pointLight3);
    m.add(pointLight4);
    m.add(pointLight5);
    m.add(pointLight6);

    this.mesh.add(m);
}

Sky = function(){
    this.mesh = new THREE.Object3D();
    this.nClouds = 20;
    var stepAngle = Math.PI*2 / this.nClouds;
    for(var i = 0; i < this.nClouds; i++){
        var c = new Cloud();
        var a = stepAngle*i;
        var randX = 850 + Math.random()*300;
        var randY = 850 + Math.random()*300;
        c.mesh.position.x = Math.cos(a)*randX;
        c.mesh.position.y = Math.sin(a)*randY;
        c.mesh.rotation.z = a + Math.PI/2;
        c.mesh.position.z = 100-Math.random()*200;
        var s = 1+Math.random()*2;
        c.mesh.scale.set(s,s,s);
        this.mesh.add(c.mesh);
    }
    var sun = new Sun();
    this.mesh.add(sun.mesh);
}

function createSky(){
    var sky = new Sky();
    sky.mesh.position.y = -700;
    return sky;
}