import { Pipe, PipeTransform } from '@angular/core';
import { PostInterface } from '../interfaces/post.interface';

@Pipe({
  name: 'postSearch',
})
export class PostSearchPipe implements PipeTransform {
  transform(posts: Array<PostInterface>, searchTerm: string) {
    if (!searchTerm || searchTerm.trim() == '') {
      return posts;
    }
    return posts.filter(
      (item) => item.title.search(new RegExp(searchTerm)) > -1
    );
  }
}
