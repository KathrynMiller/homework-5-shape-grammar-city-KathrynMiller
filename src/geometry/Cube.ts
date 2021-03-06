import {vec3, vec4, mat4} from 'gl-matrix';
import Geometry from './Geometry';

class Cube extends Geometry{
// takes in center, scale, and rotation representing rotation about y in degrees
  constructor(center: vec3, scale: vec3, rotation: number, color: vec3) {
    super();
    this.center = vec4.fromValues(center[0], center[1], center[2], 1);
    this.scale = scale;
    this.rotation = rotation;
    this.color = color;
  }

  create() {
  // reset arrays in case this is being redone to account for scaling
  this.finalPos = new Array();
  this.finalNor = new Array();
  this.finalCol = new Array();
  this.finalIndices = [0, 1, 2,
                                  0, 2, 3,
                                  4, 5, 6,
                                  4, 6, 7,
                                  8, 9, 10,
                                  8, 10, 11,
                                  12, 13, 14,
                                  12, 14, 15,
                                  16, 17, 18,
                                  16, 18, 19,
                                  20, 21, 22,
                                  20, 22, 23];
  let normals = new Array<Array<number>>([0, 0, 1, 0],
                                   [0, 0, 1, 0],
                                   [0, 0, 1, 0],
                                   [0, 0, 1, 0],
                                  
                                   [0, 0, -1, 0],
                                   [0, 0, -1, 0],
                                   [0, 0, -1, 0],
                                   [0, 0, -1, 0],
                                  
                                   [1, 0, 0, 0],
                                   [1, 0, 0, 0],
                                   [1, 0, 0, 0],
                                   [1, 0, 0, 0],
                                  
                                   [-1, 0, 0, 0],
                                   [-1, 0, 0, 0],
                                   [-1, 0, 0, 0],
                                   [-1, 0, 0, 0],
                                  
                                   [0, 1, 0, 0],
                                   [0, 1, 0, 0],
                                   [0, 1, 0, 0],
                                   [0, 1, 0, 0],
                                  
                                   [0, -1, 0, 0],
                                   [0, -1, 0, 0],
                                   [0, -1, 0, 0],
                                   [0, -1, 0, 0]);

// transform plane based on inputs
 let positions = new Array<Array<number>>();
  positions = (                     [[-.5, 0, .5, 1],
                                     [.5, 0, .5, 1],
                                     [.5, .5, .5, 1],
                                     [-.5, .5, .5, 1],

                                     [-.5, 0, -.5, 1],
                                     [.5, 0, -.5, 1],
                                     [.5, .5 , -.5 , 1], 
                                     [-.5, .5, -.5, 1],

                                      [.5, 0, .5, 1],
                                      [.5, 0, -.5, 1],
                                      [.5, .5, -.5, 1],
                                      [.5, .5, .5, 1],

                                      [-.5, 0, .5, 1],
                                      [-.5, 0, -.5, 1],
                                      [-.5, .5, -.5, 1],
                                      [-.5, .5, .5, 1],

                                      [-.5 ,.5, .5, 1],
                                      [.5, .5, .5, 1],
                                      [.5, .5, -.5, 1],
                                      [-.5, .5, -.5, 1],

                                      [-.5, 0, .5, 1],
                                      [.5, 0, .5, 1],
                                      [.5 ,0, -.5, 1],
                                      [-.5,0, -.5, 1]]);

    for(let i = 0; i < positions.length; i++) {
        let pos = vec4.fromValues(positions[i][0], positions[i][1], positions[i][2], 1);
        let nor = vec4.fromValues(normals[i][0], normals[i][1], normals[i][2], 0);
        // scale
        pos[0] *= this.scale[0];
        pos[1] *= this.scale[1];
        pos[2] *= this.scale[2];
        let rotationMat = mat4.create();
        // rotate
        mat4.rotate(rotationMat, rotationMat, this.rotation, vec3.fromValues(0, 1, 0));
        //rotate
        vec4.transformMat4(pos, pos, rotationMat);
        vec4.transformMat4(nor, nor, rotationMat);
        // move position to the input center
        vec4.add(pos, this.center, pos);
        this.finalPos = this.finalPos.concat([pos[0], pos[1], pos[2], 1]);
        this.finalNor = this.finalNor.concat([nor[0], nor[1], nor[2], 0]);
        // make array of colors 
        this.finalCol = this.finalCol.concat(this.color[0], this.color[1], this.color[2], 1);
    }
    console.log("CUBE");
  }

};

export default Cube;