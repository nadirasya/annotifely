export default function createAnnotation({id, label, x, y, width, height}){
    return (
        { 
          "@context": "http://www.w3.org/ns/anno.jsonld",
          "id": `${id}`,
          "type": "Annotation",
          "body": [{
            "purpose": "tagging",
            "type": "TextualBody",
            "value": `${label}`
          }],
          "target": {
            "selector": [{
              "type": "FragmentSelector",
              "conformsTo": "http://www.w3.org/TR/media-frags/",
              "value": `xywh=pixel:${x},${y},${width},${height}`
            }]
          }
        }
    )
}