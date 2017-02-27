import bodyParser from 'koa-bodyparser';
import Store from '../store';

export default router => {
  router.use((ctx, next) => {
    ctx.state.app = 'default'; // hard code for now
    ctx.state.store = new Store(ctx.state.app);

    return next();
  });

  router.use(bodyParser());
};
