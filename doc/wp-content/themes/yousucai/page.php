<?php get_header(); ?>

<?php setPostViews(get_the_ID()); ?>
<div class="main">
  <div class="common">
    <?php if(have_posts()):while(have_posts()):the_post(); ?>
	<div class="contentbox">
      <div class="contenttitle">
        <h1><?php the_title(); ?></h1>
	  </div>
      <div class="contentview">浏览次数<span><?php echo getPostViews(get_the_ID()); ?></span></div>
      <div class="contenttxt">
        <div class="clear"></div>
        <?php the_content(); ?>
      </div>
    </div>
    <div class="commentsbox" style="display:none;">
      <div class="commentsnum">全部评论：<?php comments_number('<span>0</span>条','<span>1</span>条','<span>%</span>条','','评论已关闭'); ?></div>
      <?php comments_template('',true); ?>
    </div>
    <div class="clear"></div>
	<?php endwhile;endif; ?>
  </div>
</div>
<div class="clear"></div>
<?php get_footer(); ?>