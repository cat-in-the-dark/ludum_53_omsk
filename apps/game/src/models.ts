export type Request = {
  id: number;
  src: string[];
  dst: string;
};

export type Response = {
  req: Request;
};

class Sequence {
  private lastReqId = 0;
  next(): number {
    this.lastReqId += 1;
    return this.lastReqId;
  }
}

export const sequence = new Sequence();
