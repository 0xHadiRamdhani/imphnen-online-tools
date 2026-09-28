export function md5Hex(value:string){
 const input=new TextEncoder().encode(value),length=input.length,padded=new Uint8Array((((length+8)>>>6)+1)*64);padded.set(input);padded[length]=0x80;
 const bits=length*8;padded[padded.length-8]=bits&255;padded[padded.length-7]=(bits>>>8)&255;padded[padded.length-6]=(bits>>>16)&255;padded[padded.length-5]=(bits>>>24)&255;
 const shifts=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21],k=Array.from({length:64},(_,i)=>Math.floor(Math.abs(Math.sin(i+1))*4294967296)>>>0);let a0=0x67452301,b0=0xefcdab89,c0=0x98badcfe,d0=0x10325476;
 for(let off=0;off<padded.length;off+=64){const m=new Uint32Array(16);for(let j=0;j<16;j++)m[j]=(padded[off+j*4]|padded[off+j*4+1]<<8|padded[off+j*4+2]<<16|padded[off+j*4+3]<<24)>>>0;let a=a0,b=b0,c=c0,d=d0;for(let i=0;i<64;i++){let f:number,g:number,shift:number;if(i<16){f=(b&c)|(~b&d);g=i;shift=shifts[i%4]}else if(i<32){f=(d&b)|(~d&c);g=(5*i+1)%16;shift=shifts[4+i%4]}else if(i<48){f=b^c^d;g=(3*i+5)%16;shift=shifts[8+i%4]}else{f=c^(b|~d);g=(7*i)%16;shift=shifts[12+i%4]}const x=(a+f+k[i]+m[g])>>>0,rot=((x<<shift)|(x>>>(32-shift)))>>>0;a=d;d=c;c=b;b=(b+rot)>>>0}a0=(a0+a)>>>0;b0=(b0+b)>>>0;c0=(c0+c)>>>0;d0=(d0+d)>>>0}
 return [a0,b0,c0,d0].map(n=>[0,8,16,24].map(s=>((n>>>s)&255).toString(16).padStart(2,"0")).join("")).join("");
}
