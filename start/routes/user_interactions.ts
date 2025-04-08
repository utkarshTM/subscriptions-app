const UserInteractionsController = () => import('#controllers/user_interactions_controller');
import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';

function userInteraction() {
    
// User interactions routes
router.group(() => {
    router.post('/like', [UserInteractionsController, 'likeUser']); 
    router.post('/superLike',[UserInteractionsController, 'superLikeUser']); 
})
  .prefix('/interactions') 
  .use([middleware.auth()]);

}
export default userInteraction;
